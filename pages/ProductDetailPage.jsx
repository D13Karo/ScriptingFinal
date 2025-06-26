import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
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
import { useCategory } from './NavigationBar.jsx';

const styles = {
  pdpRoot: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#FFFFFF',
    fontFamily: 'Raleway, sans-serif'
  },
  pdpOuter: {
    width: 1440,
    height: 853,
    background: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Raleway, sans-serif'
  },
  pdpInner: {
    width: 1002,
    height: 592,
    background: '#FFFFFF',
    marginTop: -80,
    display: 'flex',
    boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
    borderRadius: 4,
    overflow: 'hidden',
    fontFamily: 'Raleway, sans-serif'
  },
  pdpImagePlaceholder: {
    width: 610,
    height: 511,
    background: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Raleway, sans-serif'
  },
  pdpImagePlaceholderText: {
    color: '#888',
    fontSize: 20,
    fontWeight: 500,
  },
  pdpInfo: {
    flex: 1,
    padding: '40px 40px 40px 32px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    fontFamily: 'Raleway, sans-serif'
  },
  pdpTitlePlaceholder: {
    width: '60%',
    height: 36,
    background: '#FFFFFF',
    marginBottom: 16,
    borderRadius: 4,
    border: '1px solid #e0e0e0',
    fontFamily: 'Raleway, sans-serif'
  },
  pdpSubtitlePlaceholder: {
    width: '40%',
    height: 28,
    background: '#FFFFFF',
    marginBottom: 32,
    borderRadius: 4,
    border: '1px solid #e0e0e0',
    fontFamily: 'Raleway, sans-serif'
  },
  pdpLabel: {
    fontWeight: 700,
    fontSize: 16,
    marginBottom: 8,
    fontFamily: 'Raleway, sans-serif'
  },
  pdpSizes: {
    display: 'flex',
    gap: 12,
    marginBottom: 32,
    fontFamily: 'Raleway, sans-serif'
  },
  pdpSizeBtn: {
    width: 52,
    height: 36,
    border: '1px solid #1D1F22',
    background: '#FFFFFF',
    color: '#1D1F22',
    fontWeight: 400,
    fontSize: 16,
    cursor: 'pointer',
    outline: 'none',
    transition: 'all 0.15s',
    fontFamily: 'Raleway, sans-serif'
  },
  pdpSizeBtnSelected: {
    border: '2px solid #1D1F22',
    background: '#1D1F22',
    color: '#fff',
    fontFamily: 'Raleway, sans-serif'
  },
  pdpPricePlaceholder: {
    width: '30%',
    height: 28,
    background: '#FFFFFF',
    marginBottom: 24,
    borderRadius: 4,
    border: '1px solid #e0e0e0',
    fontFamily: 'Raleway, sans-serif'
  },
  pdpAddToCart: {
    display: 'inline-block',
    width: '100%',
    height: 52,
    background: '#5ECE7B',
    color: '#fff',
    fontWeight: 600,
    fontSize: 16,
    border: 'none',
    borderRadius: 2,
    marginBottom: 24,
    cursor: 'pointer',
    textAlign: 'center',
    lineHeight: '52px',
    textDecoration: 'none',
    fontFamily: 'Raleway, sans-serif'
  },
  pdpDescPlaceholder: {
    width: '100%',
    height: 60,
    background: '#FFFFFF',
    borderRadius: 4,
    border: '1px solid #e0e0e0',
    fontFamily: 'Raleway, sans-serif'
  },
};

const allProducts = [
  { id: 1, name: "Summer Top", price: 30.00, image: summerTop, 
    explanation: "Light T-shirt for Summer", 
    description: "A light and breezy T-shirt designed for hot summer days. Perfect for casual outings and daily wear." },
  { id: 2, name: "Blue Top With Flower", price: 45.00, image: blueTopFlower, 
    explanation: "Floral Women's Top", 
    description: "A stylish blue top featuring a floral pattern, ideal for spring and summer events." },
  { id: 3, name: "Black Blouse", price: 75.00, image: blackBlouse, 
    explanation: "Elegant Women's Blouse", 
    description: "An elegant black blouse suitable for both formal and casual occasions." },
  { id: 4, name: "Green mini skirt", price: 55.00, image: greenSkirt, 
    explanation: "Trendy Women's Skirt", 
    description: "A trendy green mini skirt, perfect for summer days and fashionable looks." },
  { id: 5, name: "The Cure T-Shirt", price: 45.00, image: CureTShirt, 
    explanation: "Band Merchandise", 
    description: "Official band T-shirt for The Cure fans. Classic fit, comfortable cotton." },
  { id: 6, name: "The Cure T-Shirt Black", price: 50.00, image: CureTShirtBlack, 
    explanation: "Limited Edition", 
    description: "Limited edition black T-shirt for The Cure fans, featuring exclusive artwork." },
  { id: 7, name: "Dark Blue Jeans", price: 95.00, image: DarkBlueJeans, 
    explanation: "Classic Denim", 
    description: "Durable and stylish dark blue jeans, a timeless addition to any wardrobe." },
  { id: 8, name: "Light Blue Baggy Jeans", price: 80.00, image: LightBlueBaggyJeans, 
    explanation: "Relaxed Fit", 
    description: "Baggy light blue jeans for a relaxed, comfortable fit and casual style." },
  { id: 9, name: "Pink Bag", price: 50.00, image: GirlBag, 
    explanation: "Kids' Accessory", 
    description: "A cute and lightweight pink bag, perfect for kids to carry their essentials." },
  { id: 10, name: "Hello Kitty Dress", price: 80.00, image: GirlCloth, 
    explanation: "Themed Kids' Dress", 
    description: "A Hello Kitty themed dress, perfect for young fans and special occasions." },
  { id: 11, name: "White Converse", price: 130.00, image: GirlShoes, 
    explanation: "Classic Sneakers", 
    description: "Timeless white Converse sneakers, suitable for all ages and styles." },
  { id: 12, name: "Red Bag", price: 50.00, image: BoyBag, 
    explanation: "Boys' Accessory", 
    description: "A sturdy and practical red bag for boys, ideal for school or outings." },
  { id: 13, name: "Set For Boys", price: 100.00, image: BoyCloth, 
    explanation: "Shirt and Shorts Combo", 
    description: "A comfortable clothing set for boys, includes a shirt and matching shorts." },
  { id: 14, name: "Addidas Samba black", price: 150.00, image: BoyShoes, 
    explanation: "Iconic Football Shoes", 
    description: "Iconic Adidas Samba black shoes, designed for football and casual wear." }
];


