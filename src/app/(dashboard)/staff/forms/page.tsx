'use client';
import React, { useState } from 'react';

export default function StaffFormsPage() {
    const [offlineMode, setOfflineMode] = useState(false);

    return (
        <div>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '800', letterSpacing: '-0.025em', color: 'var(--foreground)' }}>
                        Digital Care Documentation
                    </h1>
                    <p style={{ color: 'var(--muted)', marginTop: '0.5rem' }}>Dynamic ADL checklists and progress notes.</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ fontSize: '0.875rem', fontWeight: '600', color: offlineMode ? 'var(--secondary)' : 'var(--accent)' }}>
                        {offlineMode ? '● Offline Mode' : '● Synced'}
                    </div>
                    <button className="btn btn-secondary" onClick={() => setOfflineMode(!offlineMode)}>
                        Toggle Network
                    </button>
                </div>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem' }}>
                <div className="glass-panel" style={{ padding: '2rem', borderRadius: '1.5rem' }}>
                    <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>ADL Checklist (Morning Routine)</h2>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {['Bathing/Showering Assistance', 'Dressing', 'Medication Reminders', 'Meal Preparation'].map(task => (
                            <label key={task} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'var(--muted-light)', borderRadius: '0.75rem', cursor: 'pointer' }}>
                                <input type="checkbox" style={{ width: '1.5rem', height: '1.5rem', accentColor: 'var(--primary)' }} />
                                <span style={{ fontSize: '1.125rem', fontWeight: '500' }}>{task}</span>
                            </label>
                        ))}
                    </div>

                    <h2 style={{ marginTop: '2.5rem', marginBottom: '1.5rem', fontSize: '1.5rem' }}>Clinical Notes (Voice Supported)</h2>
                    <textarea 
                        style={{ width: '100%', height: '150px', padding: '1rem', borderRadius: '0.75rem', border: '1px solid var(--border)', background: 'transparent', color: 'var(--foreground)', fontSize: '1rem', fontFamily: 'inherit' }}
                        placeholder="Type observation or use voice dictation..."
                    ></textarea>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                        <button className="btn btn-primary" style={{ padding: '1rem 2rem' }}>Save & Sync</button>
                    </div>
                </div>

                <div>
                    <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '1.5rem' }}>
                        <h3 style={{ marginBottom: '1rem', color: 'var(--foreground)' }}>Pending Sync queue</h3>
                        {offlineMode ? (
                            <div style={{ color: 'var(--secondary)', fontSize: '0.875rem', fontWeight: '600' }}>
                                Network unavailable. 1 document queued for upload. It will automatically sync when connection returns.
                            </div>
                        ) : (
                            <div style={{ color: 'var(--accent)', fontSize: '0.875rem', fontWeight: '600' }}>
                                All documents synced successfully.
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
}
