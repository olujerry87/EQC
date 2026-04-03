import React from 'react';

export default function ContactPage() {
    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 2rem' }}>
            <div className="animate-fade-in">
                <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h1 style={{ fontSize: '3rem', fontWeight: '800', color: 'var(--foreground)', marginBottom: '1rem', letterSpacing: '-0.025em' }}>
                        Get securely in touch.
                    </h1>
                    <p style={{ fontSize: '1.125rem', color: 'var(--muted)' }}>
                        Our agency relations and technical support team is 24/7.
                    </p>
                </header>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '3rem' }}>
                    <div className="glass-panel" style={{ padding: '2rem', borderRadius: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ width: '48px', height: '48px', borderRadius: '24px', background: 'rgba(79, 70, 229, 0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '1rem' }}>
                            ✉
                        </div>
                        <h3 style={{ fontWeight: '700', marginBottom: '0.25rem' }}>Email Support</h3>
                        <p style={{ color: 'var(--muted)', textAlign: 'center' }}>support@hcms-platform.co<br/>Response usually within 10 mins.</p>
                    </div>

                    <div className="glass-panel" style={{ padding: '2rem', borderRadius: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ width: '48px', height: '48px', borderRadius: '24px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '1rem' }}>
                            ☏
                        </div>
                        <h3 style={{ fontWeight: '700', marginBottom: '0.25rem' }}>Global Toll-Free</h3>
                        <p style={{ color: 'var(--muted)', textAlign: 'center' }}>1-800-HCMS-CARE<br/>Mon - Fri, 8am to 8pm EST.</p>
                    </div>
                </div>

                <div className="glass-panel" style={{ padding: '2.5rem', borderRadius: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem' }}>Drop us a line</h2>
                    <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ display: 'flex', gap: '1.5rem' }}>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--muted)', fontSize: '0.875rem' }}>Full Name</label>
                                <input placeholder="Jane Doe" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'transparent' }} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--muted)', fontSize: '0.875rem' }}>Agency Name (Optional)</label>
                                <input placeholder="Sunrise Care" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'transparent' }} />
                            </div>
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--muted)', fontSize: '0.875rem' }}>Your Message</label>
                            <textarea placeholder="How can we assist you with onboarding?" style={{ width: '100%', height: '120px', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'transparent', resize: 'vertical' }}></textarea>
                        </div>
                        <button type="button" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>Send Secure Message</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
