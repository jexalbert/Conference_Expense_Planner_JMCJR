import { useAppContext } from "../context/AppContext"
import QuantitySelector from "./QuantitySelector"
import "../styles/AddOnsSelection.css"

function AddOnsSelection() {
  const { state, dispatch } = useAppContext()

  const updateAddOnQuantity = (id: string, quantity: number) => {
    dispatch({ type: "UPDATE_ADDON_QUANTITY", id, quantity })
  }

  const totalCost = state.addOns.reduce((sum, addon) => sum + addon.price * addon.quantity, 0)

  const getAddOnImage = (id: string) => {
    const imageMap: { [key: string]: string } = {
      projectors: "/images/projector.jpg",
      speakers: "/images/speaker.jpg",
      microphones: "/images/microphone.jpg",
      whiteboards: "/images/whiteboard.jpg",
      signage: "/images/signage.jpg",
    }
    return imageMap[id] || "/placeholder.svg?height=120&width=160"
  }

  return (
    <div className="addons-selection">
      <div className="section-header">
        <h2>Add-ons Selection</h2>
      </div>

      <div className="addons-grid">
        {state.addOns.map((addon) => (
          <div key={addon.id} className="addon-card">
            <img src={getAddOnImage(addon.id) || "/placeholder.svg"} alt={addon.name} className="addon-image" />
            <h3 className="addon-name">{addon.name}</h3>
            <p className="addon-price">${addon.price}</p>
            <QuantitySelector
              quantity={addon.quantity}
              onQuantityChange={(quantity) => updateAddOnQuantity(addon.id, quantity)}
            />
          </div>
        ))}
      </div>

      <div className="total-cost">
        <span>Total Cost: ${totalCost}</span>
      </div>
    </div>
  )
}

export default AddOnsSelection
