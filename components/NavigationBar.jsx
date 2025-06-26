import React, { useState, createContext, useContext } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { FiShoppingBag } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

export const CategoryContext = createContext();
export const useCategory = () => useContext(CategoryContext);

const NavigationBar = () => {
  const { activeCategory, setActiveCategory, cartItems = [], setCartItems, currency, setCurrency } = useCategory();
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [miniCartOpen, setMiniCartOpen] = useState(false);
  const navigate = useNavigate();

  const currencySymbols = { USD: '$', EUR: '€', JPY: '¥' };
  const rates = { USD: 1, EUR: 0.92, JPY: 155 };
  const getSymbol = (cur) => currencySymbols[cur] || '$';
  const getConverted = (price) => (price * (rates[currency] || 1));

  const total = cartItems.reduce((sum, item) => sum + getConverted(item.price) * item.quantity, 0);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

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
          font-family: 'Raleway', sans-serif !important;
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 1440px;
          height: 80px;
          padding: 0 52px;
          background: #ffffff;
          position: relative;
        }
        .nav-links {
          display: flex;
          gap: 24px;
          margin-left: 40px;
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
          margin-right: 40px;
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
          top: 30px;
          left: -25px;
          width: 114px;
          height: 169px;
          background: white;
          box-shadow: 0px 0px 36px rgba(168, 172, 176, 0.19);
          backdrop-filter: blur(35px);
          z-index: 10;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .currency-dropdown div {
          font-family: 'Raleway', sans-serif !important;
          font-weight: 400;
          font-size: 18px;
          line-height: 160%;
          letter-spacing: 0;
          text-align: center;
          width: 114px;
          height: 45px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          cursor: pointer;
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
          top: 30px;
          left: 50%;
          transform: translateX(-80%);
          width: 325px;
          height: 625px;
          background: #ffffff;
          padding: 32px 16px 32px 16px;
          box-shadow: 0px 0px 36px rgba(168, 172, 176, 0.19);
          display: flex;
          flex-direction: column;
          gap: 32px;
          z-index: 20;
          font-family: 'Raleway', sans-serif !important;
          font-size: 13px;
        }
        .mini-cart-inner {
          width: 293px;
          height: 486px;
          display: flex;
          flex-direction: column;
          gap: 32px;
          margin: -12px auto 0 auto;
          flex: 1 1 auto;
          overflow-y: auto;
          overflow-x: hidden;
          padding-right: 20px;
          box-sizing: content-box;
        }
        .mini-cart h4 {
          margin: 0 0 5px 0;
          text-align: left;
          font-size: 1.1em;
          font-weight: normal;
          font-family: 'Raleway', sans-serif !important;
        }
        .mini-cart h4 .bag-title {
          font-weight: bold;
          font-family: 'Raleway', sans-serif !important;
        }
        .cart-items {
          display: flex;
          flex-direction: column;
          gap: 16px;
          font-size: 1em;
          font-family: 'Raleway', sans-serif !important;
        }
        .cart-item {
          display: flex;
          flex-direction: row;
          width: 293px;
          height: 162px;
          justify-content: space-between;
          align-items: center;
          gap: 8px;
          font-family: 'Raleway', sans-serif !important;
        }
        .cart-item img {
          width: 121px;
          height: 162px;
          object-fit: contain;
          background: #fff;
          display: block;
          margin: 0 auto;
          font-family: 'Raleway', sans-serif !important;
        }
        .cart-total {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          width: 289px;
          height: 28px;
          font-weight: bold;
          margin-top: auto;
          padding-top: 6px;
          font-family: 'Raleway', sans-serif !important;
          margin-left: auto;
          margin-right: auto;
        }
        .cart-total-label {
          text-align: left;
          font-family: 'Raleway', sans-serif !important;
        }
        .cart-total-amount {
          text-align: right;
          font-family: 'Raleway', sans-serif !important;
        }
        .cart-buttons {
          display: flex;
          gap: 12px;
          width: 292px;
          height: 43px;
          font-family: 'Raleway', sans-serif !important;
          margin-top: auto;
          margin-left: auto;
          margin-right: auto;
        }
        .view-bag, .checkout {
          width: 140px;
          height: 43px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          font-weight: 500;
          font-family: 'Raleway', sans-serif !important;
          text-align: center;
          line-height: 43px;
          padding: 0;
          text-transform: none;
        }
        .view-bag {
          border: 1px solid #1d1f22;
          background: #fff;
          color: #1d1f22;
          font-weight: 500;
          font-size: 16px;
          font-family: 'Raleway', sans-serif !important;
          cursor: pointer;
          box-shadow: none;
          text-transform: none;
        }
        .checkout {
          background: #5ece7b;
          color: #fff;
          border: none;
          font-weight: 500;
          font-size: 16px;
          font-family: 'Raleway', sans-serif !important;
          cursor: pointer;
          box-shadow: none;
          text-transform: none;
        }
        .cart-item-details {
          width: 136px;
          height: 162px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          text-align: left;
          font-size: 16px;
          line-height: 1.6;
          font-weight: 400;
          letter-spacing: 0px;
          align-items: center;
          font-family: 'Raleway', sans-serif !important;
        }
        .item-name {
          color: #1d1f22;
          font-family: 'Raleway', sans-serif !important;
          font-size: 16px;
          font-weight: 400;
          line-height: 1.6;
          text-align: left;
          letter-spacing: 0px;
          margin: 0;
        }
        .item-price {
          color: #1d1f22;
          font-family: 'Raleway', sans-serif !important;
          font-size: 16px;
          font-weight: bold;
          line-height: 1.6;
          letter-spacing: 0px;
          align-self: flex-start;
          margin-top: 0;
          width: 289px;
          height: 28px;
          margin-left: auto;
          margin-right: auto;
        }
        .item-size-label {
          margin-top: 0;
          font-size: 16px;
          color: #1d1f22;
          letter-spacing: 0px;
          font-family: 'Raleway', sans-serif !important;
          font-weight: 400;
          line-height: 1.6;
          align-self: flex-start;
        }
        .item-size-selector {
          display: flex;
          flex-direction: row;
          gap: 8px;
          width: auto;
          height: 24px;
          align-items: center;
          margin-top: 0;
          align-self: flex-start;
        }
        .size-rect {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          border: 1px solid #1d1f22;
          background: #fff;
          color: #1d1f22;
          font-size: 16px;
          cursor: pointer;
          text-transform: uppercase;
          transition: all 0.2s;
          font-family: 'Raleway', sans-serif !important;
        }
        .size-rect.selected {
          background: #1d1f22;
          color: #fff;
          font-family: 'Raleway', sans-serif !important;
        }
        .cart-item-controls {
          width: 24px;
          height: 162px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          gap: 0;
          margin: 0;
          font-family: 'Raleway', sans-serif !important;
        }
        .qty-btn {
          width: 24px;
          height: 24px;
          border: 1px solid #1d1f22;
          background: #fff;
          color: #1d1f22;
          font-size: 0.9em;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s, color 0.2s;
          font-family: 'Raleway', sans-serif !important;
        }
        .qty-btn:hover {
          background: #1d1f22;
          color: #fff;
        }
        .item-qty {
          font-size: 0.9em;
          color: #1d1f22;
          margin: 6px 0;
          font-family: 'Raleway', sans-serif !important;
        }
        .mini-cart-close-btn {
          position: absolute;
          top: 6px;
          right: 10px;
          background: none;
          border: none;
          font-size: 18px;
          color: #888;
          cursor: pointer;
          z-index: 21;
        }
        .mini-cart-close-btn:hover {
          color: #222;
        }
        .cart-global-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(57, 55, 72, 0.22);
          z-index: 10;
          pointer-events: auto;
        }
      `}</style>
      {miniCartOpen && (
        <div
          className="cart-global-overlay"
          style={{
            zIndex: 10,
            pointerEvents: 'auto'
          }}
        ></div>
      )}
      <header className="nav-header" style={{ position: 'relative', zIndex: 30 }}>
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
            <span className="currency-main">{getSymbol(currency)} <span className="arrow">{currencyOpen ? 'ˆ' : 'ˇ'}</span></span>
            {currencyOpen && (
              <div className="currency-dropdown">
                <div onClick={() => handleCurrencySelect('USD')}><span className="currency-symbol">$</span>&nbsp;USD</div>
                <div onClick={() => handleCurrencySelect('EUR')}><span className="currency-symbol">€</span>&nbsp;EUR</div>
                <div onClick={() => handleCurrencySelect('JPY')}><span className="currency-symbol">¥</span>&nbsp;JPY</div>
              </div>
            )}
          </div>
          <div className="cart-icon" onClick={toggleCart}>
            <FaShoppingCart />
            <span className="cart-count">{cartCount}</span>
          </div>
          {miniCartOpen && (
            <div className="mini-cart">
              {cartItems.length === 0 ? null : (
                <h4><span className="bag-title">My Bag,</span> {cartCount} items</h4>
              )}
              <div className="mini-cart-inner">
                {cartItems.length === 0 ? (
                  <div style={{ textAlign: 'center', color: '#888', padding: '32px 0', fontSize: 18 }}>
                    Your cart is empty.
                  </div>
                ) : (
                  <>
                    <div className="cart-items">
                      {cartItems.map((item, idx) => (
                        <div key={idx} className="cart-item">
                          <div className="cart-item-details">
                            <div className="item-name">{item.name}</div>
                            <span className="item-price">{getSymbol(currency)}{getConverted(item.price).toFixed(2)}</span>
                            <div className="item-size-label">Size:</div>
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
                            <button className="qty-btn" onClick={() => setCartItems(cartItems.map((ci, i) => {
                              if (i === idx) {
                                if (ci.quantity > 1) return { ...ci, quantity: ci.quantity - 1 };
                                return null;
                              }
                              return ci;
                            }).filter(Boolean))}>-</button>
                          </div>
                          <img src={item.image} alt={item.name} />
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
              {cartItems.length > 0 && (
                <div className="cart-total">
                  <span className="cart-total-label">Total:</span>
                  <span className="cart-total-amount">{getSymbol(currency)}{total.toFixed(2)}</span>
                </div>
              )}
              <div className="cart-buttons">
                <button
                  className="view-bag"
                  onClick={() => {
                    setMiniCartOpen(false);
                    navigate('/cart');
                  }}
                >
                  VIEW BAG
                </button>
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
