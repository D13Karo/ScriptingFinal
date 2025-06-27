import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PaymentPage from './PaymentPage';
import { useLocation } from 'react-router-dom'


const dress = "https://i.pinimg.com/736x/73/fd/67/73fd6792c3f63f4b63de025b8f78adea.jpg"; 

const ShippingMethodPage = ({ contact: initialContact, address: initialAddress, cartItem, subtotal, onBack, onNext }) => {
  const demoCartItem = {
    name: "Demo Dress",
    price: 29.99,
    qty: 1
  };
  
  cartItem = cartItem || demoCartItem;
  subtotal = subtotal || demoCartItem.price;
  
 const navigate = useNavigate();
 const location = useLocation();

  const contact = location.state?.contact || '';
  const address = location.state?.address || '';

  const [shipping, setShipping] = useState('standard');
  const [showPayment, setShowPayment] = useState(false);

  const shippingOptions = [
    { id: 'standard', label: 'Standard Shipping', price: 0, desc: 'Free' },
    { id: 'express', label: 'Express Shipping', price: 4.99, desc: '4.99$' },
  ];

  const shippingLabel = shipping === 'standard' ? 'Free Shipping' : 'Express Shipping';
  const shippingCost = shipping === 'standard' ? 0 : 4.99;
  const total = subtotal + shippingCost;

  if (showPayment) {
  const method = shipping === 'standard' ? 'Standard Shipping - FREE' : 'Express Shipping - $4.99';
  return (
    <PaymentPage
      contact={initialContact}
      address={initialAddress}
      method={method}
      cartItem={cartItem}
      subtotal={subtotal}
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
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 32 }}>
      <div style={{ position: 'relative', width: 110, height: 110, marginRight: 24 }}>
        <img 
          src={dress} 
          alt={cartItem.name} 
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
          {cartItem.qty}
        </div>
      </div>
      <div>
        <div style={{ fontWeight: 500, fontSize: 26, marginBottom: 8, color: '#272727' }}>{cartItem.name}</div>
        <div style={{ color: '#56B280', fontWeight: 600, fontSize: 20 }}>${cartItem.price.toFixed(2)}</div>
      </div>
    </div>
    <div style={{ borderTop: '1px solid #e0e0e0', margin: '24px 0' }} />
    <div style={{ 
      marginBottom: 16, 
      display: 'flex', 
      justifyContent: 'space-between',
      fontSize: 14
    }}>
      <span style={{ color: '#666' }}>Subtotal</span>
      <span>${subtotal.toFixed(2)}</span>
    </div>
    <div style={{ 
      marginBottom: 16, 
      display: 'flex', 
      justifyContent: 'space-between',
      fontSize: 14,
      marginBottom: 44
    }}>
      <span style={{ color: '#666' }}>Shipping</span>
      <span>{shippingLabel}</span>
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
      <span>${total.toFixed(2)}</span>
    </div>
  </div>
</div>
    </div>
  );
};

export default ShippingMethodPage;