import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  const { data: penjualanList, error: penjualanError } = await supabase
    .from("penjualan")
    .select("id, grand_total");

  if (penjualanError) {
    return NextResponse.json(
      {
        message: "Gagal mengambil data penjualan",
        error: penjualanError.message,
      },
      { status: 500 }
    );
  }

  const { data: pembayaranList, error: pembayaranError } = await supabase
    .from("pembayaran")
    .select("penjualan_id, amount");

  if (pembayaranError) {
    return NextResponse.json(
      {
        message: "Gagal mengambil data pembayaran",
        error: pembayaranError.message,
      },
      { status: 500 }
    );
  }

  const grouped: Record<string, { total: number; dibayar: number }> = {};

  for (const penjualan of penjualanList) {
    grouped[penjualan.id] = {
      total: penjualan.grand_total,
      dibayar: 0,
    };
  }

  for (const pembayaran of pembayaranList) {
    if (grouped[pembayaran.penjualan_id]) {
      grouped[pembayaran.penjualan_id].dibayar += pembayaran.amount;
    }
  }

  const result = Object.entries(grouped).map(([id, { total, dibayar }]) => {
    const sisa = total - dibayar;
    const status = sisa <= 0 ? "Lunas" : "Cicilan";

    return {
      penjualan_id: id,
      total_transactions: total,
      total_payment: dibayar,
      remaining_bill: sisa,
      status,
    };
  });

  return NextResponse.json({
    message: "Berhasil mengambil status pembayaran",
    data: result,
  });
}
