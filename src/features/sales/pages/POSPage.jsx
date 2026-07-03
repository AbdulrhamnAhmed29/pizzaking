import React, { useState, useRef, useMemo, useEffect, useCallback } from 'react';
import { useNotifications } from '../../../shared/context/NotificationContext';
import SearchAndFilters from '../components/SearchAndFilters';
import ProductCard from '../components/ProductGrid';
import ChildProductView from '../components/ChildProductView';
import CartSidebar from '../components/CartSidebar';
import { CheckoutModal } from '../../orders/components/CheckoutModal';
import { useOrderMutation } from "../../orders/hooks/useMutationOrders"
import { CustomToast } from '../../../ui/ToastComponent';
import { ReceiptDesign } from '../../orders/components/Receipt';
import { useReactToPrint } from 'react-to-print';
import { BULK, PRODUCT_TYPE } from '../../../constants/orderStatus';
import { useQueryClient } from '@tanstack/react-query';



const POSPage = () => {
  const queryClient = useQueryClient()

  //  products array 
  const { allProducts } = useNotifications();
  //  cart array 
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // search input 
  const [searchTerm, setSearchTerm] = useState('');
  //  filtration 
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [selectedSubFilter, setSelectedSubFilter] = useState("الكل");
  const [selectedParent, setSelectedParent] = useState(null);
  const [selectedAttribute, setSelectedAttribute] = useState(BULK.QUANTITY);
  const searchRef = useRef(null);
  const [toast, setToast] = useState({ show: false, message: "" });

  // reciept data 
  const [dataToPrint, setDataToPrint] = useState(null);
  const contentRef = useRef(null);
  const handlePrint = useReactToPrint({
    contentRef: contentRef,
  });

  //  Model 
  const [isModalOpen, setIsModalOpen] = useState(false);
  // create order function 
  const { createOrder, isLoading } = useOrderMutation();


  const playSaleSound = () => {
    const audio = new Audio('/sound/sell.mp3');
    audio.play().catch(err => console.log("الصوت محتاج تفاعل أولاً"));
  };


  const handleConfirm = (formData) => {

    createOrder({ orderData: formData, cart: cart },
      {
        onSuccess: async () => {
          playSaleSound();
          await queryClient.invalidateQueries({
            queryKey: ['products']
          });

          await queryClient.refetchQueries({
            queryKey: ['products'],
            type: 'active'
          });
          handlePrint()
          setCart([]);

          // setTimeout(() => {
          //   setDataToPrint(null);
          // }, 1000);
        },
        onError: (error) => {
          console.error("Error:", error);
        }
      }
    );
    setDataToPrint({
      orderData: formData,
      cart: [...cart]
    });
  };


  // _____________________________________________
  //  saved cart item in localStorage 
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  // _____________________________________________
  // --- Logic (Memoized) ---
  const categories = useMemo(() => {
    if (!allProducts) return ['الكل'];
    const cats = new Set(allProducts.map(p => p.category?.name).filter(Boolean));
    return ['الكل', ...Array.from(cats).sort()];
  }, [allProducts]);

  const subFilters = useMemo(() => {
    if (!allProducts) return [];
    const filteredByCat = selectedCategory === 'الكل' ? allProducts : allProducts.filter(p => p.category?.name === selectedCategory);
    const brands = new Set();
    filteredByCat.forEach(p => {
      const brandName = Array.isArray(p.brand) ? p.brand[0]?.name : p.brand?.name;
      if (brandName) brands.add(brandName);
    });
    return brands.size > 0 ? ['الكل', ...Array.from(brands).sort()] : [];
  }, [allProducts, selectedCategory]);

  const mainParents = useMemo(() => {
    if (!allProducts) return [];
    return allProducts.filter(product => {
      const isParent = !product.parent_id;
      const matchesCat = selectedCategory === 'الكل' || product.category?.name === selectedCategory;
      const matchesSearch = product?.name.toLowerCase().includes(searchTerm.toLowerCase()) || String(product.barcode || '').includes(searchTerm);
      const brandName = Array.isArray(product.brand) ? product?.brand[0]?.name : product?.brand?.name;
      const matchesSubFilter = selectedSubFilter === 'الكل' || brandName === selectedSubFilter;
      return isParent && matchesCat && matchesSearch && matchesSubFilter;
    });
  }, [allProducts, searchTerm, selectedCategory, selectedSubFilter]);

  // _____________________________________________


  // --- Category Change Effect ---
  useEffect(() => {
    setSelectedParent(null);
    setSelectedAttribute('الكل');

  }, [selectedCategory, selectedSubFilter]);

  const childProducts = useMemo(() => {
    if (!selectedParent || !allProducts) return [];
    return allProducts.filter(p =>
      p.parent_id === selectedParent.documentId &&
      (selectedAttribute === 'الكل' || p.attribute_sets?.[0]?.name === selectedAttribute)
    );
  }, [selectedParent, allProducts, selectedAttribute]);

  const availableAttributes = useMemo(() => {
    if (!selectedParent || !allProducts) return [];
    const children = allProducts.filter(p => p.parent_id === selectedParent.documentId);
    const attrs = new Set(children.map(c => c.attribute_sets?.[0]?.name).filter(Boolean));
    return ['الكل', ...Array.from(attrs)];
  }, [selectedParent, allProducts]);

  const cartTotal = useMemo(() => cart.reduce((s, i) => s + (Number(i.cost_price) * i.quantity), 0), [cart]);

  const addToCart = useCallback((product) => {
    setCart(prev => {
      const existing = prev.find(item => item.documentId === product.documentId);
      const qtyInCart = existing ? existing.quantity : null;
      const productType = product.type;
      const isProduct = productType === PRODUCT_TYPE.PRODUCT;
      const parentProduct = allProducts.find(p => p.documentId === product.parent_id);

      const isBulk = product.attribute_sets?.[0]?.name === BULK.BULK;



      if (isProduct && !isBulk) {
        if (qtyInCart + 1 > Number(product.quantity || 0)) {
          setToast({
            show: true,
            message: `عفواً، لا يوجد رصيد كافٍ من ${product.name} (المتوفر: ${product.quantity})`,
            type: 'error'
          });
          return prev;
        }
      }
      if (isBulk) {
        const bulkQty = Number(parentProduct?.bulk_quantity || 0);
        console.log("is bulk is work ");
        if (bulkQty <= 0) {
          console.log("is bulk ");

          setToast({
            show: true,
            message: `عفواً، لا يوجد رصيد كافٍ من ${product.name}`,
            type: 'error'
          });
          return prev;
        }
      }


      if (existing) {
        return prev.map(item =>
          item.documentId === product.documentId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      setToast({ show: true, message: `تم إضافة ${product.name} للسلة` });
      return [...prev, { ...product, quantity: 1 }];
    });
  }, [allProducts]);

  const scannedProduct = useMemo(() => {
    if (!searchTerm || !allProducts) return null;

    return allProducts.find(p => String(p.barcode) === searchTerm);
  }, [searchTerm, allProducts]);

  useEffect(() => {
    if (scannedProduct) {
      addToCart(scannedProduct);

      const timer = setTimeout(() => {
        setSearchTerm('');
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [scannedProduct, addToCart]);

  // --- Effects ---
  useEffect(() => {
    const keepFocus = () => searchRef.current?.focus();
    keepFocus();
    document.addEventListener('click', keepFocus);
    return () => document.removeEventListener('click', keepFocus);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 text-right" dir="rtl">
      <CustomToast
        isOpen={toast.show}
        message={toast.message}
        onClose={() => setToast({ ...toast, show: false })}
      />
      <div className="flex  gap-2 overflow-hidden">

        {/* right side (products)  */}
        <div className="flex-1 me-[395px] flex flex-col p-1 ">
          <SearchAndFilters
            isModalOpen={isModalOpen}
            searchTerm={searchTerm} setSearchTerm={setSearchTerm} searchRef={searchRef}
            categories={categories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
            subFilters={subFilters} selectedSubFilter={selectedSubFilter} setSelectedSubFilter={setSelectedSubFilter}
          />

          <div className="flex-1 ">
            {selectedParent ? (
              <ChildProductView
                selectedParent={selectedParent} setSelectedParent={setSelectedParent}
                childProducts={childProducts} availableAttributes={availableAttributes}
                selectedAttribute={selectedAttribute} setSelectedAttribute={setSelectedAttribute}
                addToCart={addToCart}
              />
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-6">
                {mainParents.map(product => (
                  <ProductCard key={product.id} product={product} onSelect={setSelectedParent} />
                ))}
              </div>
            )}
          </div>
        </div>


        <div className='fixed left-2 top-35'>
          {/* left side (cart)  */}
          <CartSidebar
            cart={cart}
            onOpen={() => setIsModalOpen(true)}
            isOpen={isModalOpen}
            setCart={setCart}
            cartTotal={cartTotal} />
        </div>

      </div>

      {/* Checkout Model  */}
      <CheckoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        totalAmount={cartTotal}
        isLoading={isLoading}
        setCart={setCart}
      />

      {dataToPrint && (
        <div className=''>
          <ReceiptDesign
            ref={contentRef}
            orderData={dataToPrint.orderData}
            cart={dataToPrint.cart}
          />
        </div>
      )}
    </div>
  );
};

export default POSPage;