import type { Request, Response, NextFunction } from "express";

const ADMIN_COOKIE = "nkht_admin";

export function setAdminCookie(res: Response, email: string): void {
  res.cookie(ADMIN_COOKIE, Buffer.from(email).toString("base64"), {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 24 * 7,
    path: "/",
  });
}

export function clearAdminCookie(res: Response): void {
  res.clearCookie(ADMIN_COOKIE, { path: "/" });
}

export function getAdminEmail(req: Request): string | null {
  const raw = req.cookies?.[ADMIN_COOKIE];
  if (!raw || typeof raw !== "string") return null;
  try {
    return Buffer.from(raw, "base64").toString("utf-8");
  } catch {
    return null;
  }
}

export function requireAdmin(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (!getAdminEmail(req)) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
}
