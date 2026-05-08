import { Router, type IRouter } from "express";
import { CreateContactBody } from "@workspace/api-zod";
import { supabase, throwIfSupabaseError } from "../lib/supabase";

const router: IRouter = Router();

router.post("/contact", async (req, res) => {
  const parsed = CreateContactBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid" });
    return;
  }
  const { error } = await supabase.from("bookings").insert({
    name: parsed.data.name,
    phone: parsed.data.phone,
    service: "Tư vấn nhanh",
  });
  throwIfSupabaseError(error);
  res.status(201).json({ ok: true });
});

export default router;
