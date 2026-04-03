import React from 'react';
import Link from 'next/link';

const timeline = [
    { time: '10:05 AM', title: 'Medication Administered', desc: 'Aspirin 81mg and Amlodipine 5mg given by Jane Doe (PSW).', color: 'var(--accent)', icon: '💊' },
    { time: '09:48 AM', title: 'Vital Signs Recorded', desc: 'BP: 118/76 · HR: 72 · SP02: 97%. All within normal range.', color: 'var(--primary)', icon: '❤️' },
    { time: '09:00 AM', title: 'Caregiver Arrived & Clocked In', desc: 'Jane Doe, PSW. GPS-verified at 43.76151, -79.41107.', color: 'var(--primary)', icon: '📍' },
    { time: 'Yesterday 4:00 PM', title: 'Physiotherapy Session Complete', desc: 'Mobility exercises completed. Walked 150m without distress.', color: 'var(--muted)', icon: '🏃' },
    { time: 'Apr 1 · 9:00 AM', title: 'Care Plan Updated', desc: 'Dr. Rebecca Chen updated medication regimen. See care plan v3.', color: 'var(--secondary)', icon: '📋' },
];

const upcomingVisits = [
    { date: 'Today · 2:00 PM', staff: 'Jane Doe, PSW', type: 'Afternoon Check' },
    { date: 'Tomorrow · 9:00 AM', staff: 'Marcus Lee, PSW', type: 'Morning Routine' },
    { date: 'Apr 5 · 8:00 AM', staff: 'Sara Kim, RN', type: 'Nursing Assessment' },
];

export default function FamilyPortalPage() {
    return (
        <div>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>● Live · Read-Only Portal</div>
                    <h1 style={{ fontSize: '2.25rem', fontWeight: '800', letterSpacing: '-0.025em' }}>John Smith's Care</h1>
                    <p style={{ color: 'var(--muted)', marginTop: '0.35rem' }}>Shared with you by Sunrise Home Care Agency</p>
                </div>
                <div className="glass-panel" style={{ padding: '0.75rem 1.25rem', borderRadius: '1rem', textAlign: 'right' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>Today's Caregiver</div>
                    <div style={{ fontWeight: '700', marginTop: '0.2rem' }}>Jane Doe, PSW</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--accent)', marginTop: '0.1rem' }}>● On Shift since 9:00 AM</div>
                </div>
            </header>

            {/* Summary Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
                {[
                    { label: 'Visits This Month', val: '18', sub: '2 remaining', color: 'var(--primary)' },
                    { label: 'Avg Visit Duration', val: '3.8 hrs', sub: 'Plan: 4 hrs/day', color: 'var(--accent)' },
                    { label: 'Medications Today', val: '2/2', sub: 'All administered ✓', color: '#10b981' },
                ].map(m => (
                    <div key={m.label} className="glass-panel" style={{ padding: '1.25rem', borderRadius: '1rem', borderLeft: `4px solid ${m.color}` }}>
                        <div style={{ fontSize: '0.75rem', color: 'var(--muted)', fontWeight: '600', textTransform: 'uppercase' }}>{m.label}</div>
                        <div style={{ fontSize: '1.75rem', fontWeight: '800', color: m.color, marginTop: '0.25rem' }}>{m.val}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '0.15rem' }}>{m.sub}</div>
                    </div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '1.5rem' }}>
                {/* Timeline */}
                <div className="glass-panel" style={{ padding: '1.75rem', borderRadius: '1.25rem' }}>
                    <h2 style={{ fontWeight: '700', fontSize: '1.1rem', marginBottom: '1.5rem' }}>Care Activity Timeline</h2>
                    <div style={{ position: 'relative', paddingLeft: '2.5rem' }}>
                        <div style={{ position: 'absolute', left: '9px', top: 0, bottom: 0, width: '2px', background: 'var(--border)' }}></div>
                        {timeline.map((ev, i) => (
                            <div key={i} style={{ position: 'relative', marginBottom: '1.75rem' }}>
                                <div style={{ position: 'absolute', left: '-2.1rem', top: '4px', width: '18px', height: '18px', borderRadius: '50%', background: ev.color, border: '3px solid var(--background)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.5rem' }}></div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--muted)', fontWeight: '600', marginBottom: '0.2rem' }}>{ev.time}</div>
                                <div style={{ fontWeight: '700', fontSize: '0.95rem' }}>{ev.icon} {ev.title}</div>
                                <div style={{ fontSize: '0.85rem', color: 'var(--muted)', marginTop: '0.2rem' }}>{ev.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sidebar */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div className="glass-panel" style={{ padding: '1.25rem', borderRadius: '1.25rem' }}>
                        <div style={{ fontWeight: '700', marginBottom: '1rem', fontSize: '0.95rem' }}>Upcoming Visits</div>
                        {upcomingVisits.map((v, i) => (
                            <div key={i} style={{ paddingBottom: '0.85rem', marginBottom: '0.85rem', borderBottom: i < upcomingVisits.length - 1 ? '1px solid var(--border)' : 'none' }}>
                                <div style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--primary)' }}>{v.date}</div>
                                <div style={{ fontSize: '0.85rem', fontWeight: '600', marginTop: '0.2rem' }}>{v.type}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '0.15rem' }}>Staff: {v.staff}</div>
                            </div>
                        ))}
                    </div>

                    <div className="glass-panel" style={{ padding: '1.25rem', borderRadius: '1.25rem' }}>
                        <div style={{ fontWeight: '700', marginBottom: '1rem', fontSize: '0.95rem' }}>Actions</div>
                        <button className="btn btn-secondary" style={{ width: '100%', marginBottom: '0.5rem', fontSize: '0.85rem', justifyContent: 'center' }}>
                            📄 Download Monthly Report
                        </button>
                        <button className="btn btn-secondary" style={{ width: '100%', marginBottom: '0.5rem', fontSize: '0.85rem', justifyContent: 'center' }}>
                            📞 Contact Agency Admin
                        </button>
                        <Link href="/agency/scheduling" className="btn btn-secondary" style={{ width: '100%', display: 'block', textAlign: 'center', fontSize: '0.85rem' }}>
                            View Full Schedule
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
