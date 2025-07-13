"use client";
import { MarketingColumns } from "@/components/parts/Table/Column/MarketingColumns";
import { DataTable } from "@/components/parts/Table/data-table";
import { useGetMarketing } from "@/hooks/mutations/marketing";
import React from "react";

const MarketingPage = () => {
  const { data, isLoading, error } = useGetMarketing();
  const body = data?.data;

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <section>
      <h1>Data Marketing</h1>
      <div className="container mx-auto py-10">
        <DataTable columns={MarketingColumns} data={body} />
      </div>
    </section>
  );
};

export default MarketingPage;
