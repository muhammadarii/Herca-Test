import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const { data, error } = await supabase
    .from("penjualan")
    .select("*,marketing(*)");

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
    {
      message: "Berhasil mengambil data",
      data: data,
      success: true,
    },
    { status: 200 }
  );
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { transaction_number, marketing_id, date, cargo_fee, total_balance } =
    body;

  const grand_total = Number(cargo_fee) + Number(total_balance);

  const { data, error } = await supabase
    .from("penjualan")
    .insert([
      {
        transaction_number,
        marketing_id,
        date,
        cargo_fee,
        total_balance,
        grand_total,
      },
    ])
    .select()
    .single();

  if (error) {
    return NextResponse.json({
      message: "Penjualan gagal ditambahkan",
      error: error.message,
      data: null,
      success: false,
    });
  }

  return NextResponse.json(
    {
      message: "Penjualan berhasil ditambahkan",
      data: data,
      success: true,
    },
    { status: 201 }
  );
}
