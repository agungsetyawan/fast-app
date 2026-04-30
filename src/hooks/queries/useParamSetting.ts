import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query/keys";
import { getParamSetting } from "@/services/param-setting";
import type { ParamSetting } from "@/types/param-setting";

export function useParamSetting() {
  return useQuery<ParamSetting[]>({
    queryKey: queryKeys.paramSetting(),
    queryFn: () => getParamSetting(),
  });
}
