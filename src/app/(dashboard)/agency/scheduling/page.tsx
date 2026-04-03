'use client';
import React, { useState } from 'react';

export default function AgencySchedulingPage() {
    const [filter, setFilter] = useState('ALL');

    const shifts = [
        { id: '1', role: 'RN', time: '08:00 AM - 04:00 PM', location: 'Downtown Facility', status: 'UNFILLED', distance: '2.4 mi' },
        { id: '2', role: 'PSW', time: '10:00 AM - 02:00 PM', location: 'Client Home (North York)', status: 'FILLED', staff: 'Jane Doe', distance: '5.1 mi' },
        { id: '3', role: 'LPN', time: 'Overnight 11:00 PM - 07:00 AM', location: 'SunnyCare Assisted Living', status: 'UNFILLED', distance: '8.0 mi' },
    ];

    return (
        <div>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '800', letterSpacing: '-0.025em', color: 'var(--foreground)' }}>
                        Dynamic Scheduling
                    </h1>
                    <p style={{ color: 'var(--muted)', marginTop: '0.5rem' }}>AI-driven matching algorithm for field staff and shifts.</p>
                </div>
                <button className="btn btn-primary">+ Create Shift</button>
            </header>

            {/* Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2.5rem' }}>
                {[{ label: 'Open Shifts', val: '12', color: 'var(--accent)' }, { label: 'Active Staff', val: '45', color: 'var(--primary)' }, { label: 'Matching Efficiency', val: '94%', color: 'var(--secondary)' }].map(m => (
                    <div key={m.label} className="glass-panel" style={{ padding: '1.5rem', borderRadius: '1rem' }}>
                        <div style={{ fontSize: '0.875rem', color: 'var(--muted)', fontWeight: '600', textTransform: 'uppercase' }}>{m.label}</div>
                        <div style={{ fontSize: '2.25rem', fontWeight: '800', color: m.color, marginTop: '0.5rem' }}>{m.val}</div>
                    </div>
                ))}
            </div>

            {/* List */}
            <div className="glass-panel" style={{ borderRadius: '1rem', overflow: 'hidden' }}>
                <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', gap: '1rem' }}>
                    {['ALL', 'UNFILLED', 'FILLED'].map(f => (
                        <button key={f} onClick={() => setFilter(f)} style={{ 
                            padding: '0.5rem 1rem', borderRadius: '2rem', border: 'none',
                            background: filter === f ? 'var(--primary)' : 'var(--muted-light)',
                            color: filter === f ? 'white' : 'var(--muted)',
                            fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s'
                        }}>
                            {f}
                        </button>
                    ))}
                </div>
                <div style={{ padding: '0' }}>
                    {shifts.filter(s => filter === 'ALL' || s.status === filter).map(shift => (
                        <div key={shift.id} style={{
                            padding: '1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'background 0.2s'
                        }} onMouseOver={(e) => e.currentTarget.style.background = 'var(--muted-light)'} onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>
                            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                <div style={{ 
                                    background: 'rgba(79, 70, 229, 0.1)', color: 'var(--primary)', fontWeight: '800', 
                                    height: '50px', width: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '0.75rem' 
                                }}>
                                    {shift.role}
                                </div>
                                <div>
                                    <div style={{ fontWeight: '700', fontSize: '1.125rem' }}>{shift.location}</div>
                                    <div style={{ color: 'var(--muted)', fontSize: '0.875rem', marginTop: '0.25rem' }}>{shift.time} • Distance: {shift.distance}</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                {shift.status === 'UNFILLED' ? (
                                    <span style={{ background: 'rgba(236, 72, 153, 0.1)', color: 'var(--secondary)', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: '700' }}>UNFILLED</span>
                                ) : (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <span style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent)', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: '700' }}>FILLED</span>
                                        <span style={{ fontSize: '0.875rem', fontWeight: '600' }}>{shift.staff}</span>
                                    </div>
                                )}
                                <button style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontWeight: '600' }}>View Matches ➔</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
