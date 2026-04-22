import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  getPublishedNews,
  getAllNews,
  getNewsById,
  getPublishedEvents,
  getAllEvents,
  getPublishedStaff,
  getAllStaff,
  getPublishedGallery,
  getGalleryByCategory,
  getAllGallery,
  getAllContactMessages,
  getUnreadContactMessages,
  getAllAdmissionInquiries,
  getUnreadAdmissionInquiries,
} from "./db";
import { getDb } from "./db";
import { news, events, staff, gallery, contactMessages, admissionInquiries } from "../drizzle/schema";
import { eq } from "drizzle-orm";

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

  // News procedures
  news: router({
    getPublished: publicProcedure.query(() => getPublishedNews()),
    getAll: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
      return getAllNews();
    }),
    getById: publicProcedure.input(z.number()).query(({ input }) => getNewsById(input)),
    create: protectedProcedure
      .input(
        z.object({
          title: z.string().min(1),
          excerpt: z.string().optional(),
          content: z.string().min(1),
          imageUrl: z.string().optional(),
          published: z.boolean().default(false),
        })
      )
      .mutation(async ({ input, ctx }) => {
        if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        const result = await db.insert(news).values(input);
        return { id: result[0].insertId };
      }),
    update: protectedProcedure
      .input(
        z.object({
          id: z.number(),
          title: z.string().optional(),
          excerpt: z.string().optional(),
          content: z.string().optional(),
          imageUrl: z.string().optional(),
          published: z.boolean().optional(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        const { id, ...updates } = input;
        await db.update(news).set(updates).where(eq(news.id, id));
        return { success: true };
      }),
    delete: protectedProcedure
      .input(z.number())
      .mutation(async ({ input, ctx }) => {
        if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        await db.delete(news).where(eq(news.id, input));
        return { success: true };
      }),
  }),

  // Events procedures
  events: router({
    getPublished: publicProcedure.query(() => getPublishedEvents()),
    getAll: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
      return getAllEvents();
    }),
    create: protectedProcedure
      .input(
        z.object({
          title: z.string().min(1),
          description: z.string().optional(),
          eventDate: z.date(),
          location: z.string().optional(),
          imageUrl: z.string().optional(),
          published: z.boolean().default(false),
        })
      )
      .mutation(async ({ input, ctx }) => {
        if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        const result = await db.insert(events).values(input);
        return { id: result[0].insertId };
      }),
    update: protectedProcedure
      .input(
        z.object({
          id: z.number(),
          title: z.string().optional(),
          description: z.string().optional(),
          eventDate: z.date().optional(),
          location: z.string().optional(),
          imageUrl: z.string().optional(),
          published: z.boolean().optional(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        const { id, ...updates } = input;
        await db.update(events).set(updates).where(eq(events.id, id));
        return { success: true };
      }),
    delete: protectedProcedure
      .input(z.number())
      .mutation(async ({ input, ctx }) => {
        if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        await db.delete(events).where(eq(events.id, input));
        return { success: true };
      }),
  }),

  // Staff procedures
  staff: router({
    getPublished: publicProcedure.query(() => getPublishedStaff()),
    getAll: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
      return getAllStaff();
    }),
    create: protectedProcedure
      .input(
        z.object({
          name: z.string().min(1),
          position: z.string().min(1),
          department: z.string().optional(),
          email: z.string().email().optional(),
          phone: z.string().optional(),
          bio: z.string().optional(),
          photoUrl: z.string().optional(),
          published: z.boolean().default(false),
        })
      )
      .mutation(async ({ input, ctx }) => {
        if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        const result = await db.insert(staff).values(input);
        return { id: result[0].insertId };
      }),
    update: protectedProcedure
      .input(
        z.object({
          id: z.number(),
          name: z.string().optional(),
          position: z.string().optional(),
          department: z.string().optional(),
          email: z.string().optional(),
          phone: z.string().optional(),
          bio: z.string().optional(),
          photoUrl: z.string().optional(),
          published: z.boolean().optional(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        const { id, ...updates } = input;
        await db.update(staff).set(updates).where(eq(staff.id, id));
        return { success: true };
      }),
    delete: protectedProcedure
      .input(z.number())
      .mutation(async ({ input, ctx }) => {
        if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        await db.delete(staff).where(eq(staff.id, input));
        return { success: true };
      }),
  }),

  // Gallery procedures
  gallery: router({
    getPublished: publicProcedure.query(() => getPublishedGallery()),
    getByCategory: publicProcedure.input(z.string()).query(({ input }) => getGalleryByCategory(input)),
    getAll: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
      return getAllGallery();
    }),
    create: protectedProcedure
      .input(
        z.object({
          title: z.string().min(1),
          description: z.string().optional(),
          imageUrl: z.string().min(1),
          category: z.enum(["campus-life", "events", "extracurricular"]),
          published: z.boolean().default(false),
        })
      )
      .mutation(async ({ input, ctx }) => {
        if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        const result = await db.insert(gallery).values(input);
        return { id: result[0].insertId };
      }),
    update: protectedProcedure
      .input(
        z.object({
          id: z.number(),
          title: z.string().optional(),
          description: z.string().optional(),
          imageUrl: z.string().optional(),
          category: z.enum(["campus-life", "events", "extracurricular"]).optional(),
          published: z.boolean().optional(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        const { id, ...updates } = input;
        await db.update(gallery).set(updates).where(eq(gallery.id, id));
        return { success: true };
      }),
    delete: protectedProcedure
      .input(z.number())
      .mutation(async ({ input, ctx }) => {
        if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        await db.delete(gallery).where(eq(gallery.id, input));
        return { success: true };
      }),
  }),

  // Contact messages procedures
  contact: router({
    getAll: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
      return getAllContactMessages();
    }),
    getUnread: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
      return getUnreadContactMessages();
    }),
    create: publicProcedure
      .input(
        z.object({
          name: z.string().min(1),
          email: z.string().email(),
          phone: z.string().optional(),
          subject: z.string().min(1),
          message: z.string().min(1),
        })
      )
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        const result = await db.insert(contactMessages).values(input);
        return { id: result[0].insertId, success: true };
      }),
    markAsRead: protectedProcedure
      .input(z.number())
      .mutation(async ({ input, ctx }) => {
        if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        await db.update(contactMessages).set({ read: true }).where(eq(contactMessages.id, input));
        return { success: true };
      }),
    delete: protectedProcedure
      .input(z.number())
      .mutation(async ({ input, ctx }) => {
        if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        await db.delete(contactMessages).where(eq(contactMessages.id, input));
        return { success: true };
      }),
  }),

  // Admission inquiries procedures
  admission: router({
    getAll: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
      return getAllAdmissionInquiries();
    }),
    getUnread: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
      return getUnreadAdmissionInquiries();
    }),
    create: publicProcedure
      .input(
        z.object({
          firstName: z.string().min(1),
          lastName: z.string().min(1),
          email: z.string().email(),
          phone: z.string().min(1),
          preferredProgramme: z.string().min(1),
          message: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        const result = await db.insert(admissionInquiries).values(input);
        return { id: result[0].insertId, success: true };
      }),
    markAsRead: protectedProcedure
      .input(z.number())
      .mutation(async ({ input, ctx }) => {
        if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        await db.update(admissionInquiries).set({ read: true }).where(eq(admissionInquiries.id, input));
        return { success: true };
      }),
    delete: protectedProcedure
      .input(z.number())
      .mutation(async ({ input, ctx }) => {
        if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        await db.delete(admissionInquiries).where(eq(admissionInquiries.id, input));
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
