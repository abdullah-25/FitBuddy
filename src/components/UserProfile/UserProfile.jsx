import DarkModeNavBar from "../DarkModeNavBar/DarkModeNavBar";
//import Chart from "../../components/Chart/Chart";
import React, { lazy, Suspense } from "react";

export default function UserProfile({ user }) {
  const LazyChart = lazy(() => import("../../components/Chart/Chart"));
  return (
    <div>
      <DarkModeNavBar />
      <Suspense fallback={<Spinner />}>
        <LazyChart user={user} />
      </Suspense>
    </div>
  );
}
