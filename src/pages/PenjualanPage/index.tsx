"use client";

import { FormPenjualan } from "@/components/parts/Form/FormPenjualan";
import { PenjualanColumns } from "@/components/parts/Table/Column/PenjualanColumns";
import { DataTable } from "@/components/parts/Table/data-table";
import { Button } from "@/components/ui/button";
import { useGetMarketing } from "@/hooks/mutations/marketing";
import {
  useCreatePenjualan,
  useGetPenjualan,
} from "@/hooks/mutations/penjualan";
import React, { useState } from "react";

const PenjualanPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    transaction_number: "",
    marketing_id: "",
    date: new Date(),
    cargo_fee: 0,
    total_balance: 0,
  });
  const { data, isLoading, error } = useGetPenjualan();
  const { data: marketing } = useGetMarketing();

  const createPenjualan = useCreatePenjualan();

  const body = data?.data;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createPenjualan.mutate(form, {
      onSuccess: () => {
        setForm({
          transaction_number: "",
          marketing_id: "",
          date: new Date(),
          cargo_fee: 0,
          total_balance: 0,
        });
        setShowForm(false);
      },
    });
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <section className="space-y-4">
      <h1>Data Penjualan</h1>
      <Button onClick={() => setShowForm(true)}>Add Penjualan</Button>
      {showForm && (
        <FormPenjualan
          onclick={() => setShowForm(false)}
          onSubmit={handleSubmit}
          form={form}
          setForm={setForm}
          marketing={marketing?.data}
        />
      )}
      {createPenjualan.isError && (
        <p className="text-red-500">{createPenjualan.error.message}</p>
      )}
      <DataTable columns={PenjualanColumns} data={body} />
    </section>
  );
};

export default PenjualanPage;
