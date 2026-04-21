import { Router, type IRouter } from "express";
import { db, feedback } from "@workspace/db";
import { asc, eq } from "drizzle-orm";
import { CreateFeedbackBody, UpdateFeedbackBody } from "@workspace/api-zod";
import { requireAdmin } from "../lib/auth";

const router: IRouter = Router();

router.get("/feedback", async (req, res) => {
  const approvedParam = req.query.approved;
  const rows = await db.select().from(feedback).orderBy(asc(feedback.id));
  if (approvedParam === "true") {
    res.json(rows.filter((r) => r.approved));
    return;
  }
  if (approvedParam === "false") {
    res.json(rows.filter((r) => !r.approved));
    return;
  }
  res.json(rows);
});

router.post("/feedback", async (req, res) => {
  const parsed = CreateFeedbackBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid" });
    return;
  }
  const [row] = await db.insert(feedback).values(parsed.data).returning();
  res.status(201).json(row);
});

router.put("/feedback/:id", requireAdmin, async (req, res) => {
  const id = Number(req.params.id);
  const parsed = UpdateFeedbackBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid" });
    return;
  }
  const [row] = await db
    .update(feedback)
    .set(parsed.data)
    .where(eq(feedback.id, id))
    .returning();
  res.json(row);
});

router.delete("/feedback/:id", requireAdmin, async (req, res) => {
  const id = Number(req.params.id);
  await db.delete(feedback).where(eq(feedback.id, id));
  res.json({ ok: true });
});

export default router;
