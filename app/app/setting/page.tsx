import { Suspense } from "react";
import Loading from "@/components/ui/loading";
import { getUser } from "@/lib/actions/profile";
import CardProfile from "./components/card-profile";

async function Profile() {
  const user = await getUser();
  return <CardProfile user={user} />;
}

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <Profile />
    </Suspense>
  );
}
