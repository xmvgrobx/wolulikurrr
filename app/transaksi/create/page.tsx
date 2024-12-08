// app/transaction/page.js
import { prisma } from '@/lib/prisma';
import TransactionMenu from '@/components/TransactionModal';

export default async function TransactionPage() {
  const menus = await prisma.menu.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return <TransactionMenu menus={menus} />;
}