import { fetchKomisi } from "@/lib/api/komisi";
import { useQuery } from "@tanstack/react-query";

export const useGetKomisi = () => {
  return useQuery({
    queryKey: ["komisi"],
    queryFn: fetchKomisi,
  });
};
