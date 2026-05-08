import { Router, type IRouter } from "express";
import { AdminLoginBody } from "@workspace/api-zod";
import { setAdminCookie, clearAdminCookie, getAdminEmail } from "../lib/auth";
import { supabase, throwIfSupabaseError, toCamelObject } from "../lib/supabase";

const router: IRouter = Router();
const FALLBACK_ADMIN_EMAIL = "butphamarketing@gmail.com";
const FALLBACK_ADMIN_PASSWORD = "nhakhoauyduc";

router.post("/auth/login", async (req, res) => {
  const parsed = AdminLoginBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid body" });
    return;
  }
  const { email, password } = parsed.data;
  if (email === FALLBACK_ADMIN_EMAIL && password === FALLBACK_ADMIN_PASSWORD) {
    setAdminCookie(res, FALLBACK_ADMIN_EMAIL);
    res.json({ authenticated: true, email: FALLBACK_ADMIN_EMAIL });
    return;
  }
  const { data, error } = await supabase
    .from("admins")
    .select("*")
    .eq("email", email)
    .maybeSingle();
  throwIfSupabaseError(error);
  const admin = data ? toCamelObject<{ email: string; password: string }>(data) : null;
  if (!admin || admin.password !== password) {
    res.status(401).json({ authenticated: false, email: null });
    return;
  }
  setAdminCookie(res, admin.email);
  res.json({ authenticated: true, email: admin.email });
});

router.post("/auth/logout", (_req, res) => {
  clearAdminCookie(res);
  res.json({ ok: true });
});

router.get("/auth/me", (req, res) => {
  const email = getAdminEmail(req);
  if (!email) {
    res.json({ authenticated: false, email: null });
    return;
  }
  res.json({ authenticated: true, email });
});

export default router;
