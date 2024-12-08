"use client"

import React, { useState } from 'react';
import { KodeAddButton } from '@/components/buttons';

const CreateReferral = () => {
  const [state, setState] = useState({
    code: '',
    discount: '',

  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      [name]: name === "discount" ? parseFloat(value) || "" : value, // Konversi ke Float untuk harga
    }));
  };


  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { code, discount } = state;

    try {
      const response = await fetch('/api/referral/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({code, discount }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Kode created successfully:', result);
        setState({
          code: '',
          discount: '',
         
        });
      } else {
        console.error('Failed to create kode');
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
            <label htmlFor="code" className="block text-sm font-medium text-gray-800">
              Nama Kode
            </label>
            <input
              type="text"
              name="code"
              id="code"
              className="input input-bordered w-full max-w-xs"
              placeholder="Nama code..."
              value={state.code}
              onChange={handleChange}
            />
          </div>

          <div className="mb-5">
            <label htmlFor="discount" className="block text-sm font-medium text-gray-900">
              Discount
            </label>
            <input
              type="number"
              name="discount"
              id="discount"
              className="input input-bordered w-full max-w-xs"
              placeholder="Discountt..."
              value={state.discount}
              onChange={handleChange}
            />
          </div>


          <KodeAddButton label="Save" />
        </form>
      </div>
    </div>
  );
};

export default CreateReferral;
