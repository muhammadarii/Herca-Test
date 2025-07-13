import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  const { data, error } = await supabase.from("pembayaran").select("*");
  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
  return NextResponse.json(data, { status: 200 });
}

export async function POST(req: Request) {
  const body = await req.json();
  const { penjualan_id, amount, description } = body;

  if (!penjualan_id || !amount) {
    return NextResponse.json(
      { message: "penjualan_id dan jumlah wajib diisi" },
      { status: 400 }
    );
  }

  const { data: penjualan, error: penjualanError } = await supabase
    .from("penjualan")
    .select("id, grand_total")
    .eq("id", penjualan_id)
    .single();

  if (penjualanError || !penjualan) {
    return NextResponse.json(
      { message: "Penjualan tidak ditemukan" },
      { status: 404 }
    );
  }

  const { data: pembayaranList, error: pembayaranError } = await supabase
    .from("pembayaran")
    .select("amount")
    .eq("penjualan_id", penjualan_id);

  if (pembayaranError) {
    return NextResponse.json(
      { message: "Gagal mengambil data pembayaran sebelumnya" },
      { status: 500 }
    );
  }

  const totalSudahBayar = pembayaranList.reduce(
    (acc, bayar) => acc + bayar.amount,
    0
  );

  const sisaTagihan = penjualan.grand_total - totalSudahBayar;

  if (amount > sisaTagihan) {
    return NextResponse.json(
      {
        message: `Jumlah pembayaran melebihi sisa tagihan. Sisa saat ini: ${sisaTagihan}`,
      },
      { status: 400 }
    );
  }

  const { data: pembayaranBaru, error: insertError } = await supabase
    .from("pembayaran")
    .insert([
      {
        penjualan_id,
        amount,
        description,
      },
    ])
    .select()
    .single();

  if (insertError) {
    return NextResponse.json(
      { message: "Gagal menyimpan pembayaran", error: insertError.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    message: "Pembayaran berhasil disimpan",
    data: pembayaranBaru,
  });
}
