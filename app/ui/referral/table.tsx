import React from "react";
import { prisma } from "@/lib/prisma";
import type { Referral } from "@prisma/client";
// import { EditPegawai, DeletePegawai } from "@/components/buttons";
// import DetailPegawai from "@/components/pegawai/detail-pegawai";
import { formatDate } from "@/lib/utils";

async function getReferral(): Promise<Referral[]> {
  const emp = await prisma.referral.findMany();
  return emp;
}

const ReferralTable = async () => {
  const emp = await getReferral();

  return (
    <table className="w-full text-sm text-left bg-white text-gray-500">
      <thead className="text-sm text-gray-700 uppercase bg-white-50">
        <tr>
          <th className="py-3 px-6">Nama Kode</th>
          <th className="py-3 px-6">Tanggal Buat</th>
          <th className="py-3 px-6 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {emp.map((e) => (
          <tr key={e.id} className="bg-white border-b">
            <td className="py-3 px-6">{e.code}</td>
            <td className="py-3 px-6">{formatDate(e.createdAt.toString())}</td>
           
            {/* <td className="flex justify-center gap-1 py-3">
              <DetailPegawai id={e.id}/>
              <EditPegawai id={e.id}/>
              <DeletePegawai id={e.id}/>
            </td> */}
          </tr>
        )
        )}
      </tbody>
    </table>
  );
};

export default ReferralTable;