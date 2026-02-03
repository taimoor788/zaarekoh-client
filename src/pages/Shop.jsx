import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { BASE_URL } from '../utils/config';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/products`);
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-primary)' }}>Loading...</div>;
  }

  return (
    <div className="container" style={{ padding: '2rem 1rem 4rem' }}>
      <h2 style={{
        fontSize: '2rem',
        marginBottom: '2rem',
        textAlign: 'center',
        color: 'var(--color-text-primary)'
      }}>
        Latest Collection
      </h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '2rem'
      }}>
        {products.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Shop;
