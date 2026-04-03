'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <main className={styles.main}>
            <header className={styles.header}>
                <div className="container">
                    <nav className={styles.nav}>
                        <Link href="/" className={styles.logo}>
                            <span style={{ color: 'var(--primary)', fontWeight: '800' }}>EQC</span>
                            <span style={{ color: 'var(--accent)', fontWeight: '700', fontSize: '0.85em' }}>.Care</span>
                        </Link>

                        {/* Desktop Nav */}
                        <div className={styles.navLinks}>
                            <Link href="/about">About</Link>
                            <Link href="/contact">Contact</Link>
                            <Link href="/login" className={styles.loginBtn}>Portal Login</Link>
                        </div>

                        {/* Mobile Hamburger */}
                        <button className={styles.hamburger} onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu">
                            <span style={{ display: 'block', width: '22px', height: '2px', background: 'var(--foreground)', borderRadius: '2px', transition: 'all 0.2s', transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
                            <span style={{ display: 'block', width: '22px', height: '2px', background: 'var(--foreground)', borderRadius: '2px', opacity: menuOpen ? 0 : 1, transition: 'all 0.2s' }} />
                            <span style={{ display: 'block', width: '22px', height: '2px', background: 'var(--foreground)', borderRadius: '2px', transition: 'all 0.2s', transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
                        </button>
                    </nav>

                    {/* Mobile Menu Dropdown */}
                    {menuOpen && (
                        <div className={styles.mobileMenu}>
                            <Link href="/about" onClick={() => setMenuOpen(false)}>About</Link>
                            <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
                            <Link href="/login" onClick={() => setMenuOpen(false)} className={styles.loginBtn}>Portal Login</Link>
                        </div>
                    )}
                </div>
            </header>

            <section className={styles.hero}>
                <div className="container">
                    <h1 className={styles.title}>
                        Compassionate Care,<br />
                        <span className={styles.highlight}>Expect Excellence.</span>
                    </h1>
                    <p className={styles.subtitle}>
                        Connecting families with trusted caregivers and facilities with reliable staff.
                    </p>

                    <div className={styles.ctaGrid}>
                        <div className={`${styles.card} glass-panel`}>
                            <div>
                                <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🏠</div>
                                <h2>For Families</h2>
                                <p>Find the perfect care for your loved ones at home.</p>
                            </div>
                            <Link href="/home-care" className="btn btn-primary">
                                I Need Care at Home
                            </Link>
                        </div>

                        <div className={`${styles.card} glass-panel`}>
                            <div>
                                <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🏥</div>
                                <h2>For Facilities</h2>
                                <p>Reliable staffing solutions for your healthcare facility.</p>
                            </div>
                            <Link href="/staffing" className="btn btn-primary">
                                I Need Staff
                            </Link>
                        </div>
                    </div>

                    <div className={styles.portalBanner}>
                        <span>Are you a caregiver or agency admin?</span>
                        <Link href="/login" className={styles.loginBtn}>
                            Sign into HCMS Portal →
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
