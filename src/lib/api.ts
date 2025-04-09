import { Car, FilterOptions, SortOption } from '@/types';

// Mock car data
const cars: Car[] = [
  {
    id: 1,
    brand: 'Toyota',
    model: 'Camry',
    year: 2023,
    price: 25000,
    fuelType: 'Gasoline',
    seatingCapacity: 5,
    transmission: 'Automatic',
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?q=80&w=2000',
    description: 'The Toyota Camry is a reliable and fuel-efficient sedan with modern features and comfortable seating for five passengers.'
  },
  {
    id: 2,
    brand: 'Honda',
    model: 'Civic',
    year: 2023,
    price: 22000,
    fuelType: 'Gasoline',
    seatingCapacity: 5,
    transmission: 'Automatic',
    image: 'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?q=80&w=2000',
    description: 'The Honda Civic offers excellent fuel economy, a spacious interior, and advanced safety features in a compact sedan package.'
  },
  {
    id: 3,
    brand: 'Tesla',
    model: 'Model 3',
    year: 2023,
    price: 45000,
    fuelType: 'Electric',
    seatingCapacity: 5,
    transmission: 'Automatic',
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=2000',
    description: 'The Tesla Model 3 is an all-electric sedan with impressive range, cutting-edge technology, and zero emissions.'
  },
  {
    id: 4,
    brand: 'Ford',
    model: 'F-150',
    year: 2023,
    price: 35000,
    fuelType: 'Gasoline',
    seatingCapacity: 6,
    transmission: 'Automatic',
    image: 'https://images.unsplash.com/photo-1605893477799-b99e3b8b93fe?q=80&w=2000',
    description: 'The Ford F-150 is a versatile and powerful pickup truck with excellent towing capacity and a spacious cabin.'
  },
  {
    id: 5,
    brand: 'Chevrolet',
    model: 'Equinox',
    year: 2023,
    price: 28000,
    fuelType: 'Gasoline',
    seatingCapacity: 5,
    transmission: 'Automatic',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2000',
    description: 'The Chevrolet Equinox is a compact SUV with a comfortable ride, good fuel economy, and plenty of cargo space.'
  },
  {
    id: 6,
    brand: 'BMW',
    model: '3 Series',
    year: 2023,
    price: 42000,
    fuelType: 'Gasoline',
    seatingCapacity: 5,
    transmission: 'Automatic',
    image: 'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?q=80&w=2000',
    description: 'The BMW 3 Series is a luxury sedan with sporty handling, premium interior, and advanced technology features.'
  },
  {
    id: 7,
    brand: 'Audi',
    model: 'Q5',
    year: 2023,
    price: 45000,
    fuelType: 'Hybrid',
    seatingCapacity: 5,
    transmission: 'Automatic',
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?q=80&w=2000',
    description: 'The Audi Q5 is a luxury compact SUV with a refined interior, smooth ride, and efficient hybrid powertrain.'
  },
  {
    id: 8,
    brand: 'Hyundai',
    model: 'Tucson',
    year: 2023,
    price: 26000,
    fuelType: 'Hybrid',
    seatingCapacity: 5,
    transmission: 'Automatic',
    image: 'https://images.unsplash.com/photo-1633708640808-c3649557a032?q=80&w=2000',
    description: 'The Hyundai Tucson is a stylish compact SUV with a comfortable interior, good fuel economy, and advanced safety features.'
  },
  {
    id: 9,
    brand: 'Kia',
    model: 'Telluride',
    year: 2023,
    price: 33000,
    fuelType: 'Gasoline',
    seatingCapacity: 8,
    transmission: 'Automatic',
    image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=2000',
    description: 'The Kia Telluride is a midsize SUV with a spacious interior, comfortable ride, and seating for up to eight passengers.'
  },
  {
    id: 10,
    brand: 'Mazda',
    model: 'CX-5',
    year: 2023,
    price: 27000,
    fuelType: 'Gasoline',
    seatingCapacity: 5,
    transmission: 'Automatic',
    image: 'https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?q=80&w=2000',
    description: 'The Mazda CX-5 is a compact SUV with upscale interior, engaging driving dynamics, and sleek exterior styling.'
  },
  {
    id: 11,
    brand: 'Subaru',
    model: 'Outback',
    year: 2023,
    price: 28000,
    fuelType: 'Gasoline',
    seatingCapacity: 5,
    transmission: 'Automatic',
    image: 'https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?q=80&w=2000',
    description: 'The Subaru Outback is a versatile wagon with standard all-wheel drive, rugged capability, and spacious interior.'
  },
  {
    id: 12,
    brand: 'Volkswagen',
    model: 'Tiguan',
    year: 2023,
    price: 26000,
    fuelType: 'Gasoline',
    seatingCapacity: 7,
    transmission: 'Automatic',
    image: 'https://images.unsplash.com/photo-1589148938909-4d241c91320a?q=80&w=2000',
    description: 'The Volkswagen Tiguan is a compact SUV with optional third-row seating, refined interior, and smooth ride quality.'
  },
  {
    id: 13,
    brand: 'Nissan',
    model: 'Rogue',
    year: 2023,
    price: 27000,
    fuelType: 'Gasoline',
    seatingCapacity: 5,
    transmission: 'Automatic',
    image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?q=80&w=2000',
    description: 'The Nissan Rogue is a compact SUV with comfortable seating, good fuel economy, and advanced driver assistance features.'
  },
  {
    id: 14,
    brand: 'Jeep',
    model: 'Grand Cherokee',
    year: 2023,
    price: 38000,
    fuelType: 'Gasoline',
    seatingCapacity: 5,
    transmission: 'Automatic',
    image: 'https://images.unsplash.com/photo-1612911912304-22e2667d2222?q=80&w=2000',
    description: 'The Jeep Grand Cherokee is a midsize SUV with excellent off-road capability, upscale interior, and powerful engine options.'
  },
  {
    id: 15,
    brand: 'Lexus',
    model: 'RX',
    year: 2023,
    price: 48000,
    fuelType: 'Hybrid',
    seatingCapacity: 5,
    transmission: 'Automatic',
    image: 'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?q=80&w=2000',
    description: 'The Lexus RX is a luxury midsize SUV with a comfortable ride, hybrid efficiency, and premium interior materials.'
  },
  {
    id: 16,
    brand: 'Mercedes-Benz',
    model: 'GLC',
    year: 2023,
    price: 45000,
    fuelType: 'Gasoline',
    seatingCapacity: 5,
    transmission: 'Automatic',
    image: 'https://images.unsplash.com/photo-1549399542-7e8f2e928464?q=80&w=2000',
    description: 'The Mercedes-Benz GLC is a luxury compact SUV with elegant styling, refined interior, and advanced technology features.'
  },
  {
    id: 17,
    brand: 'Volvo',
    model: 'XC60',
    year: 2023,
    price: 43000,
    fuelType: 'Hybrid',
    seatingCapacity: 5,
    transmission: 'Automatic',
    image: 'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?q=80&w=2000',
    description: 'The Volvo XC60 is a luxury compact SUV with Scandinavian design, exceptional safety features, and available hybrid powertrain.'
  },
  {
    id: 18,
    brand: 'Porsche',
    model: 'Macan',
    year: 2023,
    price: 58000,
    fuelType: 'Gasoline',
    seatingCapacity: 5,
    transmission: 'Automatic',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2000',
    description: 'The Porsche Macan is a luxury compact SUV with sports car-like handling, powerful engines, and premium interior quality.'
  },
  {
    id: 19,
    brand: 'Land Rover',
    model: 'Range Rover Sport',
    year: 2023,
    price: 70000,
    fuelType: 'Gasoline',
    seatingCapacity: 5,
    transmission: 'Automatic',
    image: 'https://images.unsplash.com/photo-1539799139339-50c5fe1e2b1b?q=80&w=2000',
    description: 'The Range Rover Sport is a luxury midsize SUV with exceptional off-road capability, opulent interior, and powerful performance.'
  },
  {
    id: 20,
    brand: 'Acura',
    model: 'MDX',
    year: 2023,
    price: 48000,
    fuelType: 'Gasoline',
    seatingCapacity: 7,
    transmission: 'Automatic',
    image: 'https://images.unsplash.com/photo-1549399542-7e8f2e928464?q=80&w=2000',
    description: 'The Acura MDX is a luxury midsize SUV with three-row seating, sporty handling, and a well-appointed interior.'
  }
];

