import React from 'react';
import LockFill from './img/LockFill.png';
import Vector from './img/Vector.png';
import CreditCardFill from './img/CreditCardFill.png';
import CheckCircle from './img/CheckCircle.png'; // <-- Add this import
import { useNavigate } from 'react-router-dom'; 

const dress = "https://i.pinimg.com/736x/73/fd/67/73fd6792c3f63f4b63de025b8f78adea.jpg";

const PaymentConfirmationPage =  ({
  contact = "joe.spagnuolo@uxbly.com",
  address = "Via Firenze 23, 92023, Campobello di Licata AG, Italia",
  method = "Standard Shipping - FREE",
  cartItem = { name: "Demo Dress", price: 29.99, qty: 1 },
  subtotal = 29.99,
  shippingLabel = "Free Shipping",
  total = 29.99,
  onBack
}) => {
  const navigate = useNavigate();

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
            marginBottom: 24,
            color: '#56B280'
          }}>
            <span>Paid</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmationPage;
