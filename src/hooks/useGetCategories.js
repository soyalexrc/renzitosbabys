import {useState, useEffect} from 'react';
import axios from '../utils/axios'

export default function useGetCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getCategories() {
    try {
      setLoading(true)
      const response = await axios.post('/categories', { search: '' })
      console.log(response.data);
      if (response.data.success) {
        setCategories(response.data.data)
      }
    } catch(e) {
      console.log(e);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getCategories()
  }, [])

  return {categories, loading, getCategories};
}
