import './App.css';
import ProductListingPage from './ProductListingPage.jsx';
import ProductDetailPage from './ProductDetailPage.jsx';
import NavigationBar, { CategoryContext } from './NavigationBar.jsx';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import CartPage from './CartPage.jsx';
import ShippingInfoPage from './ShippingInfoPage.jsx';
import ShippingMethodPage from './ShippingMethodPage.jsx';
import PaymentConfirmationPage from './PaymentConfirmationPage.jsx';

const CategoryProvider = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(() => {
    if (location.pathname.startsWith('/men')) return 'MEN';
    if (location.pathname.startsWith('/kids')) return 'KIDS';
    return 'WOMEN';
  });

  const [cartItems, setCartItems] = useState([]); 

  const [currency, setCurrency] = useState('USD');

  const handleSetCategory = (cat) => {
    setActiveCategory(cat);
    if (cat === 'WOMEN') navigate('/');
    else navigate(`/${cat.toLowerCase()}`);
  };

  return (
    <CategoryContext.Provider value={{
      activeCategory,
      setActiveCategory: handleSetCategory,
      cartItems,
      setCartItems,
      currency,
      setCurrency
    }}>
      {children}
    </CategoryContext.Provider>
  );
};

function App() {
  return (
    <div className="App raleway-font">
      <BrowserRouter>
        <CategoryProvider>
          <NavigationBar />
          <Routes>
            <Route path="/" element={<ProductListingPage />} />
            <Route path="/men" element={<ProductListingPage />} />
            <Route path="/kids" element={<ProductListingPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/shippinginfo" element={<ShippingInfoPage />} />
            <Route path="/shipping" element={<ShippingMethodPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/confirmation" element={<PaymentConfirmationPage />} />
          </Routes>
        </CategoryProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
