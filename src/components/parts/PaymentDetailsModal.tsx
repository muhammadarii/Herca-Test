"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";

interface PaymentDetailsModalProps {
  penjualanId: string | null;
  open: boolean;
  onClose: () => void;
}

type PaymentDetail = {
  id: string;
  amount: number;
  date: string;
  description?: string;
};

export function PaymentDetailsModal({
  penjualanId,
  open,
  onClose,
}: PaymentDetailsModalProps) {
  const [data, setData] = useState<PaymentDetail[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!penjualanId) return;

    setLoading(true);
    fetch(`/api/pembayaran/${penjualanId}`)
      .then((res) => res.json())
      .then((res) => {
        setData(res.data || []);
      })
      .finally(() => setLoading(false));
  }, [penjualanId]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Payment Details</DialogTitle>
        </DialogHeader>
        {loading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ) : data.length === 0 ? (
          <p className="text-muted">No payment found.</p>
        ) : (
          <div className="space-y-2">
            {data.map((item) => (
              <div key={item.id} className="border p-2 rounded bg-muted/20">
                <p className="font-medium">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  }).format(item.amount)}
                </p>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(item.date).toLocaleDateString("id-ID")}
                </p>
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
