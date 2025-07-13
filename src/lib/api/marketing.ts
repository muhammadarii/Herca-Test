export async function fetchMarketing() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/marketing`);
  const data = await res.json();
  return data;
}
