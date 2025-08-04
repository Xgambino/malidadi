import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const MetricsCard = ({ 
    title, 
    value, 
    icon, 
    trend, 
    trendUp = true,
    description 
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -2 }}
            className="bg-card rounded-lg border border-border p-6 shadow-elevation-2 hover:shadow-luxury transition-all duration-300"
        >
            <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon 
                        name={icon} 
                        size={24} 
                        className="text-primary"
                    />
                </div>
                {trend && (
                    <div className={`flex items-center gap-1 text-sm font-medium ${
                        trendUp ? 'text-success' : 'text-destructive'
                    }`}>
                        <Icon 
                            name={trendUp ? 'TrendingUp' : 'TrendingDown'} 
                            size={14}
                        />
                        {trend}
                    </div>
                )}
            </div>
            <div className="space-y-1">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                    {title}
                </h3>
                <div className="text-2xl font-bold text-foreground">
                    {value}
                </div>
                {description && (
                    <p className="text-sm text-muted-foreground">
                        {description}
                    </p>
                )}
            </div>
        </motion.div>
    );
};

export default MetricsCard;