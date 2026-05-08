import { Router, type IRouter } from "express";
import { CreateFeedbackBody, UpdateFeedbackBody } from "@workspace/api-zod";
import { requireAdmin } from "../lib/auth";
import { supabase, throwIfSupabaseError, toCamelArray, toCamelObject, toSnakeObject } from "../lib/supabase";

const router: IRouter = Router();

router.get("/feedback", async (req, res) => {
  const approvedParam = req.query.approved;
  const { data, error } = await supabase.from("feedback").select("*").order("id");
  throwIfSupabaseError(error);
  const rows = toCamelArray<{ approved?: boolean } & Record<string, unknown>>(data ?? []);
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
  const { data, error } = await supabase.from("feedback").insert(toSnakeObject(parsed.data)).select("*").single();
  throwIfSupabaseError(error);
  res.status(201).json(toCamelObject(data));
});

router.put("/feedback/:id", requireAdmin, async (req, res) => {
  const id = Number(req.params.id);
  const parsed = UpdateFeedbackBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid" });
    return;
  }
  const { data, error } = await supabase
    .from("feedback")
    .update(toSnakeObject(parsed.data))
    .eq("id", id)
    .select("*")
    .single();
  throwIfSupabaseError(error);
  res.json(toCamelObject(data));
});

router.delete("/feedback/:id", requireAdmin, async (req, res) => {
  const id = Number(req.params.id);
  const { error } = await supabase.from("feedback").delete().eq("id", id);
  throwIfSupabaseError(error);
  res.json({ ok: true });
});

export default router;
