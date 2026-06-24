'use client';
import React, { useState } from 'react';
import Link from 'next/link';

const mockPendingQueue = [
    { id: 'e1', type: 'Expense', note: 'Mileage - 15km', amount: '$12.50', time: '10:42 AM', synced: true },
    { id: 's1', type: 'Shift Report', note: 'Routine Completion', time: '09:15 AM', synced: true },
];

export default function StaffFormsPage() {
    const [offline, setOffline] = useState(false);
    const [expenseCategory, setExpenseCategory] = useState('Mileage');
    const [expenseAmount, setExpenseAmount] = useState('');
    const [expenseNote, setExpenseNote] = useState('');
    const [shiftNotes, setShiftNotes] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [queue, setQueue] = useState(mockPendingQueue);

    const handleSubmitExpense = () => {
        if (!expenseAmount) return;
        
        const newEntry = {
            id: `e${Date.now()}`,
            type: 'Expense',
            note: `${expenseCategory} - ${expenseNote || 'No details'}`,
            amount: `$${expenseAmount}`,
            time: new Date().toLocaleTimeString(),
            synced: !offline
        };
        
        setQueue(q => [...q, newEntry]);
        setExpenseAmount('');
        setExpenseNote('');
        
        if (!offline) {
            setSubmitted(true);
            setTimeout(() => setSubmitted(false), 3000);
        }
    };

    const handleSubmitShiftReport = () => {
        if (!shiftNotes) return;
        
        const newEntry = {
            id: `s${Date.now()}`,
            type: 'Shift Report',
            note: 'Completion log submitted',
            amount: '',
            time: new Date().toLocaleTimeString(),
            synced: !offline
        };
        
        setQueue(q => [...q, newEntry]);
        setShiftNotes('');
        
        if (!offline) {
            setSubmitted(true);
            setTimeout(() => setSubmitted(false), 3000);
        }
    };

    return (
        <div>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '2.25rem', fontWeight: '800', letterSpacing: '-0.025em' }}>Shift Logistics & Expenses</h1>
                    <p style={{ color: 'var(--muted)', marginTop: '0.35rem' }}>Location: Toronto Region · Visit #V-20260403-02</p>
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
                    {/* Expense Logging */}
                    <div className="glass-panel" style={{ padding: '1.75rem', borderRadius: '1.25rem' }}>
                        <h2 style={{ fontWeight: '700', fontSize: '1.2rem', marginBottom: '1.25rem' }}>Log Expense</h2>
                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: 'var(--muted)' }}>Category</label>
                                <select 
                                    value={expenseCategory}
                                    onChange={e => setExpenseCategory(e.target.value)}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'transparent', color: 'var(--foreground)' }}>
                                    <option value="Mileage">Mileage</option>
                                    <option value="Supplies">Supplies</option>
                                    <option value="Parking">Parking</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: 'var(--muted)' }}>Amount</label>
                                <input 
                                    type="number"
                                    value={expenseAmount}
                                    onChange={e => setExpenseAmount(e.target.value)}
                                    placeholder="0.00"
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'transparent', color: 'var(--foreground)' }}
                                />
                            </div>
                        </div>
                        <div style={{ marginBottom: '1.25rem' }}>
                            <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: 'var(--muted)' }}>Description / Receipt ID</label>
                            <input 
                                type="text"
                                value={expenseNote}
                                onChange={e => setExpenseNote(e.target.value)}
                                placeholder="e.g. Driving between Site A and Site B"
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'transparent', color: 'var(--foreground)' }}
                            />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <button onClick={handleSubmitExpense} className="btn btn-primary" style={{ padding: '0.75rem 2rem', borderRadius: '0.75rem' }}>
                                {submitted ? '✓ Saved!' : offline ? 'Queue Offline' : 'Submit Expense'}
                            </button>
                        </div>
                    </div>

                    {/* General Shift Report */}
                    <div className="glass-panel" style={{ padding: '1.75rem', borderRadius: '1.25rem' }}>
                        <h2 style={{ fontWeight: '700', fontSize: '1.2rem', marginBottom: '0.25rem' }}>Shift Completion Report</h2>
                        <p style={{ color: 'var(--muted)', fontSize: '0.875rem', marginBottom: '1rem' }}>General logistics notes. Do not include PHI or medical data.</p>
                        <textarea
                            value={shiftNotes}
                            onChange={e => setShiftNotes(e.target.value)}
                            style={{ width: '100%', height: '130px', padding: '1rem', borderRadius: '0.75rem', border: '1px solid var(--border)', background: 'transparent', color: 'var(--foreground)', fontSize: '1rem', fontFamily: 'inherit', resize: 'vertical', outline: 'none' }}
                            placeholder="e.g. Arrived on time, all assigned logistical duties completed as requested..."
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.25rem' }}>
                            <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>{shiftNotes.length} characters</span>
                            <button onClick={handleSubmitShiftReport} className="btn btn-primary" style={{ padding: '0.75rem 2rem', borderRadius: '0.75rem' }}>
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
                                    <div style={{ fontSize: '0.8rem', fontWeight: '600' }}>
                                        {q.type} {q.amount && <span style={{ color: 'var(--primary)' }}>({q.amount})</span>}
                                    </div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '0.2rem' }}>{q.note}</div>
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
                            View Marketplace
                        </Link>
                        <Link href="/agency/scheduling" className="btn btn-secondary" style={{ width: '100%', display: 'block', textAlign: 'center', fontSize: '0.85rem' }}>
                            Back to Dashboard
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
