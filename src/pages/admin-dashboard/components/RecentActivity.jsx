import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const RecentActivity = ({ activities = [] }) => {
    const getActivityIcon = (type) => {
        switch (type) {
            case 'create':
                return 'Plus';
            case 'update':
                return 'Edit';
            case 'delete':
                return 'Trash2';
            default:
                return 'Activity';
        }
    };

    const getActivityColor = (type) => {
        switch (type) {
            case 'create':
                return 'text-success';
            case 'update':
                return 'text-warning';
            case 'delete':
                return 'text-destructive';
            default:
                return 'text-primary';
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date?.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-card rounded-lg border border-border p-6"
        >
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-luxury text-foreground">
                    Recent Activity
                </h3>
                <Icon 
                    name="Activity" 
                    size={20} 
                    className="text-primary"
                />
            </div>
            <div className="space-y-4">
                {activities?.length > 0 ? (
                    activities?.map((activity, index) => (
                        <motion.div
                            key={activity?.id || index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200"
                        >
                            <div className={`p-2 rounded-full bg-muted ${getActivityColor(activity?.type)}`}>
                                <Icon 
                                    name={getActivityIcon(activity?.type)} 
                                    size={14}
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-foreground">
                                    {activity?.action}
                                </p>
                                <p className="text-sm text-muted-foreground truncate">
                                    {activity?.item}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    {formatDate(activity?.timestamp)}
                                </p>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <div className="text-center py-8">
                        <Icon 
                            name="Activity" 
                            size={48} 
                            className="text-muted-foreground mx-auto mb-4"
                        />
                        <p className="text-muted-foreground">
                            No recent activity
                        </p>
                    </div>
                )}
            </div>
            {activities?.length > 0 && (
                <div className="mt-6 pt-4 border-t border-border">
                    <button className="text-sm text-primary hover:text-primary/80 font-medium transition-colors duration-200">
                        View all activity →
                    </button>
                </div>
            )}
        </motion.div>
    );
};

export default RecentActivity;