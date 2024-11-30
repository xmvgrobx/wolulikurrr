import React from "react";
import { prisma } from "@/lib/prisma";
import type { Pegawai } from "@prisma/client";
import PegawaiTable from "../ui/pegawai/table";


async function getPegawai(): Promise<Pegawai[]> {
  const emp = await prisma.pegawai.findMany();
  return emp;
}

const PegawaiPage = async () => {
  const emp = await getPegawai(); // Data diambil dari database

  return (
    <div className="max-w-screen-md mx-auto mt-28">
      <PegawaiTable />
    </div>
  );
};
export default PegawaiPage;