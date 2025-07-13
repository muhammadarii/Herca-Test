"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PaymentDetailsModal } from "@/components/parts/PaymentDetailsModal";
import { PaymentFormModal } from "@/components/parts/PaymentFormModal";

export type Pembayaran = {
  penjualan_id: string;
  total_transaction: number;
  total_payment: number;
  remaining_bill: number;
  status: string;
};

const ActionsDropdown = ({ penjualan_id }: { penjualan_id: string }) => {
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [openFormModal, setOpenFormModal] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(penjualan_id)}
          >
            Copy payment ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setOpenFormModal(true)}>
            Pay Now
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenDetailModal(true)}>
            View payment details
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Detail pembayaran */}
      <PaymentDetailsModal
        penjualanId={penjualan_id}
        open={openDetailModal}
        onClose={() => setOpenDetailModal(false)}
      />

      {/* Form pembayaran */}
      <PaymentFormModal
        penjualanId={penjualan_id}
        open={openFormModal}
        onClose={() => setOpenFormModal(false)}
      />
    </>
  );
};

export const pembayaranColumns: ColumnDef<Pembayaran>[] = [
  {
    accessorKey: "penjualan_id",
    header: () => <div>Penjualan ID</div>,
  },
  {
    accessorKey: "total_transactions",
    header: () => <div>Total Transaction</div>,
    cell: ({ row }) => {
      const value = row.getValue("total_transactions");
      const formatted = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(Number(value));
      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "total_payment",
    header: () => <div>Total Payment</div>,
    cell: ({ row }) => {
      const value = row.getValue("total_payment");
      const formatted = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(Number(value));
      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "remaining_bill",
    header: () => <div>Remaining Bill</div>,
    cell: ({ row }) => {
      const value = row.getValue("remaining_bill");
      const formatted = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(Number(value));
      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "status",
    header: () => <div>Status</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const penjualanId = row.getValue("penjualan_id") as string;
      return <ActionsDropdown penjualan_id={penjualanId} />;
    },
  },
];
