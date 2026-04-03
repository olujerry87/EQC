import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {}
            },
            async authorize(credentials) {
                // DEMO MODE: Accept any email/password, assign role based on email keyword
                // See AUTH_NOTE.md for instructions to restore real auth.
                const emailStr = ((credentials?.email as string) || 'staff@demo.com').toLowerCase();

                let role = 'STAFF';
                let name = 'Jane Doe (PSW)';
                if (emailStr.includes('admin') || emailStr.includes('agency')) {
                    role = 'AGENCY_ADMIN';
                    name = 'Admin User';
                } else if (emailStr.includes('family') || emailStr.includes('client')) {
                    role = 'CLIENT_FAMILY';
                    name = 'Family Member';
                }

                return {
                    id: 'demo-user-001',
                    name,
                    email: emailStr,
                    role,
                    tenantId: 'demo-tenant-001',
                } as any;
            },
        }),
    ],
});
