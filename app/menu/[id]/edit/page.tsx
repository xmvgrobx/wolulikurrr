import { prisma } from '@/lib/prisma';
import EditMenuForm from '@/components/menu/edit-menu';
import { notFound } from 'next/navigation';

export default async function EditMenuPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const menu = await prisma.menu.findUnique({
    where: { id: params.id }
  });

  if (!menu) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <EditMenuForm initialMenu={menu} />
    </div>
  );
}