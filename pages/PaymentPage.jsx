import React from 'react';
import LockFill from './images/LockFill.png';
import Vector from './images/Vector.png';
import CreditCardFill from './images/CreditCardFill.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useCategory } from './NavigationBar';


const PaymentPage = ({
  contact = "joe.spagnuolo@uxbly.com",
  address = "Via Firenze 23, 92023, Campobello di Licata AG, Italia",
  method = "Standard Shipping - FREE",
  shippingLabel = "Free Shipping",
  shippingCost = 0,
  total,
  onBack
}) => {
  const { cartItems = [], currency } = useCategory();
  const currencySymbols = { USD: '$', EUR: '€', JPY: '¥' };
  const rates = { USD: 1, EUR: 0.92, JPY: 155 };
  const getSymbol = (cur) => currencySymbols[cur] || '$';
  const getConverted = (price) => (price * (rates[currency] || 1));
  const subtotalCart = cartItems.reduce((sum, item) => sum + getConverted(item.price) * (item.quantity || 1), 0);
  let shippingCostValue = 0;
  if (shippingLabel && shippingLabel.toLowerCase().includes('express')) shippingCostValue = 4.99;
  if (shippingLabel && shippingLabel.toLowerCase().includes('free')) shippingCostValue = 0;
  const totalFinal = subtotalCart + getConverted(shippingCostValue);

const [cardNumber, setCardNumber] = useState('');
const [holderName, setHolderName] = useState('');
const [expiry, setExpiry] = useState('');
const [cvv, setCvv] = useState('');
const [errors, setErrors] = useState({});
const navigate = useNavigate(); 

  // Format the method string for express shipping
  let methodDisplay = method;
  if (method && method.toLowerCase().includes('express')) {
    methodDisplay = `Express Shipping - ${getSymbol(currency)}${getConverted(4.99).toFixed(2)}`;
  } else if (method && method.toLowerCase().includes('free')) {
    methodDisplay = 'Standard Shipping - Free';
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
            maxWidth: 500,
            marginBottom: 24,
            textAlign: 'left',
          }}
        >
          {/* Progress bar */}
          <div style={{
            color: '#6cbe8e',
             marginBottom: 16, 
             fontSize: 14, 
             textAlign: 'left'
          }}>
            <span style={{ color: '#56B280', fontWeight: 'bold' }}>Cart</span> &gt;
            <span style={{ color: '#56B280', fontWeight: 'bold' }}> Details</span> &gt;
            <span style={{ color: '#56B280', fontWeight: 'bold' }}> Shipping</span> &gt;
            <span style={{ color: '#272727', fontWeight: 'bold' }}> Payment</span>
          </div>
          {/* Info box */}
          <div style={{
            border: '1px solid #e0e0e0',
            borderRadius: 8,
            padding: 16,
            marginBottom: 24,
            background: '#fff',
            textAlign: 'left'
                      }}>
            {/* Contact */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
              <div style={{ width: 100, color: '#818181' }}>Contact</div>
              <div style={{ flex: 1, color: '#272727' }}>{contact}</div>
            </div>
            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '0 0 16px 0' }} />
            {/* Ship to */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
              <div style={{ width: 100, color: '#818181' }}>Ship to</div>
              <div style={{ flex: 1, color: '#272727' }}>{address}</div>
            </div>
            <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '0 0 16px 0' }} />
            {/* Method */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ width: 100, color: '#818181' }}>Method</div>
              <div style={{ flex: 1, color: '#272727' }}>{methodDisplay}</div>
            </div>
          </div>




<div>
  <div
    style={{
      width: 445,
      fontSize: 20,
      fontWeight: 500,
      marginBottom: 16,
      color: '#272727',
      textAlign: 'left'
    }}
  >
    Payment method
  </div>

  <div
    style={{
      border: '1px solid #e0e0e0',
      borderRadius: 8,
      background: '#ffffff',
      padding: 16,
      marginBottom: 16,
      boxShadow: '0 0 4px rgba(0,0,0,0.05)'
    }}
  >
    <div
      style={{
        background: 'linear-gradient(90deg, #d4eee2 0%, #bce2d0 100%)',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        padding: '8px 12px',
        display: 'flex',
        alignItems: 'center',
        fontWeight: 600,
        color: '#388e5c',
        margin: '-16px -16px 16px -16px',
        height: 32
      }}
    >
      <img
        src={CreditCardFill}
        alt="Card Icon"
        style={{ width: 16, height: 16, marginRight: 6 }}
      />
      Credit Card
    </div>

    {/* Card Number */}
 <div style={{ position: 'relative', marginBottom: 8}}>
  <input
    style={{
      width: 465,
      height: 48,
      padding: '0 40px 0 12px', // leave room for icon on right
      border: '1px solid #e0e0e0',
      fontSize: 15,
      boxSizing: 'border-box',
    }}
    placeholder="Card Number"
    value={cardNumber}
    onChange={(e) => setCardNumber(e.target.value)}
  />
  <img
    src={LockFill}
    alt="Lock"
    style={{
      position: 'absolute',
      right: 12,
      top: '38%',
      transform: 'translateY(-50%)',
      width: 18,
      height: 18,
      pointerEvents: 'none'
    }}
  />
  <div style={{ height: 20 }}>
    {errors.cardNumber && (
      <div style={{ color: 'red', fontSize: 14 }}>{errors.cardNumber}</div>
    )}
  </div>
