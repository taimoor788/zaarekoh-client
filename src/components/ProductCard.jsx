import React from 'react';
import { Link } from 'react-router-dom';
import { resolveImageUrl } from '../utils/config';

const ProductCard = ({ product }) => {

    const styles = {
        card: {
            background: 'var(--color-bg-card)',
            borderRadius: '8px',
            overflow: 'hidden',
            transition: 'transform var(--transition-normal), box-shadow var(--transition-normal)',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            boxShadow: 'var(--shadow-sm)',
        },
        imageContainer: {
            width: '100%',
            paddingTop: '100%', /* 1:1 Aspect Ratio */
            position: 'relative',
            background: '#2a2a2a',
        },
        image: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform var(--transition-normal)',
        },
        content: {
            padding: '1.5rem',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
        },
        title: {
            fontSize: '1.1rem',
            fontWeight: '600',
            marginBottom: '0.5rem',
            color: 'var(--color-text-primary)',
        },
        price: {
            fontSize: '1.25rem',
            color: 'var(--color-text-accent)',
            fontWeight: '700',
        },
        button: {
            marginTop: '1rem',
            width: '100%',
            padding: '0.75rem',
            background: 'transparent',
            border: '1px solid var(--color-border)',
            color: 'var(--color-text-primary)',
            borderRadius: '4px',
            transition: 'all var(--transition-fast)',
        }
    };

    return (
        <div
            className="product-card"
            style={styles.card}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                e.currentTarget.querySelector('img').style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                e.currentTarget.querySelector('img').style.transform = 'scale(1)';
            }}
        >
            <Link to={`/product/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={styles.imageContainer}>
                    <img
                        src={resolveImageUrl(product.image)}
                        alt={product.name}
                        style={styles.image}
                    />
                </div>
            </Link>
            <div style={styles.content}>
                <div>
                    <Link to={`/product/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <h3 style={styles.title}>{product.name}</h3>
                    </Link>
                    <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>{product.category}</p>
                </div>
                <div>
                    <span style={styles.price}>${product.price}</span>
                    <Link
                        to={`/product/${product._id}`}
                        style={{ ...styles.button, display: 'block', textAlign: 'center', textDecoration: 'none' }}
                        onMouseEnter={(e) => {
                            e.target.style.background = 'var(--color-primary)';
                            e.target.style.borderColor = 'var(--color-primary)';
                            e.target.style.color = '#000';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.background = 'transparent';
                            e.target.style.borderColor = 'var(--color-border)';
                            e.target.style.color = 'var(--color-text-primary)';
                        }}
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
