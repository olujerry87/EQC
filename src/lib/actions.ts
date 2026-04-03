'use server'

import { signIn } from '@/auth'
import { AuthError } from 'next-auth'
import { redirect } from 'next/navigation'

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', {
            email: formData.get('email'),
            password: formData.get('password'),
            redirectTo: '/agency/scheduling',
        })
    } catch (error) {
        if (error instanceof AuthError) {
            return 'Something went wrong. Please try again.'
        }
        throw error // Re-throw redirect
    }
}
