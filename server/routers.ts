import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";
import { TRPCError } from "@trpc/server";
import { storagePut } from "./storage";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  products: router({
    list: publicProcedure.query(() => db.getAllProducts()),
    getById: publicProcedure.input(z.object({ id: z.number() })).query(({ input }) => db.getProductById(input.id)),
    create: protectedProcedure
      .input(z.object({
        name: z.string(),
        description: z.string().optional(),
        price: z.string(),
        imageUrl: z.string().optional(),
        category: z.string().optional(),
        stock: z.number().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user?.role !== 'admin') throw new TRPCError({ code: 'FORBIDDEN' });
        return await db.createProduct(input as any);
      }),
    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        name: z.string().optional(),
        description: z.string().optional(),
        price: z.string().optional(),
        imageUrl: z.string().optional(),
        category: z.string().optional(),
        stock: z.number().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user?.role !== 'admin') throw new TRPCError({ code: 'FORBIDDEN' });
        const { id, ...updates } = input;
        return await db.updateProduct(id, updates as any);
      }),
    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user?.role !== 'admin') throw new TRPCError({ code: 'FORBIDDEN' });
        return await db.deleteProduct(input.id);
      }),
  }),

  storage: router({
    uploadImage: protectedProcedure
      .input(z.object({
        file: z.instanceof(Blob),
        fileName: z.string(),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user?.role !== 'admin') throw new TRPCError({ code: 'FORBIDDEN' });
        
        const buffer = await input.file.arrayBuffer();
        const fileKey = `products/${Date.now()}-${input.fileName}`;
        const mimeType = input.file.type || 'image/jpeg';
        
        const result = await storagePut(fileKey, Buffer.from(buffer), mimeType);
        return result;
      }),
  }),

  orders: router({
    create: publicProcedure
      .input(z.object({
        userId: z.number(),
        items: z.string(),
        subtotal: z.string(),
        shippingCost: z.string().optional(),
        total: z.string(),
        customerEmail: z.string().optional(),
        customerPhone: z.string().optional(),
        notes: z.string().optional(),
        pixKey: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        return await db.createOrder(input as any);
      }),
    getById: publicProcedure.input(z.object({ id: z.number() })).query(({ input }) => db.getOrderById(input.id)),
    getUserOrders: protectedProcedure.query(({ ctx }) => db.getUserOrders(ctx.user!.id)),
    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        status: z.enum(['pending', 'paid', 'shipped', 'delivered', 'cancelled']).optional(),
        shippingCost: z.string().optional(),
        notes: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const { id, ...updates } = input;
        const order = await db.getOrderById(id);
        if (!order || (order.userId !== ctx.user?.id && ctx.user?.role !== 'admin')) {
          throw new TRPCError({ code: 'FORBIDDEN' });
        }
        return await db.updateOrder(id, updates as any);
      }),
  }),
});

export type AppRouter = typeof appRouter;
