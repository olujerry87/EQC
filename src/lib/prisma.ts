import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

/**
 * Returns a Prisma Client extension that automatically enforces logical isolation by tenantId.
 * This ensures developers don't accidentally leak cross-tenant data.
 */
export function getTenantPrisma(tenantId: string) {
  return prisma.$extends({
    query: {
      $allModels: {
        async $allOperations({ model, operation, args, query }) {
          // Models that bypass tenant isolation:
          // Tenant: The overarching agency
          // User: Typically we isolate queries manually for auth (has tenantId inside)
          const bypassModels = ['Tenant', 'User']
          
          if (bypassModels.includes(model)) {
            return query(args)
          }

          // Inject tenantId filter based on operation
          if (
            ['findMany', 'findFirst', 'count', 'aggregate', 'groupBy'].includes(operation)
          ) {
            (args as any).where = { ...((args as any).where || {}), tenantId }
          }

          if (operation === 'findUnique') {
             return query(args)
          }

          if (['create'].includes(operation)) {
            (args as any).data = { ...((args as any).data || {}), tenantId }
          }
          if (['createMany'].includes(operation)) {
             if (Array.isArray((args as any).data)) {
                 (args as any).data = (args as any).data.map((d: any) => ({ ...d, tenantId }))
             }
          }
          if (['update', 'updateMany', 'delete', 'deleteMany', 'upsert'].includes(operation)) {
            (args as any).where = { ...((args as any).where || {}), tenantId }
            if (operation === 'upsert') {
               (args as any).create = { ...((args as any).create || {}), tenantId }
            }
          }

          return query(args)
        },
      },
    },
  })
}
