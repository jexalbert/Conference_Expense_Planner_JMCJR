
import { useAppContext } from "../context/AppContext"
import "../styles/DetailsModal.css"

interface DetailsModalProps {
  onClose: () => void
}

function DetailsModal({ onClose }: DetailsModalProps) {
  const { state } = useAppContext()

  const selectedRooms = state.rooms.filter((room) => room.quantity > 0)
  const selectedAddOns = state.addOns.filter((addon) => addon.quantity > 0)
  const selectedMeals = state.meals.filter((meal) => meal.selected)

  const roomsTotal = selectedRooms.reduce((sum, room) => sum + room.price * room.quantity, 0)
  const addOnsTotal = selectedAddOns.reduce((sum, addon) => sum + addon.price * addon.quantity, 0)
  const mealsTotal = selectedMeals.reduce((sum, meal) => sum + meal.price * state.numberOfPeople, 0)
  const grandTotal = roomsTotal + addOnsTotal + mealsTotal

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>TOTAL COST FOR THE EVENT</h2>
          <h1 className="grand-total">${grandTotal}</h1>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <table className="details-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Unit Cost</th>
              <th>Quantity</th>
              <th>Total Cost</th>
            </tr>
          </thead>
          <tbody>
            {selectedRooms.map((room) => (
              <tr key={room.id}>
                <td>
                  {room.name} (Capacity: {room.capacity})
                </td>
                <td>${room.price}</td>
                <td>{room.quantity}</td>
                <td>${room.price * room.quantity}</td>
              </tr>
            ))}
            {selectedAddOns.map((addon) => (
              <tr key={addon.id}>
                <td>{addon.name}</td>
                <td>${addon.price}</td>
                <td>{addon.quantity}</td>
                <td>${addon.price * addon.quantity}</td>
              </tr>
            ))}
            {selectedMeals.map((meal) => (
              <tr key={meal.id}>
                <td>{meal.name}</td>
                <td>${meal.price}</td>
                <td>For {state.numberOfPeople} people</td>
                <td>${meal.price * state.numberOfPeople}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DetailsModal
