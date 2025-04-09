import { useState, useEffect } from "react";
import { FilterOptions } from "@/types";
import { Button } from "@/components/ui/Button";
import { getFilterOptions } from "@/lib/api";
import { motion } from "framer-motion";
import { Filter, RefreshCw, ChevronDown, ChevronUp } from "lucide-react";

interface FiltersProps {
  onFilterChange: (filters: Partial<FilterOptions>) => void;
  currentFilters: Partial<FilterOptions>;
}

export function Filters({ onFilterChange, currentFilters }: FiltersProps) {
  const [localFilters, setLocalFilters] =
    useState<Partial<FilterOptions>>(currentFilters);
  const [filterOptions, setFilterOptions] = useState<{
    brands: string[];
    fuelTypes: string[];
    seatingCapacities: number[];
    priceRange: { min: number; max: number };
  }>({
    brands: [],
    fuelTypes: [],
    seatingCapacities: [],
    priceRange: { min: 0, max: 100000 },
  });

  const [isExpanded, setIsExpanded] = useState(true);

  // Load filter options on component mount
  useEffect(() => {
    const options = getFilterOptions();
    setFilterOptions(options);
  }, []);

  // Update local filters when currentFilters change
  useEffect(() => {
    setLocalFilters(currentFilters);
  }, [currentFilters]);

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
  };

  const handleApplyFilters = () => {
    onFilterChange(localFilters);
  };

  const handleResetFilters = () => {
    const emptyFilters: Partial<FilterOptions> = {};
    setLocalFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const filterCount = Object.keys(currentFilters).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-card rounded-lg shadow-md overflow-hidden"
    >
      {/* Header with toggle */}
      <div
        className="p-4 border-b flex items-center justify-between cursor-pointer"
        onClick={toggleExpanded}
      >
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          <h2 className="text-lg font-semibold">Filters</h2>
          {filterCount > 0 && (
            <span className="bg-primary text-primary-foreground text-xs rounded-full px-2 py-0.5">
              {filterCount}
            </span>
          )}
        </div>
        <button className="p-1 rounded-md hover:bg-muted">
          {isExpanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Filter content with animation */}
      <motion.div
        initial={false}
        animate={{
          height: isExpanded ? "auto" : 0,
          opacity: isExpanded ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="p-4 space-y-4">
          {/* Brand Filter */}
          <div className="space-y-1.5">
            <label htmlFor="brand" className="text-sm font-medium">
              Brand
            </label>
            <div className="relative">
              <select
                id="brand"
                value={localFilters.brand || ""}
                onChange={(e) =>
                  handleFilterChange("brand", e.target.value || undefined)
                }
                className="w-full p-2.5 border rounded-md bg-background appearance-none pr-10"
              >
                <option value="">All Brands</option>
                {filterOptions.brands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 pointer-events-none text-muted-foreground" />
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">Price Range</label>
              <span className="text-xs text-muted-foreground">
                {formatPrice(
                  localFilters.minPrice || filterOptions.priceRange.min
                )}{" "}
                -{" "}
                {formatPrice(
                  localFilters.maxPrice || filterOptions.priceRange.max
                )}
              </span>
            </div>

            <div className="pt-2 px-1">
              <div className="mb-4">
                <label
                  htmlFor="minPrice"
                  className="block text-xs text-muted-foreground mb-1.5"
                >
                  Min Price
                </label>
                <input
                  id="minPrice"
                  type="range"
                  min={filterOptions.priceRange.min}
                  max={filterOptions.priceRange.max}
                  step={1000}
                  value={localFilters.minPrice || filterOptions.priceRange.min}
                  onChange={(e) =>
                    handleFilterChange("minPrice", Number(e.target.value))
                  }
                  className="w-full h-2 appearance-none bg-muted rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
                />
              </div>

              <div>
                <label
                  htmlFor="maxPrice"
                  className="block text-xs text-muted-foreground mb-1.5"
                >
                  Max Price
                </label>
                <input
                  id="maxPrice"
                  type="range"
                  min={filterOptions.priceRange.min}
                  max={filterOptions.priceRange.max}
                  step={1000}
                  value={localFilters.maxPrice || filterOptions.priceRange.max}
                  onChange={(e) =>
                    handleFilterChange("maxPrice", Number(e.target.value))
                  }
                  className="w-full h-2 appearance-none bg-muted rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
                />
              </div>
            </div>
          </div>

          {/* Fuel Type Filter */}
          <div className="space-y-1.5">
            <label htmlFor="fuelType" className="text-sm font-medium">
              Fuel Type
            </label>
            <div className="relative">
              <select
                id="fuelType"
                value={localFilters.fuelType || ""}
                onChange={(e) =>
                  handleFilterChange("fuelType", e.target.value || undefined)
                }
                className="w-full p-2.5 border rounded-md bg-background appearance-none pr-10"
              >
                <option value="">All Fuel Types</option>
                {filterOptions.fuelTypes.map((fuelType) => (
                  <option key={fuelType} value={fuelType}>
                    {fuelType}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 pointer-events-none text-muted-foreground" />
            </div>
          </div>

          {/* Seating Capacity Filter */}
          <div className="space-y-1.5">
            <label htmlFor="seatingCapacity" className="text-sm font-medium">
              Seating Capacity
            </label>
            <div className="relative">
              <select
                id="seatingCapacity"
                value={localFilters.seatingCapacity || ""}
                onChange={(e) =>
                  handleFilterChange(
                    "seatingCapacity",
                    e.target.value ? Number(e.target.value) : undefined
                  )
                }
                className="w-full p-2.5 border rounded-md bg-background appearance-none pr-10"
              >
                <option value="">Any Capacity</option>
                {filterOptions.seatingCapacities.map((capacity) => (
                  <option key={capacity} value={capacity}>
                    {capacity} Seats
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 pointer-events-none text-muted-foreground" />
            </div>
          </div>

          {/* Filter Actions */}
          <div className="flex gap-2 pt-2">
            <Button
              onClick={handleApplyFilters}
              variant="primary"
              className="flex-1 group"
            >
              <span>Apply Filters</span>
              <Filter className="ml-2 h-4 w-4 opacity-70 group-hover:opacity-100" />
            </Button>
            <Button
              onClick={handleResetFilters}
              variant="outline"
              className="flex items-center justify-center"
              aria-label="Reset filters"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
