import React, { useState } from 'react';
import { useCategory } from './NavigationBar';
import MenBlackShirt2 from './images/MenBlackShirt2.jpg';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { cartItems = [], setCartItems, currency } = useCategory();
  const navigate = useNavigate();

  // For demo: each cart item uses an array of the same image (replace with real images if available)
  const getImages = (item) =>
    item.id === 18 ? [item.image, MenBlackShirt2, item.image] : [item.image, item.image, item.image];
  const [imageIndexes, setImageIndexes] = useState(cartItems.map(() => 0));
  const [animDirections, setAnimDirections] = useState(cartItems.map(() => ''));

  const currencySymbols = { USD: '$', EUR: '€', JPY: '¥' };
  const rates = { USD: 1, EUR: 0.92, JPY: 155 };
  const getSymbol = (cur) => currencySymbols[cur] || '$';
  const getConverted = (price) => (price * (rates[currency] || 1));

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + getConverted(item.price) * item.quantity, 0);

  const handleQtyChange = (idx, delta) => {
    setCartItems(prev => {
      const updated = prev.map((ci, i) =>
        i === idx ? { ...ci, quantity: ci.quantity + delta } : ci
      );
      return updated.filter(ci => ci.quantity > 0);
    });
  };

  const handleContinue = () => {
    navigate('/shippinginfo');
  };

  const handleImageChange = (idx, dir) => {
    setAnimDirections(prev => {
      const newDirs = [...prev];
      newDirs[idx] = dir === 1 ? 'slide-right' : 'slide-left';
      return newDirs;
    });
    setTimeout(() => {
      setImageIndexes(prev => {
        const images = getImages(cartItems[idx]);
        const newIndexes = [...prev];
        const len = images.length;
        newIndexes[idx] = (newIndexes[idx] + dir + len) % len;
        return newIndexes;
      });
      setTimeout(() => {
        setAnimDirections(prev => {
          const newDirs = [...prev];
          newDirs[idx] = '';
          return newDirs;
        });
      }, 300);
    }, 10);
  };

  return (
    <>
      <style>{`
        .cart-main {
          font-family: 'Raleway', sans-serif !important;
          width: 100vw;
          min-width: 0;
          min-height: 100vh;
          margin: 40px 0 0 0;
          padding: 0 80px 120px 80px;
          overflow-y: auto;
          overflow-x: hidden;
          box-sizing: border-box;
        }
        .cart-title {
          font-weight: 700;
          font-size: 22px;
          margin-bottom: 32px;
          letter-spacing: 0.5px;
          text-align: left;
        }
        .cart-divider {
          border-top: 1px solid #e5e5e5;
          margin-bottom: 24px;
        }
        .cart-item-row {
          display: flex;
          align-items: flex-start;
          border-bottom: 1px solid #e5e5e5;
          padding: 28px 0 18px 0;
          justify-content: flex-start;
        }
        .cart-item-details-main {
          flex: 2;
          min-width: 0;
          margin-left: 0;
          margin-right: 24px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .cart-item-name {
          font-weight: 700;
          font-size: 22px;
          margin-bottom: 2px;
          letter-spacing: 0.2px;
          width: 292px;
          height: 27px;
          line-height: 27px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          text-align: left;
        }
        .cart-item-desc {
          color: #1d1f22;
          font-size: 15px;
          margin-bottom: 10px;
          font-weight: 400;
        }
        .cart-item-price {
          font-weight: 700;
          font-size: 16px;
          margin: 8px 0 12px 0;
        }
        .cart-size-label {
          font-size: 12px;
          margin: 0 0 4px 0;
          font-weight: 500;
          color: #1d1f22;
        }
        .cart-size-selector {
          display: flex;
          gap: 8px;
          margin-bottom: 10px;
          border-radius: 4px;
          padding: 0;
          width: 276px;
          height: 45px;
          align-items: center;
          background: none;
        }
        .cart-size-btn {
          border: 1px solid #1d1f22;
          background: #fff;
          color: #1d1f22;
          padding: 0;
          width: 38px;
          height: 32px;
          font-size: 13px;
          border-radius: 0;
          cursor: pointer;
          font-family: 'Raleway', sans-serif !important;
          font-weight: 400;
          transition: background 0.2s, color 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .cart-size-btn.selected {
          background: #1d1f22;
          color: #fff;
        }
        .cart-qty-controls {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 0 24px;
          gap: 100px; 
        }
        .cart-qty-btn {
          width: 45px;
          height: 45px;
          border: 1.5px solid #1d1f22;
          background: #fff;
          font-size: 32px;
          cursor: pointer;
          font-family: 'Raleway', Arial, sans-serif !important;
          font-weight: normal !important;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1d1f22;
          transition: background 0.2s, color 0.2s;
          line-height: 1;
          letter-spacing: 2px;
        }
        .cart-qty-btn:active {
          background: #1d1f22;
          color: #fff;
        }
        .cart-qty-value {
          font-size: 22px;
          font-weight: 700;
          color: #1d1f22;
        }
        .cart-item-image {
          min-width: 200px;
          min-height: 288px;
          width: 200px;
          height: 288px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          margin-left: auto;
        }
        .cart-item-image img {
          width: 200px;
          height: 288px;
          border-radius: 2px;
          object-fit: contain;
          background: #f8f8f8;
          transition: transform 0.3s cubic-bezier(.4,0,.2,1), opacity 0.3s cubic-bezier(.4,0,.2,1);
        }
        .cart-img-anim.slide-left {
          transform: translateX(-60px);
          opacity: 0.5;
        }
        .cart-img-anim.slide-right {
          transform: translateX(60px);
          opacity: 0.5;
        }
        .cart-image-arrows {
          position: absolute;
          bottom: 10px;
          right: 10px;
          display: flex;
          gap: 8px; 
          width: 56px; 
          height: 24px; 
        }
        .cart-arrow-btn {
          background: #2b2b2b;
          border: none;
          color: #fff;
          width: 24px;
          height: 24px;
          border-radius: 0;
          font-size: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          padding: 0;
          transition: background 0.2s;
        }
        .cart-arrow-btn:active {
          background: #222;
        }
        .cart-summary-row {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          margin-top: 32px;
          gap: 0;
        }
        .cart-summary-labels {
          flex-direction: column;
          gap: 0;
        }
        .cart-summary-label-row {
          display: block;
          margin-bottom: 4px;
          text-align: left;
        }
        .cart-summary-labels b {
          font-size: 16px;
          font-weight: 700;
          margin-left: 8px;
        }
        .cart-continue-btn {
          background: #5ece7b;
          color: #fff;
          border: none;
          width: 279px;
          height: 43px;
          font-weight: 600;
          font-size: 13px;
          border-radius: 0;
          cursor: pointer;
          font-family: 'Raleway', sans-serif !important;
          margin-top: 10px;
          letter-spacing: 0.5px;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        @media (max-width: 900px) {
          .cart-main {
            padding: 0 2vw 80px 2vw;
          }
          .cart-item-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 18px;
          }
          .cart-item-details-main {
            margin-right: 0;
            width: 100%;
          }
          .cart-qty-controls {
            flex-direction: row;
            gap: 18px;
            margin: 18px 0;
          }
          .cart-item-image {
            width: 100%;
            min-width: 0;
            height: 180px;
            min-height: 80px;
            margin-left: 0;
          }
          .cart-item-image img {
            width: 100%;
            height: 100%;
            max-width: 100vw;
            max-height: 180px;
          }
        }
        @media (max-width: 600px) {
          .cart-main {
            padding: 0 1vw 40px 1vw;
          }
          .cart-item-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
            padding: 18px 0 10px 0;
          }
          .cart-item-details-main {
            margin-right: 0;
            width: 100%;
          }
          .cart-qty-controls {
            flex-direction: row;
            gap: 10px;
            margin: 10px 0;
          }
          .cart-item-image {
            width: 100vw;
            min-width: 0;
            height: 120px;
            min-height: 60px;
            margin-left: 0;
          }
          .cart-item-image img {
            width: 100%;
            height: 100%;
            max-width: 100vw;
            max-height: 120px;
          }
          .cart-summary-row {
            width: 100%;
            align-items: stretch;
          }
          .cart-continue-btn {
            width: 100%;
            min-width: 0;
          }
        }
        html, body, #root {
          width: 100vw;
          min-width: 0;
          overflow-x: hidden;
        }
      `}</style>
      <div className="cart-main">
        <h2 className="cart-title" style={{marginLeft: 0, paddingLeft: 0}}>CART</h2>
        <div className="cart-divider"></div>
        {cartItems.length === 0 ? (
          <div style={{ color: '#888', fontSize: 20, textAlign: 'center', margin: 80 }}>Your cart is empty.</div>
        ) : (
          cartItems.map((item, idx) => (
            <div key={idx} className="cart-item-row">
              <div className="cart-item-details-main" style={{marginLeft: 0, paddingLeft: 0, alignItems: 'flex-start'}}>
                <div className="cart-item-name" style={{marginLeft: 0, paddingLeft: 0}}>{item.name}</div>
                {item.description && (
                  <div className="cart-item-desc">{item.description}</div>
                )}
                <div className="cart-item-price">{getSymbol(currency)}{getConverted(item.price).toFixed(2)}</div>
                <div className="cart-size-label">SIZE:</div>
                <div className="cart-size-selector">
                  {['XS', 'S', 'M', 'L'].map(size => (
                    <span
                      key={size}
                      className={`cart-size-btn${item.size === size ? ' selected' : ''}`}
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>
              <div className="cart-qty-controls">
                <button
                  className="cart-qty-btn"
                  onClick={() => handleQtyChange(idx, +1)}
                >+</button>
                <div className="cart-qty-value">{item.quantity}</div>
                <button
                  className="cart-qty-btn"
                  onClick={() => handleQtyChange(idx, -1)}
                >-</button>
              </div>
              <div className="cart-item-image">
                <img 
                  src={getImages(item)[imageIndexes[idx] || 0]} 
                  alt={item.name} 
                  className={animDirections[idx] ? `cart-img-anim ${animDirections[idx]}` : ''}
                />
                <div className="cart-image-arrows">
                  <button className="cart-arrow-btn" tabIndex={-1} aria-label="Previous image" onClick={() => handleImageChange(idx, -1)}>{'<'}</button>
                  <button className="cart-arrow-btn" tabIndex={-1} aria-label="Next image" onClick={() => handleImageChange(idx, 1)}>{'>'}</button>
                </div>
              </div>
            </div>
          ))
        )}
        <div className="cart-summary-row">
          <div className="cart-summary-labels" style={{marginBottom: '16px'}}>
            <div className="cart-summary-label-row">
              <span>Quantity: <b>{totalQuantity}</b></span>
            </div>
            <div className="cart-summary-label-row">
              <span>Total: <b>{getSymbol(currency)}{totalPrice.toFixed(2)}</b></span>
            </div>
          </div>
          <button className="cart-continue-btn" onClick={handleContinue} disabled={cartItems.length === 0} style={cartItems.length === 0 ? { opacity: 0.5, cursor: 'not-allowed' } : {}}>
            CONTINUE
          </button>
        </div>
      </div>
    </>
  );
};

export default CartPage;
