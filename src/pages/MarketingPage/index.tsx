"use client";
import { MarketingColumns } from "@/components/parts/Table/Column/MarketingColumns";
import { DataTable } from "@/components/parts/Table/data-table";
import { fetchMarketing } from "@/lib/api/marketing";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const MarketingPage = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["marketing"],
    queryFn: fetchMarketing,
  });

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
