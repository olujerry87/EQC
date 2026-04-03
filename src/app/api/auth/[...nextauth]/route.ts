import { handlers } from "@/auth" // Referring to auth.ts export which creates handlers?
// Wait, NextAuth v5 exports { handlers: { GET, POST }, auth, signIn, signOut } from NextAuth(...)
// So in auth.ts I should export handlers.

export const { GET, POST } = handlers
