import { Router, type IRouter } from "express";
import { db, promotions } from "@workspace/db";
import { asc, eq } from "drizzle-orm";
import { CreatePromotionBody, UpdatePromotionBody } from "@workspace/api-zod";
import { requireAdmin } from "../lib/auth";

const router: IRouter = Router();

router.get("/promotions", async (_req, res) => {
  const rows = await db.select().from(promotions).orderBy(asc(promotions.id));
  res.json(rows);
});

router.post("/promotions", requireAdmin, async (req, res) => {
  const parsed = CreatePromotionBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid" });
    return;
  }
  const [row] = await db.insert(promotions).values(parsed.data).returning();
  res.status(201).json(row);
});

router.put("/promotions/:id", requireAdmin, async (req, res) => {
  const id = Number(req.params.id);
  const parsed = UpdatePromotionBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid" });
    return;
  }
  const [row] = await db
    .update(promotions)
    .set(parsed.data)
    .where(eq(promotions.id, id))
    .returning();
  res.json(row);
});

router.delete("/promotions/:id", requireAdmin, async (req, res) => {
  const id = Number(req.params.id);
  await db.delete(promotions).where(eq(promotions.id, id));
  res.json({ ok: true });
});

export default router;
