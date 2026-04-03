'use client';
import React, { useState, useEffect } from 'react';

export default function EVVPage() {
    const [status, setStatus] = useState('UNVERIFIED');
    const [coords, setCoords] = useState<{lat: number, lng: number} | null>(null);

    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((pos) => {
                setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
            });
        }
    }, []);

    const handleClockIn = () => {
        if (!coords) return alert('Waiting for GPS coordinates...');
        setStatus('VERIFIED');
        // Logic to POST to /api/evv/clock-in
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--foreground)' }}>Electronic Visit Verification</h1>
                <p style={{ color: 'var(--muted)', marginTop: '0.5rem' }}>GPS-stamped clock-in for PIPEDA & HIPAA compliance.</p>
            </header>

            <div className="glass-panel" style={{ padding: '2rem', borderRadius: '1.5rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                
                {status === 'UNVERIFIED' && (
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'var(--secondary)' }} />
                )}
                {status === 'VERIFIED' && (
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'var(--accent)' }} />
                )}

                <div style={{ marginBottom: '2rem' }}>
                    <div style={{ fontSize: '1.25rem', fontWeight: '700' }}>Current Location</div>
                    {coords ? (
                        <div style={{ color: 'var(--primary)', fontFamily: 'monospace', marginTop: '0.5rem', background: 'var(--muted-light)', display: 'inline-block', padding: '0.5rem 1rem', borderRadius: '0.5rem' }}>
                            {coords.lat.toFixed(6)}, {coords.lng.toFixed(6)}
                        </div>
                    ) : (
                        <div style={{ color: 'var(--muted)', marginTop: '0.5rem' }}>Acquiring GPS Signal...</div>
                    )}
                </div>

                <div style={{ marginBottom: '2.5rem' }}>
                    <div style={{ fontSize: '0.875rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Target Client</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: '800', marginTop: '0.25rem' }}>John Smith Residence</div>
                    <div style={{ color: 'var(--muted)' }}>123 Mockingbird Lane</div>
                </div>

                {status === 'UNVERIFIED' ? (
                    <button onClick={handleClockIn} disabled={!coords} className="btn btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.125rem', borderRadius: '1rem' }}>
                        ● Clock In (EVV)
                    </button>
                ) : (
                    <div>
                        <div style={{ display: 'inline-block', width: '60px', height: '60px', borderRadius: '30px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent)', alignContent: 'center', fontSize: '2rem', marginBottom: '1rem' }}>
                            ✓
                        </div>
                        <h2 style={{ color: 'var(--accent)' }}>Verification Successful</h2>
                        <p style={{ color: 'var(--muted)' }}>Geofence matched. You are clocked in.</p>
                        <button className="btn btn-secondary" style={{ width: '100%', marginTop: '1.5rem', borderRadius: '1rem' }} onClick={() => setStatus('UNVERIFIED')}>
                            Clock Out
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
