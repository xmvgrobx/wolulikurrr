import React from 'react'
import Image from 'next/image'
import { DeleteMenu } from '@/components/buttons'
import type { Menu } from "@prisma/client"
import { formatCurrency } from '@/lib/utils'

const MenuCard = ({ data }: { data: Menu }) => {
    return (
        <div className="w-64 border border-gray-200 rounded-lg shadow-lg">
  {/* Bagian Gambar Produk */}
  <div className="relative w-full h-48">
    <Image
      src={data.fotoUrl}
      alt={data.name}
      fill
      priority
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className="rounded-t-lg object-cover"
    />
  </div>

  {/* Nama Produk */}
  <div className="px-4 py-2">
    <h1 className="text-xl font-semibold text-gray-900 truncate text-center">
      {data.name}
    </h1>
  </div>

  {/* Harga Produk */}
  <div className="px-4 py-2">
    <h2 className="text-center text-lg font-medium text-gray-700">
      {formatCurrency(data.price)}
    </h2>
  </div>

  {/* Tombol Edit dan Delete */}
  <div className="px-4 py-2 flex justify-center space-x-4">
    {/* {/* <EditMenu id={data.id} /> */}
    <DeleteMenu id={data.id} /> 
  </div>
</div>

    )
}

export default MenuCard