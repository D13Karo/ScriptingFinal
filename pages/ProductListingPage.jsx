import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import summerTop from './images/SummerTop.jpg'; 
import blueTopFlower from './images/BlueTop.jpg';
import blackBlouse from './images/BlackBlouse.jpg';
import greenSkirt from './images/GreenSkirt.jpg';
import CureTShirt from './images/TheCureTShirt.jpg';
import CureTShirtBlack from './images/TheCureTShirtBlack.jpg';
import DarkBlueJeans from './images/DarkDenimJeans.jpg';
import LightBlueBaggyJeans from './images/LightBlueBaggyJeans.jpg';
import GirlBag from './images/GirlBag.jpg';
import GirlCloth from './images/GirlCloth.jpg';
import GirlShoes from './images/GirlShoes.jpg';
import BoyBag from './images/BoyBag.jpg';
import BoyCloth from './images/BoyCloth.jpg';
import BoyShoes from './images/BoyShoes.jpg';
import { CiShoppingCart } from "react-icons/ci";
import { useCategory } from './NavigationBar.jsx';

const CartIcon = () => (
  <span
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#4caf50',
      borderRadius: '50%',
      width: '44px',
      height: '44px',
      minWidth: '44px',
      minHeight: '44px',
      maxWidth: '44px',
      maxHeight: '44px',
      boxShadow: '0 2px 8px rgba(76,175,80,0.15)',
      fontFamily: 'Raleway, sans-serif'
    }}
    className="raleway-font"
  >
    <CiShoppingCart size={22} color="#fff" style={{display: 'block'}} />
  </span>
);

