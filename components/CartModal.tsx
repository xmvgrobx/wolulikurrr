import React from 'react';
import { formatCurrency } from '@/lib/utils';
import { X } from 'lucide-react';

const CartModal = ({
  cartItems,
  removeFromCart,
  clearCart,
  onClose,
  onCheckout,
}) => {
  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Your Cart</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-center py-4">Your cart is empty</p>
        ) : (
          <>
            <div className="max-h-96 overflow-y-auto">
              {cartItems.map((item) => (
                <div 
                  key={item.id} 
                  className="flex justify-between items-center py-4 border-b"
                >
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      {formatCurrency(item.price)} x {item.quantity}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="font-medium">
                      {formatCurrency(item.price * item.quantity)}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between items-center font-bold text-lg">
                <span>Total:</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              
              <div className="flex gap-4 mt-6">
                <button
                  onClick={clearCart}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                >
                  Clear Cart
                </button>
                <button
                  onClick={onCheckout}
                  className="flex-1 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                >
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartModal;