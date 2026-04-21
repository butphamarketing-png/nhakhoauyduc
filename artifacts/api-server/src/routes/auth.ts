import { Router, type IRouter } from "express";
import { db, admins } from "@workspace/db";
import { eq } from "drizzle-orm";
import { AdminLoginBody } from "@workspace/api-zod";
import { setAdminCookie, clearAdminCookie, getAdminEmail } from "../lib/auth";

const router: IRouter = Router();

router.post("/auth/login", async (req, res) => {
  const parsed = AdminLoginBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid body" });
    return;
  }
  const { email, password } = parsed.data;
  const [admin] = await db
    .select()
    .from(admins)
    .where(eq(admins.email, email))
    .limit(1);
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
