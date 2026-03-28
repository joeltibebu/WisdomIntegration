"use client";

import React, { useState, useMemo } from "react";

export interface Column<T> {
  key: keyof T | string;
  header: string;
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  emptyMessage?: string;
  caption?: string;
  getRowKey: (row: T) => string | number;
}

type SortDir = "asc" | "desc";

export function DataTable<T>({
  columns,
  data,
  emptyMessage = "No records found.",
  caption,
  getRowKey,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const sorted = useMemo(() => {
    if (!sortKey) return data;
    return [...data].sort((a, b) => {
      const aVal = (a as Record<string, unknown>)[sortKey];
      const bVal = (b as Record<string, unknown>)[sortKey];
      if (aVal === bVal) return 0;
      const cmp = String(aVal ?? "").localeCompare(String(bVal ?? ""), undefined, {
        numeric: true,
      });
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [data, sortKey, sortDir]);

  return (
    <div className="overflow-x-auto rounded-card border border-wisdom-border">
      <table
        role="table"
        className="w-full text-sm text-wisdom-text border-collapse"
      >
        {caption && (
          <caption className="sr-only">{caption}</caption>
        )}
        <thead className="bg-wisdom-bg">
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                scope="col"
                className={[
                  "px-4 py-3 text-left font-semibold text-wisdom-text whitespace-nowrap",
                  col.sortable
                    ? "cursor-pointer select-none hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-wisdom-blue"
                    : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={col.sortable ? () => handleSort(String(col.key)) : undefined}
                onKeyDown={
                  col.sortable
                    ? (e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          handleSort(String(col.key));
                        }
                      }
                    : undefined
                }
                tabIndex={col.sortable ? 0 : undefined}
                aria-sort={
                  col.sortable && sortKey === String(col.key)
                    ? sortDir === "asc"
                      ? "ascending"
                      : "descending"
                    : col.sortable
                    ? "none"
                    : undefined
                }
              >
                <span className="inline-flex items-center gap-1">
                  {col.header}
                  {col.sortable && (
                    <span aria-hidden="true" className="text-wisdom-muted">
                      {sortKey === String(col.key)
                        ? sortDir === "asc"
                          ? " ↑"
                          : " ↓"
                        : " ↕"}
                    </span>
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-8 text-center text-wisdom-muted"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            sorted.map((row) => (
              <tr
                key={getRowKey(row)}
                className="border-t border-wisdom-border hover:bg-wisdom-bg transition-colors"
              >
                {columns.map((col) => (
                  <td key={String(col.key)} className="px-4 py-3">
                    {col.render
                      ? col.render(row)
                      : String(
                          (row as Record<string, unknown>)[String(col.key)] ?? ""
                        )}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
