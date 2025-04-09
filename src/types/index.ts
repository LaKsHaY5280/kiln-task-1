export interface Car {
  id: number;
  brand: string;
  model: string;
  year: number;
  price: number;
  fuelType: string;
  seatingCapacity: number;
  transmission: string;
  image: string;
  description: string;
}

export interface FilterOptions {
  brand: string;
  minPrice: number;
  maxPrice: number;
  fuelType: string;
  seatingCapacity: number;
}

export interface SortOption {
  field: string;
  direction: 'asc' | 'desc';
}