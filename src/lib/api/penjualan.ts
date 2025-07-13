export async function fetchPenjualan() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/penjualan`);
  const data = await res.json();
  return data;
}
