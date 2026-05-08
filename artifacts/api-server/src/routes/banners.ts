import { Router, type IRouter } from "express";
import { CreateBannerBody, UpdateBannerBody } from "@workspace/api-zod";
import { requireAdmin } from "../lib/auth";
import { supabase, throwIfSupabaseError, toCamelArray, toCamelObject, toSnakeObject } from "../lib/supabase";

const router: IRouter = Router();

router.get("/banners", async (_req, res) => {
  const { data, error } = await supabase.from("banners").select("*").order("sort_order");
  throwIfSupabaseError(error);
  res.json(toCamelArray(data ?? []));
});

router.post("/banners", requireAdmin, async (req, res) => {
  const parsed = CreateBannerBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid" });
    return;
  }
  const { data, error } = await supabase.from("banners").insert(toSnakeObject(parsed.data)).select("*").single();
  throwIfSupabaseError(error);
  res.status(201).json(toCamelObject(data));
});

router.put("/banners/:id", requireAdmin, async (req, res) => {
  const id = Number(req.params.id);
  const parsed = UpdateBannerBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid" });
    return;
  }
  const { data, error } = await supabase
    .from("banners")
    .update(toSnakeObject(parsed.data))
    .eq("id", id)
    .select("*")
    .single();
  throwIfSupabaseError(error);
  res.json(toCamelObject(data));
});

router.delete("/banners/:id", requireAdmin, async (req, res) => {
  const id = Number(req.params.id);
  const { error } = await supabase.from("banners").delete().eq("id", id);
  throwIfSupabaseError(error);
  res.json({ ok: true });
});

export default router;
