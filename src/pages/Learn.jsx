import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Learn = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [activeFaq, setActiveFaq] = useState(null);
    const [language, setLanguage] = useState('en'); // 'en' or 'ur'

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const [content, setContent] = useState(null);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/learn');
                const data = await res.json();
                setContent(data);
            } catch (error) {
                console.error('Error fetching content:', error);
            }
        };
        fetchContent();
    }, []);

    const t = content ? content[language] : null;

    if (!t) return <div style={{ padding: '4rem', textAlign: 'center' }}>Loading...</div>;

    const styles = {
        container: {
            maxWidth: '1000px',
            margin: '0 auto',
            padding: isMobile ? '2rem 1.5rem' : '4rem 2rem',
            lineHeight: '1.8',
            direction: language === 'ur' ? 'rtl' : 'ltr',
            textAlign: language === 'ur' ? 'right' : 'left',
            fontFamily: language === 'ur' ? "'Noto Nastaliq Urdu', serif" : 'inherit'
        },
        toggleContainer: {
            display: 'flex',
            justifyContent: 'flex-end',
            marginBottom: '2rem'
        },
        toggleBtn: {
            padding: '0.6rem 1.5rem',
            borderRadius: '50px',
            border: '2px solid var(--color-primary)',
            backgroundColor: 'transparent',
            color: 'var(--color-primary)',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'all 0.3s ease',
            fontSize: '0.9rem'
        },
        activeToggleBtn: {
            backgroundColor: 'var(--color-primary)',
            color: '#fff'
        },
        hero: {
            textAlign: 'center',
            marginBottom: '4rem'
        },
        heading: {
            fontSize: isMobile ? '1.8rem' : '2.8rem',
            color: 'var(--color-primary)',
            marginBottom: '1rem',
            fontWeight: 'bold'
        },
        section: {
            marginBottom: '4rem',
            scrollMarginTop: '100px'
        },
        subHeading: {
            fontSize: '2rem',
            marginBottom: '1.5rem',
            color: 'var(--color-text-primary)',
            borderLeft: language === 'en' ? '4px solid var(--color-primary)' : 'none',
            borderRight: language === 'ur' ? '4px solid var(--color-primary)' : 'none',
            paddingLeft: language === 'en' ? '1rem' : '0',
            paddingRight: language === 'ur' ? '1rem' : '0'
        },
        // Type: Text + Quote
        textQuoteCard: {
            backgroundColor: '#fff',
            padding: '2rem',
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            border: '1px solid #eee'
        },
        quoteBox: {
            backgroundColor: '#f0f7ff',
            padding: '1.5rem',
            borderRadius: '12px',
            marginTop: '1.5rem',
            borderLeft: language === 'en' ? '4px solid var(--color-primary)' : 'none',
            borderRight: language === 'ur' ? '4px solid var(--color-primary)' : 'none',
            color: '#004a99',
            fontStyle: 'italic',
            fontWeight: '500'
        },
        // Type: Image Left/Right
        imageBlock: {
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: 'center',
            gap: '3rem'
        },
        imageContainer: {
            flex: 1,
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
        },
        image: {
            width: '100%',
            height: 'auto',
            display: 'block'
        },
        contentSide: {
            flex: 1,
            fontSize: '1.1rem',
            whiteSpace: 'pre-line' // Respects newlines in text
        },
        caption: {
            textAlign: 'center',
            fontSize: '0.9rem',
            color: '#777',
            marginTop: '0.5rem',
            fontStyle: 'italic'
        },
        // Type: Cards
        cardsGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem'
        },
        cardItem: {
            backgroundColor: '#fff',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            border: '1px solid #f0f0f0',
            textAlign: 'center'
        },
        cardTitle: {
            color: 'var(--color-primary)',
            fontSize: '1.3rem',
            marginBottom: '0.8rem',
            fontWeight: 'bold'
        },
        // Misc
        faqItem: {
            borderBottom: '1px solid #eee',
            padding: '1.2rem 0',
            cursor: 'pointer'
        },
        cta: {
            textAlign: 'center',
            backgroundColor: 'var(--color-primary)',
            padding: isMobile ? '3rem 1.5rem' : '4rem',
            borderRadius: '24px',
            color: '#fff',
            backgroundImage: 'linear-gradient(135deg, #1877F2 0%, #1159b3 100%)',
            marginTop: '4rem',
            boxShadow: '0 10px 30px rgba(24, 119, 242, 0.3)'
        }
    };

    // Helper to Render Different Section Types
    const renderSection = (section, index) => {
        switch (section.type) {
            case 'text_quote':
                return (
                    <section key={section.id || index} style={styles.section}>
                        <h2 style={styles.subHeading}>{section.title}</h2>
                        <div style={styles.textQuoteCard}>
                            <p style={{ fontSize: '1.1rem' }}>{section.content}</p>
                            {section.quote && (
                                <div style={styles.quoteBox}>
                                    {section.quote}
                                </div>
                            )}
                        </div>
                    </section>
                );

            case 'image_left':
            case 'image_right':
                const isRight = section.type === 'image_right';
                // If Urdu (RTL), 'right' means visual left. We need to handle this logical flip or just rely on flex-direction row-reverse.
                // standard row = Image Left. row-reverse = Image Right.
                // Ideally: Image Left = Image first in DOM. Image Right = Image second.
                const imageFirst = !isRight;

                return (
                    <section key={section.id || index} style={styles.section}>
                        <h2 style={styles.subHeading}>{section.title}</h2>
                        <div style={{ ...styles.imageBlock, flexDirection: isMobile ? 'column' : (isRight ? 'row-reverse' : 'row') }}>
                            {/* Image Side */}
                            <div style={styles.imageContainer}>
                                <img src={section.image} alt={section.title} style={styles.image} />
                                {section.caption && <p style={styles.caption}>{section.caption}</p>}
                            </div>
                            {/* Content Side */}
                            <div style={styles.contentSide}>
                                {section.content}
                            </div>
                        </div>
                    </section>
                );

            case 'cards':
                return (
                    <section key={section.id || index} style={styles.section}>
                        <h2 style={styles.subHeading}>{section.title}</h2>
                        {section.description && <p style={{ marginBottom: '2rem', color: '#666' }}>{section.description}</p>}
                        <div style={styles.cardsGrid}>
                            {section.cards && section.cards.map((card, idx) => (
                                <div key={idx} style={styles.cardItem}>
                                    <h3 style={styles.cardTitle}>{card.title}</h3>
                                    <p>{card.text}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                );

            default:
                return null;
        }
    };

    return (
        <div style={styles.container}>
            {/* Language Toggle */}
            <div style={styles.toggleContainer}>
                <button
                    style={{ ...styles.toggleBtn, ...(language === 'en' ? styles.activeToggleBtn : {}), marginRight: language === 'en' ? '0.5rem' : '0' }}
                    onClick={() => setLanguage('en')}
                >
                    English
                </button>
                <button
                    style={{ ...styles.toggleBtn, ...(language === 'ur' ? styles.activeToggleBtn : {}), marginLeft: language === 'ur' ? '0.5rem' : '0' }}
                    onClick={() => setLanguage('ur')}
                >
                    اردو
                </button>
            </div>

            {/* Hero Section */}
            {t.hero && (
                <header style={styles.hero}>
                    <h1 style={styles.heading}>{t.hero.title}</h1>
                    <p style={{ fontSize: '1.25rem', color: '#555', maxWidth: '750px', margin: '0 auto' }}>
                        {t.hero.subtitle}
                    </p>
                </header>
            )}

            {/* Dynamic Sections */}
            {t.sections && t.sections.map((section, index) => renderSection(section, index))}

            {/* FAQ Section (Fixed) */}
            {t.faqSection && (
                <section style={styles.section}>
                    <h2 style={styles.subHeading}>{t.faqSection.title}</h2>
                    <div style={{ marginTop: '2rem' }}>
                        {t.faqSection.faqs.map((faq, idx) => (
                            <div key={idx} style={styles.faqItem} onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '600' }}>
                                    <span>{faq.q}</span>
                                    <span style={{ color: 'var(--color-primary)' }}>{activeFaq === idx ? '−' : '+'}</span>
                                </div>
                                {activeFaq === idx && (
                                    <div style={{ paddingTop: '1rem', color: '#555' }}>{faq.a}</div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* CTA */}
            {t.cta && (
                <div style={styles.cta}>
                    <h2 style={{ marginBottom: '1rem', fontSize: '2.5rem', fontWeight: 'bold' }}>{t.cta.title}</h2>
                    <p style={{ marginBottom: '2rem', fontSize: '1.2rem', opacity: 0.9 }}>{t.cta.text}</p>
                    <Link to="/shop" style={{
                        backgroundColor: '#fff',
                        color: 'var(--color-primary)',
                        padding: '1.2rem 3rem',
                        borderRadius: '50px',
                        textDecoration: 'none',
                        fontWeight: 'bold',
                        display: 'inline-block'
                    }}>
                        {t.cta.btn}
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Learn;
