import Image from "next/image";
import { Car } from "@/types";
import { Button } from "@/components/ui/Button";
import { Heart, X, Calendar, Users, Fuel, Gauge } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface CarDetailsProps {
  car: Car;
  isInWishlist: boolean;
  onAddToWishlist: (car: Car) => void;
  onRemoveFromWishlist: (carId: number) => void;
  onClose: () => void;
}

export function CarDetails({
  car,
  isInWishlist,
  onAddToWishlist,
  onRemoveFromWishlist,
  onClose,
}: CarDetailsProps) {
  const handleWishlistToggle = () => {
    if (isInWishlist) {
      onRemoveFromWishlist(car.id);
    } else {
      onAddToWishlist(car);
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={backdropVariants}
        transition={{ duration: 0.2 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-card rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-auto"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={modalVariants}
          transition={{
            duration: 0.3,
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 bg-card/80 backdrop-blur-md z-10 flex items-center justify-between p-4 border-b">
            <motion.h2
              className="text-xl font-semibold"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              {car.brand} {car.model}
            </motion.h2>
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleWishlistToggle}
                className="p-2 rounded-full hover:bg-muted transition-colors"
                aria-label={
                  isInWishlist ? "Remove from wishlist" : "Add to wishlist"
                }
              >
                <Heart
                  className={cn(
                    "h-5 w-5 transition-all",
                    isInWishlist
                      ? "fill-red-500 text-red-500"
                      : "text-foreground"
                  )}
                />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="p-2 rounded-full hover:bg-muted transition-colors"
                aria-label="Close details"
              >
                <X className="h-5 w-5" />
              </motion.button>
            </div>
          </div>

          <motion.div
            className="relative h-64 sm:h-80 w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Image
              src={car.image}
              alt={`${car.brand} ${car.model}`}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent h-24">
              <div className="absolute bottom-4 left-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-white text-2xl font-bold drop-shadow-lg"
                >
                  ${car.price.toLocaleString()}
                </motion.div>
              </div>
            </div>
          </motion.div>

          <div className="p-6 space-y-6">
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-4 gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <FeatureCard
                icon={<Calendar className="h-5 w-5" />}
                title="Year"
                value={car.year.toString()}
              />
              <FeatureCard
                icon={<Users className="h-5 w-5" />}
                title="Seats"
                value={`${car.seatingCapacity} Seats`}
              />
              <FeatureCard
                icon={<Fuel className="h-5 w-5" />}
                title="Fuel"
                value={car.fuelType}
              />
              <FeatureCard
                icon={<Gauge className="h-5 w-5" />}
                title="Transmission"
                value={car.transmission}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground">{car.description}</p>
            </motion.div>

            <motion.div
              className="pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                onClick={handleWishlistToggle}
                variant={isInWishlist ? "outline" : "primary"}
                className="w-full group"
              >
                <Heart
                  className={cn(
                    "mr-2 h-5 w-5 transition-all",
                    isInWishlist ? "fill-red-500 text-red-500" : ""
                  )}
                />
                <span>
                  {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                </span>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function FeatureCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="flex flex-col items-center p-3 bg-muted/40 rounded-lg">
      <div className="text-primary">{icon}</div>
      <div className="text-xs text-muted-foreground mt-1">{title}</div>
      <div className="font-medium">{value}</div>
    </div>
  );
}
