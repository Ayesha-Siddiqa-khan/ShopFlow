import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const isRealSupabase =
    supabaseUrl &&
    !supabaseUrl.includes("dummy.supabase.co") &&
    !supabaseUrl.includes("your-project-id");

  // Check local auth session cookie
  const localUserCookie = request.cookies.get("shopflow_user")?.value;
  let localUser: { email?: string; role?: string; name?: string } | null = null;
  if (localUserCookie) {
    try {
      localUser = JSON.parse(decodeURIComponent(localUserCookie));
    } catch {
      localUser = { email: localUserCookie };
    }
  }

  let user = null;

  if (isRealSupabase) {
    try {
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
      const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
            supabaseResponse = NextResponse.next({
              request,
            });
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            );
          },
        },
      });

      const { data } = await supabase.auth.getUser();
      user = data.user;
    } catch {
      user = null;
    }
  }

  const pathname = request.nextUrl.pathname;
  const isAuthenticated = Boolean(user || localUser);

  // Protect account routes
  if (pathname.startsWith("/account") && !isAuthenticated) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirectedFrom", pathname);
    return NextResponse.redirect(url);
  }

  // Protect admin routes
  if (pathname.startsWith("/admin")) {
    if (!isAuthenticated) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("redirectedFrom", pathname);
      return NextResponse.redirect(url);
    }

    const isAdmin =
      localUser?.role === "admin" ||
      localUser?.email?.toLowerCase().includes("admin") ||
      user?.email?.toLowerCase().includes("admin");

    if (!isAdmin && !isRealSupabase) {
      // In demo mode without Supabase, allow access or redirect
    }
  }

  return supabaseResponse;
}
