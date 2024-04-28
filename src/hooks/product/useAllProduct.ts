import { useEffect, useState } from 'react';
import api from '../../api/Api';
export type ProductType = {
  id: number;
  imgUrl: string;
  name: string;
  price: number;
  categoryId: number;
};
export const useAllProduct = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const responseProduct = await api.get('/product/all');
        setProducts(responseProduct.data.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);
  return products;
};
