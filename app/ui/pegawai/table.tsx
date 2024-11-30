import React from "react";
import { prisma } from "@/lib/prisma";
import type { Pegawai } from "@prisma/client";
import { EditPegawai, DeletePegawai } from "@/components/buttons";
import DetailPegawai from "@/components/pegawai/detail-pegawai";

async function getPegawai(): Promise<Pegawai[]> {
  const emp = await prisma.pegawai.findMany();
  return emp;
}

const PegawaiTable = async () => {
  const emp = await getPegawai();

  return (
    <table className="w-full text-sm text-left bg-white text-gray-500">
      <thead className="text-sm text-gray-700 uppercase bg-white-50">
        <tr>
          <th className="py-3 px-6">Name</th>
          <th className="py-3 px-6">Jadwal Shift</th>
          <th className="py-3 px-6 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {emp.map((e) => (
          <tr key={e.id} className="bg-white border-b">
            <td className="py-3 px-6">{e.name}</td>
            <td className="py-3 px-6">{e.shift}</td>
           
            <td className="flex justify-center gap-1 py-3">
              <DetailPegawai id={e.id}/>
              <EditPegawai id={e.id}/>
              <DeletePegawai id={e.id}/>
            </td>
          </tr>
        )
        )}
      </tbody>
    </table>
  );
};

export default PegawaiTable;