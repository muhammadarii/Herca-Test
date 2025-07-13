export async function fetchPembayaran() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/pembayaran/status`
  );
  const data = await res.json();
  return data;
}

export async function fetchAllPembayaran() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pembayaran`);
  const data = await res.json();
  return data;
}

export async function fetchPembayaranById(penjualan_id: string | null) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/pembayaran/${penjualan_id}`
  );
  const data = await res.json();
  return data;
}

// export async function createPembayaran(pembayaran: Pembayaran) {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pembayaran`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(pembayaran),
//   });
//   const data = await res.json();
//   return data;
// }
