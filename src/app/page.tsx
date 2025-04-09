"use client";

import { useState, useEffect } from "react";
import { Car, FilterOptions, SortOption } from "@/types";
import { getCars } from "@/lib/api";
import { CarCard } from "@/components/CarCard";
import { CarDetails } from "@/components/CarDetails";
import { Filters } from "@/components/Filters";
import { useWishlist } from "@/hooks/useWishlist";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Heart,
  SortAsc,
  Car as CarIcon,
  Loader2,
} from "lucide-react";

export default function Home() {
  // State for cars and pagination
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // State for filters and sorting
  const [filters, setFilters] = useState<Partial<FilterOptions>>({});
  const [sort, setSort] = useState<SortOption>({
    field: "price",
    direction: "asc",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // State for selected car details
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  // Wishlist functionality
  const { wishlist, addToWishlist, removeFromWishlist, isInWishlist } =
    useWishlist();
  const [showWishlist, setShowWishlist] = useState(false);

  // Fetch cars based on current filters, sort, and pagination
  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      try {
        // Added slight delay to show loading state for better UX
        await new Promise((resolve) => setTimeout(resolve, 300));

        const result = getCars(
          currentPage,
          10, // Items per page
          filters,
          sort,
          searchQuery
        );

        setCars(result.cars);
        setTotalPages(result.pagination.totalPages);
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [currentPage, filters, sort, searchQuery]);

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchInput);
    setCurrentPage(1); // Reset to first page on new search
  };

  // Handle filter changes
  const handleFilterChange = (newFilters: Partial<FilterOptions>) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page on filter change
  };

  // Handle sort changes
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [field, direction] = e.target.value.split("-");
    setSort({ field, direction: direction as "asc" | "desc" });
    setCurrentPage(1); // Reset to first page on sort change
  };

  // Handle pagination
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Smooth scroll to top when page changes
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Toggle between all cars and wishlist
  const toggleWishlist = () => {
    setShowWishlist(!showWishlist);
    setCurrentPage(1); // Reset to first page when toggling view
  };

  // Get cars to display based on current view (all or wishlist)
  const displayedCars = showWishlist ? wishlist : cars;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  return (
    <main className="min-h-screen p-4 md:p-8 bg-background text-foreground">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <motion.h1
              className="text-3xl md:text-4xl font-bold"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="flex items-center gap-2">
                <CarIcon className="h-8 w-8" />
                Car Finder
              </span>
            </motion.h1>
            <ThemeToggle />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between"
          >
            {/* Search Bar */}
            <form
              onSubmit={handleSearch}
              className="flex w-full md:w-auto group"
            >
              <div
                className={`relative flex-1 md:min-w-[300px] transition-all duration-200 ${
                  isSearchFocused ? "ring-2 ring-primary/30 rounded-md" : ""
                }`}
              >
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  placeholder="Search by brand or model"
                  className="w-full p-2 pl-10 border rounded-md bg-background focus:outline-none focus:ring-0"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
              <Button
                type="submit"
                className="ml-2 group-focus-within:bg-primary"
              >
                Search
              </Button>
            </form>

            {/* Sort and Wishlist Toggle */}
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="flex-1 md:flex-none relative">
                <select
                  value={`${sort.field}-${sort.direction}`}
                  onChange={handleSortChange}
                  className="p-2 pr-10 border rounded-md bg-background w-full appearance-none"
                >
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="year-desc">Year: Newest First</option>
                  <option value="year-asc">Year: Oldest First</option>
                  <option value="brand-asc">Brand: A-Z</option>
                  <option value="brand-desc">Brand: Z-A</option>
                </select>
                <SortAsc className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 pointer-events-none text-muted-foreground" />
              </div>
              <motion.div whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={toggleWishlist}
                  variant={showWishlist ? "primary" : "outline"}
                  className="whitespace-nowrap group"
                >
                  <Heart
                    className={`mr-2 h-4 w-4 transition-all ${
                      showWishlist
                        ? "fill-primary-foreground text-primary-foreground"
                        : "group-hover:fill-primary group-hover:text-primary"
                    }`}
                  />
                  {showWishlist ? "All Cars" : `Wishlist (${wishlist.length})`}
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <Filters
              onFilterChange={handleFilterChange}
              currentFilters={filters}
            />
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {loading ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col justify-center items-center h-64"
              >
                <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
                <p className="text-lg">Loading cars...</p>
              </motion.div>
            ) : displayedCars.length > 0 ? (
              <>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  <AnimatePresence>
                    {displayedCars.map((car, index) => (
                      <CarCard
                        key={car.id}
                        car={car}
                        isInWishlist={isInWishlist(car.id)}
                        onAddToWishlist={addToWishlist}
                        onRemoveFromWishlist={removeFromWishlist}
                        onViewDetails={() => setSelectedCar(car)}
                        index={index}
                      />
                    ))}
                  </AnimatePresence>
                </motion.div>

                {/* Pagination (only show for all cars view, not wishlist) */}
                {!showWishlist && totalPages > 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex justify-center items-center mt-8 gap-2"
                  >
                    <Button
                      onClick={() => goToPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      variant="outline"
                      size="sm"
                      className="group"
                    >
                      <ChevronLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
                    </Button>

                    <div className="flex items-center gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
                          <Button
                            key={page}
                            onClick={() => goToPage(page)}
                            variant={
                              currentPage === page ? "primary" : "outline"
                            }
                            size="sm"
                            className={`w-8 h-8 ${
                              currentPage === page ? "shadow-md" : ""
                            }`}
                          >
                            {page}
                          </Button>
                        )
                      )}
                    </div>

                    <Button
                      onClick={() => goToPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      variant="outline"
                      size="sm"
                      className="group"
                    >
                      <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                    </Button>
                  </motion.div>
                )}
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center h-64 text-center"
              >
                <div className="bg-muted/40 rounded-full p-5 mb-4">
                  {showWishlist ? (
                    <Heart className="h-12 w-12 text-muted-foreground" />
                  ) : (
                    <CarIcon className="h-12 w-12 text-muted-foreground" />
                  )}
                </div>
                <p className="text-xl font-medium mb-4">
                  {showWishlist
                    ? "Your wishlist is empty"
                    : "No cars found matching your criteria"}
                </p>
                <p className="text-muted-foreground mb-6 max-w-md">
                  {showWishlist
                    ? "Add some cars to your wishlist to see them here"
                    : "Try adjusting your filters or search to find more options"}
                </p>
                {showWishlist && (
                  <Button
                    onClick={toggleWishlist}
                    variant="primary"
                    className="group"
                  >
                    <CarIcon className="mr-2 h-4 w-4 group-hover:animate-bounce" />
                    Browse All Cars
                  </Button>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Car Details Modal */}
      {selectedCar && (
        <CarDetails
          car={selectedCar}
          isInWishlist={isInWishlist(selectedCar.id)}
          onAddToWishlist={addToWishlist}
          onRemoveFromWishlist={removeFromWishlist}
          onClose={() => setSelectedCar(null)}
        />
      )}
    </main>
  );
}
