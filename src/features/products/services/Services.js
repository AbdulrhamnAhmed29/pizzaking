import BaseApi from '../../../api/baseApi';
import qs from 'qs';


const productService = {
  getProducts: async (searchTerm, page, isFiltered = true) => {
    const filters = {};
    if (searchTerm && searchTerm.trim() !== "") {
      filters.$or = [
        { name: { $contains: searchTerm } },
        { barcode: { $contains: searchTerm } } 
      ];
    }
    const query = qs.stringify({
      filters: Object.keys(filters).length > 0 ? filters : undefined,
      populate: '*',
      sort: ['createdAt:desc'],
      pagination: {
        limit:2000,
      },
    }, { encodeValuesOnly: true });
    const res = await BaseApi.getAll(`/products?${query}`);
    return res;
  },
  GetProductById: async (id) => {
    const { data } = await BaseApi.getById("/products", id);
    return data
  },
  addProduct: async (payload) => {
    const { data } = await BaseApi.create('/products?=*', payload);
    return data
  },
  updateProduct: async (id, payload) => {
    const { data } = await BaseApi.update(`/products`, id, payload)
    return data
  },
  deleteProduct: async (id) => {
    const { data } = await BaseApi.remove(`/products`, id)
    return data
  },
}
export default productService
