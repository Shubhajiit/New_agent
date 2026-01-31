import { Plus, Minus } from "lucide-react";

interface QuantityControlProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  productName: string;
  className?: string;
}

export default function QuantityControl({
  quantity,
  onIncrease,
  onDecrease,
  productName,
  className = ""
}: QuantityControlProps) {
  if (quantity === 0) {
    // Show only add button when quantity is 0
    return (
      <button
        onClick={onIncrease}
        aria-label={`Add ${productName} to cart`}
        className={`w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center rounded-full text-white shadow-lg transition-all duration-200 active:scale-95 ${className}`}
        style={{ backgroundColor: '#5DD3B6' }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4BC9A8'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#5DD3B6'}
      >
        <Plus size={20} />
      </button>
    );
  }

  // Show quantity controls when quantity > 0
  return (
    <div className={`flex items-center gap-2 bg-white rounded-full shadow-lg px-1 py-1 ${className}`} style={{ borderColor: '#5DD3B6' }}>
      <button
        onClick={onDecrease}
        aria-label={`Decrease quantity of ${productName}`}
        className="w-8 h-8 lg:w-9 lg:h-9 flex items-center justify-center rounded-full transition-all duration-200 active:scale-95"
        style={{ backgroundColor: '#E8F8F5', color: '#5DD3B6' }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#D1F2EB';
          e.currentTarget.style.color = '#4BC9A8';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#E8F8F5';
          e.currentTarget.style.color = '#5DD3B6';
        }}
      >
        <Minus size={16} />
      </button>
      <span className="min-w-[24px] text-center text-sm lg:text-base font-semibold" style={{ color: '#2D5A52' }}>
        {quantity}
      </span>
      <button
        onClick={onIncrease}
        aria-label={`Increase quantity of ${productName}`}
        className="w-8 h-8 lg:w-9 lg:h-9 flex items-center justify-center rounded-full text-white transition-all duration-200 active:scale-95"
        style={{ backgroundColor: '#5DD3B6' }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4BC9A8'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#5DD3B6'}
      >
        <Plus size={16} />
      </button>
    </div>
  );
}