"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Timestamp } from "next/dist/server/lib/cache-handlers/types";

export type Marketing = {
  id: string;
  name: string;
  created_at: Timestamp;
};

export const MarketingColumns: ColumnDef<Marketing>[] = [
  {
    accessorKey: "id",
    header: () => <div className="text-center">ID</div>,
  },
  {
    accessorKey: "name",
    header: () => <div className="text-center">Name</div>,
  },
  {
    accessorKey: "created_at",
    header: () => <div className="text-center">Created At</div>,
    cell: ({ row }) => {
      const formattedDate = new Date(row.getValue("created_at")).toLocaleString(
        "en-US",
        {
          day: "2-digit",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }
      );

      return <div className="text-center">{formattedDate}</div>;
    },
  },
];
