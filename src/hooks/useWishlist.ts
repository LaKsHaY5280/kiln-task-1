import { useState, useEffect } from 'react';
import { Car } from '@/types';

export function useWishlist() {
  const [wishlist, setWishlist] = useState<Car[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load wishlist from localStorage on component mount
  useEffect(() => {
    const storedWishlist = localStorage.getItem('carWishlist');
    if (storedWishlist) {
      try {
        setWishlist(JSON.parse(storedWishlist));
      } catch (error) {
        console.error('Failed to parse wishlist from localStorage:', error);
        // Reset wishlist if parsing fails
        localStorage.setItem('carWishlist', JSON.stringify([]));
      }
    }
    setIsLoaded(true);
  }, []);

  // Update localStorage whenever wishlist changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('carWishlist', JSON.stringify(wishlist));
    }
  }, [wishlist, isLoaded]);

  // Add car to wishlist
  const addToWishlist = (car: Car) => {
    setWishlist(prev => {
      // Check if car is already in wishlist
      if (prev.some(item => item.id === car.id)) {
        return prev;
      }
      return [...prev, car];
    });
  };

  // Remove car from wishlist
  const removeFromWishlist = (carId: number) => {
    setWishlist(prev => prev.filter(car => car.id !== carId));
  };

  // Check if a car is in the wishlist
  const isInWishlist = (carId: number) => {
    return wishlist.some(car => car.id === carId);
  };

  return {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    isLoaded
  };
}