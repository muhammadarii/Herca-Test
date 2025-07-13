import { fetchMarketing } from "@/lib/api/marketing";
import { useQuery } from "@tanstack/react-query";

export const useGetMarketing = () => {
  return useQuery({
    queryKey: ["marketing"],
    queryFn: fetchMarketing,
  });
};
