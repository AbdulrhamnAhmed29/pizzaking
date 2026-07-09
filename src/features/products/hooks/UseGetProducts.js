import { useQuery } from '@tanstack/react-query'
import productService from '../services/Services'
import { useState } from 'react';

export const useGetProducts = (id) => {
  const [searchTerm, setSearchTerm] = useState();
  // 1- Get all products 
  const { data = [], isLoading, error, refetch, } = useQuery({
    queryKey: ['products', searchTerm],
    queryFn: () => productService.getProducts(searchTerm),
  
  });

  return {
    // get all products data 
    data,
    isLoading,
    error,
    refetch,
    // for filtration by name 
    setSearchTerm,
    searchTerm,
  }
}
