import { fetchPembayaran, fetchPembayaranById } from "@/lib/api/pembayaran";
import { useQuery } from "@tanstack/react-query";

export const useGetPembayaran = () => {
  return useQuery({
    queryKey: ["pembayaran"],
    queryFn: fetchPembayaran,
  });
};

export const useGetPembayaranByPenjualanId = (id: string) => {
  return useQuery({
    queryKey: ["pembayaran", id],
    queryFn: () => fetchPembayaranById(id),
  });
};
