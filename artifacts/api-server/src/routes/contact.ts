import { Router, type IRouter } from "express";
import { db, bookings } from "@workspace/db";
import { CreateContactBody } from "@workspace/api-zod";

const router: IRouter = Router();

router.post("/contact", async (req, res) => {
  const parsed = CreateContactBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid" });
    return;
  }
  await db.insert(bookings).values({
    name: parsed.data.name,
    phone: parsed.data.phone,
    service: "Tư vấn nhanh",
  });
  res.status(201).json({ ok: true });
});

export default router;
