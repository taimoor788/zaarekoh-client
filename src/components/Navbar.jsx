import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { getCartCount } = useCart();
    const { userInfo, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const cartCount = getCartCount();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const handleLogout = () => {
        logout();
        setIsMenuOpen(false);
        setIsUserMenuOpen(false);
        navigate('/');
    };

    const styles = {
        nav: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: '80px',
            padding: '0 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'var(--color-bg-nav)',
            boxShadow: 'var(--shadow-sm)',
            zIndex: 1000,
        },
        logo: {
            textDecoration: 'none',
        },
        links: {
            display: 'flex',
            gap: '1.2rem',
            alignItems: 'center',
        },
        link: {
            color: 'var(--color-text-secondary)',
            textDecoration: 'none',
            fontSize: '0.9rem',
            fontWeight: '600',
            transition: 'color 0.2s',
            padding: '0.4rem 0.6rem',
            borderRadius: 'var(--radius-btn)',
        },
        activeLink: {
            color: 'var(--color-primary)',
            backgroundColor: 'rgba(24, 119, 242, 0.08)',
        },
        mobileMenuBtn: {
            display: 'none',
            fontSize: '1.5rem',
            background: 'none',
            color: 'var(--color-text-primary)',
            cursor: 'pointer',
        },
        mobileMenu: {
            display: isMenuOpen ? 'flex' : 'none',
            position: 'absolute',
            top: '64px',
            left: 0,
            right: 0,
            backgroundColor: 'var(--color-bg-nav)',
            flexDirection: 'column',
            padding: '1rem',
            boxShadow: 'var(--shadow-md)',
            gap: '0.5rem',
        },
        userMenu: {
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer'
        },
        dropdown: {
            position: 'absolute',
            top: '100%',
            right: 0,
            backgroundColor: '#fff',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            borderRadius: '8px',
            padding: '0.5rem 0',
            minWidth: '150px',
            display: isUserMenuOpen ? 'block' : 'none',
            marginTop: '10px'
        },
        dropdownItem: {
            padding: '0.6rem 1rem',
            color: 'var(--color-text-primary)',
            textDecoration: 'none',
            display: 'block',
            fontSize: '0.9rem',
            transition: 'background 0.2s'
        }
    };

    // Responsive styles
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const [isMobile, setIsMobile] = useState(mediaQuery.matches);

    useEffect(() => {
        const handler = (e) => setIsMobile(e.matches);
        mediaQuery.addEventListener('change', handler);
        return () => mediaQuery.removeEventListener('change', handler);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Shop', path: '/shop' },
        { name: 'Learn', path: '/learn' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];

    const renderLinks = () => (
        <>
            {navLinks.map(link => (
                <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    style={location.pathname === link.path
                        ? { ...styles.link, ...styles.activeLink }
                        : styles.link}
                >
                    {link.name}
                </Link>
            ))}
            {!isMobile && (
                <Link to="/cart" style={location.pathname === '/cart' ? { ...styles.link, ...styles.activeLink } : styles.link}>
                    🛒 ({cartCount})
                </Link>
            )}
        </>
    );

    return (
        <nav style={styles.nav}>
            <Link to="/" style={styles.logo}>
                <img
                    src="/images/logo.png"
                    alt="Zaar-e-Koh"
                    style={{
                        height: isMobile ? '45px' : '55px',
                        objectFit: 'contain',
                        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))'
                    }}
                />
            </Link>

            {/* Desktop Links */}
            {!isMobile && (
                <div style={styles.links}>
                    {renderLinks()}

                    {userInfo ? (
                        <div style={styles.userMenu} onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}>
                            <span style={{ ...styles.link, color: 'var(--color-primary)' }}>
                                {userInfo.name.split(' ')[0]} ▾
                            </span>
                            <div style={styles.dropdown}>
                                {userInfo.isAdmin && (
                                    <Link to="/admin" style={styles.dropdownItem} onClick={() => setIsUserMenuOpen(false)}>Admin Panel</Link>
                                )}
                                <Link to="/profile" style={styles.dropdownItem} onClick={() => setIsUserMenuOpen(false)}>My Profile</Link>
                                <div style={{ ...styles.dropdownItem, color: '#ff4d4f', borderTop: '1px solid #eee' }} onClick={handleLogout}>Logout</div>
                            </div>
                        </div>
                    ) : (
                        <Link to="/login" style={{ ...styles.link, backgroundColor: 'var(--color-primary)', color: '#fff' }}>Login</Link>
                    )}
                </div>
            )}

            {/* Mobile Actions */}
            {isMobile && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Link to="/cart" style={{ ...styles.link, padding: '0.5rem' }}>
                        <span style={{ color: 'var(--color-primary)', position: 'relative' }}>
                            🛒 <span style={{ fontSize: '0.7rem', position: 'absolute', top: '-8px', right: '-10px', background: 'var(--color-primary)', color: 'white', borderRadius: '50%', width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{cartCount}</span>
                        </span>
                    </Link>
                    <button style={styles.mobileMenuBtn} onClick={toggleMenu} className="mobile-show">
                        {isMenuOpen ? '✕' : '☰'}
                    </button>
                </div>
            )}

            {/* Mobile Menu Dropdown */}
            {isMobile && (
                <div style={styles.mobileMenu}>
                    {renderLinks()}
                    {userInfo ? (
                        <>
                            {userInfo.isAdmin && (
                                <Link to="/admin" style={styles.link} onClick={() => setIsMenuOpen(false)}>Admin Panel</Link>
                            )}
                            <div style={{ ...styles.link, color: '#ff4d4f' }} onClick={handleLogout}>Logout</div>
                        </>
                    ) : (
                        <Link to="/login" style={{ ...styles.link, color: 'var(--color-primary)' }} onClick={() => setIsMenuOpen(false)}>Login</Link>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
