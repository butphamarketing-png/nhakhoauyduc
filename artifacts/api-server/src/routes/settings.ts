import { Router, type IRouter } from "express";
import { UpdateSettingsBody } from "@workspace/api-zod";
import { requireAdmin } from "../lib/auth";
import { supabase, throwIfSupabaseError, toCamelObject, toSnakeObject } from "../lib/supabase";

const router: IRouter = Router();

async function ensureSettings() {
  const { data, error } = await supabase.from("settings").select("*").limit(1).maybeSingle();
  throwIfSupabaseError(error);
  if (data) return toCamelObject(data);

  const inserted = await supabase.from("settings").insert({}).select("*").single();
  throwIfSupabaseError(inserted.error);
  return toCamelObject(inserted.data);
}

router.get("/settings", async (_req, res) => {
  const row = await ensureSettings();
  res.json(row);
});

router.put("/settings", requireAdmin, async (req, res) => {
  const parsed = UpdateSettingsBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid" });
    return;
  }
  const existing = await ensureSettings();
  const { data, error } = await supabase
    .from("settings")
    .update(toSnakeObject(parsed.data))
    .eq("id", existing.id)
    .select("*")
    .single();
  throwIfSupabaseError(error);
  res.json(toCamelObject(data));
});

export default router;
