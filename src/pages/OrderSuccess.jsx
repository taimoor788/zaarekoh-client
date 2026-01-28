import React from 'react';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
    return (
        <div className="container" style={{ padding: '6rem 1rem', textAlign: 'center', minHeight: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🎉</div>
            <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>Thank You!</h1>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--color-text-primary)' }}>Your Order has been Placed Successfully.</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto 3rem', color: 'var(--color-text-secondary)', fontSize: '1.1rem', lineHeight: '1.6' }}>
                We have received your order details. Our team will contact you shortly to confirm the delivery.
                Prepare to experience the pure power of the Himalayas!
            </p>

            <Link to="/" className="btn-primary" style={{ textDecoration: 'none', padding: '1rem 3rem', fontSize: '1.1rem' }}>
                Back to Home
            </Link>
        </div>
    );
};

export default OrderSuccess;
