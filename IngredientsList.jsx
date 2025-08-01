export default function IngredientsList({
  ingredientsListItems,
  getRecipe,
  ingredients,
}) {
  return (
    <section>
      {ingredients.length > 0 ? <h2>Ingredients on hand:</h2> : null}
      <ul className="ingredients-list">
        {ingredientsListItems}
      </ul>
      {ingredients.length > 3 ? (
        <div className="get-recipe-container">
          <div>
            <h3>Ready for a recipe?</h3>
            <p>Generate a recipe from your list of ingredients.</p>
          </div>
          <button onClick={getRecipe}>Get a recipe</button>
        </div>
      ) : null}
    </section>
  );
}
