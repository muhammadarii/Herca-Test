"use client";

import { PenjualanColumns } from "@/components/parts/Table/Column/PenjualanColumns";
import { DataTable } from "@/components/parts/Table/data-table";
import { Button } from "@/components/ui/button";
import { fetchPenjualan } from "@/lib/api/penjualan";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const PenjualanPage = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["penjualan"],
    queryFn: fetchPenjualan,
  });

  const body = data?.data;

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <section className="space-y-4">
      <h1>Data Penjualan</h1>
      <Button>Add Penjualan</Button>
      <DataTable columns={PenjualanColumns} data={body} />
    </section>
  );
};

export default PenjualanPage;
