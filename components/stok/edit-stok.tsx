"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; 

const EditStok = ({ id }: { id: string }) => {
  const router = useRouter(); 


  const [state, setState] = useState({
    nama: '',
    jumlah: '',
    harga: '',
  });


  useEffect(() => {
    const fetchStok = async () => {
      try {
        const response = await fetch(`/api/stok/${id}`);
        if (response.ok) {
          const data = await response.json();
          setState(data); 
        } else {
          console.error("Failed to fetch stok data");
          alert("Failed to fetch stok data");
        }
      } catch (error) {
        console.error("An error occurred:", error);
        alert("An error occurred while fetching stok data");
      }
    };

    fetchStok();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      [name]: name === "harga" ? parseFloat(value) || "" : value, 
    }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/stok/${id}`, {
        method: "PUT", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state), 
      });

      if (response.ok) {
        alert("Stok updated successfully!");
        router.push("/stok"); 
      } else {
        console.error("Failed to update stok");
        alert("Failed to update stok");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("An error occurred while updating stok");
    }
  };

  return (
    <div className="mx-auto mt-5 max-w-md">
      <h1 className="text-xl font-bold mb-4">Edit Stok</h1>
      <form onSubmit={handleSubmit}>
        {/* Input untuk name */}
        <div className="mb-5">
        <label
              htmlFor="nama"
              className="block text-sm font-medium text-gray-800"
            >
              Nama Stok
            </label>
            <input
              type="text"
              name="nama"
              id="nama"
              className="input input-bordered w-full max-w-xs"
              placeholder="Nama stok dik..."
            value={state.nama}
            onChange={handleChange}
          />
        </div>

        {/* Input untuk email */}
        <div className="mb-5">
          <label
              htmlFor="jumlah"
              className="block text-sm font-medium text-gray-900"
            >
              Jumlah
            </label>
            <input
              type="text"
              name="jumlah"
              id="jumlah"
              className="input input-bordered w-full max-w-xs"
              placeholder="Jumlah..."
              value={state.jumlah}
              onChange={handleChange}
          />
        </div>


        <div className="mb-5">
            <label
              htmlFor="harga"
              className="block text-sm font-medium text-gray-900"
            >
              Harga
            </label>
            <input
              type="number"
              name="harga"
              id="harga"
              className="input input-bordered w-full max-w-xs"
              placeholder="Harganye..."
              value={state.harga}
              onChange={handleChange}
            />
          </div>


        <button
          type="submit"
          className="text-white bg-yellow-500 hover:bg-yellow-600 font-medium rounded-lg text-sm px-5 py-3 text-center"
        >
          Update Stok
        </button>
      </form>
    </div>
  );
};

export default EditStok;
