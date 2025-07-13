import { createPenjualan, fetchPenjualan } from "@/lib/api/penjualan";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetPenjualan = () => {
  return useQuery({
    queryKey: ["penjualan"],
    queryFn: fetchPenjualan,
  });
};

export const useCreatePenjualan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPenjualan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["penjualan"] });
    },
  });
};
