import { Penjualan } from "@/types";

export async function fetchPenjualan() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/penjualan`);
  const data = await res.json();
  return data;
}

export async function createPenjualan(penjualan: Penjualan) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/penjualan`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(penjualan),
  });
  const data = await res.json();
  return data;
}
