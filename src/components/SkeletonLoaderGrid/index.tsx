import { Skeleton } from "../ui/skeleton"

export const SkeletonLoaderGrid = ({ count }: { count: number }) => (
  <>
    {Array.from({ length: count }).map((_, index) => (
      <Skeleton
        key={index}
        className="h-32 flex flex-col col-span-12 sm:col-span-6 lg:col-span-4"
      />
    ))}
  </>
)
