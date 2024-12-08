"use client";

import React, { useState } from "react";
import { EyeClosed } from 'lucide-react';

const DetailStok = ({ id }: { id: string }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [stok, setStok] = useState<any>(null);
  const [isLoading, setLoading] = useState(false);

  const fetchStokDetail = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/stok/${id}`); // Panggil GET API
      if (!response.ok) {
        throw new Error("Failed to fetch stok detail");
      }
      const data = await response.json();
      setStok(data);
    } catch (error) {
      console.error("Error fetching stok detail:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = async () => {
    setModalOpen(true);
    await fetchStokDetail(); 
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <button
        onClick={handleOpenModal}
        className="hover-bg-gray-100 rounded-sm"
        aria-label="View Stok Details"
      >
            <EyeClosed size={20} />
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            {isLoading ? (
              <p>Loading...</p>
            ) : stok ? (
              <div>
                <p>
                  <strong>Nama Barang:</strong> {stok.nama}
                </p>
                <p>
                  <strong>Jumlah Barang:</strong> {stok.jumlah}
                </p>
                <p>
                  <strong>Harga Barang:</strong> {stok.harga}
                </p>
              </div>
            ) : (
              <p>Failed to load stok details.</p>
            )}
            <button
              onClick={handleCloseModal}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailStok;
