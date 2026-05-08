import { Router, type IRouter } from "express";
import { CreateBookingBody, UpdateBookingBody } from "@workspace/api-zod";
import { requireAdmin } from "../lib/auth";
import { supabase, throwIfSupabaseError, toCamelArray, toCamelObject, toSnakeObject } from "../lib/supabase";

const router: IRouter = Router();

router.get("/bookings", requireAdmin, async (req, res) => {
  const status = typeof req.query.status === "string" ? req.query.status : "";
  const q = typeof req.query.q === "string" ? req.query.q : "";
  let query = supabase.from("bookings").select("*").order("created_at", { ascending: false });
  if (status) query = query.eq("status", status);
  if (q) {
    query = query.or(`name.ilike.%${q}%,phone.ilike.%${q}%`);
  }
  const { data, error } = await query;
  throwIfSupabaseError(error);
  res.json(toCamelArray(data ?? []));
});

router.post("/bookings", async (req, res) => {
  const parsed = CreateBookingBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid" });
    return;
  }
  const { data, error } = await supabase.from("bookings").insert(toSnakeObject(parsed.data)).select("*").single();
  throwIfSupabaseError(error);
  res.status(201).json(toCamelObject(data));
});

router.put("/bookings/:id", requireAdmin, async (req, res) => {
  const id = Number(req.params.id);
  const parsed = UpdateBookingBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid" });
    return;
  }
  const { data, error } = await supabase
    .from("bookings")
    .update(toSnakeObject(parsed.data))
    .eq("id", id)
    .select("*")
    .single();
  throwIfSupabaseError(error);
  res.json(toCamelObject(data));
});

router.delete("/bookings/:id", requireAdmin, async (req, res) => {
  const id = Number(req.params.id);
  const { error } = await supabase.from("bookings").delete().eq("id", id);
  throwIfSupabaseError(error);
  res.json({ ok: true });
});

export default router;
