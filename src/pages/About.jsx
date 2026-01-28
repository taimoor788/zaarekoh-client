import React, { useState, useEffect } from 'react';

const About = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const styles = {
        container: {
            width: '100%',
            overflowX: 'hidden'
        },
        hero: {
            position: 'relative',
            height: isMobile ? '60vh' : '70vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            textAlign: 'center',
            padding: '0 1.5rem',
            backgroundImage: 'linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url("/images/hero.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: isMobile ? 'scroll' : 'fixed'
        },
        heroContent: {
            maxWidth: '800px'
        },
        heroTitle: {
            fontSize: isMobile ? '2.5rem' : '4.5rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
            textShadow: '0 4px 15px rgba(0,0,0,0.6)'
        },
        heroSubtitle: {
            fontSize: isMobile ? '1.1rem' : '1.5rem',
            opacity: 1,
            maxWidth: '600px',
            margin: '0 auto',
            textShadow: '0 2px 10px rgba(0,0,0,0.8)',
            fontWeight: '600'
        },
        contentWrapper: {
            maxWidth: '1100px',
            margin: '0 auto',
            padding: isMobile ? '3rem 1.5rem' : '6rem 1rem'
        },
        section: {
            marginBottom: isMobile ? '4rem' : '7rem'
        },
        heading: {
            fontSize: isMobile ? '2rem' : '2.8rem',
            color: 'var(--color-primary)',
            marginBottom: '2rem',
            textAlign: 'center',
            fontWeight: 'bold'
        },
        subHeading: {
            fontSize: '1.4rem',
            color: 'var(--color-text-primary)',
            marginBottom: '1.2rem',
            fontWeight: '600'
        },
        text: {
            fontSize: '1.1rem',
            color: 'var(--color-text-secondary)',
            lineHeight: '1.9',
            marginBottom: '1.5rem'
        },
        grid: {
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? '2rem' : '5rem',
            alignItems: 'center'
        },
        cardGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            marginTop: '3rem'
        },
        featureCard: {
            backgroundColor: '#fff',
            padding: '2.5rem',
            borderRadius: '20px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
            textAlign: 'center',
            transition: 'transform 0.3s ease',
            border: '1px solid #f0f0f0'
        },
        icon: {
            fontSize: '3rem',
            marginBottom: '1.5rem',
            display: 'block'
        },
        quote: {
            fontSize: '1.4rem',
            fontStyle: 'italic',
            color: 'var(--color-primary)',
            textAlign: 'center',
            maxWidth: '800px',
            margin: '4rem auto',
            padding: '0 2rem',
            borderLeft: 'none',
            lineHeight: '1.6'
        }
    };

    return (
        <div style={styles.container}>
            {/* Hero Section */}
            <div style={styles.hero}>
                <div style={styles.heroContent}>
                    <h1 style={styles.heroTitle}>Our Story</h1>
                    <p style={styles.heroSubtitle}>Bridging Eternal Himalayan Wisdom with Modern Scientific Wellness.</p>
                </div>
            </div>

            <div style={styles.contentWrapper}>
                {/* Section 1: Introduction */}
                <section style={styles.section}>
                    <div style={styles.grid}>
                        <div>
                            <h2 style={{ ...styles.subHeading, fontSize: '2rem' }}>The Himalayan Legacy</h2>
                            <p style={styles.text}>
                                Founded in 2024, <strong>Zaarekoh</strong> was born from a deep reverence for the "Nectar of the Mountains." Our journey began not in a boardroom, but in the thin, crisp air of the Karakorams, where we witnessed the incredible vitality of those who live in harmony with these peaks.
                            </p>
                            <p style={styles.text}>
                                We realized that the most potent wellness solution wasn't found in a synthetic lab, but hidden within the ancient rock layers of the world's highest mountains. Zaarekoh was created to deliver this raw, untamed power directly to you, with total transparency and zero compromise.
                            </p>
                        </div>
                        <div style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
                            <img src="/images/product-resin.png" alt="Pure Shilajit Resin" style={{ width: '100%', display: 'block' }} />
                        </div>
                    </div>
                </section>

                <div style={styles.quote}>
                    "In the heart of the Himalayas at 16,000 feet, where the earth touches the sky, we find the purest essence of life. That essence is Zaarekoh."
                </div>

                {/* Section 2: Sourcing */}
                <section style={styles.section}>
                    <h2 style={styles.heading}>The Unrivaled Source</h2>
                    <div style={styles.grid}>
                        <div style={{ order: isMobile ? 2 : 1, borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
                            <img src="/images/hero.png" alt="Himalayan Peaks" style={{ width: '100%', display: 'block' }} />
                        </div>
                        <div style={{ order: isMobile ? 1 : 2 }}>
                            <h3 style={styles.subHeading}>Gilgit-Baltistan: The Altitude of Purity</h3>
                            <p style={styles.text}>
                                Not all Shilajit is equal. We exclusively source our resin from the high-altitude peaks of Gilgit-Baltistan. At elevations exceeding 16,000 feet, the resin forms over centuries under extreme geological pressure.
                            </p>
                            <p style={styles.text}>
                                This altitude ensures the resin is free from industrial pollutants and rich in a diverse mineral profile that lower-altitude versions simply cannot match. We call it **"Gold Grade"** because it represents the pinnacle of natural potency.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Section: Our Origins Map */}
                <section style={styles.section}>
                    <div style={{ ...styles.grid, gridTemplateColumns: '1fr' }}>
                        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
                            <h2 style={styles.heading}>Our Sources & Origins</h2>
                            <p style={styles.text}>
                                While our head office is in Lahore, the heart of Zaarekoh lies in the rural, pristine peaks of <strong>Upper Chitral</strong> and <strong>Gilgit</strong>. These high-altitude regions are the official sources of our Shilajit, where we work directly with local harvesters.
                            </p>
                            <p style={styles.text}>
                                To maintain our strong connection with these communities, we operate a regional base in <strong>Upper Dir</strong>, serving as our gateway to the Himalayan legacy.
                            </p>
                            <div style={{
                                width: '100%',
                                height: isMobile ? '300px' : '450px',
                                borderRadius: '30px',
                                overflow: 'hidden',
                                boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
                                border: '1px solid var(--color-border)',
                                marginTop: '2rem'
                            }}>
                                <iframe
                                    title="Upper Dir Source Location"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d104597.1044464139!2d71.8496417!3d35.1584852!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38db313c05c08889%3A0xe74f57c8bfbc464b!2sDir%20Upper%2C%20Khyber%20Pakhtunkhwa!5e0!3m2!1sen!2spk!4v1705031123456!5m2!1sen!2spk"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 3: Values/Process */}
                <section style={styles.section}>
                    <h2 style={styles.heading}>Our Purity Promise</h2>
                    <p style={{ ...styles.text, textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem auto' }}>
                        We follow a rigid standard of "Minimal Intervention," ensuring that what goes into our jars is exactly what the mountains provided.
                    </p>
                    <div style={styles.cardGrid}>
                        <div style={styles.featureCard}>
                            <span style={styles.icon}>🏺</span>
                            <h4 style={styles.subHeading}>Ethical Harvesting</h4>
                            <p style={{ ...styles.text, fontSize: '0.95rem' }}>We work with generational harvesters who respect the mountain ecosystem, ensuring a sustainable future for this natural resource.</p>
                        </div>
                        <div style={styles.featureCard}>
                            <span style={styles.icon}>☀️</span>
                            <h4 style={styles.subHeading}>Natural Filtration</h4>
                            <p style={{ ...styles.text, fontSize: '0.95rem' }}>We use pure mountain spring water for filtration and traditional sun-drying methods to preserve heat-sensitive bioactive molecules.</p>
                        </div>
                        <div style={styles.featureCard}>
                            <span style={styles.icon}>🔬</span>
                            <h4 style={styles.subHeading}>Lab Verification</h4>
                            <p style={{ ...styles.text, fontSize: '0.95rem' }}>Every batch undergoes rigorous third-party testing for purity, mineral content, and absence of heavy metals before it leaves our facility.</p>
                        </div>
                    </div>
                </section>

                {/* Section 4: Mission */}
                <section style={{ ...styles.section, textAlign: 'center', backgroundColor: 'var(--color-bg-primary)', padding: isMobile ? '3rem 1.5rem' : '5rem', borderRadius: '40px', marginBottom: 0 }}>
                    <h2 style={styles.heading}>Our Mission</h2>
                    <p style={{ ...styles.text, maxWidth: '800px', margin: '0 auto 2rem auto', fontSize: '1.2rem' }}>
                        At Zaarekoh, our mission is simpler than you might think: to empower the modern achiever with the ancient tools of vitality.
                    </p>
                    <p style={{ ...styles.text, maxWidth: '800px', margin: '0 auto' }}>
                        In a world of synthetic supplements and quick fixes, we stand for authenticity. We aren't just selling Shilajit; we are providing a bridge back to the earth—a way to reclaim your natural energy, clarity, and strength.
                    </p>
                    <div style={{ marginTop: '3rem' }}>
                        <a href="/shop" className="btn-primary" style={{ padding: '1.2rem 3.5rem', borderRadius: '50px', fontSize: '1.1rem' }}>Experience the Purity</a>
                        <p style={{ marginTop: '1.5rem', color: 'var(--color-text-secondary)', fontWeight: 'bold' }}>Zaarekoh – Purest Himalayan Shilajit</p>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default About;
