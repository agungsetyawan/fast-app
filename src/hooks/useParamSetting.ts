import { useQuery } from "@tanstack/react-query";
import { getParamSetting } from "@/lib/actions/client/param-setting";
import { queryKeys } from "@/lib/query/keys";
import type { ParamSetting } from "@/lib/types/param-setting";

export function useParamSetting() {
  return useQuery<ParamSetting[]>({
    queryKey: queryKeys.paramSetting(),
    queryFn: () => getParamSetting(),
  });
}
