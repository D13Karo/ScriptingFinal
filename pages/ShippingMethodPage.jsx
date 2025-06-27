import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PaymentPage from './PaymentPage';
import { useLocation } from 'react-router-dom'
import { useCategory } from './NavigationBar';


const ShippingMethodPage = ({ contact: initialContact, address: initialAddress, onBack, onNext }) => {
  const { cartItems = [], currency } = useCategory();
  console.log('cartItems in ShippingMethodPage:', cartItems);
  const currencySymbols = { USD: '$', EUR: '€', JPY: '¥' };
  const rates = { USD: 1, EUR: 0.92, JPY: 155 };
  const getSymbol = (cur) => currencySymbols[cur] || '$';
  const getConverted = (price) => (price * (rates[currency] || 1));
  const subtotalCart = cartItems.reduce((sum, item) => sum + getConverted(item.price) * (item.quantity || 1), 0);

  const navigate = useNavigate();
  const location = useLocation();

  const contact = location.state?.contact || '';
  const address = location.state?.address || '';

  const [shipping, setShipping] = useState('standard');
  const [showPayment, setShowPayment] = useState(false);

  const shippingOptions = [
    { id: 'standard', label: 'Standard Shipping', price: 0, desc: 'Free' },
    { id: 'express', label: 'Express Shipping', price: 4.99, desc: getSymbol(currency) + getConverted(4.99).toFixed(2) },
  ];

  const shippingLabel = shipping === 'standard' ? 'Free Shipping' : 'Express Shipping';
  const shippingCost = shipping === 'standard' ? 0 : 4.99;
  const total = subtotalCart + getConverted(shippingCost);

  useEffect(() => {
    console.log('cartItems changed:', cartItems);
    console.log('currency:', currency);
  }, [cartItems, currency]);

  if (showPayment) {
    const method = shipping === 'standard' ? 'Standard Shipping - FREE' : 'Express Shipping - $4.99';
    return (
      <PaymentPage
        contact={initialContact}
        address={initialAddress}
        method={method}
        shippingLabel={shippingLabel}
        total={total}
        onBack={() => setShowPayment(false)}
      />
    );
  }

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
        <div
          style={{
            width: '100%',
            maxWidth: 445, 
            marginBottom: 24
          }}
        >
          <div style={{
            color: '#6cbe8e', marginBottom: 24, fontSize: 14, textAlign: 'left'
          }}>
            <span style={{ color: '#56B280', fontWeight: 'bold' }}>Cart</span> &gt; 
            <span style={{ color: '#56B280', fontWeight: 'bold' }}> Details</span> &gt; 
            <span style={{ color: '#272727', fontWeight: 'bold' }}> Shipping</span> &gt; 
            <span style={{ color: '#616161' , fontWeight: 'bold' }}> Payment</span>
          </div>
          <div style={{ marginBottom: 24 }}>
            <div style={{
              border: '1px solid #e0e0e0',
              borderRadius: 7,
              padding: 24,
              marginBottom: 4,
              marginTop: 30,
              background: '#fff'
            }}>
              {/* Contact  */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: 24 
              }}>
                <label style={{
                  width: 90,
                  color: '#666',
                  fontSize: 16,
                  marginRight: 8,
                  textAlign: 'left'
                }}>
                  Contact
                </label>
                <input
                  type="email"
                  value={contact}
                  readOnly
                  style={{
                    flex: 1,
                    fontSize: 16,
                    border: 'none',
                    outline: 'none',
                    background: 'transparent',
                    color: '#222'
                  }}
                />
              </div>
              <hr style={{ border: 'none', borderTop: '1px solid #56B28033', margin: '0 0 24px 0' }} />
              <div style={{
                display: 'flex',
                alignItems: 'center'
              }}>
                <label style={{
                  width: 90,
                  color: '#666',
                  fontSize: 16,
                  marginRight: 8,
                  textAlign: 'left'
                }}>
                  Ship to
                </label>
                <input
                  type="text"
                  value={address}
                  readOnly
                  style={{
                    flex: 1,
                    fontSize: 16,
                    border: 'none',       
                    outline: 'none',       
                    background: 'transparent',
                    color: '#222'
                  }}
                />
              </div>
            </div>
          
            <div style={{ minHeight: 20, marginBottom: 10 }} />
            <div>
              <div style={{ 
                fontSize: 20, 
                fontWeight: 500, 
                marginBottom: 16,
                marginTop: 30,
                color: '#272727',
                textAlign: 'left' 
              }}>
                Shipping method
              </div>
              <div style={{ marginTop: 24 }}>
                {shippingOptions.map(opt => (
                  <label
                    key={opt.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      border: '1px solid #e0e0e0',
                      borderRadius: 10,
                      padding: '18px 24px',
                      marginBottom: 20,
                      background: '#fff',
                      cursor: 'pointer',
                      boxShadow: 'none'
                    }}
                  >
                    <input
                      type="radio"
                      name="shipping"
                      checked={shipping === opt.id}
                      onChange={() => setShipping(opt.id)}
                      style={{
                        marginRight: 20,
                        width: 18,
                        height: 18
                      }}
                    />
                    <div style={{ flex: 1, fontSize: 17, color: '#222', fontWeight: 500 }}>{opt.label}</div>
                    <div style={{
                      color: '#222',
                      fontWeight: 600,
                      fontSize: 17
                    }}>
                      {opt.desc}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            marginTop: 120,
            borderTop: '1px solid #e0e0e0',
            paddingTop: 24
          }}>
            <button 
             onClick={() => navigate('/shippinginfo')}
              style={{ 
                background: 'none', 
                border: 'none', 
                color: '#56B280', 
                fontWeight: 600, 
                cursor: 'pointer',
                fontSize: 16,
                padding: '12px 0',
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'underline'
              }}
            >
              Back to details
            </button>
            <button
              onClick={() => setShowPayment(true)}
              disabled={!shipping}
              style={{
                background: shipping ? '#56B280' : '#ccc',
                color: '#fff',
                border: 'none',
                borderRadius: 6,
                padding: '12px 32px',
                fontWeight: 600,
                fontSize: 16,
                cursor: shipping ? 'pointer' : 'not-allowed'
              }}
            >
              Go to payment
            </button>
          </div>
        </div>
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
      {cartItems.length === 0 ? (
        <div style={{ color: '#888', textAlign: 'center', marginTop: 40 }}>Your cart is empty.</div>
      ) : (
        cartItems.map((item, idx) => (
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
        ))
      )}
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
      fontSize: 14
    }}>
      <span style={{ color: '#666' }}>Shipping</span>
      <span>{shippingLabel === 'Free Shipping' ? 'Free' : getSymbol(currency) + getConverted(shippingCost).toFixed(2)}</span>
    </div>
    <div style={{ borderTop: '1px solid #e0e0e0', margin: '24px 0' }} />
    <div style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      fontWeight: 700, 
      fontSize: 14,
      marginBottom: 24
    }}>
      <span>Total</span>
      <span>{getSymbol(currency)}{total.toFixed(2)}</span>
    </div>
  </div>
</div>
    </div>
  );
};

export default ShippingMethodPage;
