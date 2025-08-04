import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import AdminSidebar from '../admin-dashboard/components/AdminSidebar';
import ProductTable from './components/ProductTable';
import ProductForm from './components/ProductForm';
import DeleteConfirmModal from './components/DeleteConfirmModal';

const ProductManagement = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [deleteProduct, setDeleteProduct] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');

    useEffect(() => {
        const adminAuth = localStorage.getItem('adminAuthenticated');
        if (adminAuth !== 'true') {
            navigate('/admin-dashboard');
            return;
        }
        setIsAuthenticated(true);

        // Load products from localStorage
        const savedProducts = localStorage.getItem('adminProducts');
        if (savedProducts) {
            const parsedProducts = JSON.parse(savedProducts);
            setProducts(parsedProducts);
            setFilteredProducts(parsedProducts);
        } else {
            // Initialize with sample data
            const sampleProducts = [
                {
                    id: 1,
                    name: 'Luxury Watch',
                    price: 2500,
                    category: 'Accessories',
                    image: '/assets/images/no_image.png',
                    description: 'Premium luxury timepiece with Swiss movement',
                    createdAt: '2025-01-04'
                },
                {
                    id: 2,
                    name: 'Designer Handbag',
                    price: 1800,
                    category: 'Fashion',
                    image: '/assets/images/no_image.png',
                    description: 'Elegant designer handbag crafted from premium leather',
                    createdAt: '2025-01-03'
                }
            ];
            setProducts(sampleProducts);
            setFilteredProducts(sampleProducts);
            localStorage.setItem('adminProducts', JSON.stringify(sampleProducts));
        }
    }, [navigate]);

    // Filter and sort products
    useEffect(() => {
        let filtered = products?.filter(product =>
            product?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
            product?.category?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
            product?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase())
        ) || [];

        // Sort products
        filtered?.sort((a, b) => {
            let aValue = a?.[sortBy];
            let bValue = b?.[sortBy];

            if (sortBy === 'price') {
                aValue = parseFloat(aValue) || 0;
                bValue = parseFloat(bValue) || 0;
            } else {
                aValue = aValue?.toString()?.toLowerCase() || '';
                bValue = bValue?.toString()?.toLowerCase() || '';
            }

            if (sortOrder === 'asc') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });

        setFilteredProducts(filtered);
    }, [products, searchTerm, sortBy, sortOrder]);

    const handleLogout = () => {
        localStorage.removeItem('adminAuthenticated');
        navigate('/admin-dashboard');
    };

    const handleAddProduct = () => {
        setEditingProduct(null);
        setShowForm(true);
    };

    const handleEditProduct = (product) => {
        setEditingProduct(product);
        setShowForm(true);
    };

    const handleDeleteProduct = (product) => {
        setDeleteProduct(product);
    };

    const confirmDelete = () => {
        if (deleteProduct) {
            const updatedProducts = products?.filter(p => p?.id !== deleteProduct?.id);
            setProducts(updatedProducts);
            localStorage.setItem('adminProducts', JSON.stringify(updatedProducts));
            setDeleteProduct(null);
        }
    };

    const handleSaveProduct = (productData) => {
        if (editingProduct) {
            // Update existing product
            const updatedProducts = products?.map(p =>
                p?.id === editingProduct?.id
                    ? { ...productData, id: editingProduct?.id, updatedAt: new Date()?.toISOString() }
                    : p
            );
            setProducts(updatedProducts);
            localStorage.setItem('adminProducts', JSON.stringify(updatedProducts));
        } else {
            // Add new product
            const newProduct = {
                ...productData,
                id: Date.now(),
                createdAt: new Date()?.toISOString()
            };
            const updatedProducts = [...products, newProduct];
            setProducts(updatedProducts);
            localStorage.setItem('adminProducts', JSON.stringify(updatedProducts));
        }
        setShowForm(false);
        setEditingProduct(null);
    };

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="flex">
                <AdminSidebar onLogout={handleLogout} />
                
                <main className="flex-1 ml-64 p-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-8"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center">
                            <div>
                                <h1 className="text-3xl font-luxury text-gradient-gold">
                                    Product Management
                                </h1>
                                <p className="text-muted-foreground mt-2">
                                    Manage your luxury product catalog
                                </p>
                            </div>
                            
                            <Button
                                onClick={handleAddProduct}
                                iconName="Plus"
                                className="shadow-luxury"
                            >
                                Add New Product
                            </Button>
                        </div>

                        {/* Search and Filters */}
                        <div className="bg-card rounded-lg border border-border p-6">
                            <div className="flex flex-col lg:flex-row gap-4 items-end">
                                <div className="flex-1">
                                    <Input
                                        label="Search Products"
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e?.target?.value)}
                                        placeholder="Search by name, category, or description..."
                                    />
                                </div>
                                
                                <div className="flex gap-4">
                                    <div className="min-w-[120px]">
                                        <label className="text-sm font-medium text-foreground mb-2 block">
                                            Sort By
                                        </label>
                                        <select
                                            value={sortBy}
                                            onChange={(e) => setSortBy(e?.target?.value)}
                                            className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                        >
                                            <option value="name">Name</option>
                                            <option value="price">Price</option>
                                            <option value="category">Category</option>
                                            <option value="createdAt">Date</option>
                                        </select>
                                    </div>
                                    
                                    <div className="min-w-[100px]">
                                        <label className="text-sm font-medium text-foreground mb-2 block">
                                            Order
                                        </label>
                                        <select
                                            value={sortOrder}
                                            onChange={(e) => setSortOrder(e?.target?.value)}
                                            className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                        >
                                            <option value="asc">Ascending</option>
                                            <option value="desc">Descending</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Products Table */}
                        <ProductTable
                            products={filteredProducts}
                            onEdit={handleEditProduct}
                            onDelete={handleDeleteProduct}
                        />
                    </motion.div>
                </main>
            </div>
            {/* Product Form Modal */}
            {showForm && (
                <ProductForm
                    product={editingProduct}
                    onSave={handleSaveProduct}
                    onCancel={() => {
                        setShowForm(false);
                        setEditingProduct(null);
                    }}
                />
            )}
            {/* Delete Confirmation Modal */}
            {deleteProduct && (
                <DeleteConfirmModal
                    product={deleteProduct}
                    onConfirm={confirmDelete}
                    onCancel={() => setDeleteProduct(null)}
                />
            )}
        </div>
    );
};

export default ProductManagement;