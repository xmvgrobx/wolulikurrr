'use client';

import Link from 'next/link';
import { useFormStatus } from 'react-dom';
import clsx from 'clsx';
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { SquarePen, Eye, Trash } from 'lucide-react';

export const EditPegawai = ({ id }: { id: string }) => {
    return (
      <Link
        href={`/pegawai/edit/${id}`}
        className="hover-bg-gray-100 rounded-sm"
      >
        <SquarePen size={20} />
      </Link>
    );
};
  
export const DeletePegawai = ({ id }: { id: string }) => {
    const [isDeleting, setIsDeleting] = useState(false);
  
    const handleDelete = async () => {
      const confirmed = window.confirm('Yakin ingin menghapus pegawai ini?');
      if (!confirmed) return;
  
      setIsDeleting(true); // Mulai proses penghapusan
  
      try {
        const res = await fetch('/api/pegawai/delete', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id }),
        });
  
        if (res.ok) {
          alert('Pegawai berhasil dihapus');
          window.location.reload(); // Reload halaman untuk memperbarui data
        } else {
          const data = await res.json();
          alert(data.error || 'Gagal menghapus pegawai');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Terjadi kesalahan saat menghapus pegawai');
      } finally {
        setIsDeleting(false); // Selesai proses penghapusan
      }
    };
    return (
      <form onSubmit={handleDelete}>
        <button 
          type="submit" 
          className="hover-bg-gray-100 rounded-sm"
          >
          <Trash size={20} className="text-red-500" />
        </button>
      </form>
    );
  };

export const PegawaiAddButton = ({ label }: { label: string }) => {
    const { pending } = useFormStatus();
    const router = useRouter(); 
    const className = clsx(
      'text-white bg-yellow-200 hover:bg-yellow-300 font-medium rounded-lg text-sm w-80 px-5 py-3 text-center',
      {
        'opacity-50 cursor-progress': pending,
      },
    );
  
    const handleSubmit = () => {
      if (!pending) {
        router.push('/pegawai');
      }
    };
  
    return (
      <button
        type="submit"
        className={className}
        disabled={pending}
        onClick={handleSubmit} 
      >
        {label === 'save' ? (
          <span>{pending ? 'Saving...' : 'Save'}</span>
        ) : (
          <span>{pending ? 'Saving...' : 'Save'}</span>
        )}
      </button>
    );
};