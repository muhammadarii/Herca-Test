export async function fetchKomisi() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/komisi`);
  const data = await res.json();
  return data;
}
