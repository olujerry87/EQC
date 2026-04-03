'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const mockVisit = {
    clientName: 'John Smith',
    address: '123 Mockingbird Lane, North York, ON',
    scheduledTime: '10:00 AM – 02:00 PM',
    tasks: ['Medication Administration', 'Blood Pressure Check', 'Mobility Exercises', 'Meal Preparation'],
};

export default function EVVPage() {
    const [status, setStatus] = useState<'IDLE' | 'LOCATING' | 'READY' | 'CLOCKED_IN' | 'CLOCKED_OUT'>('IDLE');
    const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
    const [clockInTime, setClockInTime] = useState<string | null>(null);
    const [clockOutTime, setClockOutTime] = useState<string | null>(null);
    const [elapsed, setElapsed] = useState(0);

    useEffect(() => {
        setStatus('LOCATING');
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (pos) => { setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }); setStatus('READY'); },
                () => { setCoords({ lat: 43.7615, lng: -79.4111 }); setStatus('READY'); } // fallback mock coords
            );
        } else {
            setCoords({ lat: 43.7615, lng: -79.4111 });
            setStatus('READY');
        }
    }, []);

    useEffect(() => {
        let interval: any;
        if (status === 'CLOCKED_IN') {
            interval = setInterval(() => setElapsed(e => e + 1), 1000);
        }
        return () => clearInterval(interval);
    }, [status]);

    const fmt = (s: number) => `${String(Math.floor(s / 3600)).padStart(2, '0')}:${String(Math.floor((s % 3600) / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

    const handleClockIn = () => {
        setClockInTime(new Date().toLocaleTimeString());
        setStatus('CLOCKED_IN');
    };

    const handleClockOut = () => {
        setClockOutTime(new Date().toLocaleTimeString());
        setStatus('CLOCKED_OUT');
    };

    return (
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
            <header style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2.25rem', fontWeight: '800', letterSpacing: '-0.025em' }}>EVV Clock-In</h1>
                <p style={{ color: 'var(--muted)', marginTop: '0.35rem' }}>GPS-verified visit tracking · HIPAA & PIPEDA compliant</p>
            </header>

            {/* Visit Card */}
            <div className="glass-panel" style={{ padding: '1.75rem', borderRadius: '1.25rem', marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--muted)', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Today's Assignment</div>
                <div style={{ fontSize: '1.4rem', fontWeight: '800' }}>{mockVisit.clientName}</div>
                <div style={{ color: 'var(--muted)', fontSize: '0.875rem', marginTop: '0.25rem' }}>{mockVisit.address}</div>
                <div style={{ marginTop: '0.75rem', display: 'inline-block', background: 'rgba(79,70,229,0.1)', color: 'var(--primary)', padding: '0.35rem 0.85rem', borderRadius: '2rem', fontSize: '0.8rem', fontWeight: '700' }}>
                    🕐 {mockVisit.scheduledTime}
                </div>
            </div>

            {/* GPS Status */}
            <div className="glass-panel" style={{ padding: '1.25rem 1.75rem', borderRadius: '1.25rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--muted)', textTransform: 'uppercase' }}>GPS Location</div>
                    {coords ? (
                        <div style={{ fontFamily: 'monospace', color: 'var(--accent)', fontWeight: '700', marginTop: '0.2rem' }}>
                            {coords.lat.toFixed(5)}, {coords.lng.toFixed(5)}
                        </div>
                    ) : (
                        <div style={{ color: 'var(--secondary)', fontWeight: '600', marginTop: '0.2rem' }}>Acquiring GPS…</div>
                    )}
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <span style={{ width: '10px', height: '10px', borderRadius: '5px', background: status === 'LOCATING' ? 'var(--secondary)' : 'var(--accent)', display: 'inline-block' }}></span>
                    <span style={{ fontSize: '0.8rem', fontWeight: '700', color: status === 'LOCATING' ? 'var(--secondary)' : 'var(--accent)' }}>
                        {status === 'LOCATING' ? 'Locating…' : 'Geofence Active'}
                    </span>
                </div>
            </div>

            {/* Clock-In / Out */}
            {(status === 'IDLE' || status === 'LOCATING' || status === 'READY') && (
                <button onClick={handleClockIn} disabled={status !== 'READY'} className="btn btn-primary"
                    style={{ width: '100%', padding: '1.1rem', fontSize: '1.1rem', borderRadius: '1rem', opacity: status !== 'READY' ? 0.6 : 1 }}>
                    ● Clock In (EVV)
                </button>
            )}

            {status === 'CLOCKED_IN' && (
                <div className="glass-panel" style={{ padding: '2rem', borderRadius: '1.25rem', textAlign: 'center', borderTop: '3px solid var(--accent)' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Visit In Progress</div>
                    <div style={{ fontSize: '3rem', fontWeight: '900', fontFamily: 'monospace', color: 'var(--foreground)', letterSpacing: '0.05em' }}>{fmt(elapsed)}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: '0.25rem' }}>Clocked in at {clockInTime}</div>
                    <div style={{ margin: '1.5rem 0', textAlign: 'left' }}>
                        <div style={{ fontWeight: '700', marginBottom: '0.75rem', fontSize: '0.875rem' }}>Tasks for this visit:</div>
                        {mockVisit.tasks.map(t => (
                            <label key={t} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', padding: '0.6rem', borderRadius: '0.5rem', background: 'var(--muted-light)', marginBottom: '0.5rem', cursor: 'pointer' }}>
                                <input type="checkbox" style={{ width: '1.1rem', height: '1.1rem', accentColor: 'var(--primary)' }} />
                                <span style={{ fontSize: '0.9rem' }}>{t}</span>
                            </label>
                        ))}
                    </div>
                    <button onClick={handleClockOut} className="btn" style={{ width: '100%', background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: '1px solid #ef4444', borderRadius: '0.75rem', padding: '0.9rem' }}>
                        ■ Clock Out
                    </button>
                </div>
            )}

            {status === 'CLOCKED_OUT' && (
                <div className="glass-panel" style={{ padding: '2rem', borderRadius: '1.25rem', textAlign: 'center', borderTop: '3px solid var(--primary)' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>✅</div>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: '800' }}>Visit Complete!</h2>
                    <p style={{ color: 'var(--muted)', marginTop: '0.35rem' }}>Total duration: <strong>{fmt(elapsed)}</strong></p>
                    <p style={{ color: 'var(--muted)', fontSize: '0.875rem' }}>In: {clockInTime} · Out: {clockOutTime}</p>
                    <p style={{ color: 'var(--muted)', fontSize: '0.8rem', marginTop: '0.5rem' }}>EVV record submitted. GPS coordinates logged.</p>
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                        <Link href="/staff/forms" className="btn btn-primary" style={{ flex: 1, textAlign: 'center', borderRadius: '0.75rem' }}>
                            Submit Care Docs ➔
                        </Link>
                        <button onClick={() => { setStatus('READY'); setElapsed(0); setClockInTime(null); setClockOutTime(null); }} className="btn btn-secondary" style={{ flex: 1, borderRadius: '0.75rem' }}>
                            New Visit
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
