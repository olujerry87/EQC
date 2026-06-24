'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
    {
        section: 'Agency Admin',
        links: [
            { href: '/agency/scheduling', label: '🗓 Scheduling Marketplace' },
            { href: '/agency/financials',  label: '💳 Financials & Payroll' },
        ],
    },
    {
        section: 'Field Staff',
        links: [
            { href: '/staff/evv',   label: '⏱ EVV Clock-In' },
            { href: '/staff/forms', label: '📋 Shift Logistics & Expenses' },
        ],
    },
    {
        section: 'Client & Family',
        links: [
            { href: '/family/portal', label: '👨‍👩‍👧 Family Portal' },
        ],
    },
];

function SidebarContent({ pathname, onNav }: { pathname: string; onNav?: () => void }) {
    return (
        <>
            <Link href="/" onClick={onNav} style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--primary)', marginBottom: '2rem', display: 'block', textDecoration: 'none' }}>
                HCMS<span style={{ color: 'var(--accent)' }}>.Platform</span>
            </Link>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', flex: 1 }}>
                {navItems.map(group => (
                    <div key={group.section}>
                        <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--muted)', letterSpacing: '0.08em', margin: '1rem 0 0.4rem', fontWeight: '700' }}>
                            {group.section}
                        </div>
                        {group.links.map(link => {
                            const active = pathname === link.href;
                            return (
                                <Link key={link.href} href={link.href} onClick={onNav} style={{
                                    display: 'block', padding: '0.7rem 1rem', borderRadius: '0.6rem',
                                    fontWeight: active ? '700' : '500',
                                    background: active ? 'rgba(79, 70, 229, 0.12)' : 'transparent',
                                    color: active ? 'var(--primary)' : 'var(--foreground)',
                                    transition: 'all 0.15s', textDecoration: 'none', fontSize: '0.925rem',
                                    borderLeft: active ? '3px solid var(--primary)' : '3px solid transparent',
                                }}>
                                    {link.label}
                                </Link>
                            );
                        })}
                    </div>
                ))}
            </nav>
            <div style={{ marginTop: 'auto', paddingTop: '1rem' }}>
                <form action="/api/auth/signout" method="POST">
                    <button style={{ width: '100%', padding: '0.7rem', borderRadius: '0.6rem', border: '1px solid var(--border)', background: 'transparent', color: 'var(--foreground)', fontWeight: '600', cursor: 'pointer', fontSize: '0.875rem' }}>
                        Sign Out
                    </button>
                </form>
            </div>
        </>
    );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--background)' }}>
            {/* Desktop Sidebar */}
            <aside style={{
                width: '240px', flexShrink: 0,
                borderRight: '1px solid var(--border)',
                background: 'var(--glass-bg)',
                backdropFilter: 'blur(12px)',
                display: 'flex', flexDirection: 'column', padding: '1.5rem',
                position: 'sticky', top: 0, height: '100vh', overflowY: 'auto',
            }} className="desktop-sidebar">
                <SidebarContent pathname={pathname} />
            </aside>

            {/* Mobile Header Bar */}
            <div className="mobile-header" style={{
                display: 'none', position: 'fixed', top: 0, left: 0, right: 0,
                zIndex: 100, alignItems: 'center', justifyContent: 'space-between',
                padding: '0.85rem 1.25rem',
                background: 'var(--glass-bg)', backdropFilter: 'blur(12px)',
                borderBottom: '1px solid var(--border)',
            }}>
                <Link href="/" style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--primary)', textDecoration: 'none' }}>
                    HCMS<span style={{ color: 'var(--accent)' }}>.Platform</span>
                </Link>
                <button onClick={() => setOpen(o => !o)} style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    display: 'flex', flexDirection: 'column', gap: '5px', padding: '4px',
                }}>
                    {[0, 1, 2].map(i => (
                        <span key={i} style={{ display: 'block', width: '24px', height: '2px', background: 'var(--foreground)', borderRadius: '2px', transition: 'all 0.2s' }} />
                    ))}
                </button>
            </div>

            {/* Mobile Drawer Overlay */}
            {open && (
                <div onClick={() => setOpen(false)} style={{
                    position: 'fixed', inset: 0, zIndex: 150,
                    background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(2px)',
                }} />
            )}

            {/* Mobile Drawer */}
            <div style={{
                position: 'fixed', top: 0, left: open ? 0 : '-280px', bottom: 0,
                width: '260px', zIndex: 200,
                background: 'var(--background)', borderRight: '1px solid var(--border)',
                padding: '1.5rem', display: 'flex', flexDirection: 'column',
                transition: 'left 0.25s ease', overflowY: 'auto',
            }} className="mobile-drawer">
                <button onClick={() => setOpen(false)} style={{
                    alignSelf: 'flex-end', background: 'none', border: 'none',
                    fontSize: '1.5rem', cursor: 'pointer', color: 'var(--muted)', marginBottom: '0.5rem',
                }}>✕</button>
                <SidebarContent pathname={pathname} onNav={() => setOpen(false)} />
            </div>

            {/* Main Content */}
            <main style={{ flex: 1, minWidth: 0, padding: '2rem 2.5rem', overflowY: 'auto' }} className="dashboard-main">
                <div className="animate-fade-in">{children}</div>
            </main>

            {/* Responsive CSS */}
            <style>{`
                @media (max-width: 768px) {
                    .desktop-sidebar { display: none !important; }
                    .mobile-header { display: flex !important; }
                    .dashboard-main {
                        padding: 5rem 1rem 1.5rem !important;
                    }
                }
            `}</style>
        </div>
    );
}
