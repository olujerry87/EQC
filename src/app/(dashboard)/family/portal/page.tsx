'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { DEMO_TIMELINE, DEMO_SHIFTS, DEMO_INVOICES } from '@/lib/demo-data';

const upcomingShifts = DEMO_SHIFTS.slice(0, 3);

const statusColors: Record<string, { bg: string; color: string }> = {
    PAID:  { bg: 'rgba(16,185,129,0.1)',  color: '#10b981' },
    SENT:  { bg: 'rgba(79,70,229,0.1)',   color: 'var(--primary)' },
    DRAFT: { bg: 'rgba(156,163,175,0.1)', color: 'var(--muted)' },
};

function calcTotal(inv: typeof DEMO_INVOICES[0]) {
    const subtotal = inv.hours * inv.rate;
    const tax = subtotal * inv.tax;
    return { subtotal, tax, total: subtotal + tax };
}

function formatShiftTime(iso: string) {
    const d = new Date(iso);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function FamilyPortalPage() {
    const [tab, setTab] = useState<'timeline' | 'invoices'>('timeline');

    return (
        <div>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>● Live · Client View</div>
                    <h1 style={{ fontSize: '2.25rem', fontWeight: '800', letterSpacing: '-0.025em' }}>Family Portal</h1>
                    <p style={{ color: 'var(--muted)', marginTop: '0.35rem' }}>EQC Workforce Solutions – Real-time shift updates & billing</p>
                </div>
                <div className="glass-panel" style={{ padding: '0.75rem 1.25rem', borderRadius: '1rem', textAlign: 'right' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>Today's Worker</div>
                    <div style={{ fontWeight: '700', marginTop: '0.2rem' }}>Aisha Okafor, PSW</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--accent)', marginTop: '0.1rem' }}>● On Shift since 10:00 AM</div>
                </div>
            </header>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
                {[
                    { label: 'Shifts This Month', val: '18',      sub: '3 remaining',         color: 'var(--primary)' },
                    { label: 'Hours Logged',       val: '64 hrs',  sub: 'vs 72 planned',        color: 'var(--accent)' },
                    { label: 'Outstanding Invoice', val: '$1,894', sub: '1 pending payment',    color: '#f59e0b' },
                ].map(m => (
                    <div key={m.label} className="glass-panel" style={{ padding: '1.25rem', borderRadius: '1rem', borderLeft: `4px solid ${m.color}` }}>
                        <div style={{ fontSize: '0.75rem', color: 'var(--muted)', fontWeight: '600', textTransform: 'uppercase' }}>{m.label}</div>
                        <div style={{ fontSize: '1.75rem', fontWeight: '800', color: m.color, marginTop: '0.25rem' }}>{m.val}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '0.15rem' }}>{m.sub}</div>
                    </div>
                ))}
            </div>

            {/* Tab Toggle */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
                {(['timeline', 'invoices'] as const).map(t => (
                    <button key={t} onClick={() => setTab(t)} style={{ padding: '0.5rem 1.25rem', borderRadius: '2rem', border: 'none', background: tab === t ? 'var(--primary)' : 'var(--muted-light)', color: tab === t ? 'white' : 'var(--muted)', fontWeight: '700', cursor: 'pointer', fontSize: '0.875rem', textTransform: 'capitalize' }}>
                        {t === 'timeline' ? '🕐 Activity Timeline' : '💳 Invoices'}
                    </button>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '1.5rem' }}>
                {/* Main Content */}
                <div>
                    {tab === 'timeline' && (
                        <div className="glass-panel" style={{ padding: '1.75rem', borderRadius: '1.25rem' }}>
                            <h2 style={{ fontWeight: '700', fontSize: '1.1rem', marginBottom: '1.5rem' }}>Shift Activity Timeline</h2>
                            <div style={{ position: 'relative', paddingLeft: '2.5rem' }}>
                                <div style={{ position: 'absolute', left: '9px', top: 0, bottom: 0, width: '2px', background: 'var(--border)' }}></div>
                                {DEMO_TIMELINE.map((ev, i) => (
                                    <div key={i} style={{ position: 'relative', marginBottom: '1.75rem' }}>
                                        <div style={{ position: 'absolute', left: '-2.1rem', top: '4px', width: '18px', height: '18px', borderRadius: '50%', background: ev.color, border: '3px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}></div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--muted)', fontWeight: '600', marginBottom: '0.2rem' }}>{ev.time}</div>
                                        <div style={{ fontWeight: '700', fontSize: '0.95rem' }}>{ev.icon} {ev.event}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {tab === 'invoices' && (
                        <div className="glass-panel" style={{ borderRadius: '1.25rem', overflow: 'hidden' }}>
                            <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border)', fontWeight: '700' }}>Billing History</div>
                            {DEMO_INVOICES.map((inv, i) => {
                                const { subtotal, tax, total } = calcTotal(inv);
                                const sc = statusColors[inv.status];
                                return (
                                    <div key={inv.id} style={{ padding: '1rem 1.5rem', borderBottom: i < DEMO_INVOICES.length - 1 ? '1px solid var(--border)' : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <div style={{ fontWeight: '700', fontSize: '0.9rem' }}>{inv.client}</div>
                                            <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: '0.2rem' }}>
                                                {inv.shiftDate} · {inv.hours}h @ ${inv.rate}/hr
                                            </div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '0.1rem' }}>
                                                Subtotal ${subtotal.toFixed(2)} + Tax ${tax.toFixed(2)} = <strong>${total.toFixed(2)}</strong>
                                            </div>
                                        </div>
                                        <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                            <span style={{ background: sc.bg, color: sc.color, padding: '0.2rem 0.7rem', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: '800', display: 'inline-block', marginBottom: '0.5rem' }}>
                                                {inv.status}
                                            </span>
                                            <div style={{ fontWeight: '800', color: 'var(--foreground)' }}>${total.toFixed(2)}</div>
                                        </div>
                                    </div>
                                );
                            })}
                            <div style={{ padding: '1rem 1.5rem', background: 'rgba(79,70,229,0.04)', display: 'flex', justifyContent: 'space-between', fontWeight: '700' }}>
                                <span>Total Billed</span>
                                <span style={{ color: 'var(--primary)' }}>
                                    ${DEMO_INVOICES.reduce((sum, inv) => sum + calcTotal(inv).total, 0).toFixed(2)}
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div className="glass-panel" style={{ padding: '1.25rem', borderRadius: '1.25rem' }}>
                        <div style={{ fontWeight: '700', marginBottom: '1rem', fontSize: '0.95rem' }}>Upcoming Shifts</div>
                        {upcomingShifts.map((s, i) => (
                            <div key={s.id} style={{ paddingBottom: '0.85rem', marginBottom: '0.85rem', borderBottom: i < upcomingShifts.length - 1 ? '1px solid var(--border)' : 'none' }}>
                                <div style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--primary)' }}>
                                    {new Date(s.startTime).toLocaleDateString('en-CA', { weekday: 'short', month: 'short', day: 'numeric' })}
                                </div>
                                <div style={{ fontSize: '0.85rem', fontWeight: '600', marginTop: '0.2rem' }}>{s.roleRequired} – {s.location}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '0.15rem' }}>
                                    {formatShiftTime(s.startTime)} – {formatShiftTime(s.endTime)}
                                    {s.staffName && ` · ${s.staffName}`}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="glass-panel" style={{ padding: '1.25rem', borderRadius: '1.25rem' }}>
                        <div style={{ fontWeight: '700', marginBottom: '1rem', fontSize: '0.95rem' }}>Actions</div>
                        {[
                            '📄 Download Monthly Report',
                            '📞 Contact Agency Admin',
                        ].map(label => (
                            <button key={label} className="btn btn-secondary" style={{ width: '100%', marginBottom: '0.5rem', fontSize: '0.85rem', justifyContent: 'center' }}>
                                {label}
                            </button>
                        ))}
                        <Link href="/agency/scheduling" className="btn btn-secondary" style={{ width: '100%', display: 'block', textAlign: 'center', fontSize: '0.85rem' }}>
                            View Full Schedule
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
