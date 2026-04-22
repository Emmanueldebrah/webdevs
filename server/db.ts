import { eq, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, news, events, staff, gallery, contactMessages, admissionInquiries } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// News queries
export async function getPublishedNews() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(news).where(eq(news.published, true)).orderBy(desc(news.createdAt));
}

export async function getAllNews() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(news).orderBy(desc(news.createdAt));
}

export async function getNewsById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(news).where(eq(news.id, id)).limit(1);
  return result[0];
}

// Events queries
export async function getPublishedEvents() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(events).where(eq(events.published, true)).orderBy(desc(events.eventDate));
}

export async function getAllEvents() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(events).orderBy(desc(events.eventDate));
}

// Staff queries
export async function getPublishedStaff() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(staff).where(eq(staff.published, true)).orderBy(desc(staff.createdAt));
}

export async function getAllStaff() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(staff).orderBy(desc(staff.createdAt));
}

// Gallery queries
export async function getPublishedGallery() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(gallery).where(eq(gallery.published, true)).orderBy(desc(gallery.createdAt));
}

export async function getGalleryByCategory(category: string) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(gallery).where(eq(gallery.category, category)).orderBy(desc(gallery.createdAt));
}

export async function getAllGallery() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(gallery).orderBy(desc(gallery.createdAt));
}

// Contact messages queries
export async function getAllContactMessages() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
}

export async function getUnreadContactMessages() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(contactMessages).where(eq(contactMessages.read, false)).orderBy(desc(contactMessages.createdAt));
}

// Admission inquiries queries
export async function getAllAdmissionInquiries() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(admissionInquiries).orderBy(desc(admissionInquiries.createdAt));
}

export async function getUnreadAdmissionInquiries() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(admissionInquiries).where(eq(admissionInquiries.read, false)).orderBy(desc(admissionInquiries.createdAt));
}
