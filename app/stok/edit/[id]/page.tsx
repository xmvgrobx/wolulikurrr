import React from "react";
import EditStok from "@/components/stok/edit-stok"; // Path ke form edit yang sudah dibuat

const EditStokPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return (
    <div>
      {/* <h1 className="text-xl font-bold mb-4">Edit Stok</h1> */}
      {/* Kirimkan ID employee ke komponen edit */}
      <EditStok id={id} />
    </div>
  );
};

export default EditStokPage;