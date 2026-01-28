import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { userInfo, logout } = useAuth();
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
            return;
        }

        const fetchOrders = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/orders/myorders', {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                });
                const data = await res.json();
                setOrders(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching orders:', error);
                setLoading(false);
            }
        };

        fetchOrders();
    }, [userInfo, navigate]);

    const styles = {
        container: {
            maxWidth: '1000px',
            margin: '2rem auto',
            padding: '1rem',
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem',
            padding: '1.5rem',
            backgroundColor: '#fff',
            borderRadius: '12px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        },
        orderCard: {
            backgroundColor: '#fff',
            padding: '1.5rem',
            borderRadius: '12px',
            marginBottom: '1rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            border: '1px solid var(--color-border)',
        },
        badge: {
            padding: '0.3rem 0.8rem',
            borderRadius: '20px',
            fontSize: '0.8rem',
            fontWeight: '600',
            backgroundColor: 'var(--color-primary-light)',
            color: 'var(--color-primary)',
        }
    };

    if (loading) return <div className="container" style={{ padding: '4rem' }}>Loading profile...</div>;

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <div>
                    <h1 style={{ color: 'var(--color-primary)', margin: 0 }}>Hello, {userInfo.name}</h1>
                    <p style={{ color: 'var(--color-text-secondary)', marginTop: '0.5rem' }}>{userInfo.email}</p>
                </div>
                <button onClick={() => { logout(); navigate('/'); }} className="btn-primary" style={{ backgroundColor: '#ff4d4f' }}>Logout</button>
            </div>

            {userInfo?.isAdmin ? (
                <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: '#f9f9f9', borderRadius: '12px' }}>
                    <p>You are logged in as an Admin.</p>
                    <button onClick={() => navigate('/admin')} className="btn-primary" style={{ marginTop: '1rem' }}>Go to Admin Dashboard</button>
                </div>
            ) : (
                <>
                    <h2 style={{ marginBottom: '1.5rem', color: 'var(--color-text-primary)' }}>Your Order History</h2>

                    {orders.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: '#f9f9f9', borderRadius: '12px' }}>
                            <p>You haven't placed any orders yet.</p>
                            <button onClick={() => navigate('/shop')} className="btn-primary" style={{ marginTop: '1rem' }}>Start Shopping</button>
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            {orders.map(order => (
                                <div key={order._id} style={styles.orderCard}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid #f0f0f0', paddingBottom: '0.5rem' }}>
                                        <div>
                                            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Order ID: </span>
                                            <span style={{ fontWeight: '600' }}>#{order._id.slice(-6)}</span>
                                        </div>
                                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                            <span style={{
                                                ...styles.badge,
                                                backgroundColor: order.isPaid ? 'var(--color-success-light, #f6ffed)' : 'var(--color-warning-light, #fffbe6)',
                                                color: order.isPaid ? 'var(--color-success, #52c41a)' : 'var(--color-warning, #faad14)',
                                                border: `1px solid ${order.isPaid ? '#b7eb8f' : '#ffe58f'}`
                                            }}>
                                                {order.isPaid ? 'Paid' : 'Payment Pending'}
                                            </span>
                                            <span style={styles.badge}>{order.status}</span>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </p>
                                            <p style={{ fontWeight: 'bold', marginTop: '0.2rem' }}>Rs. {order.totalPrice}</p>
                                        </div>
                                        <div style={{ display: 'flex', gap: '5px' }}>
                                            {order.orderItems.map((item, idx) => (
                                                <img key={idx} src={item.image} alt={item.name} style={{ width: '40px', height: '40px', borderRadius: '4px', objectFit: 'cover' }} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Profile;
