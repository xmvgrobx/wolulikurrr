import React from 'react'
import CreateStok from '@/components/stok/create-stok'

const CreateStokPage = () => {
  return (
    <div className='max-e-md mx-auto mt-5'>
        <h1 className='text-2xl text-center mb-2 '>Add New Stok</h1>
        <CreateStok/>
    </div>
  )
}

export default CreateStokPage