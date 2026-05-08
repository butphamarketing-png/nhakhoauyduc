import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_SECRET_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required");
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

function camelToSnake(key: string): string {
  return key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

function snakeToCamel(key: string): string {
  return key.replace(/_([a-z])/g, (_, letter: string) => letter.toUpperCase());
}

export function toSnakeObject<T extends Record<string, unknown>>(value: T): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(value).map(([key, entry]) => [camelToSnake(key), entry]),
  );
}

export function toCamelObject<T = Record<string, unknown>>(value: Record<string, unknown>): T {
  return Object.fromEntries(
    Object.entries(value).map(([key, entry]) => [snakeToCamel(key), entry]),
  ) as T;
}

export function toCamelArray<T = Record<string, unknown>>(values: Record<string, unknown>[]): T[] {
  return values.map((value) => toCamelObject<T>(value));
}

export function throwIfSupabaseError(error: unknown): void {
  if (error) throw error;
}
