import { supabase } from "@/lib/supabase";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const pathnameParts = url.pathname.split("/");
  const penjualan_id = pathnameParts[pathnameParts.length - 1];

  if (!penjualan_id || penjualan_id === "undefined") {
    return NextResponse.json(
      { message: "penjualan_id tidak valid" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("pembayaran")
    .select("*")
    .eq("penjualan_id", penjualan_id);

  if (error) {
    return NextResponse.json(
      { message: "Gagal mengambil data pembayaran", error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    message: "Berhasil mengambil data pembayaran",
    data,
  });
}
