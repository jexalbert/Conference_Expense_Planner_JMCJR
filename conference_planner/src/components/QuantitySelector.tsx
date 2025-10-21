
import "../styles/QuantitySelector.css"

interface QuantitySelectorProps {
  quantity: number
  onQuantityChange: (quantity: number) => void
}

function QuantitySelector({ quantity, onQuantityChange }: QuantitySelectorProps) {
  const increment = () => {
    onQuantityChange(quantity + 1)
  }

  const decrement = () => {
    if (quantity > 0) {
      onQuantityChange(quantity - 1)
    }
  }

  return (
    <div className="quantity-selector">
      <button className="quantity-btn decrement" onClick={decrement}>
        -
      </button>
      <span className="quantity-display">{quantity}</span>
      <button className="quantity-btn increment" onClick={increment}>
        +
      </button>
    </div>
  )
}

export default QuantitySelector
