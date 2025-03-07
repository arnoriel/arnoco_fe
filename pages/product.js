import { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from './layouts/admin';

export default function Product() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [size, setSize] = useState('');
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [editId, setEditId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State untuk modal delete
  const [deleteId, setDeleteId] = useState(null); // State untuk menyimpan ID produk yang akan dihapus
  const [search, setSearch] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [search]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products', {
        params: { search }
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('stock', stock);
    formData.append('size', size);
    
    if (image) {
      formData.append('image', image);
    } else if (editId && existingImage) {
      formData.append('image', existingImage);
    }

    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/products/${editId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        await axios.post('http://localhost:5000/api/products', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
      fetchProducts();
      resetForm();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleEdit = (product) => {
    setEditId(product.id);
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price);
    setCategory(product.category);
    setStock(product.stock);
    setSize(product.size);
    setImage(null);
    setImagePreview(null);
    setExistingImage(product.image);
    setIsModalOpen(true);
  };

  const openDeleteModal = (id) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${deleteId}`);
      fetchProducts();
      setIsDeleteModalOpen(false);
      setDeleteId(null);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setPrice('');
    setCategory('');
    setStock('');
    setSize('');
    setImage(null);
    setImagePreview(null);
    setExistingImage('');
    setEditId(null);
  };

  const openCreateModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  return (
    <AdminLayout>
      <div className="product-content-wrapper">
        <div className="product-header">
          <h1>Product Management</h1>
        </div>

        <section className="product-list-section">
          <div className="product-list-header">
            <h2>Product List</h2>
            <div className="search-and-create">
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-input"
              />
              <button className="create-button" onClick={openCreateModal}>
                + Create New Product
              </button>
            </div>
          </div>
          <div className="product-table-wrapper">
            <table className="product-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price (Rp)</th>
                  <th>Category</th>
                  <th>Stock</th>
                  <th>Size</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <img
                        src={`http://localhost:5000/uploads/${product.image}`}
                        alt={product.name}
                        className="product-image"
                      />
                    </td>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>
                      Rp. {Number(product.price).toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                    </td>
                    <td>{product.category}</td>
                    <td>{product.stock}</td>
                    <td>{product.size}</td>
                    <td>
                      <div className="product-actions">
                        <button onClick={() => handleEdit(product)} className="edit-button">
                          Edit
                        </button>
                        <button onClick={() => openDeleteModal(product.id)} className="delete-button">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Modal untuk Create/Edit */}
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>{editId ? 'Edit Product' : 'Create New Product'}</h2>
              <form onSubmit={handleSubmit} className="product-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Price (Rp)</label>
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Category</label>
                    <input
                      type="text"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Stock</label>
                    <input
                      type="number"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Size</label>
                    <input
                      type="text"
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group image-group">
                    <label>Image</label>
                    {editId && existingImage && !imagePreview && (
                      <div className="existing-image-preview">
                        <p>Current Image:</p>
                        <img
                          src={`http://localhost:5000/uploads/${existingImage}`}
                          alt="Current product"
                          className="preview-image"
                        />
                      </div>
                    )}
                    {!editId && imagePreview && (
                      <div className="image-preview">
                        <p>Preview:</p>
                        <img
                          src={imagePreview}
                          alt="New product preview"
                          className="preview-image"
                        />
                      </div>
                    )}
                    <input
                      type="file"
                      onChange={handleImageChange}
                      accept="image/*"
                    />
                  </div>
                </div>
                <div className="modal-actions">
                  <button type="submit" className="submit-button">
                    {editId ? 'Update Product' : 'Create Product'}
                  </button>
                  <button
                    type="button"
                    className="cancel-button"
                    onClick={() => {
                      setIsModalOpen(false);
                      resetForm();
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal untuk Delete Confirmation */}
        {isDeleteModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content delete-modal">
              <h2>Confirm Delete</h2>
              <p>Are you sure you want to delete this product?</p>
              <div className="modal-actions">
                <button onClick={handleDelete} className="delete-confirm-button">
                  Yes, Delete
                </button>
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="cancel-button"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .search-and-create {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .search-input {
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 5px;
          font-size: 1rem;
          width: 200px;
        }

        .search-input:focus {
          outline: none;
          border-color: black;
        }

        .product-content-wrapper {
          width: 100%;
        }

        .product-header h1 {
          color: #333;
          font-size: 2rem;
          margin-bottom: 2rem;
        }

        .product-list-section {
          background: white;
          padding: 2rem;
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .product-list-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .product-list-header h2 {
          color: #333;
          margin: 0;
        }

        .create-button {
          padding: 0.75rem 1rem;
          background: black;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .create-button:hover {
          background: grey;
        }

        .product-table-wrapper {
          overflow-x: auto;
        }

        .product-table {
          width: 100%;
          border-collapse: collapse;
        }

        .product-table th,
        .product-table td {
          padding: 0.75rem;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }

        .product-table th {
          background: #f5f5f5;
          color: #333;
          font-weight: 600;
        }

        .product-table td {
          color: #666;
        }

        .product-image {
          width: 80px;
          height: 80px;
          object-fit: cover;
          border-radius: 5px;
        }

        .product-actions {
          display: flex;
          gap: 0.5rem;
        }

        .edit-button,
        .delete-button {
          flex: 1;
          padding: 0.5rem;
          border-radius: 5px;
          cursor: pointer;
          transition: background 0.3s ease;
          font-size: 0.9rem;
        }

        .edit-button {
          background: black;
          color: white;
          border: none;
        }

        .edit-button:hover {
          background: grey;
        }

        .delete-button {
          background: white;
          color: black;
          border: 1px solid black;
        }

        .delete-button:hover {
          background: #f5f5f5;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .modal-content {
          background: white;
          padding: 2rem;
          border-radius: 10px;
          width: 90%;
          max-width: 900px;
          position: relative;
        }

        .modal-content h2 {
          color: #333;
          margin-bottom: 1.5rem;
          text-align: center;
        }

        .product-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .form-row {
          display: flex;
          gap: 1rem;
          justify-content: space-between;
        }

        .form-group {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .form-group label {
          color: #333;
          font-size: 0.9rem;
          margin-bottom: 0.25rem;
        }

        .form-group input,
        .form-group textarea {
          padding: 0.5rem;
          border: 1px solid #ddd;
          border-radius: 5px;
          font-size: 1rem;
          transition: border-color 0.3s ease;
        }

        .form-group textarea {
          height: 80px;
          resize: vertical;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: black;
        }

        .image-group {
          flex: 2;
        }

        .existing-image-preview,
        .image-preview {
          margin-bottom: 10px;
        }

        .existing-image-preview p,
        .image-preview p {
          color: #666;
          font-size: 0.9rem;
          margin-bottom: 5px;
        }

        .preview-image {
          max-width: 100px;
          max-height: 100px;
          object-fit: cover;
          border-radius: 5px;
        }

        .modal-actions {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
          justify-content: center;
        }

        .submit-button,
        .cancel-button,
        .delete-confirm-button {
          padding: 0.75rem 2rem;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .submit-button {
          background: black;
          color: white;
        }

        .submit-button:hover {
          background: grey;
        }

        .cancel-button {
          background: #f5f5f5;
          color: #333;
          border: 1px solid #ddd;
        }

        .cancel-button:hover {
          background: #e5e5e5;
        }

        .delete-modal {
          max-width: 400px; /* Modal delete lebih kecil */
          text-align: center;
        }

        .delete-modal p {
          color: #666;
          margin-bottom: 1.5rem;
        }

        .delete-confirm-button {
          background: black;
          color: white;
        }

        .delete-confirm-button:hover {
          background: gray;
        }
      `}</style>
    </AdminLayout>
  );
}