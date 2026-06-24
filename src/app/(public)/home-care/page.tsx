'use client'

import { useState } from 'react'
import Link from 'next/link'
import styles from './home-care.module.css'

const NEEDS_OPTIONS = [
    'Companionship', 'Meal Prep', 'Light Housekeeping', 
    'Errands', 'General Assistance', 'Transportation',
    'Organizing', 'Pet Care'
]

type FormData = {
    needs: string[]
    schedule: {
        days: string[]
        startTime: string
        endTime: string
        startDate: string
        frequency: 'one-time' | 'ongoing'
    }
    client: {
        address: string
        postalCode: string
        contactName: string
        contactEmail: string
        legalAgreement: boolean
    }
}

export default function HomeCarePage() {
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState<FormData>({
        needs: [],
        schedule: {
            days: [],
            startTime: '',
            endTime: '',
            startDate: '',
            frequency: 'ongoing'
        },
        client: {
            address: '',
            postalCode: '',
            contactName: '',
            contactEmail: '',
            legalAgreement: false
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

    const toggleNeed = (need: string) => {
        setFormData(prev => {
            const needs = prev.needs.includes(need)
                ? prev.needs.filter(n => n !== need)
                : [...prev.needs, need]
            return { ...prev, needs }
        })
    }

    const toggleDay = (day: string) => {
        setFormData(prev => {
            const days = prev.schedule.days.includes(day)
                ? prev.schedule.days.filter(d => d !== day)
                : [...prev.schedule.days, day]
            return {
                ...prev,
                schedule: { ...prev.schedule, days }
            }
        })
    }

    const handleSubmit = async () => {
        if (!formData.client.legalAgreement) {
            setError('You must agree to the data policy before submitting.')
            return
        }
        
        setError('')
        // TODO: Connect to Server Action
        console.log('Submitting Shift Request:', formData)
        setSubmitted(true)
    }

    if (submitted) {
        return (
            <div className={styles.container}>
                <div className={styles.card} style={{ textAlign: 'center' }}>
                    <h1 className={styles.title}>Thank You!</h1>
                    <p className={styles.subtitle}>Your shift request has been posted.</p>
                    <p style={{ margin: '2rem 0' }}>
                        We have sent a confirmation to {formData.client.contactEmail}.<br />
                        Caregivers can now review and claim your request.
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
                    <h1 className={styles.title}>Post a Home Shift</h1>
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
                        <h2 style={{ marginBottom: '1.5rem' }}>Select General Duties</h2>
                        <p style={{ color: 'var(--muted)', fontSize: '0.875rem', marginBottom: '1rem' }}>
                            Please select the logistical and household duties required. <strong>Do not include clinical care needs.</strong>
                        </p>
                        <div className={styles.checkboxGroup}>
                            {NEEDS_OPTIONS.map(need => (
                                <label key={need} className={styles.checkboxLabel}>
                                    <input
                                        type="checkbox"
                                        className={styles.checkboxInput}
                                        checked={formData.needs.includes(need)}
                                        onChange={() => toggleNeed(need)}
                                    />
                                    {need}
                                </label>
                            ))}
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div key={2} className="animate-fade-in">
                        <h2 style={{ marginBottom: '1.5rem' }}>Schedule Requirements</h2>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Frequency</label>
                            <select
                                className={styles.select}
                                value={formData.schedule.frequency}
                                onChange={(e) => updateFormData('schedule', 'frequency', e.target.value)}
                            >
                                <option value="ongoing">Ongoing Shifts</option>
                                <option value="one-time">One-time Shift</option>
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Days needed</label>
                            <div className={styles.checkboxGroup} style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
                                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                                    <label key={day} className={styles.checkboxLabel}>
                                        <input
                                            type="checkbox"
                                            className={styles.checkboxInput}
                                            checked={formData.schedule.days.includes(day)}
                                            onChange={() => toggleDay(day)}
                                        />
                                        {day}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Start Time</label>
                                <input
                                    type="time"
                                    className={styles.input}
                                    value={formData.schedule.startTime}
                                    onChange={(e) => updateFormData('schedule', 'startTime', e.target.value)}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>End Time</label>
                                <input
                                    type="time"
                                    className={styles.input}
                                    value={formData.schedule.endTime}
                                    onChange={(e) => updateFormData('schedule', 'endTime', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Start Date</label>
                            <input
                                type="date"
                                className={styles.input}
                                value={formData.schedule.startDate}
                                onChange={(e) => updateFormData('schedule', 'startDate', e.target.value)}
                            />
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div key={3} className="animate-fade-in">
                        <h2 style={{ marginBottom: '1.5rem' }}>Location & Contact</h2>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Contact Name</label>
                            <input
                                type="text"
                                className={styles.input}
                                placeholder="Your Name"
                                value={formData.client.contactName}
                                onChange={(e) => updateFormData('client', 'contactName', e.target.value)}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Contact Email</label>
                            <input
                                type="email"
                                className={styles.input}
                                placeholder="email@example.com"
                                value={formData.client.contactEmail}
                                onChange={(e) => updateFormData('client', 'contactEmail', e.target.value)}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Shift Location Address</label>
                            <textarea
                                className={styles.textarea}
                                rows={2}
                                value={formData.client.address}
                                onChange={(e) => updateFormData('client', 'address', e.target.value)}
                            />
                        </div>
                        
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Postal / Zip Code</label>
                            <input
                                type="text"
                                className={styles.input}
                                placeholder="A1A 1A1"
                                value={formData.client.postalCode}
                                onChange={(e) => updateFormData('client', 'postalCode', e.target.value)}
                            />
                        </div>
                    </div>
                )}

                {step === 4 && (
                    <div key={4} className="animate-fade-in">
                        <h2 style={{ marginBottom: '1.5rem' }}>Review Summary</h2>

                        <div className={styles.summary}>
                            <h3 style={{ borderBottom: '1px solid #ddd', paddingBottom: '0.5rem' }}>General Duties</h3>
                            <p>{formData.needs.join(', ') || 'None selected'}</p>
                        </div>

                        <div className={styles.summary}>
                            <h3 style={{ borderBottom: '1px solid #ddd', paddingBottom: '0.5rem' }}>Schedule</h3>
                            <ul className={styles.summaryList}>
                                <li><strong>Frequency:</strong> {formData.schedule.frequency}</li>
                                <li><strong>Days:</strong> {formData.schedule.days.join(', ')}</li>
                                <li><strong>Time:</strong> {formData.schedule.startTime} - {formData.schedule.endTime}</li>
                                <li><strong>Start Date:</strong> {formData.schedule.startDate}</li>
                            </ul>
                        </div>

                        <div className={styles.summary}>
                            <h3 style={{ borderBottom: '1px solid #ddd', paddingBottom: '0.5rem' }}>Logistics</h3>
                            <ul className={styles.summaryList}>
                                <li><strong>Contact:</strong> {formData.client.contactName} ({formData.client.contactEmail})</li>
                                <li><strong>Location:</strong> {formData.client.address}, {formData.client.postalCode}</li>
                            </ul>
                        </div>

                        <div className={styles.formGroup} style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(239, 68, 68, 0.05)', borderRadius: '0.5rem', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                            <label className={styles.checkboxLabel} style={{ fontWeight: 600, color: 'var(--foreground)' }}>
                                <input
                                    type="checkbox"
                                    className={styles.checkboxInput}
                                    checked={formData.client.legalAgreement}
                                    onChange={(e) => updateFormData('client', 'legalAgreement', e.target.checked)}
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
                        <button className="btn btn-primary" onClick={handleNext}>
                            Next Step
                        </button>
                    ) : (
                        <button className="btn btn-primary" onClick={handleSubmit}>
                            Post Shift Request
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
