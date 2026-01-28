import React from 'react';

const PrivacyPolicy = () => {
    const sectionStyle = {
        marginBottom: '2rem'
    };
    const headingStyle = {
        color: 'var(--color-text-primary)',
        marginBottom: '1rem',
        fontSize: '1.25rem'
    };
    const textStyle = {
        color: 'var(--color-text-secondary)',
        lineHeight: '1.8',
        marginBottom: '1rem'
    };
    const listStyle = {
        paddingLeft: '1.5rem',
        marginBottom: '1.5rem',
        color: 'var(--color-text-secondary)',
        lineHeight: '1.8'
    };

    return (
        <div className="container" style={{ padding: '4rem 1rem', maxWidth: '800px', margin: '0 auto', minHeight: '60vh' }}>
            <h1 style={{ color: 'var(--color-primary)', marginBottom: '1.5rem', fontSize: '2.5rem' }}>Privacy Policy – Zaarekoh</h1>

            <p style={textStyle}>
                At Zaarekoh, your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you visit or use our website.
            </p>

            <div style={sectionStyle}>
                <h3 style={headingStyle}>1. Information We Collect</h3>
                <p style={textStyle}>When you use our website, we may collect the following information:</p>
                <ul style={listStyle}>
                    <li>Your name</li>
                    <li>Phone number</li>
                    <li>Email address</li>
                    <li>Shipping and billing address</li>
                    <li>Order and payment details</li>
                    <li>Any information you share through contact forms or messages</li>
                </ul>
                <p style={textStyle}>We only collect information that is necessary to provide our services.</p>
            </div>

            <div style={sectionStyle}>
                <h3 style={headingStyle}>2. How We Use Your Information</h3>
                <p style={textStyle}>We use your information to:</p>
                <ul style={listStyle}>
                    <li>Process and deliver your orders</li>
                    <li>Communicate with you about your order or inquiries</li>
                    <li>Improve our website, products, and services</li>
                    <li>Send updates, offers, or promotional messages (only if you agree)</li>
                </ul>
                <p style={textStyle}><strong>We do not sell or rent your personal information to anyone.</strong></p>
            </div>

            <div style={sectionStyle}>
                <h3 style={headingStyle}>3. Cookies</h3>
                <p style={textStyle}>Our website may use cookies to:</p>
                <ul style={listStyle}>
                    <li>Improve user experience</li>
                    <li>Understand how visitors use our website</li>
                </ul>
                <p style={textStyle}>You can disable cookies in your browser settings if you prefer.</p>
            </div>

            <div style={sectionStyle}>
                <h3 style={headingStyle}>4. Data Protection</h3>
                <p style={textStyle}>We take reasonable security measures to protect your personal data from:</p>
                <ul style={listStyle}>
                    <li>Unauthorized access</li>
                    <li>Misuse or disclosure</li>
                </ul>
                <p style={textStyle}>However, no method of online data transmission is 100% secure.</p>
            </div>

            <div style={sectionStyle}>
                <h3 style={headingStyle}>5. Third-Party Services</h3>
                <p style={textStyle}>
                    We may use trusted third-party services (such as payment gateways or delivery partners) only to complete your order. These services have their own privacy policies, and we are not responsible for their practices.
                </p>
            </div>

            <div style={sectionStyle}>
                <h3 style={headingStyle}>6. Your Rights</h3>
                <p style={textStyle}>You have the right to:</p>
                <ul style={listStyle}>
                    <li>Request access to your personal information</li>
                    <li>Ask for correction or deletion of your data</li>
                    <li>Unsubscribe from promotional messages at any time</li>
                </ul>
            </div>

            <div style={sectionStyle}>
                <h3 style={headingStyle}>7. Changes to This Policy</h3>
                <p style={textStyle}>
                    Zaarekoh may update this Privacy Policy from time to time. Any changes will be posted on this page.
                </p>
            </div>

            <div style={sectionStyle}>
                <h3 style={headingStyle}>8. Contact Us</h3>
                <p style={textStyle}>If you have any questions about this Privacy Policy, you can contact us at:</p>
                <p style={{ ...textStyle, marginBottom: '0.2rem' }}><strong>Email:</strong> zaarekoh@gmail.com</p>
                <p style={textStyle}><strong>Brand:</strong> Zaarekoh – Pure Shilajit</p>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
