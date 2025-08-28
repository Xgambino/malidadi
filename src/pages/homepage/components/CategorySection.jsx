import React from "react";
import { useNavigate } from "react-router-dom";
import Image from "../../../components/AppImage";
import Icon from "../../../components/AppIcon";

import { products } from "../../../data/db";

const CategorySection = () => {
  const navigate = useNavigate();
  const categoryStyles = {
    "African Inspired Jewellery": {
      icon: "Gem",
      color: "from-pink-500 to-rose-600",
      image:
        "https://turkanawildlifesafaris.com/wp-content/uploads/2025/05/maasai2.jpg",
    },
    Clothing: {
      icon: "Shirt",
      color: "from-blue-500 to-indigo-600",
      image: "https://pbs.twimg.com/media/FTlyf54WYAAvxYT.jpg",
    },
    "Authentic Leather Wear": {
      icon: "ShoppingBag",
      color: "from-yellow-600 to-amber-700",
      image:
        "https://sarunibasecamp.com/wp-content/uploads/2024/11/Saruni-Basecamp-From-Beads-to-Leather-8.jpg",
    },
    "African Inspired Crafts": {
      icon: "Palette",
      color: "from-green-600 to-emerald-700",
      image:
        "https://imaraafricasafaris.com/wp-content/uploads/2020/11/image-123-1000x565.png.webp",
    },
    "Cultural Wear": {
      icon: "Feather",
      color: "from-purple-500 to-fuchsia-600",
      image:
        "https://static.vecteezy.com/system/resources/previews/028/835/984/large_2x/masai-in-traditional-colorful-clothing-showing-maasai-jumping-dance-at-local-tribe-village-near-famous-safari-travel-destination-kenya-editorial-free-photo.JPG",
    },
    Women: {
      icon: "Heart",
      color: "from-rose-500 to-pink-600",
      image:
        "https://i.pinimg.com/236x/ee/e0/16/eee016e512bde92427da3267f34de33b.jpg",
    },
    Men: {
      icon: "User",
      color: "from-gray-600 to-gray-800",
      image:
        "https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/01/30/16/gettyimages-117126116.jpg",
    },
    Kids: {
      icon: "Baby",
      color: "from-teal-400 to-cyan-500",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh0NJqRp70T5R7HaRvrnvihCGCqOADA61_o2dqzoil1V_usa9PHCbGeP3Fl7rm1JFtKAg&usqp=CAU",
    },
  };

  // Build categories dynamically
  const categories = Array.from(
    new Map(
      products
        .flatMap((p) => p.categories)
        .map((name, index) => [
          name,
          {
            id: index + 1,
            name,
            description: `Explore our collection of ${name}`,
            image:
              categoryStyles[name]?.image ||
              products.find((p) => p.categories.includes(name))?.image,

            color: categoryStyles[name]?.color || "from-gray-500 to-gray-700",
            icon: categoryStyles[name]?.icon || "Tag",
            productCount: products.filter((p) => p.categories.includes(name))
              .length,
          },
        ])
    ).values()
  );

  const handleCategoryClick = (category) => {
    navigate("/product-catalog", {
      state: { selectedCategory: category?.name?.toLowerCase() },
    });
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
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
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${category?.color} opacity-75 group-hover:opacity-85 transition-opacity duration-300`}
                />
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <div className="transform transition-transform duration-300 group-hover:translate-y-[-4px]">
                  {/* Icon */}
                  <div className="mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                      <Icon
                        name={category?.icon}
                        size={24}
                        className="text-white"
                      />
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
            onClick={() => navigate("/product-catalog")}
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
