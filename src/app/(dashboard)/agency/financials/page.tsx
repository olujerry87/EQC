'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { DEMO_INVOICES, DEMO_EXPENSES, DEMO_PAYROLL, DEMO_METRICS } from '@/lib/demo-data';

const statusStyle: Record<string, { bg: string; color: string }> = {
    PAID:      { bg: 'rgba(16,185,129,0.1)',  color: '#10b981' },
    SENT:      { bg: 'rgba(79,70,229,0.1)',   color: 'var(--primary)' },
    DRAFT:     { bg: 'rgba(156,163,175,0.15)', color: 'var(--muted)' },
    APPROVED:  { bg: 'rgba(16,185,129,0.1)',  color: '#10b981' },
    PENDING:   { bg: 'rgba(245,158,11,0.12)', color: '#f59e0b' },
    PROCESSED: { bg: 'rgba(79,70,229,0.1)',   color: 'var(--primary)' },
};

function Badge({ status }: { status: string }) {
    const s = statusStyle[status] ?? statusStyle.PENDING;
    return (
        <span style={{ background: s.bg, color: s.color, padding: '0.2rem 0.7rem', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: '800' }}>
            {status}
        </span>
    );
}

export default function FinancialsPage() {
    const [tab, setTab] = useState<'invoices' | 'expenses' | 'payroll'>('invoices');

    const totalRevenue = DEMO_INVOICES.filter(i => i.status === 'PAID').reduce((s, i) => s + i.hours * i.rate * (1 + i.tax), 0);
    const totalPending = DEMO_INVOICES.filter(i => i.status !== 'PAID').reduce((s, i) => s + i.hours * i.rate * (1 + i.tax), 0);
    const totalPayroll = DEMO_PAYROLL.reduce((s, p) => s + p.net, 0);

    return (
        <div>
            <header style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2.25rem', fontWeight: '800', letterSpacing: '-0.025em' }}>Financials & Payroll</h1>
                <p style={{ color: 'var(--muted)', marginTop: '0.35rem' }}>Automated billing, expense tracking, and payroll ledger</p>
            </header>

            {/* KPI Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem', marginBottom: '2rem' }}>
                {[
                    { label: 'Revenue Collected',    val: `$${totalRevenue.toFixed(0)}`,  sub: 'This period',     color: '#10b981' },
                    { label: 'Pending Invoices',      val: `$${totalPending.toFixed(0)}`,  sub: `${DEMO_METRICS.pendingInvoices} invoices`,  color: '#f59e0b' },
                    { label: 'Payroll to Disburse',   val: `$${totalPayroll.toFixed(0)}`,  sub: `${DEMO_METRICS.pendingPayroll} staff pending`, color: 'var(--primary)' },
                ].map(m => (
                    <div key={m.label} className="glass-panel" style={{ padding: '1.25rem 1.5rem', borderRadius: '1rem', borderTop: `3px solid ${m.color}` }}>
                        <div style={{ fontSize: '0.75rem', color: 'var(--muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{m.label}</div>
                        <div style={{ fontSize: '2rem', fontWeight: '800', color: m.color, marginTop: '0.35rem' }}>{m.val}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: '0.2rem' }}>{m.sub}</div>
                    </div>
                ))}
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
                {([['invoices', '💳 Invoices'], ['expenses', '🧾 Expenses'], ['payroll', '💰 Payroll']] as const).map(([t, label]) => (
                    <button key={t} onClick={() => setTab(t)} style={{ padding: '0.5rem 1.25rem', borderRadius: '2rem', border: 'none', background: tab === t ? 'var(--primary)' : 'var(--muted-light)', color: tab === t ? 'white' : 'var(--muted)', fontWeight: '700', cursor: 'pointer', fontSize: '0.875rem' }}>
                        {label}
                    </button>
                ))}
            </div>

            {/* Invoices Tab */}
            {tab === 'invoices' && (
                <div className="glass-panel" style={{ borderRadius: '1.25rem', overflow: 'hidden' }}>
                    <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: '700' }}>Client Invoices</span>
                        <button className="btn btn-primary" style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}>+ Generate Invoice</button>
                    </div>
                    {DEMO_INVOICES.map((inv, i) => {
                        const subtotal = inv.hours * inv.rate;
                        const tax = subtotal * inv.tax;
                        const total = subtotal + tax;
                        return (
                            <div key={inv.id} style={{ padding: '1rem 1.5rem', borderBottom: i < DEMO_INVOICES.length - 1 ? '1px solid var(--border)' : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: '700' }}>{inv.client}</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: '0.2rem' }}>
                                        {inv.shiftDate} · {inv.hours}h × ${inv.rate.toFixed(2)}/hr + {(inv.tax * 100).toFixed(0)}% tax
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0 }}>
                                    <Badge status={inv.status} />
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontWeight: '800', fontSize: '1rem' }}>${total.toFixed(2)}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>Tax: ${tax.toFixed(2)}</div>
                                    </div>
                                    {inv.status === 'DRAFT' && (
                                        <button className="btn btn-secondary" style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}>Send</button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                    <div style={{ padding: '1rem 1.5rem', background: 'rgba(79,70,229,0.04)', display: 'flex', justifyContent: 'space-between', fontWeight: '700' }}>
                        <span>Total Billed (All)</span>
                        <span style={{ color: 'var(--primary)' }}>
                            ${DEMO_INVOICES.reduce((sum, inv) => sum + inv.hours * inv.rate * (1 + inv.tax), 0).toFixed(2)}
                        </span>
                    </div>
                </div>
            )}

            {/* Expenses Tab */}
            {tab === 'expenses' && (
                <div className="glass-panel" style={{ borderRadius: '1.25rem', overflow: 'hidden' }}>
                    <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: '700' }}>Staff Expense Claims</span>
                        <Link href="/staff/forms" className="btn btn-secondary" style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}>+ Submit Expense</Link>
                    </div>
                    {DEMO_EXPENSES.map((exp, i) => (
                        <div key={exp.id} style={{ padding: '1rem 1.5rem', borderBottom: i < DEMO_EXPENSES.length - 1 ? '1px solid var(--border)' : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: '700' }}>{exp.staff}</div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: '0.2rem' }}>
                                    {exp.category} · {exp.description}
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0 }}>
                                <Badge status={exp.status} />
                                <div style={{ fontWeight: '800', minWidth: '60px', textAlign: 'right' }}>${exp.amount.toFixed(2)}</div>
                                {exp.status === 'PENDING' && (
                                    <button className="btn btn-primary" style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}>Approve</button>
                                )}
                            </div>
                        </div>
                    ))}
                    <div style={{ padding: '1rem 1.5rem', background: 'rgba(79,70,229,0.04)', display: 'flex', justifyContent: 'space-between', fontWeight: '700' }}>
                        <span>Total Expenses</span>
                        <span style={{ color: 'var(--primary)' }}>
                            ${DEMO_EXPENSES.reduce((s, e) => s + e.amount, 0).toFixed(2)}
                        </span>
                    </div>
                </div>
            )}

            {/* Payroll Tab */}
            {tab === 'payroll' && (
                <div className="glass-panel" style={{ borderRadius: '1.25rem', overflow: 'hidden' }}>
                    <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: '700' }}>Payroll Ledger</span>
                        <button className="btn btn-primary" style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}>⬇ Export CSV</button>
                    </div>
                    {DEMO_PAYROLL.map((pay, i) => (
                        <div key={pay.id} style={{ padding: '1rem 1.5rem', borderBottom: i < DEMO_PAYROLL.length - 1 ? '1px solid var(--border)' : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: '700' }}>{pay.staff}</div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: '0.2rem' }}>
                                    {pay.hours}h × ${pay.rate.toFixed(2)}/hr · Tax: ${pay.tax.toFixed(2)}
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0 }}>
                                <Badge status={pay.status} />
                                <div style={{ textAlign: 'right', minWidth: '90px' }}>
                                    <div style={{ fontWeight: '800', color: 'var(--accent)', fontSize: '1rem' }}>${pay.net.toFixed(2)}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>Gross: ${pay.gross.toFixed(2)}</div>
                                </div>
                                {pay.status === 'PENDING' && (
                                    <button className="btn btn-primary" style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}>Process</button>
                                )}
                            </div>
                        </div>
                    ))}
                    <div style={{ padding: '1rem 1.5rem', background: 'rgba(16,185,129,0.04)', display: 'flex', justifyContent: 'space-between', fontWeight: '700' }}>
                        <span>Total Net Payroll</span>
                        <span style={{ color: '#10b981' }}>
                            ${DEMO_PAYROLL.reduce((s, p) => s + p.net, 0).toFixed(2)}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}
