import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const { login, userInfo } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const redirect = location.search ? location.search.split('=')[1] : '/';

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, userInfo, redirect]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Allow admin@example.com to bypass strict gmail check
        if (email !== 'admin@example.com' && !email.toLowerCase().endsWith('@gmail.com')) {
            setError('Please use a valid @gmail.com address');
            return;
        }

        const result = await login(email, password);
        if (!result.success) {
            setError(result.message);
            setPassword(''); // Clear password on error as requested
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
                <h1 style={styles.title}>Welcome Back</h1>
                {error && <div style={styles.error}>{error}</div>}
                <form style={styles.form} onSubmit={handleSubmit}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Email Address</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            style={styles.input}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Password</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                style={{ ...styles.input, width: '100%', paddingRight: '2.5rem' }}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
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
                    <button type="submit" className="btn-primary" style={{ padding: '0.8rem', fontSize: '1rem', marginTop: '0.5rem' }}>
                        Sign In
                    </button>
                </form>
                <div style={styles.footer}>
                    New to Zaar-e-Koh? <Link to="/register" style={styles.link}>Create an account</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
