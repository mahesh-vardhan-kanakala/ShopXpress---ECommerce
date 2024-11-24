import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export const CategoryFilter: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const { category } = useParams();

  useEffect(() => {
    fetch('https://fakestoreapi.com/products/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <Link
        to="/"
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          !category
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        All
      </Link>
      {categories.map((cat) => (
        <Link
          key={cat}
          to={`/category/${cat}`}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            category === cat
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {cat.charAt(0).toUpperCase() + cat.slice(1)}
        </Link>
      ))}
    </div>
  );
};