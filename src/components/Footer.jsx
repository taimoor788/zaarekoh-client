import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const styles = {
        footer: {
            backgroundColor: '#fff',
            borderTop: '1px solid var(--color-border)',
            padding: '4rem 2rem 2rem',
            marginTop: 'auto',
        },
        container: {
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '3rem',
        },
        column: {
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
        },
        heading: {
            color: 'var(--color-primary)',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            marginBottom: '0.5rem',
        },
        link: {
            color: 'var(--color-text-secondary)',
            textDecoration: 'none',
            fontSize: '0.95rem',
            transition: 'color 0.2s',
        },
        text: {
            color: 'var(--color-text-secondary)',
            fontSize: '0.9rem',
            lineHeight: '1.6',
        },
        copyright: {
            textAlign: 'center',
            marginTop: '3rem',
            paddingTop: '2rem',
            borderTop: '1px solid var(--color-divider)',
            color: 'var(--color-text-secondary)',
            fontSize: '0.9rem',
        },
        socialIcon: {
            backgroundColor: 'var(--color-primary)',
            color: '#fff',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }
    };

    return (
        <footer style={styles.footer}>
            <div style={styles.container}>
                <div style={styles.column}>
                    <img
                        src="/images/logo.png"
                        alt="Zaar-e-Koh"
                        style={{
                            height: '140px',
                            objectFit: 'contain',
                            marginBottom: '1rem',
                            filter: 'drop-shadow(0 2px 5px rgba(0,0,0,0.15))'
                        }}
                    />
                    <p style={styles.text}>
                        Pure Himalayan Shilajit sourced directly from the highest peaks.
                        Experience the power of nature with our premium, lab-tested resin.
                    </p>
                    <div style={{ display: 'flex', gap: '1.2rem', marginTop: '1rem' }}>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={styles.socialIcon} title="Instagram"
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                        </a>
                        <a href="https://www.facebook.com/zaarekoh" target="_blank" rel="noopener noreferrer" style={styles.socialIcon} title="Facebook"
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                        </a>
                        <a href="https://www.tiktok.com/@zaar_e_koh" target="_blank" rel="noopener noreferrer" style={styles.socialIcon} title="TikTok"
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
                        </a>
                    </div>
                </div>

                <div style={styles.column}>
                    <h4 style={styles.heading}>Quick Links</h4>
                    <Link to="/" style={styles.link}>Home</Link>
                    <Link to="/about" style={styles.link}>About</Link>
                    <Link to="/shop" style={styles.link}>Shop</Link>
                    <Link to="/contact" style={styles.link}>Contact</Link>
                    <Link to="/privacy-policy" style={styles.link}>Privacy Policy</Link>
                    <Link to="/terms-conditions" style={styles.link}>Terms & Conditions</Link>
                    <Link to="/shipping-returns" style={styles.link}>Shipping & Returns Policy</Link>
                </div>

                <div style={styles.column}>
                    <h4 style={styles.heading}>Contact Us</h4>
                    <p style={styles.text}>Email: zaarekoh@gmail.com</p>
                    <p style={styles.text}>Phone: +92 335 4775567</p>
                    <p style={styles.text}>Lahore, Pakistan</p>
                    <div style={styles.section}>
                        <h4 style={styles.title}>Stay in the Loop</h4>
                        <p style={{ fontSize: '0.85rem', marginBottom: '1rem', opacity: 0.8, color: 'var(--color-text-secondary)' }}>Get the latest updates on Shilajit benefits and special offers.</p>
                        <form style={{ display: 'flex', gap: '0.5rem' }} onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing!'); e.target.reset(); }}>
                            <input
                                type="email"
                                placeholder="Your email"
                                required
                                style={{
                                    padding: '0.6rem',
                                    borderRadius: '4px',
                                    border: '1px solid var(--color-border)',
                                    backgroundColor: 'var(--color-background-light)',
                                    color: 'var(--color-text-primary)',
                                    flex: 1,
                                    fontSize: '0.85rem'
                                }}
                            />
                            <button type="submit" className="btn-primary" style={{ padding: '0.6rem 1rem', fontSize: '0.85rem', backgroundColor: 'var(--color-primary)', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Join</button>
                        </form>
                    </div>
                </div>
            </div>
            <div style={{ ...styles.copyright, textAlign: 'center', width: '100%', gridColumn: '1 / -1' }}>
                <p>&copy; {new Date().getFullYear()} Zaarekoh. Purest Himalayan Shilajit. All rights reserved.</p>
            </div>

            {/* WhatsApp Floating Button */}
            <a
                href="https://wa.me/923354775567"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    position: 'fixed',
                    bottom: '30px',
                    right: '30px',
                    backgroundColor: '#25D366',
                    color: 'white',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '30px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                    zIndex: 1000,
                    textDecoration: 'none',
                    transition: 'transform 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" style={{ width: '35px', height: '35px' }} />
            </a>
        </footer>
    );
};

export default Footer;
