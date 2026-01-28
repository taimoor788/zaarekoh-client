import React from 'react';

const MapLocation = ({ title, address, embedUrl }) => {
    return (
        <div style={{ marginBottom: '2rem' }}>
            <h4 style={{ color: 'var(--color-primary)', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                📍 {title}
            </h4>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1rem', fontSize: '0.95rem' }}>{address}</p>
            <div style={{
                width: '100%',
                height: '250px',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                border: '1px solid var(--color-border)'
            }}>
                <iframe
                    title={title}
                    src={embedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
        </div>
    );
};

export default MapLocation;
