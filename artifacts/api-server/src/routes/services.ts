import { Router, type IRouter } from "express";
import { CreateServiceBody, UpdateServiceBody } from "@workspace/api-zod";
import { requireAdmin } from "../lib/auth";
import { supabase, throwIfSupabaseError, toCamelArray, toCamelObject, toSnakeObject } from "../lib/supabase";

const router: IRouter = Router();

router.get("/services", async (_req, res) => {
  const { data, error } = await supabase.from("services").select("*").order("id");
  throwIfSupabaseError(error);
  res.json(toCamelArray(data ?? []));
});

router.post("/services", requireAdmin, async (req, res) => {
  const parsed = CreateServiceBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid" });
    return;
  }
  const { data, error } = await supabase.from("services").insert(toSnakeObject(parsed.data)).select("*").single();
  throwIfSupabaseError(error);
  res.status(201).json(toCamelObject(data));
});

router.put("/services/:id", requireAdmin, async (req, res) => {
  const id = Number(req.params.id);
  const parsed = UpdateServiceBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid" });
    return;
  }
  const { data, error } = await supabase
    .from("services")
    .update(toSnakeObject(parsed.data))
    .eq("id", id)
    .select("*")
    .single();
  throwIfSupabaseError(error);
  res.json(toCamelObject(data));
});

router.delete("/services/:id", requireAdmin, async (req, res) => {
  const id = Number(req.params.id);
  const { error } = await supabase.from("services").delete().eq("id", id);
  throwIfSupabaseError(error);
  res.json({ ok: true });
});

export default router;
