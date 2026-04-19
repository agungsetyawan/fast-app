import { Suspense } from "react";
import Loading from "@/components/ui/loading";
import CardProfile from "./components/card-profile";

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <CardProfile />
    </Suspense>
  );
}
