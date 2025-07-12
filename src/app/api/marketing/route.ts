import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  const { data, error } = await supabase.from("marketing").select("*");

  if (error) {
    return NextResponse.json(
      {
        message: "Gagal mengambil data",
        error: error.message,
        data: null,
        success: false,
      },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { message: "Berhasil mengambil data", data: data, success: true },
    { status: 200 }
  );
}
