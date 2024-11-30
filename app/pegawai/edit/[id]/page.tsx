import React from "react";
import EditPegawai from "@/components/pegawai/edit-pegawai";

const EditPegawaiPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return (
    <div>
      {/* <h1 className="text-xl font-bold mb-4">Edit Pegawai</h1> */}
      <EditPegawai id={id} />
    </div>
  );
};

export default EditPegawaiPage;
