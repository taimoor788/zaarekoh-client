import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import { BASE_URL } from '../utils/config';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState('');
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        window.scrollTo(0, 0);
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [id]);

    useEffect(() => {
        // Fetch product from mock API
        const fetchProduct = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/products`);
                const products = await response.json();
                const foundProduct = products.find(p => p._id === id);
                setProduct(foundProduct);
                if (foundProduct) {
                    setSelectedImage(foundProduct.image);
                    // Filter related products (exclude current one, show top 4)
                    const related = products.filter(p => p._id !== id).slice(0, 4);
                    setRelatedProducts(related);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching product:', error);
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleBuyNow = () => {
        addToCart(product);
        navigate('/checkout');
    };

    if (loading) return <div className="container" style={{ padding: '4rem' }}>Loading...</div>;
    if (!product) return <div className="container" style={{ padding: '4rem' }}>Product not found</div>;

    return (
        <div className="container" style={{ padding: '2rem 1rem' }}>
            <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                gap: isMobile ? '2rem' : '4rem',
                alignItems: 'start',
                marginTop: '1rem'
            }}>
                {/* Image Section */}
                <div>
                    <div
                        style={{
                            borderRadius: '12px',
                            overflow: 'hidden',
                            boxShadow: 'var(--shadow-md)',
                            marginBottom: '1rem',
                            aspectRatio: '1/1',
                            background: '#f5f5f5',
                            position: 'relative',
                            cursor: 'zoom-in'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.querySelector('img').style.transform = 'scale(1.3)';
                            e.currentTarget.querySelector('.nav-btn-prev').style.opacity = '1';
                            e.currentTarget.querySelector('.nav-btn-next').style.opacity = '1';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.querySelector('img').style.transform = 'scale(1)';
                            e.currentTarget.querySelector('.nav-btn-prev').style.opacity = '0';
                            e.currentTarget.querySelector('.nav-btn-next').style.opacity = '0';
                        }}
                        onMouseMove={(e) => {
                            const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
                            const x = ((e.pageX - left) / width) * 100;
                            const y = ((e.pageY - top) / height) * 100;
                            e.currentTarget.querySelector('img').style.transformOrigin = `${x}% ${y}%`;
                        }}
                    >
                        <img
                            src={selectedImage || product.image}
                            alt={product.name}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                                display: 'block',
                                transition: 'transform 0.3s ease-out'
                            }}
                        />

                        {/* Carousel Buttons */}
                        <button
                            className="nav-btn-prev"
                            onClick={(e) => {
                                e.stopPropagation();
                                const currentIndex = product.images.indexOf(selectedImage || product.image);
                                const prevIndex = (currentIndex - 1 + product.images.length) % product.images.length;
                                setSelectedImage(product.images[prevIndex]);
                            }}
                            style={{
                                position: 'absolute',
                                left: '10px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                background: 'rgba(255, 255, 255, 0.8)',
                                border: 'none',
                                borderRadius: '50%',
                                width: '40px',
                                height: '40px',
                                cursor: 'pointer',
                                fontSize: '1.2rem',
                                opacity: 0,
                                transition: 'opacity 0.2s',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                            }}
                        >
                            &#8249;
                        </button>
                        <button
                            className="nav-btn-next"
                            onClick={(e) => {
                                e.stopPropagation();
                                const currentIndex = product.images.indexOf(selectedImage || product.image);
                                const nextIndex = (currentIndex + 1) % product.images.length;
                                setSelectedImage(product.images[nextIndex]);
                            }}
                            style={{
                                position: 'absolute',
                                right: '10px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                background: 'rgba(255, 255, 255, 0.8)',
                                border: 'none',
                                borderRadius: '50%',
                                width: '40px',
                                height: '40px',
                                cursor: 'pointer',
                                fontSize: '1.2rem',
                                opacity: 0,
                                transition: 'opacity 0.2s',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                            }}
                        >
                            &#8250;
                        </button>
                    </div>

                    {/* Gallery Thumbnails */}
                    {product.images && product.images.length > 0 && (
                        <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                            {product.images.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt={`${product.name} view ${index + 1}`}
                                    onClick={() => setSelectedImage(img)}
                                    style={{
                                        width: '80px',
                                        height: '80px',
                                        objectFit: 'cover',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        border: (selectedImage || product.image) === img ? '2px solid var(--color-primary)' : '2px solid transparent',
                                        opacity: (selectedImage || product.image) === img ? 1 : 0.6,
                                        transition: 'all 0.2s',
                                        transform: (selectedImage || product.image) === img ? 'scale(1.05)' : 'scale(1)'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.opacity = 1;
                                        e.target.style.transform = 'scale(1.05)';
                                    }}
                                    onMouseLeave={(e) => {
                                        const isSelected = (selectedImage || product.image) === img;
                                        e.target.style.opacity = isSelected ? 1 : 0.6;
                                        e.target.style.transform = isSelected ? 'scale(1.05)' : 'scale(1)';
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Details Section */}
                <div>
                    <div style={{ marginBottom: '2rem' }}>
                        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>{product.name}</h1>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '1.5rem', fontSize: '0.95rem', color: 'var(--color-text-secondary)' }}>
                            <span>Brand: <strong style={{ color: 'var(--color-text-primary)' }}>Zaar-e-Koh</strong></span>
                            <span>Size: <strong style={{ color: 'var(--color-text-primary)' }}>{product.size || 'Standard'}</strong></span>
                            <span>
                                Availability: {' '}
                                <strong style={{ color: product.countInStock > 0 ? '#10B981' : '#EF4444' }}>
                                    {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                </strong>
                            </span>
                        </div>
                        <p style={{ fontSize: '1.5rem', color: 'var(--color-text-accent)', fontWeight: 'bold' }}>
                            Rs. {product.price}
                        </p>
                    </div>

                    <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--color-text-secondary)', marginBottom: '3rem' }}>
                        {product.description}
                    </p>

                    <div style={{ display: 'flex', alignItems: 'end', gap: '1.5rem', marginBottom: '2rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.9rem' }}>Quantity</label>
                            <select
                                style={{
                                    padding: '0.9rem',
                                    width: '80px',
                                    borderRadius: '6px',
                                    border: '1px solid var(--color-border)',
                                    backgroundColor: 'var(--color-bg-card)',
                                    color: 'var(--color-text-primary)',
                                    cursor: 'pointer'
                                }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                {[...Array(Math.min(product.countInStock || 0, 10)).keys()].map(x => (
                                    <option key={x + 1} value={x + 1}>{x + 1}</option>
                                ))}
                            </select>
                        </div>
                        <button
                            className="btn-primary"
                            style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}
                            onClick={() => {
                                const qty = Number(document.querySelector('select').value);
                                addToCart({ ...product, qty });
                            }}
                            disabled={product.countInStock === 0}
                        >
                            {product.countInStock === 0 ? 'Out of Stock' : 'Add to Cart'}
                        </button>
                        <button
                            className="btn-primary"
                            style={{
                                padding: '1rem 2.5rem',
                                fontSize: '1.1rem',
                                backgroundColor: '#2a2a2a',
                                borderColor: '#2a2a2a',
                                opacity: product.countInStock === 0 ? 0.5 : 1,
                                cursor: product.countInStock === 0 ? 'not-allowed' : 'pointer'
                            }}
                            onClick={() => {
                                if (product.countInStock > 0) {
                                    const qty = Number(document.querySelector('select').value);
                                    addToCart({ ...product, qty });
                                    navigate('/checkout');
                                }
                            }}
                            disabled={product.countInStock === 0}
                        >
                            Buy Now
                        </button>
                    </div>

                    <div style={{ marginTop: '3rem', padding: '2rem', backgroundColor: 'var(--color-bg-primary)', borderRadius: '8px' }}>
                        <h3 style={{ marginBottom: '1rem' }}>Product Highlights</h3>
                        <ul style={{ listStylePosition: 'inside', lineHeight: '1.6' }}>
                            {product.highlights && product.highlights.length > 0 ? (
                                product.highlights.map((highlight, index) => (
                                    <li key={index}>{highlight}</li>
                                ))
                            ) : (
                                <>
                                    <li>100% Pure Himalayan Shilajit</li>
                                    <li>Lab Tested for Safety</li>
                                    <li>Rich in Minerals & Fulvic Acid</li>
                                    <li>Sourced from 16,000+ ft Altitude</li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Related Products Section */}
            <div style={{ marginTop: '6rem', borderTop: '1px solid var(--color-border)', paddingTop: '4rem' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: 'var(--color-primary)' }}>Related Products</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '2rem' }}>
                    {relatedProducts.map(product => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
