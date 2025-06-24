import React, { useState } from 'react';

const styles = {
  pdpRoot: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#FFFFFF',
  },
  pdpOuter: {
    width: 1440,
    height: 853,
    background: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
  },
  pdpImagePlaceholder: {
    width: 610,
    height: 511,
    background: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
  },
  pdpTitlePlaceholder: {
    width: '60%',
    height: 36,
    background: '#FFFFFF',
    marginBottom: 16,
    borderRadius: 4,
    border: '1px solid #e0e0e0',
  },
  pdpSubtitlePlaceholder: {
    width: '40%',
    height: 28,
    background: '#FFFFFF',
    marginBottom: 32,
    borderRadius: 4,
    border: '1px solid #e0e0e0',
  },
  pdpLabel: {
    fontWeight: 700,
    fontSize: 16,
    marginBottom: 8,
  },
  pdpSizes: {
    display: 'flex',
    gap: 12,
    marginBottom: 32,
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
  },
  pdpSizeBtnSelected: {
    border: '2px solid #1D1F22',
    background: '#1D1F22',
    color: '#fff',
  },
  pdpPricePlaceholder: {
    width: '30%',
    height: 28,
    background: '#FFFFFF',
    marginBottom: 24,
    borderRadius: 4,
    border: '1px solid #e0e0e0',
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
  },
  pdpDescPlaceholder: {
    width: '100%',
    height: 60,
    background: '#FFFFFF',
    borderRadius: 4,
    border: '1px solid #e0e0e0',
  },
};

const ProductDetailPage = () => {
  const [selectedSize, setSelectedSize] = useState('S');
  const sizes = ['XS', 'S', 'M', 'L'];
  const images = [
    'https://via.placeholder.com/79x80?text=1',
    'https://via.placeholder.com/79x80?text=2',
    'https://via.placeholder.com/79x80?text=3'
  ];

  return (
    <div>
      <div style={styles.pdpRoot}>
        <div style={styles.pdpOuter}>
          {/* Flex row: thumbnails + main content */}
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            {/* Thumbnails */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginRight: '16px' }}>
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  width={79}
                  height={80}
                  style={{ objectFit: 'cover', border: '1px solid #ccc', borderRadius: 2 }}
                />
              ))}
            </div>
            {/* Main content */}
            <div style={styles.pdpInner}>
              {/* Left: Placeholder for Product Image */}
              <div style={styles.pdpImagePlaceholder}>
                <span style={styles.pdpImagePlaceholderText}>
                  Image Placeholder
                </span>
              </div>
              {/* Right: Placeholder for Product Info */}
              <div style={styles.pdpInfo}>
                <div style={styles.pdpTitlePlaceholder} />
                <div style={styles.pdpSubtitlePlaceholder} />
                <div style={styles.pdpLabel}>SIZE:</div>
                <div style={styles.pdpSizes}>
                  {sizes.map(size => (
                    <button
                      key={size}
                      style={
                        selectedSize === size
                          ? { ...styles.pdpSizeBtn, ...styles.pdpSizeBtnSelected }
                          : styles.pdpSizeBtn
                      }
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                <div style={styles.pdpLabel}>PRICE:</div>
                <div style={styles.pdpPricePlaceholder} />
                <button
                  type="button"
                  style={styles.pdpAddToCart}
                  // No onClick handler
                >
                  ADD TO CART
                </button>
                <div style={styles.pdpDescPlaceholder} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;



