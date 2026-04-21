import { Router, type IRouter } from "express";
import { db, settings } from "@workspace/db";
import { eq } from "drizzle-orm";
import { UpdateSettingsBody } from "@workspace/api-zod";
import { requireAdmin } from "../lib/auth";

const router: IRouter = Router();

async function ensureSettings() {
  const [row] = await db.select().from(settings).limit(1);
  if (row) return row;
  const [created] = await db.insert(settings).values({}).returning();
  return created;
}

router.get("/settings", async (_req, res) => {
  const row = await ensureSettings();
  res.json(row);
});

router.put("/settings", requireAdmin, async (req, res) => {
  const parsed = UpdateSettingsBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid" });
    return;
  }
  const existing = await ensureSettings();
  const [row] = await db
    .update(settings)
    .set(parsed.data)
    .where(eq(settings.id, existing.id))
    .returning();
  res.json(row);
});

export default router;
