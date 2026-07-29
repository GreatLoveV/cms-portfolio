import Skeleton from "./Skeleton";
export const ProjectCardSkeleton = () => <div className="bg-neutral-900 border border-white/10 rounded-lg p-6 flex flex-col gap-3">
    <Skeleton className="w-full h-48" />
    <Skeleton className="h-6 w-2/3" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-5/6" />
    <div className="flex gap-2 mt-1">
      <Skeleton className="h-6 w-16 rounded-full" />
      <Skeleton className="h-6 w-20 rounded-full" />
      <Skeleton className="h-6 w-14 rounded-full" />
    </div>
  </div>;
export const AboutSkeleton = () => <div className="max-w-2xl mx-auto px-6 py-12 flex flex-col gap-8">
    <div className="flex flex-col items-center text-center gap-4">
      <Skeleton className="w-32 h-32 rounded-full" />
      <div className="flex flex-col items-center gap-2">
        <Skeleton className="h-7 w-48" />
        <Skeleton className="h-5 w-32" />
      </div>
      <Skeleton className="h-6 w-36 rounded-full" />
    </div>
    <div className="flex flex-col gap-4">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-4/5" />
    </div>
  </div>;
export const InboxRowSkeleton = () => <div className="bg-neutral-900 border border-white/10 rounded-lg px-4 py-3 flex flex-col gap-2">
    <Skeleton className="h-4 w-1/2" />
    <Skeleton className="h-3 w-3/4" />
  </div>;
