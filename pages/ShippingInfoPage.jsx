
import React, { useState } from 'react';

const ShippingInfoPage = () => {

  const navigate = (path) => {
    console.log(`Simulating navigation to: ${path}`);
  };

  const [formData, setFormData] = useState({
    emailOrPhone: '',
    firstName: '',
    lastName: '',
    address: '',
    shippingNote: '',
    city: '',
    postalCode: '',
    province: '',
    country: 'Italy',
    saveInfo: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const validate = () => {
    let newErrors = {};
    let isValid = true;
    if (!formData.emailOrPhone.trim()) {
      newErrors.emailOrPhone = 'Email or mobile phone number is required.';
      isValid = false;
    }
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required.';
      isValid = false;
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required.';
      isValid = false;
    }
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required.';
      isValid = false;
    }
    if (!formData.city.trim()) {
      newErrors.city = 'City is required.';
      isValid = false;
    }
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = 'Postal code is required.';
      isValid = false;
    }
    if (!formData.province.trim()) {
      newErrors.province = 'Province is required.';
      isValid = false;
    }
    if (!formData.country.trim()) {
      newErrors.country = 'Country is required.';
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form data submitted successfully:', formData);
      navigate('/shipping');
    } else {
      console.log('Form validation failed. Please check the errors.', errors);
    }
  };

  return (
    <>
      <style>{`
        body {
          margin: 0;
          font-family: 'Inter', sans-serif;
          background: #fff;
          min-height: 100vh;
          width: 100vw;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: stretch;
          box-sizing: border-box;
        }

        .page-wrapper {
          width: 1440px;
          min-height: 100vh;
          max-width: 1440px;
          margin-left: auto;
          margin-right: auto;
          padding: 48px 0 0 0;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          align-items: stretch;
          background: #fff;
        }

        .breadcrumb-container {
          width: 100%;
          margin-bottom: 24px;
          display: flex;
          justify-content: center;
        }

        .breadcrumb {
          display: flex;
          align-items: center;
          font-size: 14px;
          color: #666;
          max-width: 900px;
          width: 100%;
          justify-content: flex-start;
        }

        .breadcrumb .link-green {
          color: #2ecc40;
          text-decoration: none;
          font-weight: 500;
        }

        .breadcrumb .divider {
          margin: 0 8px;
          color: #ccc;
        }

        .breadcrumb .active-step {
          font-weight: 600;
          color: #333;
        }

        .shipping-info-container {
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          justify-content: flex-start;
          width: 1440px;
          font-family: sans-serif;
          background: #fff;
          box-sizing: border-box;
          gap: 60px;
          border-radius: 12px;
          box-shadow: 0 2px 16px rgba(0,0,0,0.04);
        }

        .shipping-form {
          flex: 1 1 50%;
          max-width: 600px;
          min-width: 380px;
          display: flex;
          flex-direction: column;
          background: #fafbfc;
          border-radius: 12px;
          padding: 0;
          margin-top: 48px;
          margin-left: 48px;
          align-items: flex-start;
        }

        .shipping-form h3 {
          margin-top: 32px;
          margin-bottom: 18px;
          font-size: 24px;
          color: #111;
          font-weight: 600;
        }

        .form-group {
          margin-bottom: 18px;
        }

        .form-group label {
          font-size: 15px;
          font-weight: 500;
          margin-bottom: 6px;
          display: block;
          color: #555;
        }

        .form-group input,
        .form-group select {
          width: 100%;
          height: 40px;
          padding: 0 14px;
          border: 1px solid #b7e5c6;
          border-radius: 2px;
          font-size: 18px;
          box-sizing: border-box;
          background: #fff;
          transition: border-color 0.2s;
        }

        .form-group input:focus,
        .form-group select:focus {
          outline: none;
          border-color: #2ecc40;
          box-shadow: 0 0 0 1.5px #2ecc40;
        }

        /* Ensure their parent is a flex row and they fill the box */
        .special-row {
          display: flex;
          flex-direction: row;
          gap: 12.5px;
          width: 100%;
        }

        .special-row .form-group {
          width: 440px;
          min-width: 0;
          margin-bottom: 0;
        }

        .name-fields {
          display: flex;
          gap: 12.5px;
          width: 100%;
        }

        .name-fields .form-group {
          flex: 1;
          margin-bottom: 0;
        }

        .flex-row-inputs {
          display: flex;
          gap: 12.5px;
          width: 100%;
          margin-top: 0;
        }

        .flex-row-inputs .form-group {
          flex: 1;
          margin-bottom: 0;
        }

        .checkbox {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 18px;
          margin-bottom: 32px;
          font-size: 15px;
          color: #555;
        }

        .checkbox input[type="checkbox"] {
          width: 18px;
          height: 18px;
          accent-color: #2ecc40;
        }

        .button-group {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          margin-top: 48px;
          gap: 40px;
        }

        .back-button {
          background: none;
          border: none;
          color: #2ecc40;
          text-decoration: underline;
          font-size: 18px;
          cursor: pointer;
          padding: 0;
          transition: color 0.2s;
        }

        .back-button:hover {
          color: #1e7e34;
        }

        .continue-button {
          background-color: #2ecc40;
          color: white;
          border: none;
          padding: 18px 80px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 22px;
          font-weight: 700;
          transition: background 0.2s, box-shadow 0.2s;
          box-shadow: 0 4px 12px rgba(46, 204, 64, 0.12);
        }

        .continue-button:hover {
          background-color: #1e7e34;
          box-shadow: 0 6px 16px rgba(46, 204, 64, 0.18);
        }

        .error {
          color: #e74c3c;
          font-size: 13px;
          margin-top: 4px;
          display: block;
        }

        .order-summary {
          flex: 0 0 480px;
          max-width: 480px;
          min-width: 340px;
          border-left: 1px solid #e0e0e0;
          padding-left: 56px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          background: #fff;
          margin-top: 48px;
        }

        .order-summary-product {
          display: flex;
          align-items: center;
          gap: 24px;
          margin-bottom: 24px;
          width: 100%;
        }

        .order-summary-image-wrapper {
          position: relative;
          width: 100px;
          height: 100px;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid #eee;
        }

        .order-summary img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .order-summary-quantity-badge {
          position: absolute;
          top: -8px;
          right: -8px;
          background-color: #2ecc40;
          color: white;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 15px;
          font-weight: bold;
          border: 2px solid #fff;
        }

        .order-summary-product-details h4 {
          font-size: 28px;
          margin: 0 0 8px 0;
          color: #222;
          font-weight: 400;
        }

        .order-summary-product-details .price {
          font-size: 24px;
          font-weight: 600;
          color: #2ecc40;
          margin: 0;
          margin-bottom: 8px;
        }

        .summary-breakdown {
          width: 100%;
          padding-top: 24px;
          border-top: 1px solid #e0e0e0;
        }

        .summary-breakdown p {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
          font-size: 18px;
          color: #222;
          padding: 0 8px;
          letter-spacing: 0.5px;
        }

        .summary-breakdown p span {
          font-weight: 600;
          color: #222;
          letter-spacing: 0.5px;
        }

        .summary-breakdown hr {
          border: none;
          border-top: 1px solid #e0e0e0;
          margin: 24px 0;
        }

        .total {
          font-size: 28px;
          font-weight: bold;
          color: #222;
          margin-top: 12px;
          width: 100%;
          display: flex;
          justify-content: space-between;
          padding: 0 8px;
        }

        .navbar {
          width: 1440px;
          height: 75px;
          margin-left: auto;
          margin-right: auto;
          display: flex;
          align-items: center;
          background: #fff;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
          border-radius: 12px;
          padding: 0 32px;
          box-sizing: border-box;
        }

        @media (max-width: 900px) {
          .page-wrapper {
            width: 100vw;
            max-width: 100vw;
            padding: 20px;
          }
          .breadcrumb-container {
            margin-bottom: 20px;
          }
          .shipping-info-container {
            width: 100vw;
            max-width: 100vw;
            flex-direction: column;
            align-items: stretch;
            padding: 0;
            gap: 32px;
            box-shadow: none;
            border-radius: 0;
          }
          .shipping-form {
            max-width: 100%;
            min-width: 0;
            margin-left: 0;
            margin-top: 0;
            padding: 24px 8px 20px 8px;
          }
          .order-summary {
            max-width: 100%;
            min-width: 0;
            padding-left: 0;
            padding-top: 40px;
            padding-bottom: 24px;
            border-left: none;
            border-top: 1px solid #eee;
            margin-top: 0;
          }
          .name-fields {
            flex-direction: column;
            gap: 0;
          }
          .flex-row-inputs {
            flex-direction: column;
            gap: 0;
          }
          .name-fields .form-group,
          .flex-row-inputs .form-group {
            margin-bottom: 18px;
            height: auto;
          }
          .name-fields .form-group,
          .flex-row-inputs .form-group {
            margin-bottom: 18px;
            height: auto;
          }
        }
      `}</style>
      <div className="page-wrapper">
        <div className="breadcrumb-container">
          <div className="breadcrumb">
            <a href="/cart" className="link-green">Cart</a>
            <span className="divider">›</span>
            <span className="active-step">Details</span>
            <span className="divider">›</span>
            <span>Shipping</span>
            <span className="divider">›</span>
            <span>Payment</span>
          </div>
        </div>
        <div className="shipping-info-container">
          <form className="shipping-form" onSubmit={handleSubmit}>
            <h3>Contact</h3>
            <div className="form-group">
              <input
                type="text"
                id="emailOrPhone"
                name="emailOrPhone"
                placeholder="Email or mobile phone number"
                value={formData.emailOrPhone}
                onChange={handleChange}
              />
              {errors.emailOrPhone && <span className="error">{errors.emailOrPhone}</span>}
            </div>
            <h3>Shipping Address</h3>
            <div className="name-fields">
              <div className="form-group">
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                {errors.firstName && <span className="error">{errors.firstName}</span>}
              </div>
              <div className="form-group">
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
                {errors.lastName && <span className="error">{errors.lastName}</span>}
              </div>
            </div>
            <div className="form-group">
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Address and number"
                value={formData.address}
                onChange={handleChange}
              />
              {errors.address && <span className="error">{errors.address}</span>}
            </div>
            <div className="form-group">
              <input
                type="text"
                id="shippingNote"
                name="shippingNote"
                placeholder="Shipping note (optional)"
                value={formData.shippingNote}
                onChange={handleChange}
              />
            </div>
            <div className="flex-row-inputs">
              <div className="form-group">
                <input
                  type="text"
                  id="city"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                />
                {errors.city && <span className="error">{errors.city}</span>}
              </div>
              <div className="form-group">
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  placeholder="Postal Code"
                  value={formData.postalCode}
                  onChange={handleChange}
                />
                {errors.postalCode && <span className="error">{errors.postalCode}</span>}
              </div>
              <div className="form-group">
                <select
                  id="province"
                  name="province"
                  value={formData.province}
                  onChange={handleChange}
                >
                  <option value="">Province</option>
                  <option value="RM">Rome</option>
                  <option value="MI">Milan</option>
                </select>
                {errors.province && <span className="error">{errors.province}</span>}
              </div>
            </div>
            <div className="form-group">
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
              >
                <option value="Italy">Italy</option>
                <option value="USA">USA</option>
                <option value="France">France</option>
              </select>
              {errors.country && <span className="error">{errors.country}</span>}
            </div>
            <label className="checkbox">
              <input
                type="checkbox"
                name="saveInfo"
                checked={formData.saveInfo}
                onChange={handleChange}
              />
              Save these informations for a future fast checkout
            </label>
            <div className="button-group">
              <a href="/cart" className="back-button">Back to cart</a>
              <button type="submit" className="continue-button">Go to shipping</button>
            </div>
          </form>
          <div className="order-summary">
            <div className="order-summary-product">
              <div className="order-summary-image-wrapper">
                <img src="https://placehold.co/80x80/cccccc/ffffff?text=Product" alt="product" />
                <span className="order-summary-quantity-badge">1</span>
              </div>
              <div className="order-summary-product-details">
                <h4>Running Short</h4>
                <p className="price">$ 50.00</p>
              </div>
            </div>
            <div className="summary-breakdown">
              <p>Subtotal <span>$ 50.00</span></p>
              <p>Shipping <span>Calculated at the next step</span></p>
              <hr />
              <p className="total">Total <span>$ 50.00</span></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShippingInfoPage;

