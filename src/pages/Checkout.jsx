import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/config';

const Checkout = () => {
    const { cartItems, getCartTotal, clearCart } = useCart();
    const { userInfo } = useAuth();
    const navigate = useNavigate();
    const total = getCartTotal();
    const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 768);
    const [loading, setLoading] = useState(false);

    React.useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        postalCode: '',
        phone: ''
    });

    const [paymentMethod, setPaymentMethod] = useState('Manual');
    const [paymentScreenshot, setPaymentScreenshot] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        setUploading(true);

        try {
            const res = await fetch(`${BASE_URL}/api/upload`, {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();
            setPaymentScreenshot(data.filePath);
            setUploading(false);
        } catch (error) {
            console.error('Upload Error:', error);
            setUploading(false);
            alert('Image upload failed');
        }
    };

    useEffect(() => {
        if (!userInfo) {
            navigate('/login?redirect=/checkout');
        }
    }, [userInfo, navigate]);

    const [ordered, setOrdered] = useState(false);

    // ... (keep order of hooks consistent if possible, but safe to add state here)

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userInfo) {
            alert('Please login to place an order');
            navigate('/login?redirect=/checkout');
            return;
        }

        if (paymentMethod === 'Manual' && !paymentScreenshot) {
            alert('Please upload a payment screenshot for manual payment.');
            return;
        }

        if (!formData.email.toLowerCase().endsWith('@gmail.com')) {
            alert('Please use a valid @gmail.com address for shipping details.');
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(`${BASE_URL}/api/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`, // Use actual user token
                },
                body: JSON.stringify({
                    orderItems: cartItems.map(item => ({
                        name: item.name,
                        qty: item.qty,
                        image: item.image,
                        price: item.price,
                        product: item._id
                    })),
                    shippingAddress: {
                        name: formData.name,
                        address: formData.address,
                        city: formData.city,
                        phone: formData.phone,
                    },
                    itemsPrice: total,
                    shippingPrice: 0,
                    taxPrice: 0,
                    totalPrice: total,
                    paymentMethod,
                    paymentScreenshot: paymentMethod === 'Manual' ? paymentScreenshot : null,
                }),
            });

            if (res.ok) {
                setOrdered(true);
                clearCart();
                navigate('/order-success');
            } else {
                const data = await res.json();
                alert(data.message || 'Error placing order');
            }
        } catch (error) {
            console.error('Order error:', error);
            alert('Something went wrong. Please try again.');
        } finally {
            setLoading(false); // End loading
        }
    };

    if (cartItems.length === 0 && !ordered) {
        navigate('/cart');
        return null;
    }

    return (
        <div className="container" style={{ padding: isMobile ? '2rem 1rem' : '4rem 1rem' }}>
            <h1 style={{ fontSize: isMobile ? '1.75rem' : '2.5rem', marginBottom: '2rem', color: 'var(--color-text-primary)' }}>Checkout</h1>

            <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr',
                gap: isMobile ? '2rem' : '3rem',
                alignItems: 'start'
            }}>

                {/* Shipping Form */}
                <div className="card" style={{ padding: '2rem' }}>
                    <h2 style={{ marginBottom: '1.5rem', color: 'var(--color-primary)' }}>Shipping Details</h2>
                    <form id="checkout-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Full Name</label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                style={{ width: '100%', padding: '0.8rem', borderRadius: '6px', border: '1px solid var(--color-border)', outline: 'none' }}
                                placeholder="John Doe"
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Email Address</label>
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                style={{ width: '100%', padding: '0.8rem', borderRadius: '6px', border: '1px solid var(--color-border)', outline: 'none' }}
                                placeholder="you@example.com"
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Address</label>
                            <input
                                type="text"
                                required
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                style={{ width: '100%', padding: '0.8rem', borderRadius: '6px', border: '1px solid var(--color-border)', outline: 'none' }}
                                placeholder="House #, Street, Area"
                            />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>City</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.city}
                                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                    style={{ width: '100%', padding: '0.8rem', borderRadius: '6px', border: '1px solid var(--color-border)', outline: 'none' }}
                                    placeholder="Lahore"
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Postal Code</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.postalCode}
                                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                                    style={{ width: '100%', padding: '0.8rem', borderRadius: '6px', border: '1px solid var(--color-border)', outline: 'none' }}
                                    placeholder="54000"
                                />
                            </div>
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Phone Number</label>
                            <input
                                type="tel"
                                required
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                style={{ width: '100%', padding: '0.8rem', borderRadius: '6px', border: '1px solid var(--color-border)', outline: 'none' }}
                                placeholder="0300-1234567"
                            />
                        </div>
                    </form>
                </div>

                {/* Order Summary & Payment */}
                <div className="card" style={{ padding: '2rem', position: isMobile ? 'static' : 'sticky', top: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--color-text-primary)' }}>Your Order</h2>

                    <div style={{ marginBottom: '1.5rem', maxHeight: '300px', overflowY: 'auto' }}>
                        {cartItems.map(item => (
                            <div key={item._id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                                <span>{item.qty}x {item.name}</span>
                                <span>Rs. {item.price * item.qty}</span>
                            </div>
                        ))}
                    </div>

                    <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1rem', marginTop: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: 'var(--color-text-secondary)' }}>
                            <span>Subtotal</span>
                            <span>Rs. {total}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--color-text-secondary)' }}>
                            <span>Shipping</span>
                            <span style={{ color: 'var(--color-secondary)' }}>Free</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--color-text-primary)' }}>
                            <span>Total</span>
                            <span>Rs. {total}</span>
                        </div>
                    </div>

                    {/* Payment Method Selection */}
                    <div style={{ marginTop: '2rem', marginBottom: '1rem' }}>
                        <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Payment Method</h3>
                        <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="Manual"
                                    checked={paymentMethod === 'Manual'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                                Manual Payment (Bank/Wallet)
                            </label>

                            {/* Manual Payment Details */}
                            {paymentMethod === 'Manual' && (
                                <div style={{
                                    background: 'var(--color-background-secondary)',
                                    padding: '1rem',
                                    borderRadius: '8px',
                                    fontSize: '0.9rem',
                                    border: '1px solid var(--color-border)'
                                }}>
                                    <p style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Send Payment to:</p>
                                    <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        <li><strong>EasyPaisa:</strong> 0348-9530572 (Taimoor Jan)</li>
                                        <li><strong>JazzCash:</strong> 0348-9530572 (Taimoor Jan)</li>
                                        <li><strong>HBL Bank:</strong> PK10HABB0003557900420603 (Taimoor Jan)</li>
                                    </ul>
                                    <p style={{ marginBottom: '0.5rem' }}>Upload Payment Screenshot:</p>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        style={{ width: '100%', fontSize: '0.9rem' }}
                                    />
                                    {uploading && <p style={{ fontSize: '0.8rem', color: 'var(--color-secondary)', marginTop: '0.5rem' }}>Uploading...</p>}
                                </div>
                            )}

                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="COD"
                                    checked={paymentMethod === 'COD'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                                Cash on Delivery (COD)
                            </label>
                        </div>
                    </div>

                    <button
                        type="submit"
                        form="checkout-form"
                        className="btn-primary"
                        style={{ width: '100%', fontSize: '1.1rem', padding: '1rem', opacity: loading || uploading ? 0.7 : 1 }}
                        disabled={loading || uploading}
                    >
                        {loading ? 'Processing...' : 'Place Order'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
