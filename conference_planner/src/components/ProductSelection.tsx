"use client"

import { useState, useRef } from "react"
import Navigation from "./Navigation"
import VenueSelection from "./VenueSelection"
import AddOnsSelection from "./AddOnsSelection"
import MealsSelection from "./MealsSelection"
import DetailsModal from "./DetailsModal"
import "../styles/ProductSelection.css"

interface ProductSelectionProps {
  onBack: () => void
}

function ProductSelection({ onBack }: ProductSelectionProps) {
  const [showDetails, setShowDetails] = useState(false)
  const venueRef = useRef<HTMLDivElement>(null)
  const addonsRef = useRef<HTMLDivElement>(null)
  const mealsRef = useRef<HTMLDivElement>(null)

  const scrollToSection = (section: "venue" | "addons" | "meals") => {
    const refs = {
      venue: venueRef,
      addons: addonsRef,
      meals: mealsRef,
    }

    refs[section].current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }

  return (
    <div className="product-selection">
      <Navigation onSectionScroll={scrollToSection} onShowDetails={() => setShowDetails(true)} />

      <div className="selection-content">
        <div ref={venueRef} className="section-container" id="venue-section">
          <VenueSelection />
        </div>

        <div ref={addonsRef} className="section-container" id="addons-section">
          <AddOnsSelection />
        </div>

        <div ref={mealsRef} className="section-container" id="meals-section">
          <MealsSelection />
        </div>
      </div>


      {showDetails && <DetailsModal onClose={() => setShowDetails(false)} />}
    </div>
  )
}

export default ProductSelection
