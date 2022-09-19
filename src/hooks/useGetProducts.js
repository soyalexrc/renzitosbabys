import {useState, useEffect} from 'react';
import axios from "../utils/axios";

export default function useGetProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});

  async function getByCategory(data) {
    try {
      setLoading(true)
      const response = await axios.post('/products/getByCategory', data)
      if (response.data.success) {
        setProducts(response.data)
      }
    } catch(e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  async function getProductById(id) {
    try {
      setLoading(true)
      const response = await axios.get(`/products/${id}`)
      if (response.data.success) {
        setCurrentProduct(response.data.data)
      }
    } catch(e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  return {products, loading, getByCategory, currentProduct, getProductById};
}
