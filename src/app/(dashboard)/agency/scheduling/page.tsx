'use client';
import React, { useState } from 'react';
import Link from 'next/link';

const mockShifts = [
    { id: '1', role: 'RN', time: '08:00 AM – 04:00 PM', location: 'Downtown Wellness Clinic', client: 'Margaret H.', status: 'UNFILLED', distance: '2.4 mi', urgency: 'HIGH' },
    { id: '2', role: 'PSW', time: '10:00 AM – 02:00 PM', location: 'Client Home – North York', client: 'John Smith', status: 'FILLED', staff: 'Jane Doe', distance: '5.1 mi', urgency: 'NORMAL' },
    { id: '3', role: 'LPN', time: 'Overnight 11:00 PM – 07:00 AM', location: 'SunnyCare Assisted Living', client: 'Group Facility', status: 'UNFILLED', distance: '8.0 mi', urgency: 'CRITICAL' },
    { id: '4', role: 'PSW', time: '07:00 AM – 03:00 PM', location: 'Client Home – Brampton', client: 'Eleanor R.', status: 'FILLED', staff: 'Marcus L.', distance: '12.3 mi', urgency: 'NORMAL' },
    { id: '5', role: 'OT', time: '02:00 PM – 06:00 PM', location: 'Rehab Center East', client: 'Group Session', status: 'UNFILLED', distance: '3.6 mi', urgency: 'HIGH' },
];

const mockStaff = [
    { id: 's1', name: 'Jane Doe', role: 'PSW', status: 'On Shift', avatar: 'JD' },
    { id: 's2', name: 'Marcus Lee', role: 'PSW', status: 'Available', avatar: 'ML' },
    { id: 's3', name: 'Sara Kim', role: 'RN', status: 'Available', avatar: 'SK' },
    { id: 's4', name: 'Tom Grant', role: 'LPN', status: 'Off Today', avatar: 'TG' },
];

const urgencyColors: Record<string, string> = {
    CRITICAL: 'rgba(239,68,68,0.12)',
    HIGH: 'rgba(234,179,8,0.12)',
    NORMAL: 'rgba(16,185,129,0.1)',
};
const urgencyText: Record<string, string> = {
    CRITICAL: '#ef4444',
    HIGH: '#ca8a04',
    NORMAL: 'var(--accent)',
};