</div>

    {/* Holder Name */}
    <div style={{ marginBottom: 8 }}>
      <input
        style={{
          width: 444,
          padding: '12px 10px',
          border: '1px solid #e0e0e0',
          fontSize: 15,
          display: 'block'
        }}
        placeholder="Holder Name"
        value={holderName}
        onChange={(e) => setHolderName(e.target.value)}
      />
      <div style={{ height: 20 }}>
        {errors.holderName && (
          <div style={{ color: 'red', fontSize: 14 }}>{errors.holderName}</div>
        )}
      </div>
    </div>


    <div style={{ display: 'flex', gap: 8 }}>
      <div style={{ flex: 1 }}>
        <input
          style={{
            width: 200,
            height: 18,
            padding: '12px 10px',
            border: '1px solid #e0e0e0',
            fontSize: 15,
            display: 'block'
          }}
          placeholder="Expiration (MM/YY)"
          value={expiry}
          onChange={(e) => setExpiry(e.target.value)}
        />
        <div style={{ height: 20 }}>
          {errors.expiry && (
            <div style={{ color: 'red', fontSize: 14 }}>{errors.expiry}</div>
          )}
        </div>
      </div>

      {/* CVV */}
     <div style={{ flex: 1, position: 'relative', height: 48 }}>
  <input
    style={{
      width: '100%',
      height: 44,
      padding: '0 40px 0 10px',
      border: '1px solid #e0e0e0',
      fontSize: 15,
      boxSizing: 'border-box',
    }}
    placeholder="CVV"
    value={cvv}
    onChange={(e) => setCvv(e.target.value)}
  />
  <img
    src={Vector}
    alt="Info"
    style={{
      position: 'absolute',
      right: 15,
      top: '50%',
      transform: 'translateY(-50%)',
      width: 16,
      height: 16
    }}
  />


        <div style={{ height: 20 }}>
          {errors.cvv && (
            <div style={{ color: 'red', fontSize: 14 }}>{errors.cvv}</div>
          )}
        </div>
      </div>
    </div>
  </div>
</div>



<div style={{
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: 24
}}>
  <button
    onClick={onBack}
    style={{
      background: 'none',
      border: 'none',
      color: '#6cbe8e',
      fontWeight: 600,
      cursor: 'pointer',
      fontSize: 18,
      padding: '12px 0',
      textDecoration: 'underline',
      alignSelf: 'flex-start' 
    }}
  >
    Back to shipping
  </button>
<button
  onClick={() => {
 const newErrors = {};
  if (!cardNumber) {
    newErrors.cardNumber = "Card number is required.";
  } else if (!/^[0-9]{12,19}$/.test(cardNumber)) {
    newErrors.cardNumber = "Invalid card number.";
  }

    if (!holderName) {
      newErrors.holderName = "Holder name is required.";
    } else if (!/^[A-Za-z]+(?: [A-Za-z]+)+$/.test(holderName.trim())) {
      newErrors.holderName = "Enter first and last name (letters only).";
    }

  if (!expiry) {
    newErrors.expiry = "Expiration date is required.";
  } else if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(expiry)) {
    newErrors.expiry = "Invalid expiration date.";
  }

  if (!cvv) {
    newErrors.cvv = "CVV is required.";
  } else if (!/^[0-9]{3,4}$/.test(cvv)) {
    newErrors.cvv = "Invalid CVV.";
  }

  setErrors(newErrors);

  if (Object.keys(newErrors).length === 0) {
    navigate('/confirmation', {
  state: {
    contact,
    address,
    shippingCost: shippingCostValue,
  },
});

  }
}}

  style={{
    background: '#56B280',
    color: '#fff',
    border: 'none',
    borderRadius: 4,
    padding: '12px 32px',
    fontWeight: 600,
    fontSize: 16,
    cursor: 'pointer'
  }}
>
  Pay now
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
      <span>{shippingLabel === 'Free Shipping' ? 'Free' : getSymbol(currency) + getConverted(shippingCostValue).toFixed(2)}</span>
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
      <span>{getSymbol(currency)}{totalFinal.toFixed(2)}</span>
    </div>
  </div>
</div>
    </div>
  );
};
export default PaymentPage;
