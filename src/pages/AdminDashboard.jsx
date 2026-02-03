import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/config';

const AdminDashboard = () => {
    const { userInfo } = useAuth();
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [orderLoading, setOrderLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [activeTab, setActiveTab] = useState('products');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [statusUpdating, setStatusUpdating] = useState(false);
    const [messages, setMessages] = useState([]);
    const [messageLoading, setMessageLoading] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [learnContent, setLearnContent] = useState(null);
    const [learnLoading, setLearnLoading] = useState(false);
    const [activeLearnLang, setActiveLearnLang] = useState('en');

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        image: '',
        images: [],
        category: '',
        countInStock: '',
        category: '',
        countInStock: '',
        size: '',
        highlights: ''
    });

    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            navigate('/login?redirect=/admin');
        } else {
            fetchProducts();
        }
    }, [userInfo, navigate]);

    useEffect(() => {
        if (activeTab === 'orders' && userInfo?.isAdmin) {
            fetchOrders();
        }
        if (activeTab === 'messages' && userInfo?.isAdmin) {
            fetchMessages();
        }
        if (activeTab === 'learn' && userInfo?.isAdmin) {
            fetchLearnContent();
        }
    }, [activeTab, userInfo]);

    const fetchProducts = async () => {
        try {
            const res = await fetch(`${BASE_URL}/api/products`);
            const data = await res.json();
            setProducts(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching products:', error);
            setLoading(false);
        }
    };

    const fetchOrders = async () => {
        setOrderLoading(true);
        try {
            const res = await fetch(`${BASE_URL}/api/orders`, {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`
                }
            });
            const data = await res.json();
            setOrders(data);
            setOrderLoading(false);
        } catch (error) {
            console.error('Error fetching orders:', error);
            setOrderLoading(false);
        }
    };

    const fetchMessages = async () => {
        setMessageLoading(true);
        try {
            const res = await fetch(`${BASE_URL}/api/contact`, {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`
                }
            });
            const data = await res.json();
            setMessages(data);
            setMessageLoading(false);
        } catch (error) {
            console.error('Error fetching messages:', error);
            setMessageLoading(false);
        }
    }

    const fetchLearnContent = async () => {
        setLearnLoading(true);
        try {
            const res = await fetch(`${BASE_URL}/api/learn`);
            const data = await res.json();
            setLearnContent(data);
            setLearnLoading(false);
        } catch (error) {
            console.error('Error fetching learn content:', error);
            setLearnLoading(false);
        }
    };

    const handleSaveLearn = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${BASE_URL}/api/learn`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                },
                body: JSON.stringify(learnContent)
            });
            if (res.ok) {
                setMessage('Learn content updated');
                setTimeout(() => setMessage(''), 3000);
            }
        } catch (error) {
            console.error('Error saving learn content:', error);
        }
    };

    const deleteMessage = async (id) => {
        if (window.confirm('Are you sure you want to delete this message?')) {
            try {
                const res = await fetch(`${BASE_URL}/api/contact/${id}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`
                    }
                });
                if (res.ok) {
                    setMessage('Message deleted');
                    fetchMessages();
                    setTimeout(() => setMessage(''), 3000);
                }
            } catch (error) {
                console.error('Error deleting message:', error);
            }
        }
    };

    const handleViewMessage = async (msg) => {
        setSelectedMessage(msg);
        if (!msg.isRead) {
            try {
                await fetch(`${BASE_URL}/api/contact/${msg._id}/read`, {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`
                    }
                });
                // Update local state to reflect read status
                setMessages(prev => prev.map(m => m._id === msg._id ? { ...m, isRead: true } : m));
            } catch (error) {
                console.error('Error marking message read:', error);
            }
        }
    };

    const handleStatusUpdate = async (id, newStatus) => {
        setStatusUpdating(true);
        try {
            const res = await fetch(`${BASE_URL}/api/orders/${id}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                },
                body: JSON.stringify({ status: newStatus })
            });
            if (res.ok) {
                setMessage('Order status updated');
                fetchOrders();
                setSelectedOrder(null);
                setTimeout(() => setMessage(''), 3000);
            }
        } catch (error) {
            console.error('Error updating status:', error);
        } finally {
            setStatusUpdating(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                const res = await fetch(`${BASE_URL}/api/products/${id}`, {
                    method: 'DELETE'
                });
                if (res.ok) {
                    setMessage('Product deleted successfully');
                    fetchProducts();
                    setTimeout(() => setMessage(''), 3000);
                }
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            price: product.price,
            description: product.description || '',
            image: product.image,
            images: product.images || [product.image],
            category: product.category,
            // countInStock: product.countInStock,
            countInStock: product.countInStock,
            size: product.size || '',
            highlights: product.highlights ? product.highlights.join('\n') : ''
        });
        setShowForm(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = editingProduct
            ? `${BASE_URL}/api/products/${editingProduct._id}`
            : `${BASE_URL}/api/products`;
        const method = editingProduct ? 'PUT' : 'POST';

        try {
            const res = await fetch(url, {
                method,
                // headers: { 'Content-Type': 'application/json' },
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    highlights: formData.highlights.split('\n').filter(h => h.trim() !== '')
                })
            });

            if (res.ok) {
                setMessage(editingProduct ? 'Product updated' : 'Product created');
                setShowForm(false);
                setEditingProduct(null);
                setFormData({
                    name: '', price: '', description: '', image: '', images: [], category: '', countInStock: '', size: '', highlights: ''
                });
                fetchProducts();
                setTimeout(() => setMessage(''), 3000);
            } else {
                setMessage('Error saving product');
            }
        } catch (error) {
            console.error('Error saving product:', error);
        }
    };

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const uploadFormData = new FormData();
        uploadFormData.append('image', file);
        setUploading(true);
        try {
            const res = await fetch(`${BASE_URL}/api/products/upload`, {
                method: 'POST',
                body: uploadFormData
            });
            const imagePath = `${BASE_URL}${await res.text()}`;
            setFormData(prev => ({
                ...prev,
                image: prev.image || imagePath,
                images: [...prev.images, imagePath]
            }));
            setUploading(false);
        } catch (error) {
            console.error('Upload error:', error);
            setUploading(false);
        }
    };

    // ... (previous imports)

    // ... (previous state)

    // Helper to format date with time
    const formatDateTime = (dateStr) => {
        const date = new Date(dateStr);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    };

    const handleApprovePayment = async (orderId) => {
        if (window.confirm('Are you sure you want to approve this payment?')) {
            try {
                // Update isPaid to true, and status to Processing
                const res = await fetch(`${BASE_URL}/api/orders/${orderId}/status`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${userInfo.token}`
                    },
                    body: JSON.stringify({
                        status: 'Processing',
                        isPaid: true
                    })
                });

                if (res.ok) {
                    setMessage('Payment approved. Order marked as Processing.');
                    fetchOrders();
                    setSelectedOrder(null);
                    setTimeout(() => setMessage(''), 3000);
                }
            } catch (error) {
                console.error('Error approving payment:', error);
            }
        }
    };

    // ... (rest of functions)

    // ... (styles)
    const styles = {
        container: {
            padding: '2rem',
            maxWidth: '1200px',
            margin: '0 auto'
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem'
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse',
            marginTop: '1rem'
        },
        th: {
            padding: '1rem',
            textAlign: 'left',
            borderBottom: '1px solid #ddd',
            backgroundColor: '#f8f9fa'
        },
        td: {
            padding: '1rem',
            borderBottom: '1px solid #eee'
        },
        actionBtn: {
            padding: '0.5rem 1rem',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginRight: '0.5rem'
        },
        formOverlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
        },
        formCard: {
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '8px',
            width: '90%',
            maxWidth: '500px',
            maxHeight: '90vh',
            overflowY: 'auto'
        },
        input: {
            width: '100%',
            padding: '0.8rem',
            marginBottom: '1rem',
            border: '1px solid #ddd',
            borderRadius: '4px'
        },
        badge: {
            backgroundColor: '#25D366', // WhatsApp green
            color: 'white',
            borderRadius: '50%',
            padding: '0.2rem 0.5rem',
            fontSize: '0.75rem',
            marginLeft: '0.5rem',
            verticalAlign: 'middle'
        },
        screenshotImg: {
            width: '100%',
            maxWidth: '300px',
            borderRadius: '8px',
            border: '1px solid #ddd',
            margin: '1rem 0',
            cursor: 'pointer'
        }
    };

    if (loading) return <div className="container" style={{ padding: '4rem' }}>Loading Dashboard...</div>;

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={{ color: 'var(--color-primary)' }}>Admin Dashboard</h1>
                {activeTab === 'products' && (
                    <button onClick={() => { setShowForm(true); setEditingProduct(null); }} className="btn-primary">Add New Product</button>
                )}
            </div>

            {message && <div style={{ padding: '1rem', backgroundColor: '#f6ffed', color: '#52c41a', borderRadius: '6px', marginBottom: '1rem' }}>{message}</div>}

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid #eee' }}>
                <button onClick={() => setActiveTab('products')} style={{ background: 'none', border: 'none', padding: '1rem', cursor: 'pointer', color: activeTab === 'products' ? 'var(--color-primary)' : '#888', borderBottom: activeTab === 'products' ? '2px solid var(--color-primary)' : 'none', fontWeight: 'bold' }}>Products</button>
                <button onClick={() => setActiveTab('orders')} style={{ background: 'none', border: 'none', padding: '1rem', cursor: 'pointer', color: activeTab === 'orders' ? 'var(--color-primary)' : '#888', borderBottom: activeTab === 'orders' ? '2px solid var(--color-primary)' : 'none', fontWeight: 'bold' }}>Orders</button>
                <button onClick={() => setActiveTab('messages')} style={{ background: 'none', border: 'none', padding: '1rem', cursor: 'pointer', color: activeTab === 'messages' ? 'var(--color-primary)' : '#888', borderBottom: activeTab === 'messages' ? '2px solid var(--color-primary)' : 'none', fontWeight: 'bold' }}>
                    Messages
                    {messages.filter(m => !m.isRead).length > 0 && (
                        <span style={styles.badge}>{messages.filter(m => !m.isRead).length}</span>
                    )}
                </button>
                <button onClick={() => setActiveTab('learn')} style={{ background: 'none', border: 'none', padding: '1rem', cursor: 'pointer', color: activeTab === 'learn' ? 'var(--color-primary)' : '#888', borderBottom: activeTab === 'learn' ? '2px solid var(--color-primary)' : 'none', fontWeight: 'bold' }}>Learn Page</button>
            </div>

            {activeTab === 'products' && (
                <div style={{ overflowX: 'auto' }}>
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.th}>Name</th>
                                <th style={styles.th}>Price</th>
                                <th style={styles.th}>Category</th>
                                <th style={styles.th}>Stock</th>
                                <th style={styles.th}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product._id}>
                                    <td style={styles.td}>{product.name}</td>
                                    <td style={styles.td}>Rs. {product.price}</td>
                                    <td style={styles.td}>{product.category}</td>
                                    <td style={styles.td}>{product.countInStock}</td>
                                    <td style={styles.td}>
                                        <button style={{ ...styles.actionBtn, backgroundColor: 'var(--color-primary)', color: '#fff' }} onClick={() => handleEdit(product)}>Edit</button>
                                        <button style={{ ...styles.actionBtn, backgroundColor: '#ff4d4f', color: '#fff' }} onClick={() => handleDelete(product._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {activeTab === 'orders' && (
                <div style={{ overflowX: 'auto' }}>
                    {orderLoading ? <p>Loading orders...</p> : (
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th style={styles.th}>ID</th>
                                    <th style={styles.th}>USER</th>
                                    <th style={styles.th}>DATE / TIME</th>
                                    <th style={styles.th}>TOTAL</th>
                                    <th style={styles.th}>PAYMENT</th>
                                    <th style={styles.th}>SHIPPING STATUS</th>
                                    <th style={styles.th}>ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => (
                                    <tr key={order._id}>
                                        <td style={styles.td}>#{order._id.slice(-6)}</td>
                                        <td style={styles.td}>{order.shippingAddress?.name || 'Guest'}</td>
                                        <td style={styles.td}>{formatDateTime(order.createdAt)}</td>
                                        <td style={styles.td}>Rs. {order.totalPrice}</td>
                                        <td style={styles.td}>
                                            {order.isPaid ? (
                                                <span style={{ color: '#52c41a', fontWeight: 'bold' }}>Paid</span>
                                            ) : (
                                                <span style={{ color: '#faad14', fontWeight: 'bold' }}>Pending</span>
                                            )}
                                            <div style={{ fontSize: '0.8rem', color: '#888' }}>{order.paymentMethod}</div>
                                        </td>
                                        <td style={styles.td}>
                                            <span style={{ padding: '0.3rem 0.6rem', borderRadius: '20px', fontSize: '0.8rem', backgroundColor: order.status === 'Delivered' || order.status === 'Paid' ? '#f6ffed' : '#e6f7ff', color: order.status === 'Delivered' || order.status === 'Paid' ? '#52c41a' : '#1890ff' }}>{order.status}</span>
                                        </td>
                                        <td style={styles.td}><button onClick={() => setSelectedOrder(order)} style={{ ...styles.actionBtn, backgroundColor: 'var(--color-primary)', color: '#fff' }}>Details</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}

            {activeTab === 'messages' && (
                <div style={{ overflowX: 'auto' }}>
                    {messageLoading ? <p>Loading messages...</p> : (
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th style={styles.th}>DATE / TIME</th>
                                    <th style={styles.th}>NAME</th>
                                    <th style={styles.th}>EMAIL</th>
                                    <th style={styles.th}>MESSAGE</th>
                                    <th style={styles.th}>ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {messages.map(msg => (
                                    <tr key={msg._id} style={{ backgroundColor: msg.isRead ? 'transparent' : '#f0f2f5' }}>
                                        <td style={{ ...styles.td, fontWeight: msg.isRead ? 'normal' : 'bold' }}>{formatDateTime(msg.createdAt)}</td>
                                        <td style={{ ...styles.td, fontWeight: msg.isRead ? 'normal' : 'bold' }}>{msg.name}</td>
                                        <td style={styles.td}>{msg.email}</td>
                                        <td style={{ ...styles.td, maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={msg.message}>
                                            {msg.message}
                                        </td>
                                        <td style={styles.td}>
                                            <button onClick={() => handleViewMessage(msg)} style={{ ...styles.actionBtn, backgroundColor: 'var(--color-primary)', color: '#fff' }}>View</button>
                                            <button onClick={() => deleteMessage(msg._id)} style={{ ...styles.actionBtn, backgroundColor: '#ff4d4f', color: '#fff' }}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                                {messages.length === 0 && (
                                    <tr>
                                        <td colSpan="5" style={{ ...styles.td, textAlign: 'center', padding: '2rem' }}>No messages found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            )}

            {activeTab === 'learn' && (
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    {learnLoading ? <p>Loading content...</p> : learnContent && (
                        <div style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '2rem', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button
                                        onClick={() => setActiveLearnLang('en')}
                                        style={{
                                            padding: '0.8rem 1.5rem',
                                            borderRadius: '4px',
                                            border: 'none',
                                            backgroundColor: activeLearnLang === 'en' ? 'var(--color-primary)' : '#f0f0f0',
                                            color: activeLearnLang === 'en' ? '#fff' : '#333',
                                            cursor: 'pointer',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        English
                                    </button>
                                    <button
                                        onClick={() => setActiveLearnLang('ur')}
                                        style={{
                                            padding: '0.8rem 1.5rem',
                                            borderRadius: '4px',
                                            border: 'none',
                                            backgroundColor: activeLearnLang === 'ur' ? 'var(--color-primary)' : '#f0f0f0',
                                            color: activeLearnLang === 'ur' ? '#fff' : '#333',
                                            cursor: 'pointer',
                                            fontWeight: 'bold',
                                            fontFamily: "'Noto Nastaliq Urdu', serif"
                                        }}
                                    >
                                        اردو
                                    </button>
                                </div>
                                <button onClick={handleSaveLearn} className="btn-primary" style={{ padding: '0.8rem 2rem' }}>Save Changes</button>
                            </div>

                            <form onSubmit={handleSaveLearn} style={{ display: 'flex', flexDirection: 'column', gap: '2rem', direction: activeLearnLang === 'ur' ? 'rtl' : 'ltr' }}>

                                {/* Hero Section (Fixed) */}
                                <div style={{ border: '1px solid #eee', borderRadius: '8px', padding: '1.5rem', backgroundColor: '#f9f9f9' }}>
                                    <h3 style={{ marginBottom: '1rem', color: 'var(--color-primary)' }}>Hero Section</h3>
                                    <div style={{ display: 'grid', gap: '1rem' }}>
                                        <label>Title</label>
                                        <input style={styles.input} value={learnContent[activeLearnLang].hero.title} onChange={(e) => setLearnContent({ ...learnContent, [activeLearnLang]: { ...learnContent[activeLearnLang], hero: { ...learnContent[activeLearnLang].hero, title: e.target.value } } })} />
                                        <label>Subtitle</label>
                                        <textarea style={styles.input} value={learnContent[activeLearnLang].hero.subtitle} onChange={(e) => setLearnContent({ ...learnContent, [activeLearnLang]: { ...learnContent[activeLearnLang], hero: { ...learnContent[activeLearnLang].hero, subtitle: e.target.value } } })} />
                                    </div>
                                </div>

                                {/* Dynamic Sections Builder */}
                                <div>
                                    <h3 style={{ marginBottom: '1rem', borderBottom: '2px solid #eee', paddingBottom: '0.5rem' }}>Page Sections</h3>

                                    {learnContent[activeLearnLang].sections.map((section, index) => (
                                        <div key={index} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '1.5rem', marginBottom: '1.5rem', position: 'relative', backgroundColor: '#fff' }}>

                                            {/* Section Header & Delete */}
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                                <span style={{ fontWeight: 'bold', color: '#666', textTransform: 'uppercase', fontSize: '0.8rem' }}>{section.type.replace('_', ' ')}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const newSections = learnContent[activeLearnLang].sections.filter((_, i) => i !== index);
                                                        setLearnContent({ ...learnContent, [activeLearnLang]: { ...learnContent[activeLearnLang], sections: newSections } });
                                                    }}
                                                    style={{ backgroundColor: '#ff4d4d', color: '#fff', border: 'none', padding: '0.3rem 0.8rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}
                                                >
                                                    Delete
                                                </button>
                                            </div>

                                            {/* Common Title */}
                                            <div style={{ marginBottom: '1rem' }}>
                                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Section Title</label>
                                                <input
                                                    style={styles.input}
                                                    value={section.title}
                                                    onChange={(e) => {
                                                        const newSections = [...learnContent[activeLearnLang].sections];
                                                        newSections[index].title = e.target.value;
                                                        setLearnContent({ ...learnContent, [activeLearnLang]: { ...learnContent[activeLearnLang], sections: newSections } });
                                                    }}
                                                />
                                            </div>

                                            {/* Type Specific Fields */}
                                            {section.type === 'text_quote' && (
                                                <>
                                                    <div style={{ marginBottom: '1rem' }}>
                                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Main Content</label>
                                                        <textarea
                                                            style={{ ...styles.input, height: '100px' }}
                                                            value={section.content}
                                                            onChange={(e) => {
                                                                const newSections = [...learnContent[activeLearnLang].sections];
                                                                newSections[index].content = e.target.value;
                                                                setLearnContent({ ...learnContent, [activeLearnLang]: { ...learnContent[activeLearnLang], sections: newSections } });
                                                            }}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Quote / Highlight</label>
                                                        <input
                                                            style={styles.input}
                                                            value={section.quote}
                                                            onChange={(e) => {
                                                                const newSections = [...learnContent[activeLearnLang].sections];
                                                                newSections[index].quote = e.target.value;
                                                                setLearnContent({ ...learnContent, [activeLearnLang]: { ...learnContent[activeLearnLang], sections: newSections } });
                                                            }}
                                                        />
                                                    </div>
                                                </>
                                            )}

                                            {(section.type === 'image_left' || section.type === 'image_right') && (
                                                <>
                                                    <div style={{ marginBottom: '1rem' }}>
                                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Content (supports new lines)</label>
                                                        <textarea
                                                            style={{ ...styles.input, height: '120px' }}
                                                            value={section.content}
                                                            onChange={(e) => {
                                                                const newSections = [...learnContent[activeLearnLang].sections];
                                                                newSections[index].content = e.target.value;
                                                                setLearnContent({ ...learnContent, [activeLearnLang]: { ...learnContent[activeLearnLang], sections: newSections } });
                                                            }}
                                                        />
                                                    </div>
                                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                                        <div>
                                                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Image URL</label>
                                                            <input
                                                                style={styles.input}
                                                                value={section.image}
                                                                onChange={(e) => {
                                                                    const newSections = [...learnContent[activeLearnLang].sections];
                                                                    newSections[index].image = e.target.value;
                                                                    setLearnContent({ ...learnContent, [activeLearnLang]: { ...learnContent[activeLearnLang], sections: newSections } });
                                                                }}
                                                            />
                                                        </div>
                                                        <div>
                                                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Image Caption</label>
                                                            <input
                                                                style={styles.input}
                                                                value={section.caption}
                                                                onChange={(e) => {
                                                                    const newSections = [...learnContent[activeLearnLang].sections];
                                                                    newSections[index].caption = e.target.value;
                                                                    setLearnContent({ ...learnContent, [activeLearnLang]: { ...learnContent[activeLearnLang], sections: newSections } });
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </>
                                            )}

                                            {section.type === 'cards' && (
                                                <>
                                                    <div style={{ marginBottom: '1rem' }}>
                                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Description (Optional)</label>
                                                        <textarea
                                                            style={styles.input}
                                                            value={section.description}
                                                            onChange={(e) => {
                                                                const newSections = [...learnContent[activeLearnLang].sections];
                                                                newSections[index].description = e.target.value;
                                                                setLearnContent({ ...learnContent, [activeLearnLang]: { ...learnContent[activeLearnLang], sections: newSections } });
                                                            }}
                                                        />
                                                    </div>

                                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 'bold' }}>Cards</label>
                                                    <div style={{ display: 'grid', gap: '1rem' }}>
                                                        {section.cards.map((card, cIdx) => (
                                                            <div key={cIdx} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr auto', gap: '0.5rem', alignItems: 'start', padding: '0.5rem', border: '1px dashed #eee' }}>
                                                                <input
                                                                    style={styles.input}
                                                                    placeholder="Title"
                                                                    value={card.title}
                                                                    onChange={(e) => {
                                                                        const newSections = [...learnContent[activeLearnLang].sections];
                                                                        newSections[index].cards[cIdx].title = e.target.value;
                                                                        setLearnContent({ ...learnContent, [activeLearnLang]: { ...learnContent[activeLearnLang], sections: newSections } });
                                                                    }}
                                                                />
                                                                <textarea
                                                                    style={{ ...styles.input, height: '42px' }}
                                                                    placeholder="Text"
                                                                    value={card.text}
                                                                    onChange={(e) => {
                                                                        const newSections = [...learnContent[activeLearnLang].sections];
                                                                        newSections[index].cards[cIdx].text = e.target.value;
                                                                        setLearnContent({ ...learnContent, [activeLearnLang]: { ...learnContent[activeLearnLang], sections: newSections } });
                                                                    }}
                                                                />
                                                                <button
                                                                    type="button"
                                                                    onClick={() => {
                                                                        const newSections = [...learnContent[activeLearnLang].sections];
                                                                        newSections[index].cards = newSections[index].cards.filter((_, i) => i !== cIdx);
                                                                        setLearnContent({ ...learnContent, [activeLearnLang]: { ...learnContent[activeLearnLang], sections: newSections } });
                                                                    }}
                                                                    style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer', fontSize: '1.2rem' }}
                                                                >
                                                                    ×
                                                                </button>
                                                            </div>
                                                        ))}
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                const newSections = [...learnContent[activeLearnLang].sections];
                                                                newSections[index].cards.push({ title: '', text: '' });
                                                                setLearnContent({ ...learnContent, [activeLearnLang]: { ...learnContent[activeLearnLang], sections: newSections } });
                                                            }}
                                                            style={{ width: '100%', padding: '0.5rem', border: '1px dashed #aaa', borderRadius: '4px', background: '#f9f9f9', cursor: 'pointer' }}
                                                        >
                                                            + Add Card
                                                        </button>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    ))}

                                    {/* Add Section Buttons */}
                                    <div style={{ border: '2px dashed #ccc', borderRadius: '8px', padding: '1.5rem', textAlign: 'center' }}>
                                        <p style={{ marginBottom: '1rem', fontWeight: 'bold', color: '#666' }}>Add New Section</p>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1rem' }}>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const newSection = { type: 'text_quote', title: 'New Section', content: '', quote: '' };
                                                    setLearnContent({ ...learnContent, [activeLearnLang]: { ...learnContent[activeLearnLang], sections: [...learnContent[activeLearnLang].sections, newSection] } });
                                                }}
                                                style={{ padding: '0.8rem', backgroundColor: '#e6f7ff', border: '1px solid #1890ff', color: '#1890ff', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                                            >
                                                Text + Quote
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const newSection = { type: 'image_left', title: 'New Section', content: '', image: '', caption: '' };
                                                    setLearnContent({ ...learnContent, [activeLearnLang]: { ...learnContent[activeLearnLang], sections: [...learnContent[activeLearnLang].sections, newSection] } });
                                                }}
                                                style={{ padding: '0.8rem', backgroundColor: '#e6f7ff', border: '1px solid #1890ff', color: '#1890ff', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                                            >
                                                Image Left
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const newSection = { type: 'image_right', title: 'New Section', content: '', image: '', caption: '' };
                                                    setLearnContent({ ...learnContent, [activeLearnLang]: { ...learnContent[activeLearnLang], sections: [...learnContent[activeLearnLang].sections, newSection] } });
                                                }}
                                                style={{ padding: '0.8rem', backgroundColor: '#e6f7ff', border: '1px solid #1890ff', color: '#1890ff', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                                            >
                                                Image Right
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const newSection = { type: 'cards', title: 'New Section', description: '', cards: [{ title: '', text: '' }] };
                                                    setLearnContent({ ...learnContent, [activeLearnLang]: { ...learnContent[activeLearnLang], sections: [...learnContent[activeLearnLang].sections, newSection] } });
                                                }}
                                                style={{ padding: '0.8rem', backgroundColor: '#e6f7ff', border: '1px solid #1890ff', color: '#1890ff', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                                            >
                                                Cards Grid
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* FAQ Section (Fixed) */}
                                <div style={{ border: '1px solid #eee', borderRadius: '8px', padding: '1.5rem', backgroundColor: '#f9f9f9', marginTop: '1rem' }}>
                                    <h3 style={{ marginBottom: '1rem', color: 'var(--color-primary)' }}>FAQ Section</h3>
                                    <input style={{ ...styles.input, marginBottom: '1rem' }} placeholder="Section Title" value={learnContent[activeLearnLang].faqSection.title} onChange={(e) => setLearnContent({ ...learnContent, [activeLearnLang]: { ...learnContent[activeLearnLang], faqSection: { ...learnContent[activeLearnLang].faqSection, title: e.target.value } } })} />

                                    <div style={{ display: 'grid', gap: '1rem' }}>
                                        {learnContent[activeLearnLang].faqSection.faqs.map((faq, index) => (
                                            <div key={index} style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '6px', backgroundColor: '#fff', position: 'relative' }}>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const newFaqs = learnContent[activeLearnLang].faqSection.faqs.filter((_, i) => i !== index);
                                                        setLearnContent({ ...learnContent, [activeLearnLang]: { ...learnContent[activeLearnLang], faqSection: { ...learnContent[activeLearnLang].faqSection, faqs: newFaqs } } });
                                                    }}
                                                    style={{ position: 'absolute', top: '10px', right: '10px', color: 'red', border: 'none', background: 'none', cursor: 'pointer', fontSize: '1.2rem' }}
                                                >
                                                    ×
                                                </button>
                                                <input
                                                    style={{ ...styles.input, marginBottom: '0.5rem', paddingRight: '2rem' }}
                                                    placeholder="Question"
                                                    value={faq.q}
                                                    onChange={(e) => {
                                                        const newFaqs = [...learnContent[activeLearnLang].faqSection.faqs];
                                                        newFaqs[index].q = e.target.value;
                                                        setLearnContent({ ...learnContent, [activeLearnLang]: { ...learnContent[activeLearnLang], faqSection: { ...learnContent[activeLearnLang].faqSection, faqs: newFaqs } } });
                                                    }}
                                                />
                                                <textarea
                                                    style={styles.input}
                                                    placeholder="Answer"
                                                    value={faq.a}
                                                    onChange={(e) => {
                                                        const newFaqs = [...learnContent[activeLearnLang].faqSection.faqs];
                                                        newFaqs[index].a = e.target.value;
                                                        setLearnContent({ ...learnContent, [activeLearnLang]: { ...learnContent[activeLearnLang], faqSection: { ...learnContent[activeLearnLang].faqSection, faqs: newFaqs } } });
                                                    }}
                                                />
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const newFaqs = [...learnContent[activeLearnLang].faqSection.faqs, { q: '', a: '' }];
                                                setLearnContent({ ...learnContent, [activeLearnLang]: { ...learnContent[activeLearnLang], faqSection: { ...learnContent[activeLearnLang].faqSection, faqs: newFaqs } } });
                                            }}
                                            style={{ width: '100%', padding: '0.8rem', border: '1px dashed #aaa', borderRadius: '4px', background: '#e6f7ff', color: '#1890ff', cursor: 'pointer', fontWeight: 'bold' }}
                                        >
                                            + Add FAQ
                                        </button>
                                    </div>
                                </div>

                                {/* CTA Section (Fixed) */}
                                <div style={{ border: '1px solid #eee', borderRadius: '8px', padding: '1.5rem', backgroundColor: '#f0f7ff' }}>
                                    <h3 style={{ marginBottom: '1rem', color: 'var(--color-primary)' }}>Call to Action</h3>
                                    <div style={{ display: 'grid', gap: '1rem' }}>
                                        <label>Title</label>
                                        <input style={styles.input} value={learnContent[activeLearnLang].cta.title} onChange={(e) => setLearnContent({ ...learnContent, [activeLearnLang]: { ...learnContent[activeLearnLang], cta: { ...learnContent[activeLearnLang].cta, title: e.target.value } } })} />
                                        <label>Text</label>
                                        <input style={styles.input} value={learnContent[activeLearnLang].cta.text} onChange={(e) => setLearnContent({ ...learnContent, [activeLearnLang]: { ...learnContent[activeLearnLang], cta: { ...learnContent[activeLearnLang].cta, text: e.target.value } } })} />
                                        <label>Button Label</label>
                                        <input style={styles.input} value={learnContent[activeLearnLang].cta.btn} onChange={(e) => setLearnContent({ ...learnContent, [activeLearnLang]: { ...learnContent[activeLearnLang], cta: { ...learnContent[activeLearnLang].cta, btn: e.target.value } } })} />
                                    </div>
                                </div>

                            </form>
                        </div>
                    )}
                </div>
            )}



            {/* Message Details Modal */}
            {
                selectedMessage && (
                    <div style={styles.formOverlay}>
                        <div style={{ ...styles.formCard, maxWidth: '600px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                                <h2 style={{ margin: 0 }}>Message Details</h2>
                                <button onClick={() => setSelectedMessage(null)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>&times;</button>
                            </div>
                            <div style={{ marginBottom: '1rem' }}>
                                <p><strong>From:</strong> {selectedMessage.name} ({selectedMessage.email})</p>
                                <p style={{ color: '#888', fontSize: '0.9rem' }}>{formatDateTime(selectedMessage.createdAt)}</p>
                            </div>
                            <div style={{ padding: '1rem', backgroundColor: '#f9f9f9', borderRadius: '4px', whiteSpace: 'pre-wrap' }}>
                                {selectedMessage.message}
                            </div>
                            <div style={{ marginTop: '2rem', textAlign: 'right' }}>
                                <button onClick={() => setSelectedMessage(null)} className="btn-primary">Close</button>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* Product Form Modal (Same as before) */}
            {
                showForm && (
                    <div style={styles.formOverlay}>
                        {/* ... (existing form content) ... */}
                        <div style={styles.formCard}>
                            <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
                            <form onSubmit={handleSubmit}>
                                <label>Product Name</label>
                                <input style={styles.input} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                                <label>Price (PKR)</label>
                                <input type="number" style={styles.input} value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} required />
                                <label>Size</label>
                                <input style={styles.input} value={formData.size} onChange={(e) => setFormData({ ...formData, size: e.target.value })} />
                                <label>Upload Image</label>
                                <input type="file" style={styles.input} onChange={uploadFileHandler} />
                                {uploading && <p>Uploading...</p>}
                                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                                    {formData.images.map((img, i) => (
                                        <img key={i} src={img} alt="preview" style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px', border: formData.image === img ? '2px solid var(--color-primary)' : '1px solid #ddd' }} onClick={() => setFormData({ ...formData, image: img })} />
                                    ))}
                                </div>
                                <label>Category</label>
                                <input style={styles.input} value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} required />
                                <label>Stock</label>
                                <input type="number" style={styles.input} value={formData.countInStock} onChange={(e) => setFormData({ ...formData, countInStock: e.target.value })} required />
                                <label>Description</label>
                                <textarea style={{ ...styles.input, height: '80px' }} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                                <label>Highlights (One per line)</label>
                                <textarea style={{ ...styles.input, height: '100px' }} value={formData.highlights} onChange={(e) => setFormData({ ...formData, highlights: e.target.value })} placeholder="100% Pure&#10;Lab Tested" />
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <button type="submit" className="btn-primary" style={{ flex: 1 }}>{editingProduct ? 'Update' : 'Create'}</button>
                                    <button type="button" onClick={() => setShowForm(false)} style={{ flex: 1, backgroundColor: '#eee', borderRadius: '6px', border: 'none' }}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }

            {/* Order Details Modal */}
            {
                selectedOrder && (
                    <div style={styles.formOverlay}>
                        <div style={{ ...styles.formCard, maxWidth: '600px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                                <h2 style={{ margin: 0 }}>Order Details</h2>
                                <button onClick={() => setSelectedOrder(null)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>&times;</button>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                                <div>
                                    <h4 style={{ color: '#888' }}>Customer</h4>
                                    <p><strong>{selectedOrder.shippingAddress?.name}</strong></p>
                                    <p>Email: {selectedOrder.shippingAddress?.email}</p>
                                    <p>Phone: {selectedOrder.shippingAddress?.phone}</p>
                                    <p>City: {selectedOrder.shippingAddress?.city}</p>
                                    <p style={{ fontSize: '0.9rem', color: '#666' }}>Addr: {selectedOrder.shippingAddress?.address}</p>
                                </div>
                                <div>
                                    <h4 style={{ color: '#888' }}>Payment Info</h4>
                                    <p>Method: <strong>{selectedOrder.paymentMethod}</strong></p>
                                    <p>Payment Status: <strong style={{ color: selectedOrder.isPaid ? 'green' : 'orange' }}>{selectedOrder.isPaid ? 'Paid' : 'Pending'}</strong></p>
                                    <p>Order Status: <strong style={{ color: 'var(--color-primary)' }}>{selectedOrder.status}</strong></p>

                                    <h4 style={{ color: '#888', marginTop: '1rem' }}>Update Status</h4>
                                    <select defaultValue={selectedOrder.status} onChange={(e) => handleStatusUpdate(selectedOrder._id, e.target.value)} disabled={statusUpdating} style={styles.input}>
                                        <option value="Pending">Pending</option>
                                        <option value="Processing">Processing</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Cancelled">Cancelled</option>
                                        <option value="Paid">Paid</option>
                                    </select>
                                </div>
                            </div>

                            {/* Payment Screenshot Verification */}
                            {selectedOrder.paymentMethod === 'Manual' && selectedOrder.paymentScreenshot && (
                                <div style={{ marginBottom: '1rem' }}>
                                    <h4 style={{ color: '#888' }}>Payment Screenshot</h4>
                                    <a href={`http://localhost:5000${selectedOrder.paymentScreenshot}`} target="_blank" rel="noopener noreferrer">
                                        <img src={`http://localhost:5000${selectedOrder.paymentScreenshot}`} alt="Payment Screenshot" style={styles.screenshotImg} />
                                    </a>
                                    {!selectedOrder.isPaid && (
                                        <button
                                            onClick={() => handleApprovePayment(selectedOrder._id)}
                                            className="btn-primary"
                                            style={{ width: '100%', marginTop: '0.5rem', backgroundColor: '#52c41a' }}
                                        >
                                            Verify & Approve Payment
                                        </button>
                                    )}
                                </div>
                            )}

                            <h4 style={{ color: '#888', marginBottom: '0.5rem' }}>Items</h4>
                            {selectedOrder.orderItems?.map((item, i) => (
                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #eee' }}>
                                    <span>{item.name} x {item.qty}</span>
                                    <span>Rs. {item.price * item.qty}</span>
                                </div>
                            ))}
                            <div style={{ textAlign: 'right', marginTop: '1rem', fontWeight: 'bold', fontSize: '1.2rem' }}>Total: Rs. {selectedOrder.totalPrice}</div>
                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default AdminDashboard;