const ProductListingPage = () => {
  const [categories] = useState([
    {
      name: "WOMEN",
      products: [
        { id: 1, name: "Summer Top", price: 30.00, image: summerTop, inStock: true },
        { id: 2, name: "Blue Top With Flower", price: 45.00, image: blueTopFlower, inStock: false },
        { id: 3, name: "Black Blouse", price: 75.00, image: blackBlouse, inStock: true },
        { id: 4, name: "Green mini skirt", price: 55.00, image: greenSkirt, inStock: true }
      ]
    },
    {
      name: "MEN",
      products: [
        { id: 5, name: "The Cure T-Shirt", price: 45.00, image: CureTShirt, inStock: true },
        { id: 6, name: "The Cure T-Shirt Black", price: 50.00, image: CureTShirtBlack, inStock: true },
        { id: 7, name: "Dark Blue Jeans", price: 95.00, image: DarkBlueJeans, inStock: false },
        { id: 8, name: "Light Blue Baggy Jeans", price: 80.00, image: LightBlueBaggyJeans, inStock: true },
      ]
    },
    {
      name: "KIDS",
      products: [
        { id: 9, name: "Pink Bag", price: 50.00, image: GirlBag, inStock: true },
        { id: 10, name: "Hello Kitty Dress", price: 80.00, image: GirlCloth, inStock: true },
        { id: 11, name: "White Converse", price: 130.00, image: GirlShoes, inStock: false },
        { id: 12, name: "Red Bag", price: 50.00, image: BoyBag, inStock: true },
        { id: 13, name: "Set For Boys", price: 100.00, image: BoyCloth, inStock: true },
        { id: 14, name: "Addidas Samba black", price: 150.00, image: BoyShoes, inStock: true }        
      ]
    }
  ]);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const navigate = useNavigate();
  const { activeCategory } = useCategory();
  const currentCategory = categories.find(e => e.name === activeCategory) || categories[0];

  const handleAddToCart = (productId) => {
    console.log(`Added product ${productId} to cart`);
  };

  const openProductDetail = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css?family=Raleway:400,700&display=swap');
        .raleway-font { font-family: 'Raleway', sans-serif !important; }
        .product-listing-container, .category-header, .category-title, .products-grid, .product-card, .product-image, .add-to-cart-btn, .product-info, .product-name, .product-price, .out-of-stock-overlay, .category-selector, .category-btn {
          font-family: 'Raleway', sans-serif !important;
        }
        .product-listing-container {
          padding: 40px 40px 0 40px;
          background: #fff;
          min-height: 100vh;
        }
        .category-header {
          margin-bottom: 0;
        }
        .category-title {
          width: 299px;
          height: 68px;
          position: relative;
          top: 0;
          left: 76px;
          font-family: 'Raleway', sans-serif;
          font-weight: 300;
          font-size: 42px;
          line-height: 160%;
          letter-spacing: 0;
          vertical-align: middle;
          color: #1D1F22;
          margin-bottom: 8px;
          text-align: left;
        }
        .products-grid {
          display: grid;
          grid-template-columns: repeat(3, 386px);
          gap: 60px 40px;
          justify-content: center;
          margin-left: auto;
          margin-right: auto;
          margin-bottom: 80px;
        }
        .product-card {
          background: #fff;
          border-radius: 0;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.07);
          border: 2px solid transparent;
          transition: box-shadow 0.2s, border-color 0.2s, transform 0.2s;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: stretch;
          width: 386px;
          height: 444px;
          position: relative;
          top: 30px;
          left: 0;
        }
        .product-card:hover {
          box-shadow: 0 4px 16px rgba(255,60,172,0.12);
          transform: translateY(-4px) scale(1.02);
        }
        .product-image {
          position: relative;
          width: 354px;
          height: 330px;
          background: #fafafa;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          margin: 24px auto 16px auto;
        }
        .product-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s;
        }
        .product-card:hover .product-image img {
          transform: scale(1.04);
        }
        .add-to-cart-overlay {
          position: absolute;
          bottom: 18px;
          right: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }
        .add-to-cart-btn {
          background: #4caf50;
          border: none;
          border-radius: 50%;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 0;
          box-shadow: 0 2px 8px rgba(76,175,80,0.15);
          cursor: pointer;
          pointer-events: auto;
          transition: background 0.2s, box-shadow 0.2s;
          padding: 0;
        }
        .add-to-cart-btn:hover {
          background: #388e3c;
          box-shadow: 0 4px 16px rgba(76,175,80,0.18);
        }
        .add-to-cart-btn svg {
          width: 22px;
          height: 22px;
          fill: #fff;
        }
        .product-info {
          padding: 0 16px;
          text-align: left;
          width: 354px;
          height: 58px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          background: #fff;
        }
        .product-name {
          margin: 0;
          width: 354px;
          height: 29px;
          font-family: 'Raleway';
          font-size: 18px;
          font-weight: 400;
          line-height: 160%;
          letter-spacing: 0;
          color: #1D1F22;
          background: transparent;
          display: flex;
          align-items: center;
          vertical-align: middle;
          padding: 0 8px;
          box-sizing: border-box;
        }
        .product-price {
          margin: 0;
          width: 58px;
          height: 29px;
          font-size: 18px;
          font-weight: 400;
          font-family: 'Raleway';
          line-height: 160%;
          letter-spacing: 0;
          color: #222;
          display: flex;
          align-items: center;
          vertical-align: middle;
          background: transparent;
          padding-left: 8px;
        }
        .out-of-stock-overlay {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(255,255,255,0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Raleway';
          font-size: 10px;
          color: #8d8f9a;
          z-index: 2;
          pointer-events: none;
        }
      `}</style>
      <div className="product-listing-container raleway-font">
        <div className="category-header raleway-font">
          <h1 className="category-title raleway-font">{currentCategory.name}</h1>
        </div>
        <div className="products-grid raleway-font">
          {currentCategory.products.map(product => (
            <div 
              key={product.id}
              className={`product-card raleway-font${!product.inStock ? ' out-of-stock' : ''}`}
              onMouseEnter={() => product.inStock && setHoveredProduct(product.id)}
              onMouseLeave={() => product.inStock && setHoveredProduct(null)}
              onClick={() => product.inStock && openProductDetail(product.id)}
              style={{ pointerEvents: product.inStock ? 'auto' : 'none', opacity: product.inStock ? 1 : 0.6 }}
            >
              <div className="product-image raleway-font">
                <img src={product.image} alt={product.name} className="raleway-font" />
                {!product.inStock && (
                  <div className="out-of-stock-overlay raleway-font" style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(255,255,255,0.7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    fontSize: 22,
                    color: '#8d8f9a',
                    zIndex: 2
                  }}>
                    OUT OF STOCK
                  </div>
                )}
                {hoveredProduct === product.id && product.inStock && (
                  <div className="add-to-cart-overlay raleway-font">
                    <button 
                      className="add-to-cart-btn raleway-font"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(product.id);
                      }}
                    >
                      <CartIcon />
                    </button>
                  </div>
                )}
              </div>
              <div className="product-info raleway-font">
                <h3 className="product-name raleway-font">{product.name}</h3>
                <p className="product-price raleway-font">${product.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductListingPage;
