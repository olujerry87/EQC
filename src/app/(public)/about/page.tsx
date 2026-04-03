import React from 'react';

export default function AboutPage() {
    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 2rem' }}>
            <div className="animate-fade-in">
                <h1 style={{ fontSize: '3rem', fontWeight: '800', color: 'var(--primary)', marginBottom: '1rem', letterSpacing: '-0.025em' }}>
                    About HCMS
                </h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--muted)', lineHeight: '1.8', marginBottom: '3rem' }}>
                    Pioneering the future of compassionate, verifiable, and unified care management.
                </p>

                <div className="glass-panel" style={{ padding: '2.5rem', borderRadius: '1.5rem', marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--foreground)' }}>Our Mission</h2>
                    <p style={{ color: 'var(--muted)', lineHeight: '1.7', fontSize: '1.125rem' }}>
                        At HCMS (Home Care Management System), we believe that excellent care stems from excellent communication and trust. 
                        By bridging the gap between care agencies, field staff, and the families relying on their expertise, 
                        we deploy cutting edge Electronic Visit Verification (EVV) algorithms to ensure safety is never compromised.
                        We strip away the administrative friction of home care so our professionals can focus on what they do best: caring.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                    <div className="glass-panel" style={{ padding: '2rem', borderRadius: '1.5rem', borderTop: '4px solid var(--accent)' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1rem' }}>Trusted by Agencies</h3>
                        <p style={{ color: 'var(--muted)' }}>
                            Over 150 local and regional health organizations utilize HCMS’s Multi-Tenant RBAC routing to guarantee 
                            bulletproof data security and HIPAA/PIPEDA compliance.
                        </p>
                    </div>
                    <div className="glass-panel" style={{ padding: '2rem', borderRadius: '1.5rem', borderTop: '4px solid var(--primary)' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1rem' }}>Empowering Families</h3>
                        <p style={{ color: 'var(--muted)' }}>
                            Transparency isn't a premium feature—it's a requirement. We bring real-time care milestone portals right to the 
                            hands of the family members who matter most.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
