'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface MenuEditProps {
  initialMenu: {
    id: string;
    name: string;
    price: number;
    description?: string | null;
    fotoUrl: string;
  };
}

const EditMenuForm: React.FC<MenuEditProps> = ({ initialMenu }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: initialMenu.name,
    price: initialMenu.price.toString(),
    description: initialMenu.description || '',
  });
  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState(initialMenu.fotoUrl);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.price.trim()) {
      newErrors.price = 'Price is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('id', initialMenu.id);
    formDataToSend.append('name', formData.name);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('description', formData.description || '');
    
    if (image) {
      formDataToSend.append('image', image);
    }

    try {
      const response = await fetch('/api/menu/edit', {
        method: 'PUT',
        body: formDataToSend,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update menu item');
      }

      router.push('/menu');
    } catch (error) {
      console.error('Error updating menu:', error);
      setErrors({ 
        general: error instanceof Error ? error.message : 'An error occurred' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Edit Menu Item</h2>
      
      {/* Image Preview */}
      {previewImage && (
        <div className="mb-4 flex justify-center">
          <Image 
            src={previewImage} 
            alt="Menu Item Preview" 
            width={300} 
            height={200} 
            className="rounded-lg object-cover"
          />
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Error Message */}
        {errors.general && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {errors.general}
          </div>
        )}

        {/* Name Input */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-lg ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Enter menu item name"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        {/* Price Input */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-lg ${errors.price ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Enter price"
            step="0.01"
          />
          {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
        </div>

        {/* Image Input */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Image</label>
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border rounded-lg"
            accept="image/*"
          />
        </div>

        {/* Description Input */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            placeholder="Enter description (optional)"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            {isSubmitting ? 'Updating...' : 'Update Menu Item'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditMenuForm;