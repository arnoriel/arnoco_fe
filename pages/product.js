import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Product() {
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(null);
    const [editId, setEditId] = useState(null);

    // Cek apakah token ada saat halaman dimuat
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/products');
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
        if (image) formData.append('image', image);

        try {
            if (editId) {
                // Update product
                await axios.put(`http://localhost:5000/api/products/${editId}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            } else {
                // Create product
                await axios.post('http://localhost:5000/api/products', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            }
            fetchProducts();
            resetForm();
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
        // Gambar tidak diubah di sini untuk kesederhanaan
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/products/${id}`);
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const resetForm = () => {
        setName('');
        setDescription('');
        setPrice('');
        setCategory('');
        setImage(null);
        setEditId(null);
    };

    return (
        <div>
            <h1>Product Management</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
                <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                />
                <button type="submit">{editId ? 'Update' : 'Create'} Product</button>
            </form>

            <h2>Product List</h2>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        <img src={`http://localhost:5000/uploads/${product.image}`} alt={product.name} width="100" />
                        <p>{product.name}
                            <p className="product-price">
                                Rp. {Number(product.price).toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                            </p>
                            {product.category}
                        </p>
                        <button onClick={() => handleEdit(product)}>Edit</button>
                        <button onClick={() => handleDelete(product.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}