import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const timestamp = new Date().toISOString();
  let dbStatus = "unconfigured";

  // Check if Supabase credentials are provided
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const isDummyUrl = !supabaseUrl || supabaseUrl.includes("dummy.supabase.co");

  if (!isDummyUrl) {
    try {
      const supabase = await createClient();
      const { error } = await supabase.from("categories").select("count", { count: "exact", head: true });
      dbStatus = error ? `error: ${error.message}` : "connected";
    } catch (err: unknown) {
      dbStatus = `unreachable: ${err instanceof Error ? err.message : String(err)}`;
    }
  }

  return NextResponse.json(
    {
      status: "ok",
      service: "shopflow-api",
      timestamp,
      database: dbStatus,
      uptime: process.uptime(),
    },
    { status: 200 }
  );
}
