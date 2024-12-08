// // components/TransactionList.tsx
// import { useState } from 'react';
// import { Transaction } from '@prisma/client';
// import TransactionModal from './TransactionModal';

// interface TransactionListProps {
//   transactions: Transaction[];
//   onTransactionUpdated: (updatedTransaction: Transaction) => void;
//   onTransactionDeleted: (transactionId: string) => void;
// }

// const TransactionList: React.FC<TransactionListProps> = ({
//   transactions,
//   onTransactionUpdated,
//   onTransactionDeleted,
// }) => {
//   const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
//   const [isModalVisible, setIsModalVisible] = useState(false);

//   const handleEdit = (transaction: Transaction) => {
//     setSelectedTransaction(transaction);
//     setIsModalVisible(true);
//   };

//   const handleDelete = async (transactionId: string) => {
//     try {
//       const response = await fetch(`/api/transactions/${transactionId}`, {
//         method: 'DELETE',
//       });

//       if (!response.ok) {
//         throw new Error('Failed to delete transaction');
//       }

//       onTransactionDeleted(transactionId);
//     } catch (error) {
//       console.error('Error deleting transaction:', error);
//       alert('Failed to delete transaction');
//     }
//   };

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-4">Transactions</h2>
//       <table className="w-full border-collapse">
//         <thead>
//           <tr>
//             <th className="p-2 border text-left">ID</th>
//             <th className="p-2 border text-left">Payment Method</th>
//             <th className="p-2 border text-left">Total</th>
//             <th className="p-2 border text-left">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {transactions.map((transaction) => (
//             <tr key={transaction.id}>
//               <td className="p-2 border">{transaction.id}</td>
//               <td className="p-2 border">{transaction.paymentMethod}</td>
//               <td className="p-2 border">
//                 ${(transaction.items.reduce((total, item) => total + item.price * item.quantity, 0) - transaction.discount).toFixed(2)}
//               </td>
//               <td className="p-2 border">
//                 <button
//                   className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2"
//                   onClick={() => handleEdit(transaction)}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                   onClick={() => handleDelete(transaction.id)}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {selectedTransaction && (
//         <TransactionModal
//           visible={isModalVisible}
//           transaction={selectedTransaction}
//           onClose={() => setIsModalVisible(false)}
//           onUpdate={onTransactionUpdated}
//         />
//       )}
//     </div>
//   );
// };

// export default TransactionList;