// Get unique brands, fuel types, and seating capacities for filters
export const getFilterOptions = () => {
  const brands = Array.from(new Set(cars.map(car => car.brand)));
  const fuelTypes = Array.from(new Set(cars.map(car => car.fuelType)));
  const seatingCapacities = Array.from(new Set(cars.map(car => car.seatingCapacity)));
  const priceRange = {
    min: Math.min(...cars.map(car => car.price)),
    max: Math.max(...cars.map(car => car.price))
  };
  
  return {
    brands,
    fuelTypes,
    seatingCapacities,
    priceRange
  };
};

// Filter and sort cars based on provided options
export const getCars = (
  page: number = 1,
  limit: number = 10,
  filters?: Partial<FilterOptions>,
  sort?: SortOption,
  searchQuery?: string
) => {
  let filteredCars = [...cars];
  
  // Apply search query
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredCars = filteredCars.filter(car => 
      car.brand.toLowerCase().includes(query) || 
      car.model.toLowerCase().includes(query)
    );
  }
  
  // Apply filters
  if (filters) {
    if (filters.brand) {
      filteredCars = filteredCars.filter(car => car.brand === filters.brand);
    }
    
    if (filters.minPrice) {
      filteredCars = filteredCars.filter(car => car.price >= filters.minPrice);
    }
    
    if (filters.maxPrice) {
      filteredCars = filteredCars.filter(car => car.price <= filters.maxPrice);
    }
    
    if (filters.fuelType) {
      filteredCars = filteredCars.filter(car => car.fuelType === filters.fuelType);
    }
    
    if (filters.seatingCapacity) {
      filteredCars = filteredCars.filter(car => car.seatingCapacity === filters.seatingCapacity);
    }
  }
  
  // Apply sorting
  if (sort) {
    filteredCars.sort((a, b) => {
      const fieldA = a[sort.field as keyof Car];
      const fieldB = b[sort.field as keyof Car];
      
      if (typeof fieldA === 'number' && typeof fieldB === 'number') {
        return sort.direction === 'asc' ? fieldA - fieldB : fieldB - fieldA;
      }
      
      if (typeof fieldA === 'string' && typeof fieldB === 'string') {
        return sort.direction === 'asc' 
          ? fieldA.localeCompare(fieldB) 
          : fieldB.localeCompare(fieldA);
      }
      
      return 0;
    });
  }
  
  // Calculate pagination
  const totalItems = filteredCars.length;
  const totalPages = Math.ceil(totalItems / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedCars = filteredCars.slice(startIndex, endIndex);
  
  return {
    cars: paginatedCars,
    pagination: {
      page,
      limit,
      totalItems,
      totalPages
    }
  };
};

// Get a single car by ID
export const getCarById = (id: number): Car | undefined => {
  return cars.find(car => car.id === id);
};