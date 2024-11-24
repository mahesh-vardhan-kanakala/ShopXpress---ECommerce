import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Package } from 'lucide-react';

export const Cart: React.FC = () => {
  const { state, dispatch } = useCart();
  const navigate = useNavigate(); // For redirecting to cart
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // To show success message

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const addToCartAndRedirect = (item: any) => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
    setSuccessMessage('Added to cart successfully!');
    setTimeout(() => {
      setSuccessMessage(null); // Hide message after a few seconds
      navigate('/cart'); // Redirect to cart page
    }, 2000);
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center">
        <Package className="w-16 h-16 mb-4 text-gray-400" />
        <h2 className="mb-4 text-2xl font-semibold text-gray-900">Your cart is empty</h2>
        <p className="text-gray-600">Add some products to your cart to see them here.</p>
        <Link
          to="/products"
          className="inline-flex items-center px-4 py-2 mt-6 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="mb-6 text-2xl font-semibold text-gray-900">Shopping Cart</h2>

      {/* Show Success Message */}
      {successMessage && (
        <div className="p-2 mb-4 text-green-700 bg-green-100 border border-green-300 rounded-md">
          {successMessage}
        </div>
      )}

      <div className="divide-y divide-gray-200">
        {state.items.map((item) => (
          <div key={item.id} className="py-6 group">
            <div className="flex items-center">
              <Link 
                to={`/product/${item.id}`}
                className="flex items-center flex-1 p-4 transition-colors duration-200 rounded-lg group-hover:bg-gray-50"
              >
                <div className="relative flex-shrink-0 w-24 h-24 overflow-hidden transition-colors duration-200 border border-gray-200 rounded-md group-hover:border-blue-200">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="object-contain object-center w-full h-full p-2 transition-transform duration-200 group-hover:scale-110"
                  />
                </div>
                <div className="flex-1 ml-6">
                  <h3 className="text-lg font-medium text-gray-900 transition-colors duration-200 group-hover:text-blue-600">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 line-clamp-2">{item.description}</p>
                  <p className="mt-1 text-sm font-medium text-gray-900">
                    ${item.price}
                  </p>
                </div>
              </Link>

              <div className="flex items-center ml-6 space-x-4">
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-2 text-gray-600 transition-colors hover:text-gray-800 hover:bg-gray-100 rounded-l-md"
                  >
                    -
                  </button>
                  <span className="w-12 text-center text-gray-800">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-2 text-gray-600 transition-colors hover:text-gray-800 hover:bg-gray-100 rounded-r-md"
                  >
                    +
                  </button>
                </div>

                <div className="w-20 text-right">
                  <p className="text-lg font-medium text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>

                <button
                  onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item.id })}
                  className="p-2 text-gray-400 transition-colors rounded-full hover:text-red-500 hover:bg-red-50"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-8 mt-8 border-t border-gray-200">
        <div className="flex justify-between text-xl font-semibold text-gray-900">
          <span>Total</span>
          <span>${state.total.toFixed(2)}</span>
        </div>
        
        <div className="mt-8 space-y-4">
          <p className="flex items-center text-sm text-gray-500">
            <Package className="w-5 h-5 mr-2" />
            Free shipping on orders over $100
          </p>
          <button className="flex items-center justify-center w-full px-4 py-3 space-x-2 text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700">
            <span>Proceed to Checkout</span>
          </button>
          <Link
            to="/products"
            className="block font-medium text-center text-blue-600 hover:text-blue-700"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};
