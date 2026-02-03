import React, { useState } from 'react';
import MapLocation from '../components/MapLocation';
import { BASE_URL } from '../utils/config';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setStatusMessage('Error: Please enter a valid email address.');
            return;
        }

        if (!formData.email.toLowerCase().endsWith('@gmail.com')) {
            setStatusMessage('Error: Only @gmail.com addresses are allowed.');
            return;
        }

        setLoading(true);
        setStatusMessage('');
        try {
            const res = await fetch(`${BASE_URL}/api/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (res.ok) {
                setStatusMessage('Thank you for your message! We will get back to you soon.');
                setFormData({ name: '', email: '', message: '' });
            } else {
                setStatusMessage(data.message || 'Error sending message');
            }
        } catch (error) {
            console.error('Error:', error);
            setStatusMessage('Error connecting to server. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{ padding: '4rem 1rem' }}>
            <h1 style={{ fontSize: '3rem', marginBottom: '3rem', color: 'var(--color-primary)', textAlign: 'center' }}>Contact Us</h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', maxWidth: '1000px', margin: '0 auto' }}>

                {/* Contact Info */}
                <div>
                    <h2 style={{ marginBottom: '1.5rem', color: 'var(--color-text-primary)' }}>Our Locations</h2>
                    <p style={{ marginBottom: '2rem', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
                        Visit our main office in Lahore or explore our origins in the rural peaks of Upper Dir.
                    </p>

                    <div className="card" style={{ padding: '2rem' }}>
                        <div style={{ marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--color-border)' }}>
                            <h4 style={{ color: 'var(--color-primary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                📍 Head Office Lahore
                            </h4>
                            <p style={{ color: 'var(--color-text-secondary)', fontSize: '1rem', lineHeight: '1.5' }}>
                                Main Head Office, Lahore, Pakistan
                            </p>
                        </div>

                        <MapLocation
                            title="Regional Office Upper Dir"
                            address="Dir Upper, Khyber Pakhtunkhwa, Pakistan (Rural Presence)"
                            embedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d104597.1044464139!2d71.8496417!3d35.1584852!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38db313c05c08889%3A0xe74f57c8bfbc464b!2sDir%20Upper%2C%20Khyber%20Pakhtunkhwa!5e0!3m2!1sen!2spk!4v1705031123456!5m2!1sen!2spk"
                        />

                        <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--color-border)' }}>
                            <div style={{ marginBottom: '1rem' }}>
                                <h4 style={{ color: 'var(--color-primary)', marginBottom: '0.3rem' }}>📞 Phone / WhatsApp</h4>
                                <p style={{ color: 'var(--color-text-secondary)' }}>+92 335 4775567</p>
                            </div>
                            <div>
                                <h4 style={{ color: 'var(--color-primary)', marginBottom: '0.3rem' }}>✉️ Email</h4>
                                <p style={{ color: 'var(--color-text-secondary)' }}>zaarekoh@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="card" style={{ padding: '2rem' }}>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {statusMessage && (
                            <div style={{ padding: '1rem', borderRadius: '6px', backgroundColor: statusMessage.includes('Error') ? '#fff1f0' : '#f6ffed', color: statusMessage.includes('Error') ? '#ff4d4f' : '#52c41a', border: '1px solid' }}>
                                {statusMessage}
                            </div>
                        )}
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Name</label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                style={{ width: '100%', padding: '0.8rem', borderRadius: '6px', border: '1px solid var(--color-border)', outline: 'none' }}
                                placeholder="Your Name"
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Email</label>
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                style={{ width: '100%', padding: '0.8rem', borderRadius: '6px', border: '1px solid var(--color-border)', outline: 'none' }}
                                placeholder="your@email.com"
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Message</label>
                            <textarea
                                required
                                rows="5"
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                style={{ width: '100%', padding: '0.8rem', borderRadius: '6px', border: '1px solid var(--color-border)', outline: 'none', resize: 'vertical' }}
                                placeholder="How can we help you?"
                            ></textarea>
                        </div>
                        <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }} disabled={loading}>
                            {loading ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
