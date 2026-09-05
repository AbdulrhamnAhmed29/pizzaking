import { useMutation, useQueryClient } from '@tanstack/react-query'
import productService from '../services/Services'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

export const useMutationProduct = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  //1- add product function 
  // _______________________
  const addMutation = useMutation({
    mutationFn: async (payload) => {

      const parentPayload = {
        data: {
          name: payload.name,
          category: payload.category_id,
          brand: payload.brand_id,
          bulk_quantity: payload.bulk_quantity,
          type: payload.product_type
        },
      }
        ;
      const parentResponse = await productService.addProduct(parentPayload);
      const parentId = parentResponse.documentId;
      const productName = parentResponse.name;


      const childrenPromises = await payload.variants.map((v) => {
        const childPayload = {
          data: {
            name: `${productName}`,
            attribute_sets: v.attributeSet,
            attributes: v.attribute_id,
            barcode: v.barcode,
            parent_id: parentId,
            buying_price: v.buying_price,
            cost_price: v.cost_price,
            quantity: v.quantity,
            type: payload.product_type
          }
        }

        return productService.addProduct(childPayload)
      });

      return Promise.all(childrenPromises)
    },



    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      Swal.fire({
        icon: 'success',
        title: 'نجح!',
        text: 'تم إضافة المنتج بنجاح',
        confirmButtonColor: '#D4AF37',
      })
      // navigate("/products");

    },
    onError: (error) => {
      Swal.fire({
        icon: 'error',
        title: 'خطأ!',
        text: error.response?.data?.message,
        confirmButtonColor: '#D4AF37',
      })
    },
  });

  //2- update product function 
  // ________________________
  const updateMutation = useMutation({
    mutationFn: async ({ id, payload }) => {

      // 1- parent update
      const parentUpdate = {
        data: {
          name: payload.name,
          category: payload.category_id,
          brand: payload.brand_id,
          bulk_quantity: payload.bulk_quantity,
          type: payload.product_type,
        },
      };

      // await to take this id 
      const parentResponse = await productService.updateProduct(id, parentUpdate);
      console.log(parentResponse);
      const parentId = id;
      const productName = payload.name;

      // 2-(Variants)
      const childrenPromise = payload.variants.map((v) => {
        const childPayload = {
          data: {
            name: productName,
            attribute_sets: v.attributeSet,
            attributes: v.attribute_id,
            barcode: v.barcode,
            parent_id: parentId,
            buying_price: v.buying_price,
            cost_price: v.cost_price,
            quantity: v.quantity,
            type: payload.product_type

          }
        };

        // if find this product edit it else add it 
        if (v.documentId) {
          return productService.updateProduct(v.documentId, childPayload);
        } else {
          return productService.addProduct(childPayload);
        }
      });

      return await Promise.all(childrenPromise);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      Swal.fire({
        icon: 'success',
        title: 'نجح!',
        text: 'تم تحديث المنتج بنجاح',
        confirmButtonColor: '#D4AF37'
      });
            navigate("/products");


    },
    onError: (error) => {
      console.log(error);

      Swal.fire({
        icon: 'error',
        title: 'خطأ!',
        text: error.response?.data?.message,
        confirmButtonColor: '#D4AF37',
      });
    },
  });
  // 3- delete functiuon 
  // ______________________
  const deleteMutation = useMutation({
    mutationFn: (id) => productService.deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      Swal.fire({
        icon: 'success',
        title: 'نجح!',
        text: 'تم حذف المنتج بنجاح',
        confirmButtonColor: '#D4AF37',
      })
    },
    onError: (error) => {
      Swal.fire({
        icon: 'error',
        title: 'خطأ!',
        text: error.response?.data?.message || 'حدث خطأ أثناء حذف المنتج',
        confirmButtonColor: '#D4AF37',
      })
    },
  });

  return {
    mutate: addMutation.mutate,
    update: updateMutation.mutate,
    deleteMutation,
  }
}
