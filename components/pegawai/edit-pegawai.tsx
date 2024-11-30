"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter untuk navigasi

const EditPegawai = ({ id }: { id: string }) => {
  const router = useRouter(); // Inisialisasi router

  const [state, setState] = useState({
    name: "",
    email: "",
    phone: "",
    shift: "",
  });

  useEffect(() => {
    const fetchPegawai = async () => {
      try {
        const response = await fetch(`/api/pegawai/${id}`);
        if (response.ok) {
          const data = await response.json();
          setState(data); 
          console.error("Failed to fetch pegawai data");
          alert("Failed to fetch pegawai data");
        }
      } catch (error) {
        console.error("An error occurred:", error);
        alert("An error occurred while fetching pegawai data");
      }
    };

    fetchPegawai();
  }, [id]);

  // Handle perubahan input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/pegawai/${id}`, {
        method: "PUT", // Metode PUT untuk update
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state), // Kirim data state
      });

      if (response.ok) {
        alert("Pegawai updated successfully!");
        router.push("/pegawai"); 
      } else {
        console.error("Failed to update pegawai");
        alert("Failed to update pegawai");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("An error occurred while updating pegawai");
    }
  };

  return (
    <div className="mx-auto mt-5 max-w-md">
      <h1 className="text-xl font-bold mb-4">Edit Pegawai</h1>
      <form onSubmit={handleSubmit}>
        {/* Input untuk name */}
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-800"
          >
            Full Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="input input-bordered w-full max-w-xs"
            placeholder="Full Name..."
            value={state.name}
            onChange={handleChange}
          />
        </div>

        {/* Input untuk email */}
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-900"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="input input-bordered w-full max-w-xs"
            placeholder="Email..."
            value={state.email}
            onChange={handleChange}
          />
        </div>

        {/* Input untuk phone */}
        <div className="mb-5">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-900"
          >
            Phone Number
          </label>
          <input
            type="text"
            name="phone"
            id="phone"
            className="input input-bordered w-full max-w-xs"
            placeholder="Phone Number..."
            value={state.phone}
            onChange={handleChange}
          />
        </div>

        {/* Input untuk shift */}
        <div className="mb-5">
          <label
            htmlFor="shift"
            className="block text-sm font-medium text-gray-900"
          >
            Jadwal Shift
          </label>
          <input
            type="text"
            name="shift"
            id="shift"
            className="input input-bordered w-full max-w-xs"
            placeholder="Shift..."
            value={state.shift}
            onChange={handleChange}
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="text-white bg-yellow-500 hover:bg-yellow-600 font-medium rounded-lg text-sm px-5 py-3 text-center"
        >
          Update Pegawai
        </button>
      </form>
    </div>
  );
};

export default EditPegawai;
