"use client"

import "../styles/Navigation.css"

interface NavigationProps {
  onSectionScroll: (section: "venue" | "addons" | "meals") => void
  onShowDetails: () => void
}

function Navigation({ onSectionScroll, onShowDetails }: NavigationProps) {
  return (
    <nav className="navigation">
      <div className="nav-left">
        <h1 className="nav-title">Conference Expense Planner</h1>
      </div>
      <div className="nav-center">
        <button className="nav-btn" onClick={() => onSectionScroll("venue")}>
          Venue
        </button>
        <button className="nav-btn" onClick={() => onSectionScroll("addons")}>
          Add-ons
        </button>
        <button className="nav-btn" onClick={() => onSectionScroll("meals")}>
          Meals
        </button>
      </div>
      <div className="nav-right">
        <button className="show-details-btn" onClick={onShowDetails}>
          Show Details
        </button>
      </div>
    </nav>
  )
}

export default Navigation
