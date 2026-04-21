import { Router, type IRouter } from "express";
import { db, bookings, posts, services, feedback } from "@workspace/db";
import { eq, sql } from "drizzle-orm";
import { requireAdmin } from "../lib/auth";

const router: IRouter = Router();

router.get("/dashboard/summary", requireAdmin, async (_req, res) => {
  const [totalB] = await db
    .select({ c: sql<number>`count(*)::int` })
    .from(bookings);
  const [totalP] = await db
    .select({ c: sql<number>`count(*)::int` })
    .from(posts);
  const [totalS] = await db
    .select({ c: sql<number>`count(*)::int` })
    .from(services);
  const [totalF] = await db
    .select({ c: sql<number>`count(*)::int` })
    .from(feedback);
  const [pending] = await db
    .select({ c: sql<number>`count(*)::int` })
    .from(bookings)
    .where(eq(bookings.status, "Chưa xử lý"));
  res.json({
    totalBookings: totalB?.c ?? 0,
    totalPosts: totalP?.c ?? 0,
    totalServices: totalS?.c ?? 0,
    totalFeedback: totalF?.c ?? 0,
    pendingBookings: pending?.c ?? 0,
  });
});

router.get("/dashboard/bookings-by-day", requireAdmin, async (_req, res) => {
  const rows = await db.execute<{ day: string; count: number }>(sql`
    SELECT to_char(date_trunc('day', created_at), 'YYYY-MM-DD') AS day,
           count(*)::int AS count
    FROM bookings
    WHERE created_at >= now() - interval '14 days'
    GROUP BY 1
    ORDER BY 1 ASC
  `);
  res.json(rows.rows);
});

export default router;
