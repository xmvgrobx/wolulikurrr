import React, { useState, useEffect } from 'react';
import { formatCurrency } from '@/lib/utils';
import { CheckoutFormProps } from '@/lib/utils';

type PaymentMethodType = 'CASH' | 'QRIS';

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  cartItems,
  onClose,
  onSuccess,
}) => {
  const [note, setNote] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('CASH');
  const [cashAmount, setCashAmount] = useState<string>('');
  const [referralCode, setReferralCode] = useState<string>('');
  const [referralDiscount, setReferralDiscount] = useState<number>(0);
  const [referralValid, setReferralValid] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // Calculate total
  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  // Calculate change for cash payments
  const change =
    paymentMethod === 'CASH' && cashAmount
      ? Math.max(0, parseFloat(cashAmount) - total * (1 - referralDiscount / 100))
      : 0;

  // Suggested cash amounts
  const suggestedAmounts = [
    Math.ceil(total / 20000) * 20000, // Dibulatkan ke kelipatan 20 ribu
    Math.ceil(total / 40000) * 40000, // Dibulatkan ke kelipatan 40 ribu
    Math.ceil(total / 50000) * 50000, // Dibulatkan ke kelipatan 50 ribu
    Math.ceil(total / 100000) * 100000 // Dibulatkan ke kelipatan 100 ribu
  ];

  // Apply referral discount
  const discountedTotal = referralValid ? total * (1 - referralDiscount / 100) : total;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (paymentMethod === 'CASH' && parseFloat(cashAmount) < discountedTotal) {
      alert('Insufficient cash amount');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/transaction/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cartItems.map((item) => ({
            ...item,
            price: Number(item.price),
          })),
          note,
          paymentMethod,
          cashAmount: paymentMethod === 'CASH' ? parseFloat(cashAmount) : null,
          change: paymentMethod === 'CASH' ? change : null,
          referralCode: referralValid ? referralCode : null,
          discount: referralValid ? referralDiscount : 0,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create transaction');
      }

      onSuccess();
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Error processing checkout');
    } finally {
      setLoading(false);
    }
  };

  // Check referral code validity
  useEffect(() => {
    const checkReferralCode = async () => {
      try {
        const response = await fetch(`/api/referral/check/${referralCode}`);
        if (response.ok) {
          const { isValid, discount } = await response.json();
          setReferralValid(isValid);
          setReferralDiscount(discount);
        } else {
          setReferralValid(false);
          setReferralDiscount(0);
        }
      } catch (error) {
        console.error('Error checking referral code:', error);
        setReferralValid(false);
        setReferralDiscount(0);
      }
    };

    if (referralCode) {
      checkReferralCode();
    } else {
      setReferralValid(false);
      setReferralDiscount(0);
    }
  }, [referralCode]);


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl h-full flex flex-col lg:flex-row">
        {/* Bagian Form Utama */}
        <div className="p-6 flex-1 overflow-y-auto">
          <form onSubmit={handleSubmit}>
            <h2 className="text-xl font-bold mb-4">Checkout</h2>
  
            {/* Referral Code Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Referral Code
              </label>
              <div className="flex items-center">
                <input
                  type="text"
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Enter referral code"
                />
                {referralValid && (
                  <span className="ml-2 text-green-600">
                    {referralDiscount}% discount applied
                  </span>
                )}
                {!referralValid && referralCode && (
                  <span className="ml-2 text-red-600">
                    Invalid referral code
                  </span>
                )}
              </div>
            </div>
  
            {/* Order Summary */}
            <div className="border-t pt-4">
              <h3 className="font-medium mb-2">Order Summary</h3>
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between text-sm mb-1">
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span>{formatCurrency(item.price * item.quantity)}</span>
                </div>
              ))}
              <div className="border-t pt-2 mt-2 font-bold flex justify-between">
                <span>Subtotal:</span>
                <span>{formatCurrency(total)}</span>
              </div>
              {referralDiscount > 0 && (
                <div className="border-t pt-2 mt-2 font-bold flex justify-between">
                  <span>Discount:</span>
                  <span className="text-green-600">
                    -{formatCurrency(total * (referralDiscount / 100))}
                  </span>
                </div>
              )}
              <div className="border-t pt-2 mt-2 font-bold flex justify-between">
                <span>Total:</span>
                <span>{formatCurrency(discountedTotal)}</span>
              </div>
            </div>
  
            {/* Tombol Submit dalam Form */}
            <div className="flex gap-4 mt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                disabled={
                  loading || 
                  (paymentMethod === 'CASH' && (!cashAmount || parseFloat(cashAmount) < discountedTotal))
                }
              >
                {loading ? 'Processing...' : 'Complete Order'}
              </button>
            </div>
          </form>
        </div>
  
        {/* Bagian Metode Pembayaran */}
        <div className="p-6 flex-1 bg-gray-50 rounded-r-lg overflow-y-auto">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Payment Method
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="CASH"
                  checked={paymentMethod === 'CASH'}
                  onChange={(e) =>
                    setPaymentMethod(e.target.value as PaymentMethodType)
                  }
                  className="mr-2"
                />
                Cash
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="QRIS"
                  checked={paymentMethod === 'QRIS'}
                  onChange={(e) =>
                    setPaymentMethod(e.target.value as PaymentMethodType)
                  }
                  className="mr-2"
                />
                QRIS
              </label>
            </div>
          </div>
  
          {paymentMethod === 'CASH' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quick Amount Selection
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {suggestedAmounts.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => setCashAmount(amount.toString())}
                      className="px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 text-sm"
                    >
                      {formatCurrency(amount)}
                    </button>
                  ))}
                </div>
              </div>
  
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cash Amount
                </label>
                <input
                  type="number"
                  value={cashAmount}
                  onChange={(e) => setCashAmount(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Enter cash amount"
                />
              </div>
  
              {parseFloat(cashAmount) > 0 && (
                <div className="bg-white p-4 rounded-lg space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Total Bill:</span>
                    <span>{formatCurrency(total)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Cash Amount:</span>
                    <span>{formatCurrency(parseFloat(cashAmount))}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t pt-2">
                    <span>Change:</span>
                    <span
                      className={
                        change >= 0 ? 'text-green-600' : 'text-red-600'
                      }
                    >
                      {formatCurrency(change)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
  
          {/* Order Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Order Notes
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              rows={2}
              placeholder="Add any special instructions..."
            />
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default CheckoutForm;



// import React, { useState, useEffect } from 'react';
// import { formatCurrency } from '@/lib/utils';

// const CheckoutForm = ({
//   cartItems,
//   onClose,
//   onSuccess
// }) => {
//   const [note, setNote] = useState('');
//   const [paymentMethod, setPaymentMethod] = useState('CASH');
//   const [cashAmount, setCashAmount] = useState('');
//   const [loading, setLoading] = useState(false);

//   // Calculate total
//   const total = cartItems.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );

//   // Calculate change for cash payments
//   const change = paymentMethod === 'CASH' && cashAmount
//     ? Math.max(0, parseFloat(cashAmount) - total)
//     : 0;

//   // Suggested cash amounts
//   const suggestedAmounts = [
//     Math.ceil(total/1000) * 1000, // Round up to nearest 1000
//     Math.ceil(total/10000) * 10000, // Round up to nearest 10000
//     Math.ceil(total/50000) * 50000, // Round up to nearest 50000
//     Math.ceil(total/100000) * 100000 // Round up to nearest 100000
//   ];

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (paymentMethod === 'CASH' && parseFloat(cashAmount) < total) {
//       alert('Insufficient cash amount');
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await fetch('/api/orders', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           items: cartItems,
//           note,
//           paymentMethod,
//           cashAmount: paymentMethod === 'CASH' ? parseFloat(cashAmount) : null,
//           total,
//           change: paymentMethod === 'CASH' ? change : null
//         }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to create order');
//       }

//       onSuccess();
//     } catch (error) {
//       console.error('Checkout error:', error);
//       alert('Error processing checkout');
//     } finally {
//       setLoading(false);
//     }
//   };