export default function AgencySchedulingPage() {
    const [filter, setFilter] = useState('ALL');

    const filtered = mockShifts.filter(s => filter === 'ALL' || s.status === filter);

    return (
        <div>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '2.25rem', fontWeight: '800', letterSpacing: '-0.025em' }}>Dynamic Scheduling</h1>
                    <p style={{ color: 'var(--muted)', marginTop: '0.35rem' }}>Apr 3, 2026 · Demo Agency – Toronto Region</p>
                </div>
                <button className="btn btn-primary" style={{ marginTop: '0.5rem' }}>+ Create Shift</button>
            </header>

            {/* Metric Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem', marginBottom: '2rem' }}>
                {[
                    { label: 'Open Shifts', val: '3', color: '#ef4444', bg: 'rgba(239,68,68,0.08)' },
                    { label: 'Active Staff', val: '45', color: 'var(--primary)', bg: 'rgba(79,70,229,0.08)' },
                    { label: 'Completed Today', val: '12', color: 'var(--accent)', bg: 'rgba(16,185,129,0.08)' },
                    { label: 'Match Efficiency', val: '94%', color: 'var(--secondary)', bg: 'rgba(236,72,153,0.08)' },
                ].map(m => (
                    <div key={m.label} className="glass-panel" style={{ padding: '1.25rem 1.5rem', borderRadius: '1rem', borderTop: `3px solid ${m.color}` }}>
                        <div style={{ fontSize: '0.75rem', color: 'var(--muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{m.label}</div>
                        <div style={{ fontSize: '2rem', fontWeight: '800', color: m.color, marginTop: '0.35rem' }}>{m.val}</div>
                    </div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '1.5rem' }}>
                {/* Shifts Table */}
                <div>
                    <div className="glass-panel" style={{ borderRadius: '1rem', overflow: 'hidden' }}>
                        <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                            <span style={{ fontWeight: '700', marginRight: '0.5rem' }}>Shifts</span>
                            {['ALL', 'UNFILLED', 'FILLED'].map(f => (
                                <button key={f} onClick={() => setFilter(f)} style={{
                                    padding: '0.35rem 0.9rem', borderRadius: '2rem', border: 'none',
                                    background: filter === f ? 'var(--primary)' : 'var(--muted-light)',
                                    color: filter === f ? 'white' : 'var(--muted)',
                                    fontWeight: '600', cursor: 'pointer', fontSize: '0.8rem', transition: 'all 0.2s'
                                }}>{f}</button>
                            ))}
                        </div>
                        {filtered.map((shift, i) => (
                            <div key={shift.id} style={{
                                padding: '1rem 1.5rem', borderBottom: i < filtered.length - 1 ? '1px solid var(--border)' : 'none',
                                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                background: urgencyColors[shift.urgency], transition: 'filter 0.2s'
                            }}>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <div style={{ background: 'rgba(79,70,229,0.1)', color: 'var(--primary)', fontWeight: '800', height: '46px', width: '52px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '0.6rem', fontSize: '0.85rem' }}>
                                        {shift.role}
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: '700' }}>{shift.location}</div>
                                        <div style={{ color: 'var(--muted)', fontSize: '0.8rem', marginTop: '0.2rem' }}>
                                            {shift.time} · Client: {shift.client} · {shift.distance}
                                        </div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <span style={{ background: urgencyColors[shift.urgency], color: urgencyText[shift.urgency], padding: '0.2rem 0.6rem', borderRadius: '1rem', fontSize: '0.7rem', fontWeight: '800', border: `1px solid ${urgencyText[shift.urgency]}` }}>
                                        {shift.urgency}
                                    </span>
                                    {shift.status === 'UNFILLED' ? (
                                        <span style={{ background: 'rgba(236,72,153,0.1)', color: 'var(--secondary)', padding: '0.2rem 0.7rem', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: '700' }}>UNFILLED</span>
                                    ) : (
                                        <span style={{ background: 'rgba(16,185,129,0.1)', color: 'var(--accent)', padding: '0.2rem 0.7rem', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: '700' }}>✓ {shift.staff}</span>
                                    )}
                                    <button style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontWeight: '600', fontSize: '0.875rem' }}>Match ➔</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Staff sidebar */}
                <div className="glass-panel" style={{ borderRadius: '1rem', padding: '1.25rem', alignSelf: 'start' }}>
                    <div style={{ fontWeight: '700', marginBottom: '1rem' }}>Staff On Roster</div>
                    {mockStaff.map(s => (
                        <div key={s.id} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', padding: '0.75rem 0', borderBottom: '1px solid var(--border)' }}>
                            <div style={{ width: '38px', height: '38px', borderRadius: '19px', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '0.8rem', flexShrink: 0 }}>{s.avatar}</div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontWeight: '600', fontSize: '0.9rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.name}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{s.role}</div>
                            </div>
                            <span style={{ fontSize: '0.7rem', fontWeight: '700', color: s.status === 'On Shift' ? 'var(--accent)' : s.status === 'Available' ? 'var(--primary)' : 'var(--muted)', whiteSpace: 'nowrap' }}>
                                {s.status}
                            </span>
                        </div>
                    ))}
                    <Link href="/staff/evv" className="btn btn-primary" style={{ display: 'block', textAlign: 'center', marginTop: '1rem', borderRadius: '0.75rem', fontSize: '0.875rem' }}>
                        Go to EVV Clock-In ➔
                    </Link>
                </div>
            </div>
        </div>
    );
}
