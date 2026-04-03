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
                // Return a mock user for UI Journey Mapping without DB verification
                const emailStr = (credentials?.email as string) || '';

                // Dynamic mock role assignment based on the email provided
                let assignedRole = 'STAFF'; // default 
                if (emailStr.includes('admin') || emailStr.includes('agency')) {
                    assignedRole = 'AGENCY_ADMIN';
                } else if (emailStr.includes('family') || emailStr.includes('client')) {
                    assignedRole = 'CLIENT_FAMILY';
                }

                return {
                    id: 'mock-user-777',
                    name: 'Test View Persona',
                    email: emailStr || 'staff@mock.com',
                    role: assignedRole,
                    tenantId: 'demo-tenant-001'
                } as any;
            },
        }),
    ],
});
