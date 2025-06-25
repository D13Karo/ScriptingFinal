
import React from 'react';
import { useCategory } from './NavigationBar';

const CartPage = () => {
  const { cartItems = [], setCartItems } = useCategory();

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleQtyChange = (idx, delta) => {
    setCartItems(cartItems.map((ci, i) =>
      i === idx
        ? { ...ci, quantity: Math.max(1, ci.quantity + delta) }
        : ci
    ));
  };

  return (
    <>
      <style>{`
        .cart-main {
          font-family: 'Raleway', sans-serif !important;
          max-width: 900px;
          width: 100%;
          margin: 40px auto 0 auto;
          padding: 0 0 32px 0;
        }
        .cart-title {
          font-weight: 700;
          font-size: 22px;
          margin-bottom: 32px;
          letter-spacing: 0.5px;
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
          justify-content: center;
        }
        .cart-item-details-main {
          flex: 2;
          min-width: 0;
          margin-left: -180px;
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
          gap: 100px; /* Make space between +, number, and - smaller */
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
        }
        .cart-item-image img {
          width: 200px;
          height: 288px;
          border-radius: 2px;
          object-fit: cover;
        }
        .cart-image-arrows {
          position: absolute;
          bottom: 10px;
          right: 10px;
          display: flex;
          gap: 8px; /* Updated gap to 8px as in your screenshot */
          width: 56px; /* Hug (56px) */
          height: 24px; /* Hug (24px) */
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
          justify-content: space-between;
          margin-top: 32px;
          align-items: flex-end;
        }
        .cart-summary-labels {
          font-size: 15px;
          color: #1d1f22;
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
          padding: 8px 36px;
          font-weight: 600;
          font-size: 13px;
          border-radius: 0;
          cursor: pointer;
          font-family: 'Raleway', sans-serif !important;
          margin-top: 10px;
          letter-spacing: 0.5px;
        }
      `}</style>
      <div className="cart-main">
        <h2 className="cart-title">CART</h2>
        <div className="cart-divider"></div>
        {cartItems.length === 0 ? (
          <div style={{ color: '#888', fontSize: 20, textAlign: 'center', margin: 80 }}>Your cart is empty.</div>
        ) : (
          cartItems.map((item, idx) => (
            <div key={idx} className="cart-item-row">
              <div className="cart-item-details-main">
                <div className="cart-item-name">{item.name}</div>
                    {item.description && (
                <div className="cart-item-desc">{item.description}</div>
                )}
                <div className="cart-item-price">${item.price.toFixed(2)}</div>
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
                <img src={item.image} alt={item.name} />
                <div className="cart-image-arrows">
                  <button className="cart-arrow-btn" tabIndex={-1} aria-label="Previous image">{'<'}</button>
                  <button className="cart-arrow-btn" tabIndex={-1} aria-label="Next image">{'>'}</button>
                </div>
              </div>
            </div>
          ))
        )}
        <div className="cart-summary-row">
          <div className="cart-summary-labels">
            <div>Quantity: <b>{totalQuantity}</b></div>
            <div>Total: <b>${totalPrice.toFixed(2)}</b></div>
          </div>
          <button className="cart-continue-btn">
            CONTINUE
          </button>
        </div>
      </div>
    </>
  );
};

export default CartPage;
