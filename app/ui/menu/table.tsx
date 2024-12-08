// FIX BGT YG INI
import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';
import DeleteButton from '@/components/menu/delete-menu';
import { formatCurrency } from '@/lib/utils';

export default async function MenuPage() {
  const menus = await prisma.menu.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Our Menu</h1>
        <Link 
          href="/menu/create" 
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Add New Menu
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menus.map((menu) => (
          <div 
            key={menu.id} 
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <Image 
              src={menu.fotoUrl} 
              alt={menu.name}
              width={400}
              height={300}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{menu.name}</h2>
              <p className="text-gray-600 mb-2">{menu.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-yellow-600">
                {formatCurrency(menu.price)}
                                </span>
                <div className="flex space-x-2">
                  <Link 
                    href={`/menu/${menu.id}/edit`}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </Link>
                  <DeleteButton id={menu.id} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}