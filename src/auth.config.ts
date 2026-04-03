import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const protectedPaths = ['/agency', '/staff', '/family'];
            const isProtected = protectedPaths.some(p => nextUrl.pathname.startsWith(p));

            // DEMO MODE: Allow all routes while bypassing auth for journey testing.
            // See AUTH_NOTE.md - restore RBAC guards before production.
            if (isProtected && !isLoggedIn) return false; // still require login
            return true;
        },
        session({ session, token }) {
            if (session.user && token.sub) {
                (session.user as any).role = token.role;
                (session.user as any).tenantId = token.tenantId;
                session.user.id = token.sub;
            }
            return session;
        },
        jwt({ token, user }) {
            if (user) {
                token.role = (user as any).role;
                token.tenantId = (user as any).tenantId;
            }
            return token;
        }
    },
    providers: [],
} satisfies NextAuthConfig;
