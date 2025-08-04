import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FormActions = ({ 
  isEditMode, 
  loading, 
  previewMode, 
  onSubmit, 
  onCancel, 
  onReset 
}) => {
  if (previewMode) {
    return (
      <div className="backdrop-luxury rounded-2xl p-6 border border-primary/20">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <Icon name="Eye" size={48} className="text-primary mx-auto mb-4" />
            <h3 className="text-lg font-luxury font-semibold text-primary mb-2">
              Preview Mode Active
            </h3>
            <p className="text-muted-foreground mb-4">
              Review your product details above, then switch back to edit mode to make changes or save.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="backdrop-luxury rounded-2xl p-6 border border-primary/20">
      <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
        {/* Left side - Secondary actions */}
        <div className="flex space-x-3">
          <Button
            type="button"
            variant="outline"
            onClick={onReset}
            disabled={loading}
            iconName="RotateCcw"
            iconPosition="left"
            iconSize={16}
            className="border-primary/20 hover:bg-primary/5"
          >
            Reset Form
          </Button>

          <Button
            type="button"
            variant="ghost"
            onClick={onCancel}
            disabled={loading}
            iconName="X"
            iconPosition="left"
            iconSize={16}
            className="hover:bg-destructive/10 hover:text-destructive"
          >
            Cancel
          </Button>
        </div>

        {/* Right side - Primary action */}
        <div className="flex items-center space-x-4">
          {loading && (
            <div className="flex items-center text-sm text-muted-foreground">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2"></div>
              Saving product...
            </div>
          )}

          <Button
            type="submit"
            size="lg"
            loading={loading}
            iconName={isEditMode ? "Save" : "Plus"}
            iconPosition="left"
            iconSize={18}
            className="bg-gradient-to-r from-primary to-yellow-400 text-black font-luxury font-semibold hover:shadow-luxury transition-all duration-300 hover:scale-105 min-w-[160px]"
          >
            {isEditMode ? 'Update Product' : 'Create Product'}
          </Button>
        </div>
      </div>

      {/* Form validation summary */}
      <div className="mt-4 p-3 rounded-lg bg-surface/20 border border-primary/10">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={16} className="text-primary mt-0.5" />
          <div className="text-xs text-muted-foreground">
            <p className="font-medium text-foreground mb-1">Before saving:</p>
            <ul className="space-y-0.5">
              <li>• Ensure all required fields are completed</li>
              <li>• Verify image URL is working and displays correctly</li>
              <li>• Check pricing information for accuracy</li>
              <li>• Review product description for completeness</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormActions;