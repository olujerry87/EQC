'use client';
import React, { useState } from 'react';
import Link from 'next/link';

const tasks = ['Bathing/Showering Assistance', 'Dressing & Grooming', 'Medication Reminders', 'Meal Preparation', 'Mobility & Exercise Support', 'Vital Signs Monitoring'];

const mockPendingQueue = [
    { id: 'f1', note: 'Morning ADL – John Smith', time: '10:42 AM', synced: true },
    { id: 'f2', note: 'Clinical Note – Margaret H.', time: '09:15 AM', synced: true },
];

export default function StaffFormsPage() {
    const [offline, setOffline] = useState(false);
    const [checked, setChecked] = useState<Record<string, boolean>>({});
    const [note, setNote] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [queue, setQueue] = useState(mockPendingQueue);

    const toggle = (t: string) => setChecked(p => ({ ...p, [t]: !p[t] }));

    const handleSubmit = () => {
        if (offline) {
            setQueue(q => [...q, { id: `f${Date.now()}`, note: 'Unsaved ADL – Offline', time: new Date().toLocaleTimeString(), synced: false }]);
        } else {
            setSubmitted(true);
            setTimeout(() => setSubmitted(false), 3000);
        }
    };

    return (
        <div>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '2.25rem', fontWeight: '800', letterSpacing: '-0.025em' }}>Digital Care Documentation</h1>
                    <p style={{ color: 'var(--muted)', marginTop: '0.35rem' }}>Client: John Smith · Visit #V-20260403-02</p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginTop: '0.5rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.875rem', fontWeight: '700', color: offline ? '#ef4444' : 'var(--accent)' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '4px', background: offline ? '#ef4444' : 'var(--accent)', display: 'inline-block' }}></span>
                        {offline ? 'Offline' : 'Synced'}
                    </span>
                    <button className="btn btn-secondary" style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }} onClick={() => setOffline(o => !o)}>
                        Simulate {offline ? 'Online' : 'Offline'}
                    </button>
                </div>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '1.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {/* ADL Checklist */}
                    <div className="glass-panel" style={{ padding: '1.75rem', borderRadius: '1.25rem' }}>
                        <h2 style={{ fontWeight: '700', fontSize: '1.2rem', marginBottom: '1.25rem' }}>ADL Checklist – Morning Routine</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                            {tasks.map(t => (
                                <label key={t} onClick={() => toggle(t)} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.85rem 1rem', background: checked[t] ? 'rgba(16,185,129,0.08)' : 'var(--muted-light)', borderRadius: '0.75rem', cursor: 'pointer', border: checked[t] ? '1px solid rgba(16,185,129,0.3)' : '1px solid transparent', transition: 'all 0.2s' }}>
                                    <div style={{ width: '22px', height: '22px', borderRadius: '6px', border: checked[t] ? 'none' : '2px solid var(--border)', background: checked[t] ? 'var(--accent)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.2s' }}>
                                        {checked[t] && <span style={{ color: 'white', fontSize: '0.8rem', fontWeight: 'bold' }}>✓</span>}
                                    </div>
                                    <span style={{ fontWeight: '500', textDecoration: checked[t] ? 'line-through' : 'none', color: checked[t] ? 'var(--muted)' : 'var(--foreground)' }}>{t}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Clinical Notes */}
                    <div className="glass-panel" style={{ padding: '1.75rem', borderRadius: '1.25rem' }}>
                        <h2 style={{ fontWeight: '700', fontSize: '1.2rem', marginBottom: '0.25rem' }}>Clinical Progress Notes</h2>
                        <p style={{ color: 'var(--muted)', fontSize: '0.875rem', marginBottom: '1rem' }}>Free-text or voice-to-text input</p>
                        <textarea
                            value={note}
                            onChange={e => setNote(e.target.value)}
                            style={{ width: '100%', height: '130px', padding: '1rem', borderRadius: '0.75rem', border: '1px solid var(--border)', background: 'transparent', color: 'var(--foreground)', fontSize: '1rem', fontFamily: 'inherit', resize: 'vertical', outline: 'none' }}
                            placeholder="e.g. Client was alert and cooperative. Blood pressure 118/76. Ambulated with walker for 10 minutes without distress..."
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.25rem' }}>
                            <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>{note.length} characters</span>
                            <button onClick={handleSubmit} className="btn btn-primary" style={{ padding: '0.75rem 2rem', borderRadius: '0.75rem' }}>
                                {submitted ? '✓ Submitted!' : offline ? 'Queue Offline' : 'Save & Sync'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Sidebar: sync queue + navigation */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div className="glass-panel" style={{ padding: '1.25rem', borderRadius: '1.25rem' }}>
                        <div style={{ fontWeight: '700', marginBottom: '1rem', fontSize: '0.95rem' }}>Sync Queue</div>
                        {queue.length === 0 ? (
                            <p style={{ color: 'var(--muted)', fontSize: '0.875rem' }}>No documents queued.</p>
                        ) : queue.map(q => (
                            <div key={q.id} style={{ padding: '0.6rem 0', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <div style={{ fontSize: '0.8rem', fontWeight: '600' }}>{q.note}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{q.time}</div>
                                </div>
                                <span style={{ fontSize: '0.7rem', fontWeight: '700', color: q.synced ? 'var(--accent)' : '#ef4444' }}>
                                    {q.synced ? '✓ Synced' : '⏳ Pending'}
                                </span>
                            </div>
                        ))}
                        {!offline && queue.some(q => !q.synced) && (
                            <button onClick={() => setQueue(q => q.map(d => ({ ...d, synced: true })))} className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', fontSize: '0.8rem', padding: '0.6rem', borderRadius: '0.6rem' }}>
                                Sync Now
                            </button>
                        )}
                    </div>

                    <div className="glass-panel" style={{ padding: '1.25rem', borderRadius: '1.25rem' }}>
                        <div style={{ fontWeight: '700', marginBottom: '1rem', fontSize: '0.95rem' }}>Next Steps</div>
                        <Link href="/family/portal" className="btn btn-secondary" style={{ width: '100%', display: 'block', textAlign: 'center', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                            View Family Portal
                        </Link>
                        <Link href="/agency/scheduling" className="btn btn-secondary" style={{ width: '100%', display: 'block', textAlign: 'center', fontSize: '0.85rem' }}>
                            Back to Scheduling
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
