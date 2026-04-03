import React from 'react';
import Link from 'next/link';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--background)' }}>
            {/* Sidebar */}
            <aside style={{
                width: '260px',
                borderRight: '1px solid var(--border)',
                background: 'var(--glass-bg)',
                backdropFilter: 'blur(var(--glass-blur))',
                display: 'flex',
                flexDirection: 'column',
                padding: '1.5rem'
            }}>
                <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--primary)', marginBottom: '2rem' }}>
                    HCMS<span style={{ color: 'var(--accent)' }}>.Platform</span>
                </div>
                
                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--muted)', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Agency Admin</div>
                    <Link href="/agency/scheduling" style={{ padding: '0.75rem 1rem', borderRadius: 'var(--radius)', background: 'rgba(79, 70, 229, 0.1)', color: 'var(--primary)', fontWeight: '500', display: 'block' }}>Dynamic Scheduling</Link>
                    
                    <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--muted)', letterSpacing: '0.05em', margin: '1.5rem 0 0.5rem 0' }}>Field Staff</div>
                    <Link href="/staff/evv" style={{ display: 'block', padding: '0.75rem 1rem', borderRadius: 'var(--radius)', color: 'var(--foreground)', transition: 'background 0.2s' }}>EVV Clock-In</Link>
                    <Link href="/staff/forms" style={{ display: 'block', padding: '0.75rem 1rem', borderRadius: 'var(--radius)', color: 'var(--foreground)', transition: 'background 0.2s' }}>Digital Docs (Offline)</Link>

                    <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--muted)', letterSpacing: '0.05em', margin: '1.5rem 0 0.5rem 0' }}>Client & Family</div>
                    <Link href="/family/portal" style={{ display: 'block', padding: '0.75rem 1rem', borderRadius: 'var(--radius)', color: 'var(--foreground)', transition: 'background 0.2s' }}>Family Portal</Link>
                </nav>

                <div style={{ marginTop: 'auto' }}>
                    <form action="/api/auth/signout" method="POST">
                        <button className="btn btn-secondary" style={{ width: '100%', fontSize: '0.875rem' }}>Sign Out</button>
                    </form>
                </div>
            </aside>

            {/* Main Content Area */}
            <main style={{ flex: 1, padding: '2rem 3rem', overflowY: 'auto', position: 'relative' }}>
                <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: '30vh', 
                    background: 'linear-gradient(180deg, rgba(79, 70, 229, 0.05) 0%, rgba(255, 255, 255, 0) 100%)',
                    zIndex: 0, pointerEvents: 'none'
                }} />
                <div className="animate-fade-in" style={{ position: 'relative', zIndex: 1 }}>
                    {children}
                </div>
            </main>
        </div>
    );
}
