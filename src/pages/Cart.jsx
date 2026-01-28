import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { cartItems, removeFromCart, updateQty, getCartTotal } = useCart();
    const total = getCartTotal();
    const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 768);

    React.useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (cartItems.length === 0) {
        return (
            <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h2 style={{ marginBottom: '1rem', color: 'var(--color-text-primary)' }}>Your Cart is Empty</h2>
                <p style={{ marginBottom: '2rem', color: 'var(--color-text-secondary)' }}>Looks like you haven't added any Shilajit to your cart yet.</p>
                <Link to="/shop" className="btn-primary" style={{ display: 'inline-block', maxWidth: '200px', margin: '0 auto', textDecoration: 'none' }}>
                    Browse Shop
                </Link>
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: isMobile ? '2rem 1rem' : '4rem 1rem' }}>
            <h1 style={{ fontSize: isMobile ? '1.75rem' : '2.5rem', marginBottom: '2rem', color: 'var(--color-primary)' }}>Shopping Cart</h1>

            <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr',
                gap: '2rem',
                alignItems: 'start'
            }}>
                {/* Cart Items */}
                <div className="card" style={{ padding: '2rem' }}>
                    {cartItems.map((item) => (
                        <div key={item._id} style={{
                            display: 'flex',
                            gap: '1.5rem',
                            paddingBottom: '1.5rem',
                            marginBottom: '1.5rem',
                            borderBottom: '1px solid var(--color-border)'
                        }}>
                            <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }} />

                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                    <h3 style={{ fontSize: '1.1rem', color: 'var(--color-text-primary)' }}>{item.name}</h3>
                                    <p style={{ fontWeight: '600', color: 'var(--color-text-primary)' }}>Rs. {item.price}</p>
                                </div>
                                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>{item.category}</p>

                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <label>Qty:</label>
                                        <select
                                            value={item.qty}
                                            onChange={(e) => updateQty(item._id, e.target.value)}
                                            style={{ padding: '0.3rem', borderRadius: '4px', border: '1px solid var(--color-border)' }}
                                        >
                                            {[...Array(Math.min(item.countInStock || 0, 10)).keys()].map((x) => (
                                                <option key={x + 1} value={x + 1}>{x + 1}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item._id)}
                                        style={{ color: '#ff4d4f', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.9rem' }}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Summary */}
                <div className="card" style={{ padding: '2rem', position: isMobile ? 'static' : 'sticky', top: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--color-text-primary)' }}>Order Summary</h2>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--color-text-secondary)' }}>
                        <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items)</span>
                        <span>Rs. {total}</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--color-text-primary)' }}>
                        <span>Total</span>
                        <span>Rs. {total}</span>
                    </div>

                    <Link to="/checkout" className="btn-primary" style={{ width: '100%', display: 'block', textAlign: 'center', textDecoration: 'none', padding: '0.8rem' }}>
                        Proceed to Checkout
                    </Link>
                    <p style={{ marginTop: '1rem', fontSize: '0.8rem', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
                        Secure Checkout - Cash on Delivery Available
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Cart;
