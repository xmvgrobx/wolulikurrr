"use client";

import React, { useState } from "react";
import { EyeClosed, EyeIcon } from "lucide-react";
import { Eye } from "lucide";

const DetailPegawai = ({ id }: { id: string }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [pegawai, setPegawai] = useState<any>(null);
  const [isLoading, setLoading] = useState(false);

  const fetchPegawaiDetail = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/pegawai/${id}`); // Panggil GET API
      if (!response.ok) {
        throw new Error("Failed to fetch pegawai detail");
      }
      const data = await response.json();
      setPegawai(data); // Simpan data karyawan
    } catch (error) {
      console.error("Error fetching pegawai detail:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = async () => {
    setModalOpen(true);
    await fetchPegawaiDetail(); // Ambil data ketika modal dibuka
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <button
        onClick={handleOpenModal}
        className="hover-bg-gray-100 rounded-sm"
        aria-label="View Pegawai Details"
      >
        <EyeClosed size={20} />
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-bold mb-4">Pegawai Details</h2>
            {isLoading ? (
              <p>Loading...</p>
            ) : pegawai ? (
              <div>
                <p>
                  <strong>Full Name:</strong> {pegawai.name}
                </p>
                <p>
                  <strong>Email:</strong> {pegawai.email}
                </p>
                <p>
                  <strong>Phone:</strong> {pegawai.phone}
                </p>
                <p>
                  <strong>Shift:</strong> {pegawai.shift}
                </p>
              </div>
            ) : (
              <p>Failed to load pegawai details.</p>
            )}
            <button
              onClick={handleCloseModal}
              className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailPegawai;
