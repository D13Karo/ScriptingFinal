import React from 'react';
import CheckCircle from './images/CheckCircle.png';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCategory } from './NavigationBar';

const PaymentConfirmationPage = () => {
  const location = useLocation();
  const shippingCost = location.state?.shippingCost || 0;
  const { cartItems = [], currency } = useCategory();

  const currencySymbols = { USD: '$', EUR: '€', JPY: '¥' };
  const rates = { USD: 1, EUR: 0.92, JPY: 155 };
  const getSymbol = (cur) => currencySymbols[cur] || '$';
  const getConverted = (price) => (price * (rates[currency] || 1));
  const subtotalCart = cartItems.reduce((sum, item) => sum + getConverted(item.price) * (item.quantity || 1), 0);
  const navigate = useNavigate();
  const shippingCostValue = typeof shippingCost === 'number' ? shippingCost : 0;
  const totalFinal = subtotalCart + getConverted(shippingCostValue);

  return (
    <div style={{
      display: 'flex',
      background: '#fafafa',
      minHeight: '100vh',
      margin: '0 auto'
    }}>
      {/* Left */}
      <div
        style={{
          flex: 1,
          padding: 40,
          background: '#fff',
          maxWidth: '50%',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Progress bar */}
        <div style={{
          width: '100%',
          maxWidth: 500,
          marginBottom: 24,
          textAlign: 'left',
          marginTop: 0 // Remove any extra top margin
        }}>
          <div style={{
            color: '#6cbe8e',
            marginBottom: 32, 
            fontSize: 16, 
            textAlign: 'left'
          }}>
            <span style={{ color: '#56B280', fontWeight: 'bold' }}>Cart</span> &gt;
            <span style={{ color: '#56B280', fontWeight: 'bold' }}> Details</span> &gt;
            <span style={{ color: '#56B280', fontWeight: 'bold' }}> Shipping</span> &gt;
            <span style={{ color: '#272727', fontWeight: 'bold' }}> Payment</span>
          </div>
        </div>
        {/* Checkmark */}
        <img 
          src={CheckCircle} 
          alt="Payment Confirmed" 
          style={{ width: 100, height: 100, marginBottom: 32 }}
        />
        {/* Payment Confirmed */}
        <div style={{ fontWeight: 500, fontSize: 26, marginBottom: 12, color: '#272727', textAlign: 'center' }}>
          Payment Confirmed
        </div>
        {/* Order number */}
        <div style={{ color: '#56B280', fontWeight: 400, fontSize: 14, marginBottom: 32, textAlign: 'center' }}>
          ORDER #4444
        </div>
        {/* Back to shopping button */}
        <button
          style={{
            background: '#56B280',
            width: 248,
            height: 40,
            color: '#fff',
            border: 'none',
            borderRadius: 4,
            fontWeight: 500,
            fontSize: 20.65,
            cursor: 'pointer',
            marginBottom: 16
          }}
          onClick={() => navigate('/')}
        >
          Back to shopping
        </button>
      </div>







      {/* Right */}
      <div
        style={{
          flex: 1,
          padding: 40,
          background: '#F2F2F2',
          maxWidth: '50%',
          boxSizing: 'border-box',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}
      >
        <div style={{ width: '100%', maxWidth: 500 }}>
          <div style={{ maxHeight: 390, overflowY: 'auto', marginBottom: 8, paddingRight: 8, paddingTop: 10 }}>
            {cartItems.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', marginBottom: 32 }}>
                <div style={{ position: 'relative', width: 110, height: 110, marginRight: 24 }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: 110,
                      height: 110,
                      borderRadius: 8,
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: -10,
                    right: -10,
                    background: '#6cbe8e',
                    color: '#fff',
                    borderRadius: '50%',
                    width: 28,
                    height: 28,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 600,
                    fontSize: 16,
                    boxShadow: '0 2px 8px #0001'
                  }}>
                    {item.quantity}
                  </div>
                </div>
                <div>
                  <div style={{ fontWeight: 500, fontSize: 26, marginBottom: 8, color: '#272727' }}>{item.name} {item.size && (<span style={{fontWeight:400, fontSize:20, color:'#888'}}>({item.size})</span>)}</div>
                  <div style={{ color: '#56B280', fontWeight: 600, fontSize: 20 }}>{getSymbol(currency)}{getConverted(item.price).toFixed(2)}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid #e0e0e0', margin: '24px 0' }} />
          <div style={{ 
            marginBottom: 16, 
            display: 'flex', 
            justifyContent: 'space-between',
            fontSize: 14
          }}>
            <span style={{ color: '#666' }}>Subtotal</span>
            <span>{getSymbol(currency)}{subtotalCart.toFixed(2)}</span>
          </div>
          <div style={{ 
            marginBottom: 16, 
            display: 'flex', 
            justifyContent: 'space-between',
            fontSize: 14,
          }}>
            <span style={{ color: '#666' }}>Shipping</span>
            <span>{shippingCostValue === 0 ? 'Free' : getSymbol(currency) + getConverted(shippingCostValue).toFixed(2)}</span>
          </div>
          <div style={{ borderTop: '1px solid #e0e0e0', margin: '24px 0' }} />
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            fontWeight: 700, 
            fontSize: 14,
            marginBottom: 24,
            color: '#56B280'
          }}>
            <span>Paid</span>
            <span>{getSymbol(currency)}{totalFinal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmationPage;
