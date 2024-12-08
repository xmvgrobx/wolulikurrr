'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface DeleteButtonProps {
  id: string;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ id }) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this menu item?')) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/menu/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error);
      }

      await response.json(); // Consume the response body
      router.refresh();
    } catch (error) {
      console.error('Delete error:', error);
      alert(`Failed to delete menu item`);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 disabled:opacity-50"
    >
      {isDeleting ? 'Deleting...' : 'Delete'}
    </button>
  );
};

export default DeleteButton;