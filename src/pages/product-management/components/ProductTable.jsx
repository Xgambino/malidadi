import React from 'react';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ProductTable = ({ products = [], onEdit, onDelete }) => {
    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        })?.format(price || 0);
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date?.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    if (products?.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-card rounded-lg border border-border p-12 text-center"
            >
                <Icon 
                    name="Package" 
                    size={64} 
                    className="text-muted-foreground mx-auto mb-4"
                />
                <h3 className="text-xl font-luxury text-foreground mb-2">
                    No Products Found
                </h3>
                <p className="text-muted-foreground mb-6">
                    Start building your luxury catalog by adding your first product.
                </p>
                <Button onClick={() => onEdit?.(null)} iconName="Plus">
                    Add First Product
                </Button>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-lg border border-border overflow-hidden"
        >
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-muted/50 border-b border-border">
                        <tr>
                            <th className="text-left p-4 font-medium text-foreground">Product</th>
                            <th className="text-left p-4 font-medium text-foreground">Category</th>
                            <th className="text-left p-4 font-medium text-foreground">Price</th>
                            <th className="text-left p-4 font-medium text-foreground">Created</th>
                            <th className="text-center p-4 font-medium text-foreground">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products?.map((product, index) => (
                            <motion.tr
                                key={product?.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="border-b border-border hover:bg-muted/25 transition-colors duration-200"
                            >
                                <td className="p-4">
                                    <div className="flex items-center gap-4">
                                        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-muted border border-border">
                                            <img
                                                src={product?.image || '/assets/images/no_image.png'}
                                                alt={product?.name}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.src = '/assets/images/no_image.png';
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-foreground">
                                                {product?.name}
                                            </h4>
                                            <p className="text-sm text-muted-foreground line-clamp-1">
                                                {product?.description}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                                        {product?.category}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <span className="font-medium text-foreground">
                                        {formatPrice(product?.price)}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <span className="text-muted-foreground">
                                        {formatDate(product?.createdAt)}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center justify-center gap-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => onEdit?.(product)}
                                            iconName="Edit"
                                            className="hover:bg-primary/10 hover:text-primary"
                                        />
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => onDelete?.(product)}
                                            iconName="Trash2"
                                            className="hover:bg-destructive/10 hover:text-destructive"
                                        />
                                    </div>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Table Footer */}
            <div className="bg-muted/25 px-4 py-3 border-t border-border">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>
                        Showing {products?.length} product{products?.length !== 1 ? 's' : ''}
                    </span>
                    <div className="flex items-center gap-2">
                        <Icon name="Package" size={16} />
                        <span>Total Inventory Value: {formatPrice(
                            products?.reduce((sum, product) => sum + (product?.price || 0), 0)
                        )}</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductTable;