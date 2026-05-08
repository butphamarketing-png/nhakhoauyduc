import { Router, type IRouter } from "express";
import { requireAdmin } from "../lib/auth";
import { supabase, throwIfSupabaseError } from "../lib/supabase";

const router: IRouter = Router();
const STORAGE_LIMIT_BYTES = 10 * 1024 * 1024 * 1024;
const STORAGE_TABLES = [
  "banners",
  "services",
  "promotions",
  "feedback",
  "posts",
  "bookings",
  "settings",
  "admins",
];

async function estimateStorageUsedBytes() {
  const results = await Promise.all(
    STORAGE_TABLES.map((table) => supabase.from(table).select("*")),
  );
  results.forEach((result) => throwIfSupabaseError(result.error));
  return results.reduce((total, result) => {
    return total + Buffer.byteLength(JSON.stringify(result.data ?? []), "utf8");
  }, 0);
}

router.get("/dashboard/summary", requireAdmin, async (_req, res) => {
  const [totalB, totalP, totalS, totalF, pending, storageUsedBytes] = await Promise.all([
    supabase.from("bookings").select("*", { count: "exact", head: true }),
    supabase.from("posts").select("*", { count: "exact", head: true }),
    supabase.from("services").select("*", { count: "exact", head: true }),
    supabase.from("feedback").select("*", { count: "exact", head: true }),
    supabase.from("bookings").select("*", { count: "exact", head: true }).eq("status", "Chưa xử lý"),
    estimateStorageUsedBytes(),
  ]);
  [totalB, totalP, totalS, totalF, pending].forEach((result) => throwIfSupabaseError(result.error));
  res.json({
    totalBookings: totalB.count ?? 0,
    totalPosts: totalP.count ?? 0,
    totalServices: totalS.count ?? 0,
    totalFeedback: totalF.count ?? 0,
    pendingBookings: pending.count ?? 0,
    storageUsedBytes,
    storageLimitBytes: STORAGE_LIMIT_BYTES,
    storageUsagePercent: Number(((storageUsedBytes / STORAGE_LIMIT_BYTES) * 100).toFixed(4)),
  });
});

router.get("/dashboard/bookings-by-day", requireAdmin, async (_req, res) => {
  const since = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString();
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at")
    .gte("created_at", since)
    .order("created_at");
  throwIfSupabaseError(error);
  const counts = new Map<string, number>();
  for (const row of data ?? []) {
    const day = String(row.created_at).slice(0, 10);
    counts.set(day, (counts.get(day) ?? 0) + 1);
  }
  res.json([...counts.entries()].map(([day, count]) => ({ day, count })));
});

export default router;
