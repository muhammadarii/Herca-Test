"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function PaymentFormModal({
  penjualanId,
  open,
  onClose,
}: {
  penjualanId: string;
  open: boolean;
  onClose: () => void;
}) {
  const [nominal, setNominal] = useState("");
  const [deskripsi, setDeskripsi] = useState("");

  const handleSubmit = async () => {
    const res = await fetch("/api/pembayaran", {
      method: "POST",
      body: JSON.stringify({
        penjualan_id: penjualanId,
        amount: Number(nominal),
        description: String(deskripsi),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      alert("Pembayaran berhasil!");
      onClose();
      window.location.reload();
    } else {
      alert("Gagal melakukan pembayaran.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Form Pembayaran</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>
            ID Penjualan: <strong>{penjualanId}</strong>
          </p>
          <Input
            type="number"
            placeholder="Masukkan nominal pembayaran"
            value={nominal}
            onChange={(e) => setNominal(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Masukkan deskripsi pembayaran"
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Batal
            </Button>
            <Button onClick={handleSubmit}>Bayar</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
