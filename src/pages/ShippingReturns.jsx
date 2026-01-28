import React from 'react';

const ShippingReturns = () => {
    const sectionStyle = {
        marginBottom: '2.5rem'
    };
    const headingStyle = {
        color: 'var(--color-text-primary)',
        marginBottom: '1rem',
        fontSize: '1.5rem',
        borderBottom: '1px solid #eee',
        paddingBottom: '0.5rem'
    };
    const subHeadingStyle = {
        color: 'var(--color-text-primary)',
        marginBottom: '0.8rem',
        fontSize: '1.1rem',
        fontWeight: 'bold'
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
            <h1 style={{ color: 'var(--color-primary)', marginBottom: '1.5rem', fontSize: '2.5rem' }}>Shipping & Returns Policy – Zaarekoh</h1>

            <p style={{ ...textStyle, fontSize: '1.1rem' }}>
                At Zaarekoh, we aim to provide a smooth and reliable shopping experience for our customers. Please read our Shipping & Returns Policy carefully.
            </p>

            <div style={sectionStyle}>
                <h2 style={headingStyle}>Shipping Policy</h2>

                <div style={{ marginBottom: '1.5rem' }}>
                    <h4 style={subHeadingStyle}>Order Processing</h4>
                    <ul style={listStyle}>
                        <li>Orders are usually processed within 1–2 working days after confirmation.</li>
                        <li>Once your order is processed, it will be handed over to our delivery partner.</li>
                    </ul>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                    <h4 style={subHeadingStyle}>Delivery Time</h4>
                    <ul style={listStyle}>
                        <li>Delivery usually takes 3–5 working days depending on your location.</li>
                        <li>Delivery times may vary due to weather conditions, holidays, or courier delays.</li>
                    </ul>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                    <h4 style={subHeadingStyle}>Shipping Charges</h4>
                    <ul style={listStyle}>
                        <li>Shipping charges (if any) will be clearly mentioned at checkout.</li>
                        <li>Any promotional free-shipping offers will be shown on the website.</li>
                    </ul>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                    <h4 style={subHeadingStyle}>Delivery Issues</h4>
                    <ul style={listStyle}>
                        <li>Please ensure your address and contact details are correct.</li>
                        <li>Zaarekoh is not responsible for delays caused by incorrect information or courier service issues.</li>
                    </ul>
                </div>
            </div>

            <div style={sectionStyle}>
                <h2 style={headingStyle}>Returns & Refunds Policy</h2>
                <p style={textStyle}>Due to the nature of health and consumable products, we follow a strict returns policy.</p>

                <div style={{ marginBottom: '1.5rem' }}>
                    <h4 style={subHeadingStyle}>Returns</h4>
                    <p style={textStyle}>Opened or used products are not eligible for return or exchange. Returns are only accepted if:</p>
                    <ul style={listStyle}>
                        <li>You receive a damaged product</li>
                        <li>You receive a wrong item</li>
                    </ul>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                    <h4 style={subHeadingStyle}>Reporting an Issue</h4>
                    <ul style={listStyle}>
                        <li>Any issue must be reported within 24 hours of delivery.</li>
                        <li>Please share clear photos or videos of the product and packaging for verification.</li>
                    </ul>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                    <h4 style={subHeadingStyle}>Refunds</h4>
                    <ul style={listStyle}>
                        <li>Once your return request is approved, a refund or replacement will be processed.</li>
                        <li>Refunds (if applicable) will be issued through the original payment method.</li>
                        <li>Processing time may take 5–7 working days.</li>
                    </ul>
                </div>
            </div>

            <div style={sectionStyle}>
                <h2 style={headingStyle}>Contact Us</h2>
                <p style={textStyle}>If you have any questions regarding shipping or returns, please contact us:</p>
                <p style={{ ...textStyle, marginBottom: '0.2rem' }}><strong>Brand:</strong> Zaarekoh – Pure Shilajit</p>
                <p style={textStyle}><strong>Email:</strong> zaarekoh@gmail.com</p>
            </div>
        </div>
    );
};

export default ShippingReturns;
