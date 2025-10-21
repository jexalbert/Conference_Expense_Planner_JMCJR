import { useAppContext } from "../context/AppContext"
import QuantitySelector from "./QuantitySelector"
import "../styles/VenueSelection.css"

function VenueSelection() {
  const { state, dispatch } = useAppContext()

  const updateRoomQuantity = (id: string, quantity: number) => {
    dispatch({ type: "UPDATE_ROOM_QUANTITY", id, quantity })
  }

  const totalCost = state.rooms.reduce((sum, room) => sum + room.price * room.quantity, 0)

  const getRoomImage = (id: string) => {
    const imageMap: { [key: string]: string } = {
      conference: "/images/conference-room.jpg",
      auditorium: "/images/auditorium-hall.jpg",
      presentation: "/images/presentation-room.jpg",
      "large-meeting": "/images/large-meeting.jpg",
      "small-meeting": "/images/small-meeting.jpg",
    }
    return imageMap[id] || "/placeholder.svg?height=120&width=160"
  }

  return (
    <div className="venue-selection">
      <div className="section-header">
        <h2>Venue Room Selection</h2>
      </div>

      <div className="rooms-grid">
        {state.rooms.map((room) => (
          <div key={room.id} className="room-card">
            <img src={getRoomImage(room.id) || "/placeholder.svg"} alt={room.name} className="room-image" />
            <h3 className="room-name">{room.name}</h3>
            <p className="room-capacity">(Capacity: {room.capacity})</p>
            <p className="room-price">${room.price}</p>
            <QuantitySelector
              quantity={room.quantity}
              onQuantityChange={(quantity) => updateRoomQuantity(room.id, quantity)}
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

export default VenueSelection
