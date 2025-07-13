import { Timestamp } from "next/dist/server/lib/cache-handlers/types";

export type Penjualan = {
  id?: string;
  transaction_number: string;
  date: Date;
  cargo_fee: number;
  total_balance: number;
  marketing?: marketing[];
  created_at?: Timestamp;
};

export type marketing = {
  id: string;
  name: string;
  created_at: Timestamp;
};
