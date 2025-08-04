import React from 'react';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const DeleteConfirmModal = ({ product, onConfirm, onCancel }) => {
    if (!product) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="w-full max-w-md bg-card rounded-lg border border-border shadow-luxury"
            >
                <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-destructive/10 rounded-full">
                            <Icon 
                                name="AlertTriangle" 
                                size={24} 
                                className="text-destructive"
                            />
                        </div>
                        <div>
                            <h3 className="text-lg font-luxury text-foreground">
                                Delete Product
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                This action cannot be undone
                            </p>
                        </div>
                    </div>

                    <div className="bg-muted/50 rounded-lg p-4 mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted border border-border">
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
                                <p className="text-sm text-muted-foreground">
                                    ${product?.price} • {product?.category}
                                </p>
                            </div>
                        </div>
                    </div>

                    <p className="text-muted-foreground mb-6">
                        Are you sure you want to delete <strong>"{product?.name}"</strong>? 
                        This will permanently remove the product from your catalog and cannot be recovered.
                    </p>

                    <div className="flex justify-end gap-3">
                        <Button
                            variant="outline"
                            onClick={onCancel}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={onConfirm}
                            iconName="Trash2"
                        >
                            Delete Product
                        </Button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default DeleteConfirmModal;