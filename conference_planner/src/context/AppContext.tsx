

import type React from "react"
import { createContext, useContext, useReducer, type ReactNode } from "react"

interface Room {
  id: string
  name: string
  capacity: number
  price: number
  quantity: number
}

interface AddOn {
  id: string
  name: string
  price: number
  quantity: number
}

interface Meal {
  id: string
  name: string
  price: number
  selected: boolean
}

interface AppState {
  rooms: Room[]
  addOns: AddOn[]
  meals: Meal[]
  numberOfPeople: number
}

type AppAction =
  | { type: "UPDATE_ROOM_QUANTITY"; id: string; quantity: number }
  | { type: "UPDATE_ADDON_QUANTITY"; id: string; quantity: number }
  | { type: "TOGGLE_MEAL"; id: string }
  | { type: "SET_NUMBER_OF_PEOPLE"; count: number }

const initialState: AppState = {
  rooms: [
    { id: "conference", name: "Conference Room", capacity: 15, price: 3500, quantity: 0 },
    { id: "auditorium", name: "Auditorium Hall", capacity: 200, price: 5500, quantity: 0 },
    { id: "presentation", name: "Presentation Room", capacity: 50, price: 700, quantity: 0 },
    { id: "large-meeting", name: "Large Meeting Room", capacity: 10, price: 900, quantity: 0 },
    { id: "small-meeting", name: "Small Meeting Room", capacity: 5, price: 1100, quantity: 0 },
  ],
  addOns: [
    { id: "projectors", name: "Projectors", price: 200, quantity: 0 },
    { id: "speakers", name: "Speaker", price: 35, quantity: 0 },
    { id: "microphones", name: "Microphones", price: 45, quantity: 0 },
    { id: "whiteboards", name: "Whiteboards", price: 80, quantity: 0 },
    { id: "signage", name: "Signage", price: 80, quantity: 0 },
  ],
  meals: [
    { id: "breakfast", name: "Breakfast", price: 50, selected: false },
    { id: "lunch", name: "Lunch", price: 60, selected: false },
    { id: "high-tea", name: "High Tea", price: 25, selected: false },
    { id: "dinner", name: "Dinner", price: 70, selected: false },
  ],
  numberOfPeople: 0,
}

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "UPDATE_ROOM_QUANTITY":
      return {
        ...state,
        rooms: state.rooms.map((room) => (room.id === action.id ? { ...room, quantity: action.quantity } : room)),
      }
    case "UPDATE_ADDON_QUANTITY":
      return {
        ...state,
        addOns: state.addOns.map((addon) => (addon.id === action.id ? { ...addon, quantity: action.quantity } : addon)),
      }
    case "TOGGLE_MEAL":
      return {
        ...state,
        meals: state.meals.map((meal) => (meal.id === action.id ? { ...meal, selected: !meal.selected } : meal)),
      }
    case "SET_NUMBER_OF_PEOPLE":
      return {
        ...state,
        numberOfPeople: action.count,
      }
    default:
      return state
  }
}

const AppContext = createContext<{
  state: AppState
  dispatch: React.Dispatch<AppAction>
} | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider")
  }
  return context
}
