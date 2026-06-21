import { Skeleton } from './ui/skeleton';

const SKELETON_ROWS = 9;

export function WishlistTableSkeleton() {
  return (
    <>
      {/* Mirrors: WishlistTableToolbar mb-4 flex flex-wrap items-center gap-2 */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {/* Search input max-w-xs h-8 */}
        <Skeleton className="h-8 w-72" />
        {/* Status Select trigger w-40 h-8 */}
        <Skeleton className="h-8 w-40" />
        {/* Priority Select trigger w-40 h-8 */}
        <Skeleton className="h-8 w-40" />
        {/* Reset icon button icon-sm = size-7 */}
        <Skeleton className="h-7 w-7 rounded-md" />
      </div>

      {/* Table */}
      <div className="rounded-md border">
        {/* Header row — mirrors TableHead with py-3 px-4 */}
        <div className="flex items-center gap-4 border-b px-4 py-3">
          <Skeleton className="h-4 flex-[3]" />
          <Skeleton className="h-4 flex-[2]" />
          <Skeleton className="h-4 flex-[2]" />
          <Skeleton className="h-4 flex-[2]" />
          <Skeleton className="h-4 w-6 shrink-0" />
        </div>

        {/* Data rows — mirrors TableRow with px-4 py-3 */}
        {Array.from({ length: SKELETON_ROWS }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 border-b px-4 py-3 last:border-b-0"
          >
            <Skeleton className="h-4 flex-[3]" />
            <Skeleton className="h-4 flex-[2]" />
            {/* Priority badge */}
            <div className="flex-[2]">
              <Skeleton className="h-5 w-14 rounded-md" />
            </div>
            {/* Status badge */}
            <div className="flex-[2]">
              <Skeleton className="h-5 w-20 rounded-md" />
            </div>
            {/* Actions icon button */}
            <Skeleton className="h-7 w-7 shrink-0 rounded-md" />
          </div>
        ))}
      </div>

      {/* Pagination — mirrors mt-4 flex items-center justify-center gap-3 */}
      <div className="mt-4 flex items-center justify-center gap-3">
        {/* Button size="sm" h-7 */}
        <Skeleton className="h-7 w-20" />
        {/* "Page X of Y" text-sm */}
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-7 w-14" />
      </div>
    </>
  );
}
