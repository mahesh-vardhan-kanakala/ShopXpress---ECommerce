import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { dispatch } = useCart();
  const navigate = useNavigate(); // For navigation
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // State for success message

  // Function to add to cart and redirect with success message
  const addToCartAndRedirect = (product: Product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
    setSuccessMessage('Added to cart successfully!');
    setTimeout(() => {
      setSuccessMessage(null); // Hide message after a few seconds
      navigate('/cart'); // Redirect to the cart page
    }, 2000);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative pb-[100%]">
          <img
            src={product.image}
            alt={product.title}
            className="absolute inset-0 object-contain w-full h-full p-4"
          />
        </div>
        <div className="p-4">
          <h3 className="mb-2 text-lg font-semibold line-clamp-2">{product.title}</h3>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="ml-1 text-sm text-gray-600">
                {product.rating.rate} ({product.rating.count})
              </span>
            </div>
          </div>
          <p className="mb-4 text-sm text-gray-600 line-clamp-2">{product.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold">${product.price}</span>
          </div>
        </div>
      </Link>

      {/* Success message */}
      {successMessage && (
        <div className="p-2 mb-4 text-green-700 bg-green-100 border border-green-300 rounded-md">
          {successMessage}
        </div>
      )}

      <div className="px-4 pb-4">
        <button
          onClick={() => addToCartAndRedirect(product)} // Use the updated function for add to cart
          className="w-full px-4 py-2 text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};
