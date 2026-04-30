import { Suspense } from "react";
import Loading from "@/components/ui/loading";
import CardProfile from "@/features/setting/components/card-profile";

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <CardProfile />
    </Suspense>
  );
}
