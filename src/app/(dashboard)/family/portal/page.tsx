import React from 'react';

export default function FamilyPortalPage() {
    return (
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '800', letterSpacing: '-0.025em', color: 'var(--foreground)' }}>
                        Family Portal
                    </h1>
                    <p style={{ color: 'var(--muted)', marginTop: '0.5rem' }}>Real-time read-only care milestones for John Smith.</p>
                </div>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                <div>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Care Timeline</h2>
                    <div className="glass-panel" style={{ padding: '2rem', borderRadius: '1.5rem', position: 'relative' }}>
                        
                        <div style={{ position: 'absolute', left: '3rem', top: '3rem', bottom: '3rem', width: '2px', background: 'var(--border)' }}></div>

                        {[
                            { time: '10:05 AM', title: 'Medication Administered', desc: 'Aspirin and Blood Pressure meds given.', color: 'var(--accent)' },
                            { time: '09:00 AM', title: 'Caregiver Arrived', desc: 'Jane Doe clocked in via EVV.', color: 'var(--primary)' },
                            { time: 'Yesterday', title: 'Physiotherapy Session', desc: 'Completed basic mobility exercises.', color: 'var(--muted)' },
                        ].map((event, i) => (
                            <div key={i} style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', position: 'relative', zIndex: 1 }}>
                                <div style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--muted)', width: '80px', textAlign: 'right' }}>
                                    {event.time}
                                </div>
                                <div style={{ width: '16px', height: '16px', borderRadius: '8px', background: event.color, marginTop: '4px', border: '4px solid var(--background)' }}></div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: '700', fontSize: '1.125rem' }}>{event.title}</div>
                                    <div style={{ color: 'var(--muted)', marginTop: '0.25rem', fontSize: '0.875rem' }}>{event.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '1.5rem' }}>
                        <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem' }}>Today's Caregiver</h3>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <div style={{ width: '50px', height: '50px', borderRadius: '25px', background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>JD</div>
                            <div>
                                <div style={{ fontWeight: '700' }}>Jane Doe, PSW</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>Checked in at 9:00 AM</div>
                            </div>
                        </div>
                    </div>

                    <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '1.5rem' }}>
                        <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem' }}>Quick Actions</h3>
                        <button className="btn btn-secondary" style={{ width: '100%', marginBottom: '0.5rem', justifyContent: 'flex-start' }}>Download Monthly Report</button>
                        <button className="btn btn-secondary" style={{ width: '100%', justifyContent: 'flex-start' }}>Contact Agency Admin</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
