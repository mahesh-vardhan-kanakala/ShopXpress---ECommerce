import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, TrendingUp, Package } from 'lucide-react';
import { ProductList } from './ProductList';

export const Home: React.FC = () => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl">
        <div className="absolute inset-0 bg-grid-white/[0.1] bg-[length:16px_16px]" />
        <div className="relative px-4 py-24 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              Welcome to <span className="text-blue-200">ShopXpress</span>
            </h1>
            <p className="max-w-2xl mx-auto mt-6 text-xl text-blue-100">
              Discover amazing products at unbeatable prices. Shop with confidence and enjoy our
              premium selection.
            </p>
            <div className="flex justify-center gap-4 mt-10">
              <Link
                to="/category/electronics"
                className="px-6 py-3 text-base font-semibold text-blue-600 transition-colors bg-white rounded-md shadow-sm hover:bg-blue-50"
              >
                Shop Electronics
              </Link>
              <Link
                to="/category/jewelery"
                className="px-6 py-3 text-base font-semibold text-white transition-colors bg-blue-500 rounded-md shadow-sm hover:bg-blue-400"
              >
                View Jewelry
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-200"></div>
              <div className="relative p-6 bg-white rounded-lg">
                <ShoppingBag className="w-8 h-8 mb-4 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Quality Products</h3>
                <p className="mt-2 text-gray-600">
                  Carefully curated selection of premium products from trusted brands.
                </p>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-200"></div>
              <div className="relative p-6 bg-white rounded-lg">
                <TrendingUp className="w-8 h-8 mb-4 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Best Deals</h3>
                <p className="mt-2 text-gray-600">
                  Unbeatable prices and exclusive offers on trending items.
                </p>
              </div>
            </div>
            <div className="relative group sm:col-span-2 lg:col-span-1">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-200"></div>
              <div className="relative p-6 bg-white rounded-lg">
                <Package className="w-8 h-8 mb-4 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Fast Delivery</h3>
                <p className="mt-2 text-gray-600">
                  Quick and reliable shipping to your doorstep.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-12 bg-gray-50 rounded-2xl">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <h2 className="mb-8 text-3xl font-bold text-gray-900">Featured Categories</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                name: "Electronics",
                image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=500",
                link: "/category/electronics"
              },
              {
                name: "Jewelry",
                image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=500",
                link: "/category/jewelery"
              },
              {
                name: "Men's Fashion",
                image: "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?auto=format&fit=crop&q=80&w=500",
                link: "/category/men's clothing"
              },
              {
                name: "Women's Fashion",
                image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=500",
                link: "/category/women's clothing"
              }
            ].map((category) => (
              <Link
                key={category.name}
                to={category.link}
                className="relative overflow-hidden transition-shadow bg-white rounded-lg shadow-md group hover:shadow-xl"
              >
                <div className="aspect-w-3 aspect-h-2">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="object-cover w-full h-48 transition-transform duration-200 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-xl font-semibold text-white">{category.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <h2 className="mb-8 text-3xl font-bold text-gray-900">Featured Products</h2>
          <ProductList limit={8} />
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="overflow-hidden bg-blue-600 rounded-2xl">
        <div className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative">
            <div className="sm:text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Get the latest updates
              </h2>
              <p className="max-w-2xl mx-auto mt-6 text-lg text-blue-100">
                Subscribe to our newsletter for exclusive deals and new arrivals.
              </p>
              <form className="mt-8 sm:flex sm:max-w-md sm:mx-auto">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  type="email"
                  name="email-address"
                  id="email-address"
                  autoComplete="email"
                  required
                  className="w-full px-5 py-3 placeholder-gray-500 rounded-md focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-700 focus:outline-none"
                  placeholder="Enter your email"
                />
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <button
                    type="submit"
                    className="flex items-center justify-center w-full px-5 py-3 text-base font-medium text-blue-600 bg-white border border-transparent rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-700 sm:w-auto"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};