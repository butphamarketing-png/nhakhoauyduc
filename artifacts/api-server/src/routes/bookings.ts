import { Router, type IRouter } from "express";
import { db, bookings } from "@workspace/db";
import { desc, eq, ilike, or, and, type SQL } from "drizzle-orm";
import { CreateBookingBody, UpdateBookingBody } from "@workspace/api-zod";
import { requireAdmin } from "../lib/auth";

const router: IRouter = Router();

router.get("/bookings", requireAdmin, async (req, res) => {
  const status = typeof req.query.status === "string" ? req.query.status : "";
  const q = typeof req.query.q === "string" ? req.query.q : "";
  const conditions: SQL[] = [];
  if (status) conditions.push(eq(bookings.status, status));
  if (q) {
    const orCond = or(
      ilike(bookings.name, `%${q}%`),
      ilike(bookings.phone, `%${q}%`),
    );
    if (orCond) conditions.push(orCond);
  }
  const rows = conditions.length
    ? await db
        .select()
        .from(bookings)
        .where(and(...conditions))
        .orderBy(desc(bookings.createdAt))
    : await db.select().from(bookings).orderBy(desc(bookings.createdAt));
  res.json(rows);
});

router.post("/bookings", async (req, res) => {
  const parsed = CreateBookingBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid" });
    return;
  }
  const [row] = await db.insert(bookings).values(parsed.data).returning();
  res.status(201).json(row);
});

router.put("/bookings/:id", requireAdmin, async (req, res) => {
  const id = Number(req.params.id);
  const parsed = UpdateBookingBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid" });
    return;
  }
  const [row] = await db
    .update(bookings)
    .set(parsed.data)
    .where(eq(bookings.id, id))
    .returning();
  res.json(row);
});

router.delete("/bookings/:id", requireAdmin, async (req, res) => {
  const id = Number(req.params.id);
  await db.delete(bookings).where(eq(bookings.id, id));
  res.json({ ok: true });
});

export default router;
