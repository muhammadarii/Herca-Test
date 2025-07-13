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
    accessorKey: "bulan",
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
    accessorKey: "komisiPersen",
    header: () => <div>Komisi Persen</div>,
  },
  {
    accessorKey: "komisiNominal",
    header: () => <div>Komisi Nominal</div>,
    cell: ({ row }) => {
      const value = row.getValue("komisiNominal");
      const formatted = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(Number(value));

      return <div>{formatted}</div>;
    },
  },
];
