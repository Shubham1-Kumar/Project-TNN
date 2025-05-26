import { PrismaClient } from "@prisma/client";

const prismaSingleton = () => {
  return new PrismaClient({
    log: ["error", "query", "info", "warn"],
  });
};

// Extend globalThis (TypeScript requires `var` here)
/* eslint-disable no-var */
declare global {
  var prismaGlobal: ReturnType<typeof prismaSingleton> | undefined;
}
/* eslint-enable no-var */

// Use existing client in dev or create new
const prisma: ReturnType<typeof prismaSingleton> =
  globalThis.prismaGlobal ?? prismaSingleton();

if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = prisma;
}

export default prisma;
