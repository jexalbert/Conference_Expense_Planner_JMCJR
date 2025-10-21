

import { useState } from "react"
import LandingPage from "./components/LandingPage"
import ProductSelection from "./components/ProductSelection"
import { AppProvider } from "./context/AppContext"
import "./styles/App.css"

function App() {
  const [currentPage, setCurrentPage] = useState<"landing" | "selection">("landing")

  return (
    <AppProvider>
      <div className="App">
        {currentPage === "landing" ? (
          <LandingPage onGetStarted={() => setCurrentPage("selection")} />
        ) : (
          <ProductSelection onBack={() => setCurrentPage("landing")} />
        )}
      </div>
    </AppProvider>
  )
}

export default App
