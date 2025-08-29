import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Select from "../../../components/ui/Select";

const ProductInfo = ({
  product = {},
  selectedVariant = {},
  onVariantChange = () => {},
  quantity = 1,
  onQuantityChange = () => {},
  onAddToCart = () => {},
  onBuyNow = () => {},
  onClick = () => {},
}) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState("description"); // 'description' or 'reviews'

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    })?.format(price);
  };
  const shareProduct = () => {
    const productId = currentProduct?.id;
    const productSlug = currentProduct?.name.toLowerCase().replace(/\s+/g, "-");
    const shareableURL = `${window.location.origin}/product-detail/${productId}/${productSlug}`;

    navigator.clipboard
      .writeText(shareableURL)
      .then(() => alert("Product link copied to clipboard!"))
      .catch(() => alert("Failed to copy link."));
  };

  const calculateDiscount = (originalPrice, salePrice) => {
    if (!originalPrice || !salePrice || originalPrice <= salePrice) return 0;
    return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
  };

  const discount = calculateDiscount(product?.originalPrice, product?.price);

  const sizeOptions =
    product?.variants?.sizes?.map((size) => ({
      value: size?.value,
      label: size?.label,
      disabled: !size?.inStock,
    })) || [];

  const colorOptions =
    product?.variants?.colors?.map((color) => ({
      value: color?.value,
      label: color?.label,
      disabled: !color?.inStock,
    })) || [];

  const quantityOptions = Array.from(
    { length: Math.min(product?.stock || 10, 10) },
    (_, i) => ({
      value: i + 1,
      label: `${i + 1}`,
    })
  );

  const firstReview = product?.reviews?.[0];

  return (
    <div className="space-y-6">
      {/* Product Title and Rating */}
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
          {product?.name}
        </h1>

        {product?.rating && (
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              {[...Array(5)]?.map((_, i) => (
                <Icon
                  key={i}
                  name="Star"
                  size={16}
                  className={
                    i < Math.floor(product?.rating)
                      ? "text-warning fill-current"
                      : "text-border"
                  }
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {product?.rating} ({product?.reviewCount || 0} reviews)
            </span>
          </div>
        )}
      </div>

      {/* Price Section */}
      <div className="space-y-2">
        <div className="flex items-center space-x-3">
          <span className="text-3xl font-bold text-foreground">
            {formatPrice(product?.price)}
          </span>
          {product?.originalPrice &&
            product?.originalPrice > product?.price && (
              <>
                <span className="text-lg text-muted-foreground line-through">
                  {formatPrice(product?.originalPrice)}
                </span>
                <span className="bg-accent text-accent-foreground px-2 py-1 rounded-md text-sm font-medium">
                  {discount}% OFF
                </span>
              </>
            )}
        </div>

        {product?.freeShipping && (
          <div className="flex items-center space-x-2 text-success">
            <Icon name="Truck" size={16} />
            <span className="text-sm font-medium">Free Shipping</span>
          </div>
        )}
      </div>

      {/* Stock Status */}
      <div className="flex items-center space-x-2">
        <Icon
          name={product?.stock > 0 ? "CheckCircle" : "XCircle"}
          size={16}
          className={product?.stock > 0 ? "text-success" : "text-error"}
        />
        <span
          className={`text-sm font-medium ${
            product?.stock > 0 ? "text-success" : "text-error"
          }`}
        >
          {product?.stock > 0
            ? `In Stock (${product?.stock} available)`
            : "Out of Stock"}
        </span>
      </div>

      {/* Tabs: Description / Reviews */}
      <div className="border-b border-border flex space-x-4">
        <button
          className={`py-2 text-sm font-medium ${
            activeTab === "description"
              ? "border-b-2 border-primary text-primary"
              : "text-muted-foreground"
          }`}
          onClick={() => setActiveTab("description")}
        >
          Description
        </button>
        <button
          className={`py-2 text-sm font-medium ${
            activeTab === "reviews"
              ? "border-b-2 border-primary text-primary"
              : "text-muted-foreground"
          }`}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "description" && (
        <div className="text-muted-foreground leading-relaxed">
          <p
            className={`${
              !isDescriptionExpanded && product?.description?.length > 200
                ? "line-clamp-3"
                : ""
            }`}
          >
            {product?.description}
          </p>
          {product?.description?.length > 200 && (
            <button
              onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
              className="text-primary hover:text-primary/80 text-sm font-medium mt-2 transition-colors duration-200"
            >
              {isDescriptionExpanded ? "Show Less" : "Read More"}
            </button>
          )}
        </div>
      )}

      {activeTab === "reviews" && firstReview && (
        <div className="space-y-3 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <strong>{firstReview.name}</strong>
            <div className="flex space-x-1">
              {[...Array(5)]?.map((_, i) => (
                <Icon
                  key={i}
                  name="Star"
                  size={14}
                  className={
                    i < firstReview.rating
                      ? "text-warning fill-current"
                      : "text-border"
                  }
                />
              ))}
            </div>
          </div>
          <p>{firstReview.comment}</p>
        </div>
      )}

      {/* Variant Selection */}
      {(sizeOptions?.length > 0 || colorOptions?.length > 0) && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Options</h3>

          {sizeOptions?.length > 0 && (
            <div className="space-y-2">
              <Select
                label="Size"
                options={sizeOptions}
                value={selectedVariant?.size}
                onChange={(value) =>
                  onVariantChange({ ...selectedVariant, size: value })
                }
                placeholder="Select size"
                className="w-full"
              />
            </div>
          )}

          {colorOptions?.length > 0 && (
            <div className="space-y-2">
              <Select
                label="Color"
                options={colorOptions}
                value={selectedVariant?.color}
                onChange={(value) =>
                  onVariantChange({ ...selectedVariant, color: value })
                }
                placeholder="Select color"
                className="w-full"
              />
            </div>
          )}
        </div>
      )}

      {/* Quantity Selection */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Quantity</label>
        <Select
          options={quantityOptions}
          value={quantity}
          onChange={onQuantityChange}
          className="w-32"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button
          variant="default"
          size="lg"
          disabled={product?.stock === 0}
          onClick={onAddToCart}
          iconName="ShoppingCart"
          iconPosition="left"
        >
          Add to Cart
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={shareProduct}
          iconName="Share"
          iconPosition="left"
        >
          Share Product
        </Button>
      </div>

      {/* Product Features */}
      {product?.features && product?.features?.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">
            Key Features
          </h3>
          <ul className="space-y-2">
            {product?.features?.map((feature, index) => (
              <li
                key={index}
                className="flex items-start space-x-2 text-sm text-muted-foreground"
              >
                <Icon
                  name="Check"
                  size={16}
                  className="text-success mt-0.5 flex-shrink-0"
                />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Shipping Info */}
      {/* <div className="border-t border-border pt-4 space-y-3">
        <h3 className="text-lg font-semibold text-foreground">Shipping & Returns</h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Icon name="Truck" size={16} />
            <span>Free shipping on orders over $50</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="RotateCcw" size={16} />
            <span>30-day return policy</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Shield" size={16} />
            <span>1-year warranty included</span>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default ProductInfo;
