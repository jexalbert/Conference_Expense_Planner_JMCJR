
import { useAppContext } from "../context/AppContext"
import "../styles/MealsSelection.css"

function MealsSelection() {
  const { state, dispatch } = useAppContext()

  const toggleMeal = (id: string) => {
    dispatch({ type: "TOGGLE_MEAL", id })
  }

  const setNumberOfPeople = (count: number) => {
    dispatch({ type: "SET_NUMBER_OF_PEOPLE", count })
  }

  const totalCost = state.meals
    .filter((meal) => meal.selected)
    .reduce((sum, meal) => sum + meal.price * state.numberOfPeople, 0)

  return (
    <div className="meals-selection">
      <div className="section-header">
        <h2>Meals Selection</h2>
      </div>

      <div className="people-count">
        <label htmlFor="people-input">Number of People:</label>
        <input
          id="people-input"
          type="number"
          value={state.numberOfPeople}
          onChange={(e) => setNumberOfPeople(Number.parseInt(e.target.value) || 0)}
          min="0"
          className="people-input"
        />
      </div>

      <div className="meals-grid">
        {state.meals.map((meal) => (
          <div key={meal.id} className="meal-option">
            <label className="meal-label">
              <input
                type="checkbox"
                checked={meal.selected}
                onChange={() => toggleMeal(meal.id)}
                className="meal-checkbox"
              />
              <span className="meal-name">{meal.name}</span>
            </label>
            <p className="meal-price">${meal.price}</p>
          </div>
        ))}
      </div>

      <div className="total-cost">
        <span>Total Cost: ${totalCost}</span>
      </div>
    </div>
  )
}

export default MealsSelection
