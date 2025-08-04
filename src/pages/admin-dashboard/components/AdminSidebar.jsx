import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const AdminSidebar = ({ onLogout }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isCollapsed, setIsCollapsed] = useState(false);

    const navigationItems = [
        {
            id: 'dashboard',
            label: 'Dashboard',
            icon: 'LayoutDashboard',
            path: '/admin-dashboard'
        },
        {
            id: 'products',
            label: 'Products',
            icon: 'Package',
            path: '/product-management'
        },
        {
            id: 'analytics',
            label: 'Analytics',
            icon: 'BarChart3',
            path: '#',
            disabled: true
        },
        {
            id: 'settings',
            label: 'Settings',
            icon: 'Settings',
            path: '#',
            disabled: true
        }
    ];

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <motion.aside
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className={`fixed left-0 top-0 h-full bg-surface border-r border-border transition-all duration-300 ${
                isCollapsed ? 'w-16' : 'w-64'
            }`}
        >
            <div className="flex flex-col h-full">
                {/* Header */}
                <div className="p-6 border-b border-border">
                    <div className="flex items-center justify-between">
                        {!isCollapsed && (
                            <div>
                                <h2 className="text-xl font-luxury text-gradient-gold">
                                    Admin Panel
                                </h2>
                                <p className="text-sm text-muted-foreground mt-1">
                                    Store Management
                                </p>
                            </div>
                        )}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            className="hover:bg-muted"
                        >
                            <Icon name={isCollapsed ? 'ChevronRight' : 'ChevronLeft'} size={16} />
                        </Button>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-2">
                    {navigationItems?.map((item) => (
                        <motion.button
                            key={item?.id}
                            onClick={() => !item?.disabled && navigate(item?.path)}
                            disabled={item?.disabled}
                            whileHover={{ scale: item?.disabled ? 1 : 1.02 }}
                            whileTap={{ scale: item?.disabled ? 1 : 0.98 }}
                            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                                isActive(item?.path)
                                    ? 'bg-primary text-primary-foreground shadow-luxury'
                                    : item?.disabled
                                    ? 'text-muted-foreground cursor-not-allowed opacity-50'
                                    : 'text-foreground hover:bg-muted hover:text-primary'
                            }`}
                        >
                            <Icon 
                                name={item?.icon} 
                                size={20} 
                                className={isActive(item?.path) ? 'text-primary-foreground' : ''}
                            />
                            {!isCollapsed && (
                                <span className="font-medium">
                                    {item?.label}
                                </span>
                            )}
                        </motion.button>
                    ))}
                </nav>

                {/* Footer */}
                <div className="p-4 border-t border-border">
                    <Button
                        onClick={onLogout}
                        variant="outline"
                        fullWidth={!isCollapsed}
                        size={isCollapsed ? 'icon' : 'default'}
                        iconName="LogOut"
                        iconPosition="left"
                        className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
                    >
                        {!isCollapsed && 'Logout'}
                    </Button>
                </div>
            </div>
        </motion.aside>
    );
};

export default AdminSidebar;