import React from "react";

export const SkeletonStats = ({ count = 4 }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    {Array(count)
      .fill(0)
      .map((_, idx) => (
        <div
          key={idx}
          className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm animate-pulse"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-slate-200"></div>
            <div className="flex-1">
              <div className="h-4 bg-slate-200 rounded w-1/2 mb-2"></div>
              <div className="h-6 bg-slate-200 rounded w-3/4"></div>
            </div>
          </div>
          <div className="h-3 bg-slate-200 rounded w-1/3"></div>
        </div>
      ))}
  </div>
);

export const SkeletonTable = ({ rows = 5, columns = 6 }) => (
  <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden animate-pulse">
    <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center">
      <div className="h-6 bg-slate-200 rounded w-1/4"></div>
      <div className="h-8 bg-slate-200 rounded-full w-20"></div>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-slate-50">
          <tr>
            {Array(columns)
              .fill(0)
              .map((_, idx) => (
                <th key={idx} className="px-6 py-4">
                  <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {Array(rows)
            .fill(0)
            .map((_, rowIdx) => (
              <tr key={rowIdx} className="border-t border-slate-100">
                {Array(columns)
                  .fill(0)
                  .map((_, colIdx) => (
                    <td key={colIdx} className="px-6 py-5">
                      <div className="h-4 bg-slate-200 rounded w-full"></div>
                    </td>
                  ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  </div>
);

export const SkeletonCards = ({ count = 3 }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array(count)
      .fill(0)
      .map((_, idx) => (
        <div
          key={idx}
          className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm animate-pulse flex flex-col justify-between min-h-[200px]"
        >
          <div>
            <div className="flex justify-between items-start mb-4">
              <div className="h-6 bg-slate-200 rounded w-2/3"></div>
              <div className="h-6 w-16 bg-slate-200 rounded-full"></div>
            </div>
            <div className="space-y-3">
              <div className="h-4 bg-slate-200 rounded w-full"></div>
              <div className="h-4 bg-slate-200 rounded w-5/6"></div>
            </div>
          </div>
          <div className="mt-6 flex gap-3">
            <div className="h-10 flex-1 bg-slate-200 rounded-xl"></div>
            <div className="h-10 flex-1 bg-slate-200 rounded-xl"></div>
          </div>
        </div>
      ))}
  </div>
);

export const SkeletonDashboard = () => (
  <div className="space-y-8">
    <div className="h-10 bg-slate-200 rounded w-1/4 animate-pulse"></div>
    <SkeletonStats count={4} />
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <SkeletonTable rows={4} columns={4} />
      </div>
      <div className="space-y-6">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 animate-pulse min-h-[300px]">
           <div className="h-6 bg-slate-200 rounded w-1/2 mb-6"></div>
           <div className="space-y-4">
             <div className="h-12 bg-slate-200 rounded-xl w-full"></div>
             <div className="h-12 bg-slate-200 rounded-xl w-full"></div>
             <div className="h-12 bg-slate-200 rounded-xl w-full"></div>
           </div>
        </div>
      </div>
    </div>
  </div>
);

// General list-page loading state used by management screens.
export const SkeletonPage = () => (
  <div className="space-y-8">
    <div className="space-y-3 animate-pulse">
      <div className="h-10 w-56 rounded bg-slate-200" />
      <div className="h-5 w-96 max-w-full rounded bg-slate-100" />
    </div>
    <SkeletonStats count={4} />
    <SkeletonTable rows={6} columns={6} />
  </div>
);
