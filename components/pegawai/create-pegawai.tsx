"use client"

import React, { useState } from 'react';
import { PegawaiAddButton } from '@/components/buttons';

const CreatePegawai = () => {
  const [state, setState] = useState({
    name: '',
    email: '',
    phone: '',
    shift: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, phone, shift } = state;

    try {
      const response = await fetch('/api/pegawai/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, phone, shift }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Pegawai created successfully:', result);
        // Handle successful response, like resetting the form or showing success message
      } else {
        console.error('Failed to create pegawai');
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

          <PegawaiAddButton label="Save" />
        </form>
      </div>
    </div>
  );
};

export default CreatePegawai;
