import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [products, setProducts] = useState([]);
  const API_URL = process.env.NEXT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/products`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="container">
      <h1 className="title">Our Products</h1>
      <div className="product-list">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="product-card">
              <img
                src={`${API_URL}/uploads/${product.image}`}
                alt={product.name}
                className="product-image"
              />
              <div className="product-details">
                <h2 className="product-name">{product.name}</h2>
                <p className="product-description">{product.description}</p>
                <p className="product-price">
                  Rp. {Number(product.price).toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </p>
                <p className="product-category">Category: {product.category || 'N/A'}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="no-products">No products available.</p>
        )}
      </div>

      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          font-family: Arial, sans-serif;
        }

        .title {
          text-align: center;
          font-size: 2.5rem;
          color: #333;
          margin-bottom: 30px;
        }

        .product-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }

        .product-card {
          background: #fff;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          transition: transform 0.3s ease;
        }

        .product-card:hover {
          transform: translateY(-5px);
        }

        .product-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }

        .product-details {
          padding: 15px;
        }

        .product-name {
          font-size: 1.5rem;
          color: #222;
          margin: 0 0 10px;
        }

        .product-description {
          font-size: 1rem;
          color: #666;
          margin: 0 0 10px;
        }

        .product-price {
          font-size: 1.2rem;
          color: #e91e63;
          font-weight: bold;
          margin: 0 0 10px;
        }

        .product-category {
          font-size: 0.9rem;
          color: #888;
          margin: 0;
        }

        .no-products {
          text-align: center;
          font-size: 1.2rem;
          color: #666;
          padding: 20px;
          grid-column: 1 / -1;
        }

        /* Responsif untuk Tablet (max-width: 768px) - 2 kolom */
        @media (max-width: 768px) {
          .product-list {
            grid-template-columns: repeat(2, 1fr); /* Pastikan 2 kolom */
          }

          .title {
            font-size: 2rem;
          }

          .product-name {
            font-size: 1.3rem;
          }

          .product-image {
            height: 150px;
          }

          .product-card {
            margin: 0;
          }
        }

        /* Responsif untuk Mobile Kecil (max-width: 480px) - 1 kolom */
        @media (max-width: 480px) {
          .product-list {
            grid-template-columns: 1fr; /* 1 kolom */
          }

          .title {
            font-size: 1.8rem;
          }

          .product-image {
            height: 180px;
          }

          .product-card {
            margin: 0 10px;
          }
        }
      `}</style>
    </div>
  );
}