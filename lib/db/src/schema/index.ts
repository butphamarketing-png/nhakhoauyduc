import { pgTable, serial, text, integer, boolean, timestamp } from "drizzle-orm/pg-core";

export const banners = pgTable("banners", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  subtitle: text("subtitle"),
  imageUrl: text("image_url").notNull(),
  ctaText: text("cta_text"),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
});

export const promotions = pgTable("promotions", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  price: text("price").notNull(),
  validUntil: text("valid_until").notNull(),
});

export const feedback = pgTable("feedback", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  service: text("service").notNull(),
  content: text("content").notNull(),
  rating: integer("rating").notNull().default(5),
  imageUrl: text("image_url").notNull(),
  approved: boolean("approved").notNull().default(true),
});

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  imageUrl: text("image_url").notNull(),
  category: text("category").notNull().default("Kiến thức"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  service: text("service"),
  appointmentTime: text("appointment_time"),
  status: text("status").notNull().default("Chưa xử lý"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const settings = pgTable("settings", {
  id: serial("id").primaryKey(),
  logo: text("logo").notNull().default(""),
  hotline: text("hotline").notNull().default("0974166440"),
  address: text("address").notNull().default("2-6B Đường Trường Chinh, Tân Thới Nhất, Quận 12, TP. Hồ Chí Minh"),
  email: text("email").notNull().default("email.nhakhoaht1225@gmail.com"),
  facebook: text("facebook").notNull().default("https://facebook.com"),
  youtube: text("youtube").notNull().default("https://youtube.com"),
  tiktok: text("tiktok").notNull().default("https://tiktok.com"),
  instagram: text("instagram").notNull().default("https://instagram.com"),
  zalo: text("zalo").notNull().default("https://zalo.me"),
  metaTitle: text("meta_title").notNull().default("Phòng Khám Nha Khoa HT - Hoàn Thiện Nụ Cười"),
  metaDescription: text("meta_description").notNull().default("Phòng khám nha khoa uy tín tại TP.HCM với hơn 10 năm kinh nghiệm"),
});

export const admins = pgTable("admins", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
});
