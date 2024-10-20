import { CurrentSearch } from "@/components/current-search";
import { Skeleton } from "@/components/skeleton";
import { Suspense } from "react";

export default function SearchLoading() {
  return (
    <div className="flex flex-col gap-4">
      <Suspense fallback={null}>
        <CurrentSearch />
      </Suspense>

      <div className="grid grid-cols-3 gap-6">
        <Skeleton className="h-[450px]" />
        <Skeleton className="h-[450px]" />
        <Skeleton className="h-[450px]" />
        <Skeleton className="h-[450px]" />
        <Skeleton className="h-[450px]" />
        <Skeleton className="h-[450px]" />
      </div>
    </div>
  );
}
