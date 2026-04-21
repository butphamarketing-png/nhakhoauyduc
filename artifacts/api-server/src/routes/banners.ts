import { Router, type IRouter } from "express";
import { db, banners } from "@workspace/db";
import { asc, eq } from "drizzle-orm";
import { CreateBannerBody, UpdateBannerBody } from "@workspace/api-zod";
import { requireAdmin } from "../lib/auth";

const router: IRouter = Router();

router.get("/banners", async (_req, res) => {
  const rows = await db.select().from(banners).orderBy(asc(banners.sortOrder));
  res.json(rows);
});

router.post("/banners", requireAdmin, async (req, res) => {
  const parsed = CreateBannerBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid" });
    return;
  }
  const [row] = await db.insert(banners).values(parsed.data).returning();
  res.status(201).json(row);
});

router.put("/banners/:id", requireAdmin, async (req, res) => {
  const id = Number(req.params.id);
  const parsed = UpdateBannerBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid" });
    return;
  }
  const [row] = await db
    .update(banners)
    .set(parsed.data)
    .where(eq(banners.id, id))
    .returning();
  res.json(row);
});

router.delete("/banners/:id", requireAdmin, async (req, res) => {
  const id = Number(req.params.id);
  await db.delete(banners).where(eq(banners.id, id));
  res.json({ ok: true });
});

export default router;
