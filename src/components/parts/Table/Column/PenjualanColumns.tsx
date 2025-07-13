"use client";

import { Button } from "@/components/ui/button";
import { Penjualan } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const PenjualanColumns: ColumnDef<Penjualan>[] = [
  {
    accessorKey: "id",
    header: () => <div className="text-left">ID</div>,
  },
  {
    accessorKey: "transaction_number",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Transaction Number
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
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
    cell: ({ row }) => {
      const value = row.getValue("grand_total");
      const formatted = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(Number(value));
      return <div className="text-left">{formatted}</div>;
    },
  },
  {
    accessorKey: "total_balance",
    header: () => <div className="text-left">Total Balance</div>,
    cell: ({ row }) => {
      const value = row.getValue("grand_total");
      const formatted = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(Number(value));
      return <div className="text-left">{formatted}</div>;
    },
  },
  {
    accessorKey: "grand_total",
    header: () => <div className="text-left">Grand Total</div>,
    cell: ({ row }) => {
      const value = row.getValue("grand_total");
      const formatted = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(Number(value));
      return <div className="text-left">{formatted}</div>;
    },
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
