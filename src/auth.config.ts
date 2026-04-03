import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const role = (auth?.user as any)?.role;
            
            const isAgencyRoute = nextUrl.pathname.startsWith('/agency');
            const isStaffRoute = nextUrl.pathname.startsWith('/staff');
            const isFamilyRoute = nextUrl.pathname.startsWith('/family');

            // For testing journey maps, we will allow logged in users to access their respective routes.
            if (isAgencyRoute || isStaffRoute || isFamilyRoute) {
                if (!isLoggedIn) return false;
                
                // RBAC logic
                if (isAgencyRoute && (role !== 'AGENCY_ADMIN' && role !== 'SUPER_ADMIN')) {
                    return Response.redirect(new URL('/staff/evv', nextUrl));
                }
                if (isStaffRoute && role !== 'STAFF' && role !== 'SUPER_ADMIN' && role !== 'AGENCY_ADMIN') {
                    return Response.redirect(new URL('/family/portal', nextUrl));
                }
                if (isFamilyRoute && role !== 'CLIENT_FAMILY' && role !== 'SUPER_ADMIN') {
                    return Response.redirect(new URL('/agency/scheduling', nextUrl));
                }
                return true;
            } else if (isLoggedIn) {
                if (nextUrl.pathname === '/login' || nextUrl.pathname === '/') {
                   if (role === 'AGENCY_ADMIN' || role === 'SUPER_ADMIN') return Response.redirect(new URL('/agency/scheduling', nextUrl));
                   if (role === 'STAFF') return Response.redirect(new URL('/staff/evv', nextUrl));
                   if (role === 'CLIENT_FAMILY') return Response.redirect(new URL('/family/portal', nextUrl));
                   // fallback
                   return Response.redirect(new URL('/agency/scheduling', nextUrl));
                }
            }
            return true;
        },
        session({ session, token }) {
            if (session.user && token.sub) {
                // @ts-ignore
                session.user.role = token.role;
                // @ts-ignore
                session.user.tenantId = token.tenantId;
                session.user.id = token.sub;
            }
            return session;
        },
        jwt({ token, user }) {
            if (user) {
                // @ts-ignore
                token.role = user.role;
                // @ts-ignore
                token.tenantId = user.tenantId;
            }
            return token;
        }
    },
    providers: [], // Configured in auth.ts
} satisfies NextAuthConfig;
