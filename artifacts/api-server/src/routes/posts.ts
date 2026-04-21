import { Router, type IRouter } from "express";
import { db, posts } from "@workspace/db";
import { desc, eq, ilike, or } from "drizzle-orm";
import { CreatePostBody, UpdatePostBody } from "@workspace/api-zod";
import { requireAdmin } from "../lib/auth";

const router: IRouter = Router();

router.get("/posts", async (req, res) => {
  const q = typeof req.query.q === "string" ? req.query.q : "";
  if (q) {
    const rows = await db
      .select()
      .from(posts)
      .where(or(ilike(posts.title, `%${q}%`), ilike(posts.excerpt, `%${q}%`)))
      .orderBy(desc(posts.createdAt));
    res.json(rows);
    return;
  }
  const rows = await db.select().from(posts).orderBy(desc(posts.createdAt));
  res.json(rows);
});

router.get("/posts/:id", async (req, res) => {
  const id = Number(req.params.id);
  const [row] = await db.select().from(posts).where(eq(posts.id, id)).limit(1);
  if (!row) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.json(row);
});

router.post("/posts", requireAdmin, async (req, res) => {
  const parsed = CreatePostBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid" });
    return;
  }
  const [row] = await db.insert(posts).values(parsed.data).returning();
  res.status(201).json(row);
});

router.put("/posts/:id", requireAdmin, async (req, res) => {
  const id = Number(req.params.id);
  const parsed = UpdatePostBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid" });
    return;
  }
  const [row] = await db
    .update(posts)
    .set(parsed.data)
    .where(eq(posts.id, id))
    .returning();
  res.json(row);
});

router.delete("/posts/:id", requireAdmin, async (req, res) => {
  const id = Number(req.params.id);
  await db.delete(posts).where(eq(posts.id, id));
  res.json({ ok: true });
});

export default router;
