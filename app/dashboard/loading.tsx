import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardLoading() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="border-b">
        <div className="container flex h-16 items-center px-4">
          <Skeleton className="h-6 w-24" />
          <div className="ml-6 hidden space-x-4 md:flex">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </div>
      </div>

      <div className="container grid flex-1 gap-12 px-4 py-6 md:grid-cols-[200px_1fr] lg:grid-cols-[250px_1fr] lg:gap-16">
        <aside className="hidden md:block">
          <div className="space-y-2">
            {Array(8)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} className="h-9 w-full" />
              ))}
          </div>
        </aside>

        <main className="space-y-6">
          <div className="flex flex-col gap-4 md:flex-row">
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="flex-1 rounded-lg border p-6">
                  <Skeleton className="mb-2 h-4 w-24" />
                  <Skeleton className="h-8 w-28" />
                  <Skeleton className="mt-2 h-3 w-36" />
                </div>
              ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <div className="col-span-4 rounded-lg border p-6">
              <Skeleton className="mb-6 h-6 w-36" />
              <div className="space-y-4">
                {Array(4)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <Skeleton className="h-9 w-9 rounded-full" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-3 w-3/4" />
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="col-span-3 rounded-lg border p-6">
              <Skeleton className="mb-2 h-6 w-36" />
              <Skeleton className="mb-6 h-4 w-48" />
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-5 w-16 rounded-full" />
                  </div>
                  <Skeleton className="h-2 w-full rounded-full" />
                  <Skeleton className="h-3 w-3/4" />
                </div>

                <div className="space-y-2">
                  <Skeleton className="h-4 w-28" />
                  <div className="space-y-2">
                    {Array(3)
                      .fill(0)
                      .map((_, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Skeleton className="h-4 w-4 rounded-full" />
                          <Skeleton className="h-3 w-40" />
                        </div>
                      ))}
                  </div>
                </div>

                <Skeleton className="h-9 w-full" />
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-36" />
              <Skeleton className="h-8 w-24" />
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {Array(4)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="overflow-hidden rounded-lg border">
                    <Skeleton className="aspect-video w-full" />
                    <div className="p-4">
                      <Skeleton className="mb-2 h-4 w-3/4" />
                      <div className="flex items-center justify-between">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-3 w-20" />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
