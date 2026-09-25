import { createClient } from "@/lib/supabase/server";
import { Product, Category, Order } from "@/types";
import { SAMPLE_PRODUCTS, SAMPLE_CATEGORIES } from "@/lib/sample-data";

export async function getCategories(): Promise<Category[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl || supabaseUrl.includes("dummy.supabase.co")) {
    return SAMPLE_CATEGORIES;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("name", { ascending: true });

    if (error || !data || data.length === 0) {
      return SAMPLE_CATEGORIES;
    }
    return data as Category[];
  } catch {
    return SAMPLE_CATEGORIES;
  }
}

export async function getProducts(options?: {
  categoryId?: string;
  search?: string;
  sortBy?: string;
}): Promise<Product[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl || supabaseUrl.includes("dummy.supabase.co")) {
    let list = [...SAMPLE_PRODUCTS];
    if (options?.categoryId) {
      list = list.filter((p) => p.category_id === options.categoryId);
    }
    if (options?.search) {
      const q = options.search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.description && p.description.toLowerCase().includes(q))
      );
    }
    if (options?.sortBy === "price-low") {
      list.sort((a, b) => a.price - b.price);
    } else if (options?.sortBy === "price-high") {
      list.sort((a, b) => b.price - a.price);
    } else if (options?.sortBy === "name") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }
    return list;
  }

  try {
    const supabase = await createClient();
    let query = supabase
      .from("products")
      .select("*, category:categories(*)")
      .eq("is_active", true);

    if (options?.categoryId) {
      query = query.eq("category_id", options.categoryId);
    }
    if (options?.search) {
      query = query.ilike("name", `%${options.search}%`);
    }

    if (options?.sortBy === "price-low") {
      query = query.order("price", { ascending: true });
    } else if (options?.sortBy === "price-high") {
      query = query.order("price", { ascending: false });
    } else {
      query = query.order("created_at", { ascending: false });
    }

    const { data, error } = await query;
    if (error || !data || data.length === 0) {
      return SAMPLE_PRODUCTS;
    }
    return data as Product[];
  } catch {
    return SAMPLE_PRODUCTS;
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl || supabaseUrl.includes("dummy.supabase.co")) {
    return SAMPLE_PRODUCTS.find((p) => p.slug === slug || p.id === slug) || null;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("products")
      .select("*, category:categories(*)")
      .or(`slug.eq.${slug},id.eq.${slug}`)
      .single();

    if (error || !data) {
      return SAMPLE_PRODUCTS.find((p) => p.slug === slug || p.id === slug) || null;
    }
    return data as Product;
  } catch {
    return SAMPLE_PRODUCTS.find((p) => p.slug === slug || p.id === slug) || null;
  }
}

export async function getUserOrders(userId: string): Promise<Order[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("orders")
      .select("*, order_items(*)")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error || !data) return [];
    return data as Order[];
  } catch {
    return [];
  }
}
