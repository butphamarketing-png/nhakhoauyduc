import { Router, type IRouter } from "express";
import { CreatePromotionBody, UpdatePromotionBody } from "@workspace/api-zod";
import { requireAdmin } from "../lib/auth";
import { supabase, throwIfSupabaseError, toCamelArray, toCamelObject, toSnakeObject } from "../lib/supabase";

const router: IRouter = Router();

router.get("/promotions", async (_req, res) => {
  const { data, error } = await supabase.from("promotions").select("*").order("id");
  throwIfSupabaseError(error);
  res.json(toCamelArray(data ?? []));
});

router.post("/promotions", requireAdmin, async (req, res) => {
  const parsed = CreatePromotionBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid" });
    return;
  }
  const { data, error } = await supabase.from("promotions").insert(toSnakeObject(parsed.data)).select("*").single();
  throwIfSupabaseError(error);
  res.status(201).json(toCamelObject(data));
});

router.put("/promotions/:id", requireAdmin, async (req, res) => {
  const id = Number(req.params.id);
  const parsed = UpdatePromotionBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid" });
    return;
  }
  const { data, error } = await supabase
    .from("promotions")
    .update(toSnakeObject(parsed.data))
    .eq("id", id)
    .select("*")
    .single();
  throwIfSupabaseError(error);
  res.json(toCamelObject(data));
});

router.delete("/promotions/:id", requireAdmin, async (req, res) => {
  const id = Number(req.params.id);
  const { error } = await supabase.from("promotions").delete().eq("id", id);
  throwIfSupabaseError(error);
  res.json({ ok: true });
});

export default router;
