import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ProductImagePreview = ({ imageUrl, productName, previewMode }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  const handleImageLoad = () => {
    setImageLoading(false);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  const handleImageStart = () => {
    if (imageUrl) {
      setImageLoading(true);
      setImageError(false);
    }
  };

  return (
    <div className="sticky top-24">
      <div className="backdrop-luxury rounded-2xl p-6 border border-primary/20">
        <h3 className="text-lg font-luxury font-semibold text-primary mb-4 flex items-center">
          <Icon name="Eye" size={20} className="mr-2" />
          Product Preview
        </h3>

        <div className="relative aspect-square rounded-xl overflow-hidden bg-muted/20 border border-primary/10">
          {imageUrl && !imageError ? (
            <>
              {imageLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-surface/50 backdrop-blur-sm">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              )}
              <img
                src={imageUrl}
                alt={productName || 'Product preview'}
                className="w-full h-full object-cover transition-opacity duration-300"
                onLoad={handleImageLoad}
                onError={handleImageError}
                onLoadStart={handleImageStart}
                style={{ opacity: imageLoading ? 0.5 : 1 }}
              />
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
              <Icon 
                name={imageError ? "ImageOff" : "Image"} 
                size={48} 
                className={`mb-3 ${imageError ? 'text-destructive' : ''}`} 
              />
              <p className="text-sm text-center px-4">
                {imageError 
                  ? 'Failed to load image. Please check the URL.' :'Product image will appear here'
                }
              </p>
            </div>
          )}

          {/* Luxury overlay for preview mode */}
          {previewMode && imageUrl && !imageError && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
              <div className="absolute bottom-4 left-4 right-4">
                <div className="inline-flex items-center px-3 py-1 rounded-full backdrop-luxury border border-primary/30">
                  <Icon name="Crown" size={16} className="mr-2 text-primary" />
                  <span className="text-xs font-luxury text-primary">LUXURIA</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Image URL Validation Status */}
        {imageUrl && (
          <div className="mt-4 p-3 rounded-lg bg-surface/30 border border-primary/10">
            <div className="flex items-center space-x-2">
              <Icon 
                name={imageError ? "AlertCircle" : "CheckCircle"} 
                size={16} 
                className={imageError ? "text-destructive" : "text-success"} 
              />
              <span className={`text-sm ${imageError ? 'text-destructive' : 'text-success'}`}>
                {imageError ? 'Invalid image URL' : 'Image loaded successfully'}
              </span>
            </div>
          </div>
        )}

        {/* Preview Tips */}
        <div className="mt-4 p-4 rounded-lg bg-primary/5 border border-primary/20">
          <h4 className="text-sm font-luxury font-semibold text-primary mb-2">
            Preview Tips
          </h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Use high-quality images (minimum 400x400px)</li>
            <li>• Ensure good lighting and clear product visibility</li>
            <li>• Square aspect ratio works best for grid layouts</li>
            <li>• Use HTTPS URLs for secure image loading</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductImagePreview;