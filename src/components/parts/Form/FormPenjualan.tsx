import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { marketing } from "@/types";
import { X } from "lucide-react";

type FormPenjualanProps = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onclick: () => void;
  form: {
    transaction_number: string;
    marketing_id: string;
    date: Date;
    cargo_fee: number;
    total_balance: number;
  };
  setForm: React.Dispatch<
    React.SetStateAction<{
      transaction_number: string;
      marketing_id: string;
      date: Date;
      cargo_fee: number;
      total_balance: number;
    }>
  >;
  marketing: marketing[];
};

export const FormPenjualan: React.FC<FormPenjualanProps> = ({
  onSubmit,
  form,
  setForm,
  marketing,
  onclick,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col w-[600px] border bg-white z-10 p-4 rounded-lg"
    >
      <X onClick={onclick} className="absolute top-4 right-4 cursor-pointer" />

      <h1 className="text-xl text-center mb-4">Form Penjualan</h1>
      <div className="flex flex-col">
        <label htmlFor="transaction_number">Transaction Number</label>
        <Input
          type="text"
          placeholder="Transaction Number"
          value={form.transaction_number}
          onChange={(e) =>
            setForm({ ...form, transaction_number: e.target.value })
          }
        />
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="marketing_id" className="mb-1 font-medium">
          Marketing
        </label>

        {marketing && (
          <select
            id="marketing_id"
            value={form.marketing_id}
            onChange={(e) => setForm({ ...form, marketing_id: e.target.value })}
            className="border rounded px-3 py-2 text-black"
          >
            <option value="">Pilih Marketing</option>
            {marketing?.map((item: marketing) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="flex flex-col">
        <label htmlFor="cargo_fee">Cargo Fee</label>
        <Input
          type="number"
          placeholder="Cargo Fee"
          value={form.cargo_fee}
          onChange={(e) =>
            setForm({ ...form, cargo_fee: Number(e.target.value) })
          }
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="total_balance">Total Balance</label>
        <Input
          type="number"
          placeholder="Total Balance"
          value={form.total_balance}
          onChange={(e) =>
            setForm({ ...form, total_balance: Number(e.target.value) })
          }
        />
      </div>
      <p className="mt-2 text-sm">
        <strong>Grand Total:</strong> Rp{" "}
        {(form.cargo_fee + form.total_balance).toLocaleString("id-ID")}
      </p>

      <Button type="submit" className="mt-4">
        Submit
      </Button>
    </form>
  );
};
