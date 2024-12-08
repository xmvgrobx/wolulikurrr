// import React from "react";
// import { prisma } from "@/lib/prisma";
// import type { TransactionItem } from "@prisma/client";
// // import { EditStok, DeleteStok } from "@/components/buttons";
// // import  DetailStok from "@/components/stok/detail-stok";
// import { formatDate, formatCurrency } from "@/lib/utils";

// async function getTransaction(): Promise<TransactionItem[]> {
//   const st = await prisma.transactionItem.findMany();
//   return st;
// }

// const TransactionTable = async () => {
//   const st = await getTransaction();

//   return (
//     <table className="w-full text-sm text-left bg-white text-gray-500">
//       <thead className="text-sm text-gray-700 uppercase bg-white-50">
//         <tr>
//           <th className="py-3 px-6">Nama</th>
//           <th className="py-3 px-6">Jumlah</th>
//           <th className="py-3 px-6">Harga</th>
//           <th className="py-3 px-6 text-center">Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         {st.map((s) => (
//           <tr key={s.id} className="bg-white border-b">
//             {/* <td className="py-3 px-6">{formatDate(s.createdAt.toString())}</td> */}
//             <td className="py-3 px-6">{s.menuId}</td>
//             <td className="py-3 px-6">{s.quantity}</td>
//             {/* <td className="py-3 px-6">{s.price}</td> */}

//             {/* <td className="flex justify-center gap-1 py-3">
//               <DetailStok id={s.id}/>
//               <EditStok id={s.id}/>
//               <DeleteStok id={s.id}/>
//             </td> */}
//           </tr>

//         )
//         )}


//       </tbody>
//     </table>
//   );
// };

// export default TransactionTable;

import React from "react";
import { prisma } from "@/lib/prisma";
import { formatDate, formatCurrency } from "@/lib/utils";

async function getTransactionsWithItems() {
  const transactions = await prisma.transaction.findMany({
    include: {
      items: true, // Mengambil data dari relasi TransactionItem
    },
  });
  return transactions;
}

const TransactionTable = async () => {
  const transactions = await getTransactionsWithItems();

  return (
    <table className="w-full text-sm text-left bg-white text-gray-500">
      <thead className="text-sm text-gray-700 uppercase bg-white-50">
        <tr>
          <th className="py-3 px-6">Transaction ID</th>
          <th className="py-3 px-6">Created At</th>
          <th className="py-3 px-6">Referral</th>
          <th className="py-3 px-6">Quantity</th>
          <th className="py-3 px-6">Price</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => (
          transaction.items.map((item) => (
            <tr key={item.id} className="bg-white border-b">
              <td className="py-3 px-6">{transaction.id}</td>
              <td className="py-3 px-6">{formatDate(transaction.createdAt.toString())}</td>
              <td className="py-3 px-6">{transaction.referralCode || "-"}</td>
              <td className="py-3 px-6">{item.quantity}</td>
              <td className="py-3 px-6">{formatCurrency(item.price.toNumber())}</td>
              </tr>
          ))
        ))}
      </tbody>
    </table>
  );
};

export default TransactionTable;
