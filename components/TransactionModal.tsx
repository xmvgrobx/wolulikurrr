'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import CartModal from './CartModal';
import { Menu } from '@prisma/client';
import CheckoutForm from '@/components/Checkout';
import { CheckoutFormProps } from '@/lib/utils';
// Tipe MenuItem dengan quantity wajib bertipe number
type MenuItem = Omit<Menu, 'quantity'> & { quantity: number };

interface TransactionMenuProps {
  menus: Menu[];
}

export default function TransactionMenu({ menus }: TransactionMenuProps) {
  const [cartItems, setCartItems] = useState<MenuItem[]>([]);
  const [showCart, setShowCart] = useState<boolean>(false);
  const [showCheckout, setShowCheckout] = useState<boolean>(false);

  const addToCart = (menu: Menu) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === menu.id);
      if (existing) {
        return prev.map((item) =>
          item.id === menu.id
            ? { ...item, quantity: item.quantity + 1 } // quantity selalu bertipe number
            : item
        );
      }
      return [...prev, { ...menu, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };
  
  

  const clearCart = () => {
    setCartItems([]);
  };

  const handleCheckout = () => {
    setShowCart(false);
    setShowCheckout(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Menu</h1>
        <button
          onClick={() => setShowCart(true)}
          className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 flex items-center gap-2"
        >
          <ShoppingCart className="w-5 h-5" />
          <span className="font-bold">
            {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
          </span>
        </button>
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
                <button
                  onClick={() => addToCart(menu)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                >
                  Add to Cart
                </button>
              </div>
              {cartItems.find((item) => item.id === menu.id) && (
                <div className="mt-2 text-sm text-gray-500">
                  In cart: {cartItems.find((item) => item.id === menu.id)?.quantity}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {showCart && (
        <CartModal
          cartItems={cartItems}
          removeFromCart={removeFromCart}
          clearCart={clearCart}
          onClose={() => setShowCart(false)}
          onCheckout={handleCheckout}
        />
      )}

      {showCheckout && (
        <CheckoutForm
          cartItems={cartItems}
          onClose={() => setShowCheckout(false)}
          onSuccess={() => {
            setShowCheckout(false);
            clearCart();
            // Tambahkan notifikasi sukses di sini
          }}
        />
      )}
    </div>
  );
}
