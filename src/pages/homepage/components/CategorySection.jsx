import React from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const CategorySection = () => {
  const navigate = useNavigate();

  const categories = [
    {
      id: 1,
      name: "Electronics",
      description: "Latest gadgets and tech accessories",
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      icon: "Smartphone",
      productCount: 156,
      color: "from-blue-500 to-purple-600"
    },
    {
      id: 2,
      name: "Fashion",
      description: "Trendy clothing and accessories",
      image: "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=1000&q=80",
      icon: "Shirt",
      productCount: 234,
      color: "from-pink-500 to-rose-600"
    },
    {
      id: 3,
      name: "Home & Garden",
      description: "Everything for your living space",
      image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1000&q=80",
      icon: "Home",
      productCount: 189,
      color: "from-green-500 to-emerald-600"
    },
    {
      id: 4,
      name: "Sports & Outdoors",
      description: "Gear for active lifestyle",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      icon: "Dumbbell",
      productCount: 98,
      color: "from-orange-500 to-red-600"
    },
    {
      id: 5,
      name: "Books & Media",
      description: "Knowledge and entertainment",
      image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=1000&q=80",
      icon: "Book",
      productCount: 267,
      color: "from-indigo-500 to-blue-600"
    },
    {
      id: 6,
      name: "Beauty & Care",
      description: "Personal care and wellness",
      image: "https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=1000&q=80",
      icon: "Heart",
      productCount: 143,
      color: "from-purple-500 to-pink-600"
    }
  ];

  const handleCategoryClick = (category) => {
    navigate('/product-catalog', { state: { selectedCategory: category?.name?.toLowerCase() } });
  };

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Shop by Category
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
            Explore our diverse range of products across different categories
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {categories?.map((category) => (
            <div
              key={category?.id}
              onClick={() => handleCategoryClick(category)}
              className="group relative overflow-hidden rounded-xl cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-elevation-3"
            >
              {/* Background Image */}
              <div className="relative h-64 md:h-72 lg:h-80">
                <Image
                  src={category?.image}
                  alt={category?.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${category?.color} opacity-75 group-hover:opacity-85 transition-opacity duration-300`} />
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <div className="transform transition-transform duration-300 group-hover:translate-y-[-4px]">
                  {/* Icon */}
                  <div className="mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                      <Icon name={category?.icon} size={24} className="text-white" />
                    </div>
                  </div>

                  {/* Category Info */}
                  <h3 className="text-xl md:text-2xl font-bold mb-2">
                    {category?.name}
                  </h3>
                  <p className="text-white/90 text-sm md:text-base mb-3">
                    {category?.description}
                  </p>
                  
                  {/* Product Count */}
                  <div className="flex items-center justify-between">
                    <span className="text-white/80 text-sm">
                      {category?.productCount} products
                    </span>
                    <div className="flex items-center space-x-2 text-sm font-medium">
                      <span>Explore</span>
                      <Icon 
                        name="ArrowRight" 
                        size={16} 
                        className="transform transition-transform duration-300 group-hover:translate-x-1" 
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/30 rounded-xl transition-all duration-300" />
            </div>
          ))}
        </div>

        {/* View All Categories Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => navigate('/product-catalog')}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200"
          >
            <span>View All Categories</span>
            <Icon name="Grid3X3" size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;