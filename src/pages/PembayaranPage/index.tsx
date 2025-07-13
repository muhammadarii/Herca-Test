"use client";
import { pembayaranColumns } from "@/components/parts/Table/Column/PembayaranColumns";
import { DataTable } from "@/components/parts/Table/data-table";
import { useGetPembayaran } from "@/hooks/mutations/pembayaran";
import React from "react";

const PembayaranPage = () => {
  const { data, isLoading, error } = useGetPembayaran();
  const body = data?.data;

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <section>
      <h1>Pembayaran</h1>
      <div className="container mx-auto py-10">
        <DataTable columns={pembayaranColumns} data={body} />
      </div>
    </section>
  );
};

export default PembayaranPage;
