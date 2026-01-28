import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const Home = () => {
    const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 768);

    React.useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const styles = {
        hero: {
            height: isMobile ? '60vh' : '75vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            backgroundImage: 'linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url("/images/hero.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            padding: '0 2rem',
            color: '#fff',
            marginBottom: '2rem',
            borderRadius: isMobile ? '0' : '0 0 24px 24px',
            boxShadow: 'var(--shadow-md)',
            position: 'relative'
        },
        title: {
            fontSize: isMobile ? '2.5rem' : '4.5rem',
            fontWeight: '800',
            marginBottom: '1rem',
            textShadow: '0 4px 12px rgba(0,0,0,0.5)',
        },
        subtitle: {
            fontSize: isMobile ? '1.1rem' : '1.5rem',
            marginBottom: '2.5rem',
            maxWidth: '800px',
            textShadow: '0 2px 10px rgba(0,0,0,0.8)',
            fontWeight: '600',
            lineHeight: '1.6'
        }
    }

    return (
        <div>
            <section style={styles.hero}>
                <img
                    src="/images/logo.png"
                    alt="Zaar-e-Koh Logo"
                    style={{
                        height: isMobile ? '120px' : '220px',
                        marginBottom: '1.5rem',
                        filter: 'brightness(0) invert(1) drop-shadow(0 4px 10px rgba(0,0,0,0.3))',
                        opacity: 0.95
                    }}
                />
                <p style={styles.subtitle}>Pure Himalayan Shilajit | پہاڑوں کا خالص تحفہ</p>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                    <Link to="/shop" className="btn-primary" style={{ fontSize: isMobile ? '1rem' : '1.1rem', padding: '1rem 3rem', boxShadow: '0 4px 12px rgba(0,0,0,0.3)', textDecoration: 'none' }}>Shop Collection</Link>
                </div>
            </section>

            <section className="container" style={{ padding: '4rem 2rem' }}>
                <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>Why Choose Zaar-e-Koh?</h2>
                    <p style={{ fontSize: '1.1rem', color: 'var(--color-text-secondary)' }}>
                        Our Shilajit is harvested at 16,000ft altitude in the Himalayas. It is purified using traditional methods to ensure 100% potency and safety.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    {/* Benefit 1 */}
                    <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚡</div>
                        <h3 style={{ marginBottom: '1rem', color: 'var(--color-text-primary)' }}>Boundless Energy</h3>
                        <p style={{ color: 'var(--color-text-secondary)' }}>
                            Rich in Fulvic Acid, Shilajit works at the cellular level to improve energy production (ATP), reducing fatigue and boosting stamina.
                        </p>
                    </div>

                    {/* Benefit 2 */}
                    <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🧠</div>
                        <h3 style={{ marginBottom: '1rem', color: 'var(--color-text-primary)' }}>Mental Clarity</h3>
                        <p style={{ color: 'var(--color-text-secondary)' }}>
                            Enhances cognitive function, memory, and focus. Used for centuries in Ayurveda as a powerful brain tonic.
                        </p>
                    </div>

                    {/* Benefit 3 */}
                    <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛡️</div>
                        <h3 style={{ marginBottom: '1rem', color: 'var(--color-text-primary)' }}>Immunity Boost</h3>
                        <p style={{ color: 'var(--color-text-secondary)' }}>
                            Packed with over 84 essential minerals and antioxidants that strengthen your immune system and fight aging.
                        </p>
                    </div>
                    {/* Benefit 4 */}
                    <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💪</div>
                        <h3 style={{ marginBottom: '1rem', color: 'var(--color-text-primary)' }}>Testosterone Support</h3>
                        <p style={{ color: 'var(--color-text-secondary)' }}>
                            Clinically proven to support healthy testosterone levels and reproductive health in men.
                        </p>
                    </div>
                    {/* Benefit 5 */}
                    <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏔️</div>
                        <h3 style={{ marginBottom: '1rem', color: 'var(--color-text-primary)' }}>100% Pure & Organic</h3>
                        <p style={{ color: 'var(--color-text-secondary)' }}>
                            No fillers, no additives. Just pure, sun-dried resin filtered with natural spring water.
                        </p>
                    </div>
                    {/* Benefit 6 */}
                    <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>❤️</div>
                        <h3 style={{ marginBottom: '1rem', color: 'var(--color-text-primary)' }}>Heart Health</h3>
                        <p style={{ color: 'var(--color-text-secondary)' }}>
                            Studies suggest Shilajit may improve heart health and help regulate blood pressure levels naturally.
                        </p>
                    </div>
                </div>
            </section>

            <section style={{ backgroundColor: '#fff', padding: '5rem 2rem', textAlign: 'center' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Ready to Experience the Difference?</h2>
                <Link to="/shop" className="btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 3rem', textDecoration: 'none', display: 'inline-block' }}>Order Now</Link>
            </section>
        </div>
    );
};

export default Home;
