import React, { useState, createContext, useContext } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { FiShoppingBag } from 'react-icons/fi';

export const CategoryContext = createContext();
export const useCategory = () => useContext(CategoryContext);

const NavigationBar = () => {
  const { activeCategory, setActiveCategory } = useCategory();
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [miniCartOpen, setMiniCartOpen] = useState(false);
  const [currency, setCurrency] = useState('$');
  const [cartItems, setCartItems] = useState([
    { name: 'Apollo Running Short', price: 50, quantity: 1, size: 'S', image: '/short.png' },
    { name: 'Jupiter Wayfarer', price: 75, quantity: 2, size: 'M', image: '/sunglasses.png' }
  ]);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  const handleCurrencySelect = (value) => {
    setCurrency(value);
    setCurrencyOpen(false);
  };

  const toggleCurrency = () => {
    setCurrencyOpen((prev) => !prev);
    setMiniCartOpen(false);
  };

  const toggleCart = () => {
    setMiniCartOpen((prev) => !prev);
    setCurrencyOpen(false);
  };

  return (
    <>
      <style>{`
        .nav-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 1440px;
          height: 80px;
          padding: 0 32px;
          background: #ffffff;
          position: relative;
        }
        .nav-links {
          display: flex;
          gap: 24px;
        }
        .nav-link {
          cursor: pointer;
          padding-bottom: 8px;
          color: #1d1f22;
          font-weight: 400;
        }
        .nav-link.active {
          color: #5ece7b;
          border-bottom: 2px solid #5ece7b;
        }
        .logo {
          font-size: 24px;
          color: #5ece7b;
        }
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 20px;
          position: relative;
        }
        .currency-selector {
          cursor: pointer;
          position: relative;
        }
        .currency-main {
          font-size: 1.3em;
          vertical-align: middle;
        }
        .currency-dropdown {
          position: absolute;
          top: 65px;
          left: -25px;
          width: 114px;
          height: 169px;
          background: white;
          box-shadow: 0px 0px 36px rgba(168, 172, 176, 0.19);
          backdrop-filter: blur(35px);
          z-index: 10;
          display: flex;
          flex-direction: column;
        }
        .currency-dropdown div {
          padding: 18px;
          cursor: pointer;
          font-size: 14px;
        }
        .currency-dropdown div:hover {
          background: #f0f0f0;
        }
        .cart-icon {
          position: relative;
          cursor: pointer;
        }
        .cart-icon svg {
          font-size: 1.2em;
          vertical-align: middle;
          position: relative;
          top: 2px;
        }
        .cart-count {
          position: absolute;
          top: -8px;
          right: -10px;
          background: black;
          color: white;
          border-radius: 50%;
          padding: 2px 6px;
          font-size: 10px;
        }
        .mini-cart {
          position: absolute;
          top: 78px;
          left: -300px;
          width: 325px;
          background: #ffffff;
          padding: 32px 16px;
          box-shadow: 0px 0px 36px rgba(168, 172, 176, 0.19);
          display: flex;
          flex-direction: column;
          gap: 32px;
          z-index: 20;
        }
        .mini-cart h4 {
          margin: 0 0 5px 0;
          text-align: left;
          font-size: 1.9em;
          font-weight: normal;
        }
        .mini-cart h4 .bag-title {
          font-weight: bold;
        }
        .cart-items {
          display: flex;
          flex-direction: column;
          gap: 32px;
          font-size: 1.1em;
        }
        .cart-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 30px;
        }
        .cart-item img {
          width: 100px;
          height: auto;
        }
        .cart-total {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          width: 100%;
          font-weight: bold;
          margin-top: auto;
          padding-top: 6px;
        }
        .cart-total-label {
          text-align: left;
        }
        .cart-total-amount {
          text-align: right;
        }
        .cart-buttons {
          display: flex;
          gap: 12px;
        }
        .view-bag {
          border: 1px solid #1d1f22;
          background: white;
          padding: 8px 16px;
          cursor: pointer;
        }
        .checkout {
          background: #5ece7b;
          color: white;
          border: none;
          padding: 8px 16px;
          cursor: pointer;
        }
        .cart-item-details {
          text-align: left;
          display: flex;
          flex-direction: column;
          gap: 3px;
          font-size: 1.2em;
          flex: 1;
        }
        .item-name {
          color: #1d1f22;
        }
        .item-price {
          color: #1d1f22;
        }
        .item-size-label {
          margin-top: 5px;
          font-size: 0.7em;
          color: #1d1f22;
          letter-spacing: 1.5px;
        }
        .item-size-selector {
          display: flex;
          gap: 6px;
          margin: 0px 0 0px 0;
        }
        .size-rect {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
          border: 1px solid #1d1f22;
          background: #fff;
          color: #1d1f22;
          font-size: 0.65em;
          cursor: pointer;
          text-transform: uppercase;
          transition: all 0.2s;
        }
        .size-rect.selected {
          background: #1d1f22;
          color: #fff;
        }
        .cart-item-controls {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 40px;
          margin: 0 6px;
        }
        .qty-btn {
          width: 18px;
          height: 18px;
          border: 1px solid #1d1f22;
          background: #fff;
          color: #1d1f22;
          font-size: 1.1em;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s, color 0.2s;
        }
        .qty-btn:hover {
          background: #1d1f22;
          color: #fff;
        }
        .item-qty {
          font-size: 1em;
          color: #1d1f22;
          margin: 10px 0;
        }
      `}</style>
      <header className="nav-header">
        <nav className="nav-links">
          {['WOMEN', 'MEN', 'KIDS'].map((cat) => (
            <span
              key={cat}
              className={`nav-link ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => handleCategoryClick(cat)}
            >
              {cat}
            </span>
          ))}
        </nav>

        <div className="logo">
          <FiShoppingBag className="green-bag" />
        </div>

        <div className="nav-actions">
          <div className="currency-selector" onClick={toggleCurrency}>
            <span className="currency-main">{currency} <span className="arrow">{currencyOpen ? 'ˆ' : 'ˇ'}</span></span>
            {currencyOpen && (
              <div className="currency-dropdown">
                <div onClick={() => handleCurrencySelect('$')}><span className="currency-symbol">$</span> USD</div>
                <div onClick={() => handleCurrencySelect('€')}><span className="currency-symbol">€</span> EUR</div>
                <div onClick={() => handleCurrencySelect('¥')}><span className="currency-symbol">¥</span> JPY</div>
              </div>
            )}
          </div>

          <div className="cart-icon" onClick={toggleCart}>
            <FaShoppingCart />
            <span className="cart-count">{cartItems.length}</span>
          </div>

          {miniCartOpen && (
            <div className="mini-cart">
              <h4><span className="bag-title">My Bag,</span> {cartItems.length} items</h4>
              <div className="cart-items">
                {cartItems.map((item, idx) => (
                  <div key={idx} className="cart-item">
                    <div className="cart-item-details">
                      <div className="item-name">{item.name}</div>
                      <div className="item-price">${item.price.toFixed(2)}</div>
                      <div className="item-size-label">SIZE:</div>
                      <div className="item-size-selector">
                        {['XS', 'S', 'M', 'L'].map((size) => (
                          <span
                            key={size}
                            className={`size-rect${item.size === size ? ' selected' : ''}`}
                          >
                            {size}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="cart-item-controls">
                      <button className="qty-btn" onClick={() => setCartItems(cartItems.map((ci, i) => i === idx ? { ...ci, quantity: ci.quantity + 1 } : ci))}>+</button>
                      <div className="item-qty">{item.quantity}</div>
                      <button className="qty-btn" onClick={() => setCartItems(cartItems.map((ci, i) => i === idx && ci.quantity > 1 ? { ...ci, quantity: ci.quantity - 1 } : ci))}>-</button>
                    </div>
                    <img src={item.image} alt={item.name} />
                  </div>
                ))}
              </div>
              <div className="cart-total">
                <span className="cart-total-label">Total:</span>
                <span className="cart-total-amount">${total.toFixed(2)}</span>
              </div>
              <div className="cart-buttons">
                <button className="view-bag">VIEW BAG</button>
                <button className="checkout">CHECK OUT</button>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default NavigationBar;
