"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Marketing = {
  marketing: string;
  bulan: string;
  omzet: number;
  komisiPersen: number;
  komisiNominal: number;
};

export const KomisiColumns: ColumnDef<Marketing>[] = [
  {
    accessorKey: "marketing",
    header: () => <div>Marketing</div>,
  },
  {
    accessorKey: "month",
    header: () => <div>Month</div>,
  },
  {
    accessorKey: "omzet",
    header: () => <div>Omzet</div>,
    cell: ({ row }) => {
      const value = row.getValue("omzet");
      const formatted = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(Number(value));

      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "percentage_commission",
    header: () => <div>Percetage Commission</div>,
  },
  {
    accessorKey: "nominal_commission",
    header: () => <div>Nominal Commission</div>,
    cell: ({ row }) => {
      const value = row.getValue("nominal_commission");
      const formatted = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(Number(value));

      return <div>{formatted}</div>;
    },
  },
];
