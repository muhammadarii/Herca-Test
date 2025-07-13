import { formattedMonth } from "@/helper/formattedDate";
import { getKomisiPersen } from "@/helper/komisi";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

type PenjualanRecord = {
  grand_total: number;
  date: string;
  marketing: { name: string } | { name: string }[] | null;
};

export async function GET() {
  const { data, error } = await supabase
    .from("penjualan")
    .select("grand_total, date, marketing(name)");

  if (error || !data) {
    return NextResponse.json(
      { message: "Gagal mengambil data", error: error?.message },
      { status: 500 }
    );
  }

  const penjualanData = data as PenjualanRecord[];

  const grouped = new Map<
    string,
    { marketing: string; bulan: string; omzet: number }
  >();

  for (const trx of penjualanData) {
    const name = Array.isArray(trx.marketing)
      ? trx.marketing[0]?.name
      : trx.marketing?.name;

    const bulan = formattedMonth(trx.date);

    if (!name || !bulan || !trx.grand_total) continue;

    const key = `${name}-${bulan}`;

    if (!grouped.has(key)) {
      grouped.set(key, { marketing: name, bulan, omzet: 0 });
    }

    grouped.get(key)!.omzet += trx.grand_total;
  }

  const result = Array.from(grouped.values()).map((item) => {
    const persen = getKomisiPersen(item.omzet);
    const nominal = Math.round(item.omzet * (persen / 100));
    return {
      marketing: item.marketing,
      bulan: item.bulan,
      omzet: item.omzet,
      komisiPersen: `${persen}%`,
      komisiNominal: nominal,
    };
  });

  return NextResponse.json(
    {
      message: "Berhasil menghitung komisi",
      data: result,
      success: true,
    },
    {
      status: 200,
    }
  );
}
