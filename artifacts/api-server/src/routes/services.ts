import { Router, type IRouter } from "express";
import { db, services } from "@workspace/db";
import { asc, eq } from "drizzle-orm";
import { CreateServiceBody, UpdateServiceBody } from "@workspace/api-zod";
import { requireAdmin } from "../lib/auth";

const router: IRouter = Router();

router.get("/services", async (_req, res) => {
  const rows = await db.select().from(services).orderBy(asc(services.id));
  res.json(rows);
});

router.post("/services", requireAdmin, async (req, res) => {
  const parsed = CreateServiceBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid" });
    return;
  }
  const [row] = await db.insert(services).values(parsed.data).returning();
  res.status(201).json(row);
});

router.put("/services/:id", requireAdmin, async (req, res) => {
  const id = Number(req.params.id);
  const parsed = UpdateServiceBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid" });
    return;
  }
  const [row] = await db
    .update(services)
    .set(parsed.data)
    .where(eq(services.id, id))
    .returning();
  res.json(row);
});

router.delete("/services/:id", requireAdmin, async (req, res) => {
  const id = Number(req.params.id);
  await db.delete(services).where(eq(services.id, id));
  res.json({ ok: true });
});

export default router;
