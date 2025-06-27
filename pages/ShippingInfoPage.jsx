import React, { useState } from 'react';
import down from './images/down.png'; 
import ShippingMethodPage from './ShippingMethodPage';
import { useNavigate } from 'react-router-dom';
const dress = "https://i.pinimg.com/736x/73/fd/67/73fd6792c3f63f4b63de025b8f78adea.jpg";

const StyledInput = ({ style, error, ...props }) => {
  const [focused, setFocused] = useState(false);
  return (
    <input
      {...props}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        ...style,
        border: `1px solid ${error ? '#e74c3c' : (focused ? '#56B280' : '#898989')}`,
         outline: 'none',
        boxShadow: 'none',
        background: 'transparent'
      }}
    />
  );
};

const StyledSelect = ({ style, children, error, ...props }) => {
  const [focused, setFocused] = useState(false);
  return (
    <select
      {...props}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        ...style,
        border: `1px solid ${error ? '#e74c3c' : (focused ? '#56B280' : '#898989')}`,
        outline: 'none',
        boxShadow: 'none',
        background: 'transparent'
      }}
    >
      {children}
    </select>
  );
};

const ShippingInfoPage = ({ contact: initialContact, address: initialAddress, cartItem, subtotal, onBack, onNext }) => {
  const [form, setForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    shippingNote: '',
    city: '',
    postalCode: '',
    province: '',
    country: '',
    saveInfo: false
  });
  
  const [errors, setErrors] = useState({});
  
  const demoCartItem = {
    name: "Running Short",
    price: 50.00,
    qty: 1
  };

  const inputStyle = {
    flex: 1,
    padding: 12,
    width: '100%',
    borderRadius: 0,
    fontSize: 14,
    boxSizing: 'border-box'
  };

  cartItem = cartItem || demoCartItem;
  subtotal = subtotal || demoCartItem.price;

  const validateForm = () => {
    const newErrors = {};
    // Email
  if (!form.email.trim()) {
    newErrors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    newErrors.email = 'Please enter a valid email address';
  }

  // First Name
  if (!form.firstName.trim()) {
    newErrors.firstName = 'First name is required';
  } else if (form.firstName.length < 2) {
    newErrors.firstName = 'First name must be at least 2 characters';
  }

  // Last Name
  if (!form.lastName.trim()) {
    newErrors.lastName = 'Last name is required';
  } else if (form.lastName.length < 2) {
    newErrors.lastName = 'Last name must be at least 2 characters';
  }

  // Address
  if (!form.address.trim()) {
    newErrors.address = 'Address is required';
  } else if (form.address.length < 5) {
    newErrors.address = 'Address must be at least 5 characters';
  }

  // City
  if (!form.city.trim()) {
    newErrors.city = 'City is required';
  } else if (form.city.length < 2) {
    newErrors.city = 'City must be at least 2 characters';
  }

  // Postal Code
  if (!form.postalCode.trim()) {
    newErrors.postalCode = 'Postal code is required';
  } else if (!/^\d+$/.test(form.postalCode)) {
    newErrors.postalCode = 'Postal code must be numbers only';
  } else if (form.postalCode.length < 4) {
    newErrors.postalCode = 'Postal code must be at least 4 digits';
  }

  // Province
  if (!form.province) {
    newErrors.province = 'Province is required';
  }

  // Country
  if (!form.country) {
    newErrors.country = 'Country is required';
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

  const handleInputChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };
const navigate = useNavigate();

const handleContinue = () => {
  if (validateForm()) {
    if (onNext) onNext(form);
    navigate('/shipping', { state: { contact: form.email, address: `${form.address}, ${form.postalCode}, ${form.city}, ${form.province} ${form.country}` } });
  }
};




  return (
    <div style={{ display: 'flex', background: '#fafafa', minHeight: '100vh', margin: '0 auto' }}>
      
      {/* Left Side */}
      <div style={{
        flex: 1,
        padding: 40,
        background: '#fff',
        maxWidth: '50%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <div style={{ width: '100%', maxWidth: 445 }}>

          <div style={{ color: '#6cbe8e', marginBottom: 24, fontSize: 14 }}>
            <span style={{ color: '#56B280', fontWeight: 'bold' }}>Cart</span> &gt;
            <span style={{ color: '#272727', fontWeight: 'bold' }}> Details</span> &gt;
            <span style={{ color: '#616161', fontWeight: 500 }}> Shipping</span> &gt;
            <span style={{ color: '#616161', fontWeight: 500 }}> Payment</span>
          </div>

          <div style={{ marginBottom:4 }}>
            <div style={{ fontWeight: 500, fontSize: 20, marginBottom: 10 }}>Contact</div>
            <StyledInput
  type="email"
  placeholder="Email or mobile phone number"
  value={form.email}
  onChange={(e) => handleInputChange('email', e.target.value)}
  error={errors.email}
  style={{
    width: '100%',
    padding: 12,
    fontSize: 14,
    borderRadius: 0,
    boxSizing: 'border-box'
  }}
  title={errors.email || ''}
/>
<div style={{ minHeight: 18, color: '#e74c3c', fontSize: 12, marginBottom:2 }}>
  {errors.email || ''}
</div>
</div>

   <div>
    <div style={{ fontWeight: 500, fontSize: 20, marginBottom: 9 }}>Shipping Address</div>

           <div style={{ display: 'flex', gap: 12, marginBottom: 0 }}>
            <div style={{ flex: 1 }}>
              <StyledInput
      placeholder="Name"
      value={form.firstName}
      onChange={(e) => handleInputChange('firstName', e.target.value)}
      error={errors.firstName}
      title={errors.firstName || ''}
      style={inputStyle}
    />
    <div style={{ minHeight: 18, color: '#e74c3c', fontSize: 12, marginBottom: 2 }}>
      {errors.firstName || ''}
    </div>
  </div>
              <div style={{ flex: 1 }}>
    <StyledInput
      placeholder="Second Name"
      value={form.lastName}
      onChange={(e) => handleInputChange('lastName', e.target.value)}
      error={errors.lastName}
      title={errors.lastName || ''}
      style={inputStyle}
    />
    <div style={{ minHeight: 18, color: '#e74c3c', fontSize: 12, marginBottom:2 }}>
      {errors.lastName || ''}
    </div>
  </div>
            </div>



           <StyledInput
  placeholder="Address and number"
  value={form.address}
  onChange={(e) => handleInputChange('address', e.target.value)}
  error={errors.address}
  title={errors.address || ''}
  style={{ ...inputStyle, width: '100%', marginBottom: 0 }}
/>
<div style={{ minHeight: 18, color: '#e74c3c', fontSize: 12, marginBottom: 2 }}>
  {errors.address || ''}
</div>


<StyledInput 
      placeholder="Shipping note (optional)" 
     value={form.shippingNote}
      onChange={(e) => handleInputChange('shippingNote', e.target.value)}
     style={{ ...inputStyle, width: '100%', marginBottom: 12 }} 
/>


            <div style={{ display: 'flex', gap: 12, marginBottom: 0 }}>
  <div style={{ flex: 1 }}>
    <StyledInput
      placeholder="City"
      value={form.city}
      onChange={(e) => handleInputChange('city', e.target.value)}
      error={errors.city}
      title={errors.city || ''}
      style={{ ...inputStyle, width: '100%' }}
    />
    <div style={{ minHeight: 18, color: '#e74c3c', fontSize: 12, marginBottom: 8 }}>
      {errors.city || ''}
    </div>
  </div>
  <div style={{ flex: 1 }}>
    <StyledInput
      placeholder="Postal Code"
      value={form.postalCode}
      onChange={(e) => handleInputChange('postalCode', e.target.value)}
      error={errors.postalCode}
      title={errors.postalCode || ''}
      style={{ ...inputStyle, width: '100%' }}
      inputMode="numeric"
      pattern="[0-9]*"
    />
    <div style={{ minHeight: 18, color: '#e74c3c', fontSize: 12, marginBottom: 8 }}>
      {errors.postalCode || ''}
    </div>
  </div>



  
              <div style={{ position: 'relative', flex: 1 }}>
                <label style={{
                  position: 'absolute',
                  top: 6,
                  left: 7,
                  fontSize: 10,
                  backgroundColor: '#fff',
                  padding: '0 4px',
                  color: '#616161',
                  zIndex: 1,
                  pointerEvents: 'none'
                }}>
                  Province
                </label>

                <div style={{
                  position: 'absolute',
                  top: '8px',
                  bottom: '8px',
                  right: '36px',
                  width: '0.25px',
                  height: '35%',
                  backgroundColor: '#89898980'
                }} />

                <div style={{
                  position: 'absolute',
                  right: '10px',
                  top: '22%',
                  transform: 'translateY(-50%)',
                  pointerEvents: 'none',
                  width: '12px',
                  height: '12px'
                }}>
                  <img src={down} alt="Dropdown Arrow" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>

                <StyledSelect 
                  value={form.province}
                  onChange={(e) => handleInputChange('province', e.target.value)}
                  error={errors.province}
                  title={errors.province || ''}
                  style={{
                    width: '100%',
                    padding: '16px 10px 8px 10px',
                    fontSize: 14,
                    borderRadius: 0,
                    appearance: 'none',
                    backgroundColor: 'transparent',
                    paddingRight: '30px',
                    boxSizing: 'border-box',
                    height: 'auto'
                  }}
                >
                  <option value="" disabled>province</option>
                  <option value="AB">Alberta</option>
                  <option value="NL">Newfoundland</option>
                  <option value="ON">Ontario</option>
                  <option value="QC">Quebec</option>
                </StyledSelect>
                <div style={{ minHeight: 18, color: '#e74c3c', fontSize: 12, marginBottom: 8 }}>
    {errors.province || ''}
  </div>
              </div>
            </div>

            <div style={{ position: 'relative', flex: 1, marginBottom:4 }}>
              <label style={{
                position: 'absolute',
                top: 6,
                left: 7,
                fontSize: 10,
                backgroundColor: '#fff',
                padding: '0 4px',
                color: '#616161',
                zIndex: 1,
                pointerEvents: 'none',
              }}>
                Country/Region
              </label>

              <div style={{
                  position: 'absolute',
                  top: '8px',
                  bottom: '8px',
                  right: '36px',
                  width: '0.25px',
                  height: '45%',
                  backgroundColor: '#89898980'
                }} />

                <div style={{
                  position: 'absolute',
                  right: '10px',
                  top: '25%',
                  transform: 'translateY(-50%)',
                  pointerEvents: 'none',
                  width: '12px',
                  height: '12px'
                }}>
                <img src={down} alt="Dropdown Arrow" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>

              <StyledSelect 
                value={form.country}
                onChange={(e) => handleInputChange('country', e.target.value)}
                error={errors.country}
                title={errors.country || ''}
                style={{
                  width: '100%',
                  padding: '16px 10px 8px 10px',
                  fontSize: 14,
                  borderRadius: 0,
                  appearance: 'none',
                  backgroundColor: 'transparent',
                  paddingRight: '30px',
                  boxSizing: 'border-box',
                  height: 'auto'
                }}
              >
                <option value="" disabled>Select</option>
                <option value="Italy">Italy</option>
                <option value="Georgia">Georgia</option>
                <option value="Japan">Japan</option>
                <option value="USA">USA</option>
                <option value="China">China</option>
              </StyledSelect>
              <div style={{ minHeight: 18, color: '#e74c3c', fontSize: 12, marginBottom: 8 }}>
    {errors.country || ''}
  </div>
            </div>

            <label style={{ fontSize: 12 }}>
              <input 
                type="checkbox" 
                checked={form.saveInfo}
                onChange={(e) => handleInputChange('saveInfo', e.target.checked)}
                style={{ marginRight: 8 }} 
              />
              Save this information for a future fast checkout
            </label>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
               marginTop: 45,
              borderTop: '1px solid #e0e0e0',
              paddingTop: 24
            }}>
              <button
                onClick={onBack}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#56B280',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontSize: 16,
                  padding: '12px 0',
                  textDecoration: 'underline'
                }}
              >
                Back to cart
              </button>
              <button
                onClick={handleContinue}
                style={{
                  background: '#56B280',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 6,
                  padding: '12px 32px',
                  fontWeight: 600,
                  fontSize: 16,
                  cursor: 'pointer'
                }}
              >
                Go to shipping
              </button>
            </div>
          </div>
        </div>
      </div>


      

      {/* Right Side */}
      <div style={{
        flex: 1,
        padding: 40,
        background: '#F2F2F2',
        maxWidth: '50%',
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}>
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
            <span style={{ color: '#666' }}>total</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div style={{
            marginBottom: 44,
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 14
          }}>
            <span style={{ color: '#616161' }}>Shipping</span>
            <span style={{ color: '#616161' }}>Calculated at the next step</span>
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
            <span>${subtotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingInfoPage;