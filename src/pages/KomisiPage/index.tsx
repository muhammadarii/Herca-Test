"use client";
import { KomisiColumns } from "@/components/parts/Table/Column/KomisiColumns";
import { DataTable } from "@/components/parts/Table/data-table";
import { useGetKomisi } from "@/hooks/mutations/komisi";
import React from "react";

const KomisiPage = () => {
  const { data, isLoading, error } = useGetKomisi();
  const body = data?.data;

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <section>
      <h1>Komisi</h1>
      <div className="container mx-auto py-10">
        <DataTable columns={KomisiColumns} data={body} />
      </div>
    </section>
  );
};

export default KomisiPage;
