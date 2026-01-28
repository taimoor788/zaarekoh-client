import React from 'react';

const TermsConditions = () => {
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
            <h1 style={{ color: 'var(--color-primary)', marginBottom: '1.5rem', fontSize: '2.5rem' }}>Terms & Conditions – Zaarekoh</h1>

            <p style={{ ...textStyle, fontWeight: '500' }}>
                Welcome to Zaarekoh. By accessing or using our website, you agree to follow these Terms & Conditions. Please read them carefully before using our services.
            </p>

            <div style={sectionStyle}>
                <h3 style={headingStyle}>1. General</h3>
                <ul style={listStyle}>
                    <li>These Terms apply to all visitors, users, and customers of Zaarekoh.</li>
                    <li>By using this website, you agree to be bound by these Terms.</li>
                    <li>If you do not agree, please do not use our website.</li>
                </ul>
            </div>

            <div style={sectionStyle}>
                <h3 style={headingStyle}>2. Products Information</h3>
                <ul style={listStyle}>
                    <li>Zaarekoh provides natural Shilajit products.</li>
                    <li>We try our best to ensure all product details, images, and descriptions are accurate.</li>
                    <li>However, minor variations may occur due to natural ingredients.</li>
                </ul>
            </div>

            <div style={sectionStyle}>
                <h3 style={headingStyle}>3. Orders & Payments</h3>
                <ul style={listStyle}>
                    <li>All orders placed through our website are subject to acceptance and availability.</li>
                    <li>Prices are listed on the website and may change without prior notice.</li>
                    <li>Payment must be completed before order processing.</li>
                </ul>
            </div>

            <div style={sectionStyle}>
                <h3 style={headingStyle}>4. Shipping & Delivery</h3>
                <ul style={listStyle}>
                    <li>We aim to deliver orders within the estimated time mentioned on the website.</li>
                    <li>Delivery times may vary due to location, weather, or courier issues.</li>
                    <li>Zaarekoh is not responsible for delays caused by third-party delivery services.</li>
                </ul>
            </div>

            <div style={sectionStyle}>
                <h3 style={headingStyle}>5. Returns & Refunds</h3>
                <ul style={listStyle}>
                    <li>Due to the nature of health and consumable products, returns or refunds are not accepted once the product is opened.</li>
                    <li>If you receive a damaged or incorrect item, please contact us within 24 hours of delivery.</li>
                </ul>
            </div>

            <div style={sectionStyle}>
                <h3 style={headingStyle}>6. Health Disclaimer</h3>
                <ul style={listStyle}>
                    <li>Our products are not intended to diagnose, treat, cure, or prevent any disease.</li>
                    <li>Always consult a qualified healthcare professional before using any supplement.</li>
                    <li>Results may vary from person to person.</li>
                </ul>
            </div>

            <div style={sectionStyle}>
                <h3 style={headingStyle}>7. User Responsibilities</h3>
                <p style={textStyle}>You agree that you will:</p>
                <ul style={listStyle}>
                    <li>Provide accurate and complete information when placing an order</li>
                    <li>Not misuse the website or engage in illegal activities</li>
                    <li>Not copy, distribute, or misuse Zaarekoh content without permission</li>
                </ul>
            </div>

            <div style={sectionStyle}>
                <h3 style={headingStyle}>8. Intellectual Property</h3>
                <ul style={listStyle}>
                    <li>All content on this website (text, logo, images, design) belongs to Zaarekoh.</li>
                    <li>Unauthorized use or copying is strictly prohibited.</li>
                </ul>
            </div>

            <div style={sectionStyle}>
                <h3 style={headingStyle}>9. Limitation of Liability</h3>
                <ul style={listStyle}>
                    <li>Zaarekoh will not be responsible for any direct or indirect damages arising from the use of our website or products.</li>
                    <li>Use our products at your own responsibility.</li>
                </ul>
            </div>

            <div style={sectionStyle}>
                <h3 style={headingStyle}>10. Changes to Terms</h3>
                <ul style={listStyle}>
                    <li>Zaarekoh reserves the right to update or change these Terms & Conditions at any time.</li>
                    <li>Changes will be effective immediately once posted on this page.</li>
                </ul>
            </div>

            <div style={sectionStyle}>
                <h3 style={headingStyle}>11. Contact Us</h3>
                <p style={textStyle}>If you have any questions about these Terms & Conditions, you can contact us:</p>
                <p style={{ ...textStyle, marginBottom: '0.2rem' }}><strong>Brand:</strong> Zaarekoh – Pure Shilajit</p>
                <p style={textStyle}><strong>Email:</strong> zaarekoh@gmail.com</p>
            </div>
        </div>
    );
};

export default TermsConditions;
