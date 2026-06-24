'use client'

import { useState } from 'react'
import Link from 'next/link'
import styles from './staffing.module.css'

type FormData = {
    facility: {
        name: string
        type: string
        address: string
        contactName: string
        contactEmail: string
        legalAgreement: boolean
    }
    role: {
        roleNeeded: string
        customRole: string
    }
    shifts: {
        startDate: string
        startTime: string
        endTime: string
        count: number
        recurring: boolean
    }
    requirements: {
        creds: string
        priority: string // normal/urgent
        notes: string
    }
}

export default function StaffingPage() {
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState<FormData>({
        facility: {
            name: '',
            type: 'Assisted Living',
            address: '',
            contactName: '',
            contactEmail: '',
            legalAgreement: false
        },
        role: {
            roleNeeded: 'PSW',
            customRole: ''
        },
        shifts: {
            startDate: '',
            startTime: '',
            endTime: '',
            count: 1,
            recurring: false
        },
        requirements: {
            creds: '',
            priority: 'normal',
            notes: ''
        }
    })

    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState('')

    const handleNext = () => setStep(step + 1)
    const handleBack = () => {
        setStep(step - 1)
        setError('')
    }

    const updateFormData = (section: keyof FormData, field: string, value: any) => {
        setFormData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }))
    }

    const handleSubmit = async () => {
        if (!formData.facility.legalAgreement) {
            setError('You must agree to the data policy before submitting.')
            return
        }
        
        setError('')
        // TODO: Connect to Server Action
        console.log('Submitting Staffing Req:', formData)
        setSubmitted(true)
    }

    if (submitted) {
        return (
            <div className={styles.container}>
                <div className={styles.card} style={{ textAlign: 'center' }}>
                    <h1 className={styles.title}>Request Received</h1>
                    <p className={styles.subtitle}>We'll start looking for staff immediately.</p>
                    <p style={{ margin: '2rem 0' }}>
                        A confirmation has been sent to {formData.facility.contactEmail}.<br />
                        You can verify status in the Facility Portal.
                    </p>
                    <Link href="/" className="btn btn-primary">Return Home</Link>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Post Staffing Request</h1>
                    <p className={styles.subtitle}>Step {step} of 4</p>
                </div>

                <div className={styles.progress}>
                    {[1, 2, 3, 4].map(s => (
                        <div
                            key={s}
                            className={`${styles.step} ${s <= step ? styles.stepActive : ''}`}
                        >
                            {s}
                        </div>
                    ))}
                </div>

                {step === 1 && (
                    <div key={1} className="animate-fade-in">
                        <h2 style={{ marginBottom: '1.5rem' }}>Facility Information</h2>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Facility Name</label>
                            <input
                                type="text"
                                className={styles.input}
                                value={formData.facility.name}
                                onChange={(e) => updateFormData('facility', 'name', e.target.value)}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Facility Type</label>
                            <select
                                className={styles.select}
                                value={formData.facility.type}
                                onChange={(e) => updateFormData('facility', 'type', e.target.value)}
                            >
                                <option value="Independent Living">Independent Living</option>
                                <option value="Assisted Living">Assisted Living</option>
                                <option value="Rehab">Rehab / Hospital</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Address</label>
                            <input
                                type="text"
                                className={styles.input}
                                value={formData.facility.address}
                                onChange={(e) => updateFormData('facility', 'address', e.target.value)}
                            />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Contact Person</label>
                                <input
                                    type="text"
                                    className={styles.input}
                                    value={formData.facility.contactName}
                                    onChange={(e) => updateFormData('facility', 'contactName', e.target.value)}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Contact Email</label>
                                <input
                                    type="email"
                                    className={styles.input}
                                    value={formData.facility.contactEmail}
                                    onChange={(e) => updateFormData('facility', 'contactEmail', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div key={2} className="animate-fade-in">
                        <h2 style={{ marginBottom: '1.5rem' }}>Role Required</h2>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Role</label>
                            <select
                                className={styles.select}
                                value={formData.role.roleNeeded}
                                onChange={(e) => updateFormData('role', 'roleNeeded', e.target.value)}
                            >
                                <option value="PSW">PSW / Personal Care Aide</option>
                                <option value="Nurse">Nurse (RN/RPN)</option>
                                <option value="Front Desk">Front Desk / Admin</option>
                                <option value="Housekeeping">Housekeeping</option>
                                <option value="Dining">Dining Server</option>
                                <option value="Dishwasher">Dishwasher</option>
                                <option value="Other">Other (Specify below)</option>
                            </select>
                        </div>

                        {formData.role.roleNeeded === 'Other' && (
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Specify Role</label>
                                <input
                                    type="text"
                                    className={styles.input}
                                    value={formData.role.customRole}
                                    onChange={(e) => updateFormData('role', 'customRole', e.target.value)}
                                />
                            </div>
                        )}
                    </div>
                )}

                {step === 3 && (
                    <div key={3} className="animate-fade-in">
                        <h2 style={{ marginBottom: '1.5rem' }}>Shift Details</h2>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Date</label>
                            <input
                                type="date"
                                className={styles.input}
                                value={formData.shifts.startDate}
                                onChange={(e) => updateFormData('shifts', 'startDate', e.target.value)}
                            />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Start Time</label>
                                <input
                                    type="time"
                                    className={styles.input}
                                    value={formData.shifts.startTime}
                                    onChange={(e) => updateFormData('shifts', 'startTime', e.target.value)}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>End Time</label>
                                <input
                                    type="time"
                                    className={styles.input}
                                    value={formData.shifts.endTime}
                                    onChange={(e) => updateFormData('shifts', 'endTime', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Number of Staff Needed</label>
                            <input
                                type="number"
                                min="1"
                                className={styles.input}
                                value={formData.shifts.count}
                                onChange={(e) => updateFormData('shifts', 'count', parseInt(e.target.value))}
                            />
                        </div>

                        <div className={styles.checkboxGroup}>
                            <label className={styles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    className={styles.checkboxInput}
                                    checked={formData.shifts.recurring}
                                    onChange={(e) => updateFormData('shifts', 'recurring', e.target.checked)}
                                />
                                Recurring Shift?
                            </label>
                        </div>
                    </div>
                )}

                {step === 4 && (
                    <div key={4} className="animate-fade-in">
                        <h2 style={{ marginBottom: '1.5rem' }}>Review & Requirements</h2>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Priority</label>
                            <select
                                className={styles.select}
                                value={formData.requirements.priority}
                                onChange={(e) => updateFormData('requirements', 'priority', e.target.value)}
                            >
                                <option value="normal">Normal</option>
                                <option value="urgent">Urgent</option>
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Requirements / Notes</label>
                            <textarea
                                className={styles.textarea}
                                rows={3}
                                placeholder="Experience level, dress code, certifications..."
                                value={formData.requirements.notes}
                                onChange={(e) => updateFormData('requirements', 'notes', e.target.value)}
                            />
                        </div>

                        <div className={styles.summary}>
                            <h3 style={{ borderBottom: '1px solid #ddd', paddingBottom: '0.5rem' }}>Summary</h3>
                            <ul className={styles.summaryList}>
                                <li><strong>Facility:</strong> {formData.facility.name} ({formData.facility.type})</li>
                                <li><strong>Role:</strong> {formData.role.roleNeeded === 'Other' ? formData.role.customRole : formData.role.roleNeeded}</li>
                                <li><strong>Shift:</strong> {formData.shifts.startDate} @ {formData.shifts.startTime}-{formData.shifts.endTime}</li>
                                <li><strong>Staff Count:</strong> {formData.shifts.count}</li>
                            </ul>
                        </div>

                        <div className={styles.formGroup} style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(239, 68, 68, 0.05)', borderRadius: '0.5rem', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                            <label className={styles.checkboxLabel} style={{ fontWeight: 600, color: 'var(--foreground)' }}>
                                <input
                                    type="checkbox"
                                    className={styles.checkboxInput}
                                    checked={formData.facility.legalAgreement}
                                    onChange={(e) => updateFormData('facility', 'legalAgreement', e.target.checked)}
                                />
                                I agree never to input patient medical history or personal health information into this platform.
                            </label>
                            {error && <p style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.5rem', fontWeight: 500 }}>{error}</p>}
                        </div>
                    </div>
                )}

                <div className={styles.actions}>
                    {step > 1 ? (
                        <button className="btn btn-secondary" onClick={handleBack}>
                            Back
                        </button>
                    ) : <div></div>}

                    {step < 4 ? (
                        <button className={styles.btnPrimary} onClick={handleNext}>
                            Next Step
                        </button>
                    ) : (
                        <button className={styles.btnPrimary} onClick={handleSubmit}>
                            Post Request
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
