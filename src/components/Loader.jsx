import React from 'react';

/**
 * Reusable Loader component
 * @param {boolean} fullScreen - Whether to show as a fixed full-screen overlay (default: false)
 */
const Loader = ({ fullScreen = false }) => {
    const containerStyle = fullScreen ? {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        zIndex: 9999,
    } : {
        width: '100%',
        minHeight: '40vh',
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            ...containerStyle
        }}>
            <img
                src="/images/logo.png"
                alt="Zaar-e-Koh Logo"
                style={{
                    height: fullScreen ? '100px' : '80px',
                    marginBottom: '1.5rem',
                    animation: 'pulse-branding 1.5s infinite ease-in-out'
                }}
            />
            <div className="loader-dots-branding" style={{ display: 'flex', gap: '8px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--color-primary)', animation: 'bounce-branding 1.s infinite 0.1s' }}></div>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--color-primary)', animation: 'bounce-branding 1.s infinite 0.2s' }}></div>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--color-primary)', animation: 'bounce-branding 1.s infinite 0.3s' }}></div>
            </div>
            <style>{`
                @keyframes pulse-branding {
                    0% { transform: scale(1); opacity: 0.8; }
                    50% { transform: scale(1.1); opacity: 1; }
                    100% { transform: scale(1); opacity: 0.8; }
                }
                @keyframes bounce-branding {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-8px); }
                }
            `}</style>
        </div>
    );
};

export default Loader;
