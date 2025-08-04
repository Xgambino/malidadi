import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const BreadcrumbNavigation = ({ productData = null, className = '' }) => {
  const location = useLocation();

  const getBreadcrumbs = () => {
    const breadcrumbs = [
      { label: 'Home', path: '/homepage', icon: 'Home' }
    ];

    const pathname = location.pathname;

    if (pathname === '/product-catalog') {
      breadcrumbs?.push({ label: 'Products', path: '/product-catalog' });
    } else if (pathname === '/product-detail') {
      breadcrumbs?.push({ label: 'Products', path: '/product-catalog' });
      if (productData?.name) {
        breadcrumbs?.push({ 
          label: productData?.name?.length > 30 
            ? `${productData?.name?.substring(0, 30)}...` 
            : productData?.name, 
          path: '/product-detail' 
        });
      } else {
        breadcrumbs?.push({ label: 'Product Details', path: '/product-detail' });
      }
    } else if (pathname === '/shopping-cart') {
      breadcrumbs?.push({ label: 'Shopping Cart', path: '/shopping-cart' });
    } else if (pathname === '/checkout') {
      breadcrumbs?.push({ label: 'Shopping Cart', path: '/shopping-cart' });
      breadcrumbs?.push({ label: 'Checkout', path: '/checkout' });
    }

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  if (breadcrumbs?.length <= 1) {
    return null;
  }

  return (
    <nav 
      aria-label="Breadcrumb" 
      className={`flex items-center space-x-2 text-sm text-muted-foreground ${className}`}
    >
      {breadcrumbs?.map((crumb, index) => (
        <React.Fragment key={crumb?.path}>
          {index === 0 ? (
            <Link
              to={crumb?.path}
              className="flex items-center space-x-1 hover:text-primary transition-colors duration-200"
            >
              <Icon name={crumb?.icon} size={16} />
              <span className="hidden sm:inline">{crumb?.label}</span>
            </Link>
          ) : index === breadcrumbs?.length - 1 ? (
            <span className="text-foreground font-medium" aria-current="page">
              {crumb?.label}
            </span>
          ) : (
            <Link
              to={crumb?.path}
              className="hover:text-primary transition-colors duration-200"
            >
              {crumb?.label}
            </Link>
          )}
          
          {index < breadcrumbs?.length - 1 && (
            <Icon 
              name="ChevronRight" 
              size={14} 
              className="text-muted-foreground/60" 
            />
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default BreadcrumbNavigation;