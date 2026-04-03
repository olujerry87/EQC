'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { authenticate } from '@/lib/actions'
import styles from './login.module.css'

export default function LoginPage() {
    const [errorMessage, dispatch] = useActionState(authenticate, undefined)

    return (
        <div className={styles.container}>
            <form action={dispatch} className={styles.form}>
                <h1 className={styles.title}>Welcome Back</h1>
                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="email">Email</label>
                    <input
                        className={styles.input}
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="password">Password</label>
                    <input
                        className={styles.input}
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        required
                        minLength={6}
                    />
                </div>
                {errorMessage && (
                    <div className={styles.error}>{errorMessage}</div>
                )}
                <LoginButton />
            </form>
        </div>
    )
}

function LoginButton() {
    const { pending } = useFormStatus()

    return (
        <button className={styles.button} aria-disabled={pending}>
            {pending ? 'Logging in...' : 'Log in'}
        </button>
    )
}
