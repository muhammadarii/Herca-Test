"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Timestamp } from "next/dist/server/lib/cache-handlers/types";

export type Penjualan = {
  id: string;
  transaction_number: string;
  date: Date;
  cargo_fee: number;
  total_balance: number;
  marketing: marketing;
  created_at: Timestamp;
};

type marketing = {
  id: string;
  name: string;
  created_at: Timestamp;
};

export const PenjualanColumns: ColumnDef<Penjualan>[] = [
  {
    accessorKey: "id",
    header: () => <div className="text-left">ID</div>,
  },
  {
    accessorKey: "transaction_number",
    header: () => <div className="text-left">Transaction Number</div>,
  },
  {
    accessorKey: "marketing.name",
    header: () => <div className="text-left">Name</div>,
  },
  {
    accessorKey: "date",
    header: () => <div className="text-left">Date</div>,
  },
  {
    accessorKey: "cargo_fee",
    header: () => <div className="text-left">Cargo Fee</div>,
  },
  {
    accessorKey: "total_balance",
    header: () => <div className="text-left">Total Balance</div>,
  },
  {
    accessorKey: "created_at",
    header: () => <div className="text-left">Created At</div>,
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

      return <div className="text-left">{formattedDate}</div>;
    },
  },
];
