'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { DEMO_SHIFTS, DEMO_STAFF, DEMO_METRICS, DEMO_ALERTS, type DemoShift } from '@/lib/demo-data';

const priorityColors: Record<string, string> = {
    URGENT: 'rgba(239,68,68,0.12)',
    HIGH:   'rgba(234,179,8,0.12)',
    NORMAL: 'rgba(16,185,129,0.08)',
};
const priorityText: Record<string, string> = {
    URGENT: '#ef4444',
    HIGH:   '#ca8a04',
    NORMAL: 'var(--accent)',
};
const alertTypeColors: Record<string, string> = {
    MISSED_SHIFT:       '#ef4444',
    TARDY:              '#f59e0b',
    GEOFENCE_VIOLATION: '#8b5cf6',
};

function formatTime(iso: string) {
    const d = new Date(iso);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function AgencySchedulingPage() {
    const [filter, setFilter] = useState('ALL');
    const [claiming, setClaiming] = useState<string | null>(null);
    const [shifts, setShifts] = useState<DemoShift[]>(DEMO_SHIFTS);
    const [alerts, setAlerts] = useState(DEMO_ALERTS);

    const filtered = shifts.filter(s => filter === 'ALL' || s.status === filter);
    const openCount  = shifts.filter(s => s.status === 'UNFILLED').length;

    const handleClaim = (shiftId: string) => {
        setClaiming(shiftId);
        setTimeout(() => {
            setShifts(prev => prev.map(s =>
                s.id === shiftId ? { ...s, status: 'FILLED', isPublic: false, staffName: 'You (Demo)' } : s
            ));
            setClaiming(null);
        }, 1000);
    };

    const resolveAlert = (alertId: string) => {
        setAlerts(prev => prev.map(a => a.id === alertId ? { ...a, isResolved: true } : a));
    };

    return (
        <div>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '2.25rem', fontWeight: '800', letterSpacing: '-0.025em' }}>Scheduling Marketplace</h1>
                    <p style={{ color: 'var(--muted)', marginTop: '0.35rem' }}>
                        {new Date().toLocaleDateString('en-CA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} · EQC Workforce Solutions – Toronto Region
                    </p>
                </div>
                <button className="btn btn-primary" style={{ marginTop: '0.5rem' }}>+ Create Shift</button>
            </header>

            {/* Metric Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem', marginBottom: '2rem' }}>
                {[
                    { label: 'Open Shifts',      val: openCount.toString(),                    color: '#ef4444',           bg: 'rgba(239,68,68,0.08)' },
                    { label: 'Active Staff',      val: DEMO_METRICS.activeStaff.toString(),     color: 'var(--primary)',     bg: 'rgba(79,70,229,0.08)' },
                    { label: 'Completed Today',   val: DEMO_METRICS.completedToday.toString(),  color: 'var(--accent)',      bg: 'rgba(16,185,129,0.08)' },
                    { label: 'Match Efficiency',  val: `${DEMO_METRICS.matchEfficiency}%`,      color: 'var(--secondary)',   bg: 'rgba(236,72,153,0.08)' },
                ].map(m => (
                    <div key={m.label} className="glass-panel" style={{ padding: '1.25rem 1.5rem', borderRadius: '1rem', borderTop: `3px solid ${m.color}` }}>
                        <div style={{ fontSize: '0.75rem', color: 'var(--muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{m.label}</div>
                        <div style={{ fontSize: '2rem', fontWeight: '800', color: m.color, marginTop: '0.35rem' }}>{m.val}</div>
                    </div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '1.5rem' }}>
                {/* Shifts Marketplace Board */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="glass-panel" style={{ borderRadius: '1rem', overflow: 'hidden' }}>
                        <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
                            <span style={{ fontWeight: '700', marginRight: '0.5rem' }}>Shifts</span>
                            {['ALL', 'UNFILLED', 'FILLED'].map(f => (
                                <button key={f} onClick={() => setFilter(f)} style={{
                                    padding: '0.35rem 0.9rem', borderRadius: '2rem', border: 'none',
                                    background: filter === f ? 'var(--primary)' : 'var(--muted-light)',
                                    color: filter === f ? 'white' : 'var(--muted)',
                                    fontWeight: '600', cursor: 'pointer', fontSize: '0.8rem', transition: 'all 0.2s'
                                }}>{f}</button>
                            ))}
                            <span style={{ marginLeft: 'auto', fontSize: '0.8rem', color: 'var(--muted)' }}>
                                🟢 <strong>{shifts.filter(s => s.isPublic && s.status === 'UNFILLED').length}</strong> public shifts available
                            </span>
                        </div>
                        {filtered.map((shift, i) => (
                            <div key={shift.id} style={{
                                padding: '1rem 1.5rem', borderBottom: i < filtered.length - 1 ? '1px solid var(--border)' : 'none',
                                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                background: priorityColors[shift.priority], transition: 'all 0.2s',
                                gap: '1rem'
                            }}>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flex: 1, minWidth: 0 }}>
                                    <div style={{ background: 'rgba(79,70,229,0.1)', color: 'var(--primary)', fontWeight: '800', height: '46px', width: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '0.6rem', fontSize: '0.8rem', flexShrink: 0 }}>
                                        {shift.roleRequired}
                                    </div>
                                    <div style={{ minWidth: 0 }}>
                                        <div style={{ fontWeight: '700', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{shift.location}</div>
                                        <div style={{ color: 'var(--muted)', fontSize: '0.8rem', marginTop: '0.2rem' }}>
                                            {formatTime(shift.startTime)} – {formatTime(shift.endTime)} · {shift.distance}
                                        </div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexShrink: 0 }}>
                                    <span style={{ background: priorityColors[shift.priority], color: priorityText[shift.priority], padding: '0.2rem 0.6rem', borderRadius: '1rem', fontSize: '0.7rem', fontWeight: '800', border: `1px solid ${priorityText[shift.priority]}` }}>
                                        {shift.priority}
                                    </span>
                                    {shift.status === 'UNFILLED' ? (
                                        <>
                                            <span style={{ background: 'rgba(236,72,153,0.1)', color: 'var(--secondary)', padding: '0.2rem 0.7rem', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: '700' }}>OPEN</span>
                                            {shift.isPublic && (
                                                <button
                                                    onClick={() => handleClaim(shift.id)}
                                                    disabled={claiming === shift.id}
                                                    style={{ background: 'var(--primary)', color: 'white', border: 'none', padding: '0.35rem 0.85rem', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: '700', fontSize: '0.8rem', opacity: claiming === shift.id ? 0.7 : 1 }}>
                                                    {claiming === shift.id ? '⏳ Claiming…' : 'Claim →'}
                                                </button>
                                            )}
                                        </>
                                    ) : (
                                        <span style={{ background: 'rgba(16,185,129,0.1)', color: 'var(--accent)', padding: '0.2rem 0.7rem', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: '700' }}>
                                            ✓ {shift.staffName}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Live Alerts Panel */}
                    <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '1rem' }}>
                        <div style={{ fontWeight: '700', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between' }}>
                            <span>⚡ Live Alerts</span>
                            <span style={{ fontSize: '0.8rem', color: 'var(--muted)', fontWeight: 'normal' }}>
                                {alerts.filter(a => !a.isResolved).length} unresolved
                            </span>
                        </div>
                        {alerts.map(alert => (
                            <div key={alert.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.85rem', marginBottom: '0.5rem', borderRadius: '0.75rem', background: alert.isResolved ? 'rgba(16,185,129,0.05)' : 'rgba(239,68,68,0.05)', border: `1px solid ${alert.isResolved ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.15)'}`, gap: '1rem' }}>
                                <div>
                                    <div style={{ fontWeight: '600', fontSize: '0.875rem', color: alert.isResolved ? 'var(--muted)' : alertTypeColors[alert.type] }}>
                                        {alert.type.replace(/_/g, ' ')}
                                    </div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: '0.2rem' }}>{alert.message}</div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.4rem', flexShrink: 0 }}>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{alert.time}</span>
                                    {!alert.isResolved && (
                                        <button onClick={() => resolveAlert(alert.id)} style={{ background: 'none', border: '1px solid var(--border)', borderRadius: '0.4rem', padding: '0.2rem 0.6rem', cursor: 'pointer', fontSize: '0.75rem', color: 'var(--muted)', fontWeight: '600' }}>
                                            Resolve
                                        </button>
                                    )}
                                    {alert.isResolved && <span style={{ fontSize: '0.7rem', color: 'var(--accent)', fontWeight: '700' }}>✓ Resolved</span>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Staff Sidebar */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div className="glass-panel" style={{ borderRadius: '1rem', padding: '1.25rem', alignSelf: 'start' }}>
                        <div style={{ fontWeight: '700', marginBottom: '1rem' }}>Staff Roster ({DEMO_STAFF.length})</div>
                        {DEMO_STAFF.map(s => {
                            const onShift = shifts.some(sh => sh.staffId === s.id && sh.status === 'FILLED');
                            const avatar = `${s.firstName[0]}${s.lastName[0]}`;
                            return (
                                <div key={s.id} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', padding: '0.75rem 0', borderBottom: '1px solid var(--border)' }}>
                                    <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '0.8rem', flexShrink: 0 }}>{avatar}</div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ fontWeight: '600', fontSize: '0.875rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.firstName} {s.lastName}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{s.role}</div>
                                    </div>
                                    <span style={{ fontSize: '0.7rem', fontWeight: '700', color: onShift ? 'var(--accent)' : 'var(--primary)', whiteSpace: 'nowrap' }}>
                                        {onShift ? '● On Shift' : '○ Available'}
                                    </span>
                                </div>
                            );
                        })}
                        <Link href="/staff/evv" className="btn btn-primary" style={{ display: 'block', textAlign: 'center', marginTop: '1rem', borderRadius: '0.75rem', fontSize: '0.875rem' }}>
                            EVV Clock-In ➔
                        </Link>
                    </div>

                    {/* Quick Links */}
                    <div className="glass-panel" style={{ borderRadius: '1rem', padding: '1.25rem' }}>
                        <div style={{ fontWeight: '700', marginBottom: '1rem' }}>Quick Actions</div>
                        {[
                            { href: '/staff/forms', label: '📋 Expense & Shift Reports' },
                            { href: '/family/portal', label: '👨‍👩‍👧 Family Portal View' },
                        ].map(link => (
                            <Link key={link.href} href={link.href} className="btn btn-secondary" style={{ display: 'block', textAlign: 'center', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