const ProductDetailPage = () => {
  const { id } = useParams();
  const product = allProducts.find(p => p.id === Number(id));
  const { setCartItems } = useCategory();

  const [selectedSize, setSelectedSize] = useState('S');
  const sizes = ['XS', 'S', 'M', 'L'];
  const images = [product.image, product.image, product.image];

  if (!product) {
    return <div style={{ padding: 40, fontFamily: 'Raleway, sans-serif' }}>Product not found.</div>;
  }

  // Add to cart handler
  const handleAddToCart = () => {
    if (!setCartItems) return; // Defensive: ensure setCartItems exists

    setCartItems(prevCart => {
      // Always treat prevCart as an array
      const cart = Array.isArray(prevCart) ? prevCart : [];
      // Find if item with same id and size exists
      const idx = cart.findIndex(
        (item) => item.id === product.id && item.size === selectedSize
      );
      if (idx !== -1) {
        // Increase quantity if exists
        return cart.map((item, i) =>
          i === idx ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Add new item
        return [
  ...cart,
  {
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
    size: selectedSize,
    quantity: 1,
    description: product.explanation
  }
];

      }
    });
  };

  return (
    <div style={styles.pdpRoot}>
      <style>{`
        @import url('https://fonts.googleapis.com/css?family=Raleway:400,700&display=swap');
      `}</style>
      <div style={styles.pdpOuter}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginRight: '16px' }}>
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                width={79}
                height={80}
                style={{ objectFit: 'cover', border: '1px solid #ccc', borderRadius: 2, fontFamily: 'Raleway, sans-serif' }}
              />
            ))}
          </div>
          <div style={styles.pdpInner}>
            <div style={styles.pdpImagePlaceholder}>
              <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'contain', fontFamily: 'Raleway, sans-serif' }} />
            </div>
            <div style={styles.pdpInfo}>
              <h1 style={{ fontWeight: 700, fontSize: 32, margin: 0, fontFamily: 'Raleway, sans-serif' }}>{product.name}</h1>
              <div style={{ color: '#888', fontSize: 18, margin: '12px 0 24px', fontWeight: 400, fontFamily: 'Raleway, sans-serif', fontStyle: 'normal' }}>{product.explanation}</div>
              <div style={{ ...styles.pdpLabel, fontWeight: 700, paddingLeft: 0, alignSelf: 'flex-start' }}>SIZE:</div>
              <div style={{ ...styles.pdpSizes, paddingLeft: 0, alignSelf: 'flex-start' }}>
                {sizes.map(size => (
                  <button
                    key={size}
                    style={
                      selectedSize === size
                        ? { ...styles.pdpSizeBtn, ...styles.pdpSizeBtnSelected, fontWeight: 400 }
                        : { ...styles.pdpSizeBtn, fontWeight: 400 }
                    }
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <div style={{ height: 64 }} />
              <div style={{ ...styles.pdpLabel, fontWeight: 700, paddingLeft: 0, alignSelf: 'flex-start', marginBottom: 0 }}>PRICE:</div>
              <div style={{ ...styles.pdpPricePlaceholder, fontWeight: 700, border: 'none', paddingLeft: 0, alignSelf: 'flex-start', marginTop: 4 }}>
                ${product.price.toFixed(2)}
              </div>
              <button
                type="button"
                style={{ ...styles.pdpAddToCart, fontWeight: 400 }}
                onClick={handleAddToCart}
              >
                ADD TO CART
              </button>
              <div style={{ 
                ...styles.pdpDescPlaceholder, 
                display: 'flex', 
                alignItems: 'center', 
                color: '#444', 
                fontSize: 16, 
                fontWeight: 400, 
                padding: '0 16px',
                border: 'none',
                background: '#fff',
                fontFamily: 'Raleway, sans-serif'
              }}>
                {product.description}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
