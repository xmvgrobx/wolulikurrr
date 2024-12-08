"use client"

import React, { useState } from 'react';
import { StokAddButton } from '@/components/buttons';

const CreateStok = () => {
  const [state, setState] = useState({
    nama: '',
    jumlah: '',
    harga: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      [name]: name === "harga" ? parseFloat(value) || "" : value, // Konversi ke Float untuk harga
    }));
  };


  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { nama, jumlah, harga  } = state;

    try {
      const response = await fetch('/api/stok/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nama, jumlah, harga }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Stok created successfully:', result);
        setState({
          nama: '',
          jumlah: '',
          harga: ''
        });
      } else {
        console.error('Failed to create stok');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className="mx-auto mt-5 max-w-md">
      <div>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="nama" className="block text-sm font-medium text-gray-800">
              Nama
            </label>
            <input
              type="text"
              name="nama"
              id="nama"
              className="input input-bordered w-full max-w-xs"
              placeholder="Nama Barang..."
              value={state.nama}
              onChange={handleChange}
            />
          </div>

          <div className="mb-5">
            <label htmlFor="jumlah" className="block text-sm font-medium text-gray-900">
              Jumlah
            </label>
            <input
              type="text"
              name="jumlah"
              id="jumlah"
              className="input input-bordered w-full max-w-xs"
              placeholder="Jumlah Barang..."
              value={state.jumlah}
              onChange={handleChange}
            />
          </div>

          <div className="mb-5">
            <label htmlFor="harga" className="block text-sm font-medium text-gray-900">
              Harga Barang
            </label>
            <input
              type="number"
              name="harga"
              id="harga"
              className="input input-bordered w-full max-w-xs"
              placeholder="Harga Barang..."
              value={state.harga}
              onChange={handleChange}
            />
          </div>

          <StokAddButton label="Save" />
        </form>
      </div>
    </div>
  );
};

export default CreateStok;
