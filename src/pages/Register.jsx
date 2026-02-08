import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLoading } from '../context/LoadingContext';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const { register, userInfo } = useAuth();
    const { showLoading, hideLoading } = useLoading();
    const navigate = useNavigate();
    const location = useLocation();

    // Clear inputs on mount to ensure fresh state and bypass browser auto-fill
    useEffect(() => {
        const timer = setTimeout(() => {
            setName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setError('');
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    const redirect = location.search ? location.search.split('=')[1] : '/';

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, userInfo, redirect]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (!email.toLowerCase().endsWith('@gmail.com')) {
            setError('Please use a valid @gmail.com address');
            return;
        }

        showLoading();
        const result = await register(name, email, password);
        hideLoading();

        if (result.success) {
            setName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setError('');
            navigate(redirect); // Direct navigation after success
        } else {
            setError(result.message);
        }
    };

    const styles = {
        container: {
            maxWidth: '400px',
            margin: '4rem auto',
            padding: '2rem',
            backgroundColor: '#fff',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        },
        title: {
            fontSize: '2rem',
            color: 'var(--color-primary)',
            marginBottom: '1.5rem',
            textAlign: 'center',
            fontWeight: 'bold',
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            gap: '1.2rem',
        },
        inputGroup: {
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
        },
        label: {
            fontSize: '0.9rem',
            fontWeight: '600',
            color: 'var(--color-text-secondary)',
        },
        input: {
            padding: '0.8rem',
            borderRadius: '6px',
            border: '1px solid var(--color-border)',
            fontSize: '1rem',
        },
        error: {
            color: '#ff4d4f',
            fontSize: '0.9rem',
            marginBottom: '1rem',
            textAlign: 'center',
        },
        footer: {
            marginTop: '1.5rem',
            textAlign: 'center',
            fontSize: '0.95rem',
            color: 'var(--color-text-secondary)',
        },
        link: {
            color: 'var(--color-primary)',
            textDecoration: 'none',
            fontWeight: '600',
        }
    };

    return (
        <div className="container">
            <div style={styles.container}>
                <h1 style={styles.title}>Join Zaar-e-Koh</h1>
                {error && <div style={styles.error}>{error}</div>}
                <form style={styles.form} onSubmit={handleSubmit} autoComplete="off">
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Full Name</label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            style={styles.input}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            autoComplete="name"
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Email Address</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            style={styles.input}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoComplete="username"
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Password</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Create a password"
                                style={{ ...styles.input, width: '100%', paddingRight: '2.5rem' }}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                autoComplete="new-password"
                            />
                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    position: 'absolute',
                                    right: '10px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    cursor: 'pointer',
                                    fontSize: '1.2rem',
                                    opacity: 0.6
                                }}
                            >
                                {showPassword ? '👁️' : '👁️‍🗨️'}
                            </span>
                        </div>
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Confirm Password</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Confirm your password"
                                style={{ ...styles.input, width: '100%', paddingRight: '2.5rem' }}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <button type="submit" className="btn-primary" style={{ padding: '0.8rem', fontSize: '1rem', marginTop: '0.5rem' }}>
                        Create Account
                    </button>
                </form>
                <div style={styles.footer}>
                    Already have an account? <Link to="/login" style={styles.link}>Sign In</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
