import Image from "next/image";
import { Car } from "@/types";
import { Button } from "@/components/ui/Button";
import { Heart, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface CarCardProps {
  car: Car;
  isInWishlist: boolean;
  onAddToWishlist: (car: Car) => void;
  onRemoveFromWishlist: (carId: number) => void;
  onViewDetails: (car: Car) => void;
  index?: number;
}

export function CarCard({
  car,
  isInWishlist,
  onAddToWishlist,
  onRemoveFromWishlist,
  onViewDetails,
  index = 0,
}: CarCardProps) {
  const handleWishlistToggle = () => {
    if (isInWishlist) {
      onRemoveFromWishlist(car.id);
    } else {
      onAddToWishlist(car);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all"
    >
      <div className="relative h-48 w-full group">
        <Image
          src={car.image}
          alt={`${car.brand} ${car.model}`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleWishlistToggle}
          className="absolute top-2 right-2 p-2 bg-background/80 backdrop-blur-sm rounded-full z-10 shadow-md"
          aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <motion.div
            animate={isInWishlist ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            <Heart
              className={cn(
                "h-5 w-5 transition-colors",
                isInWishlist ? "fill-red-500 text-red-500" : "text-foreground"
              )}
            />
          </motion.div>
        </motion.button>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold">
          {car.brand} {car.model}
        </h3>

        <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <span className="font-medium">Year:</span> {car.year}
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <span className="font-medium">Seats:</span> {car.seatingCapacity}
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <span className="font-medium">Fuel:</span> {car.fuelType}
          </div>
          <div className="flex items-center gap-1 font-semibold text-primary">
            ${car.price.toLocaleString()}
          </div>
        </div>

        <motion.div className="mt-4" whileTap={{ scale: 0.98 }}>
          <Button
            onClick={() => onViewDetails(car)}
            className="w-full group"
            variant="primary"
          >
            <span>View Details</span>
            <Info className="ml-2 h-4 w-4 opacity-70 group-hover:opacity-100 transition-opacity" />
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
