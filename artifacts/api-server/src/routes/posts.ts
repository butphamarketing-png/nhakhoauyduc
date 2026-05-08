import { Router, type IRouter } from "express";
import { CreatePostBody, UpdatePostBody } from "@workspace/api-zod";
import { requireAdmin } from "../lib/auth";
import { supabase, throwIfSupabaseError, toCamelArray, toCamelObject, toSnakeObject } from "../lib/supabase";

const router: IRouter = Router();

router.get("/posts", async (req, res) => {
  const q = typeof req.query.q === "string" ? req.query.q : "";
  let query = supabase.from("posts").select("*").order("created_at", { ascending: false });
  if (q) {
    query = query.or(`title.ilike.%${q}%,excerpt.ilike.%${q}%`);
  }
  const { data, error } = await query;
  throwIfSupabaseError(error);
  res.json(toCamelArray(data ?? []));
});

router.get("/posts/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { data, error } = await supabase.from("posts").select("*").eq("id", id).maybeSingle();
  throwIfSupabaseError(error);
  const row = data ? toCamelObject(data) : null;
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
  const { data, error } = await supabase.from("posts").insert(toSnakeObject(parsed.data)).select("*").single();
  throwIfSupabaseError(error);
  res.status(201).json(toCamelObject(data));
});

router.put("/posts/:id", requireAdmin, async (req, res) => {
  const id = Number(req.params.id);
  const parsed = UpdatePostBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid" });
    return;
  }
  const { data, error } = await supabase
    .from("posts")
    .update(toSnakeObject(parsed.data))
    .eq("id", id)
    .select("*")
    .single();
  throwIfSupabaseError(error);
  res.json(toCamelObject(data));
});

router.delete("/posts/:id", requireAdmin, async (req, res) => {
  const id = Number(req.params.id);
  const { error } = await supabase.from("posts").delete().eq("id", id);
  throwIfSupabaseError(error);
  res.json({ ok: true });
});

export default router;
