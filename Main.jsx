import React from "react";
import ClaudeRecipe from "./components/ClaudeRecipe.jsx";
import IngredientsList from "./components/ingredientsList.jsx";
import { getRecipeFromGemini } from "./ai.js";
import { h2 } from "framer-motion/client";

export default function Main() {
  const [ingredients, setIngredients] = React.useState([
    "all the main spices",
    "pasta",
    "ground beef",
    "tomato paste",
  ]);

  // const [ingredients, setIngredients] = React.useState([]);
  const [recipe, setRecipe] = React.useState(false);

  const recipeSection = React.useRef(null);

  React.useEffect(() => {
    if (recipe !== "" && recipeSection.current !== null) {
      // recipeSection.current.scrollIntoView({behavior: "smooth"}); //or the better version
      const yCoord =
        recipeSection.current.getBoundingClientRect().top + window.scrollY;
      window.scroll({
        top: yCoord,
        behavior: "smooth",
      });
    }
  }, [recipe]);

  async function getRecipe() {
    const recipeMarkdown = await getRecipeFromGemini(ingredients);
    setRecipe(recipeMarkdown);
  }

  const ingredientsListItems = ingredients.map((ingredient) => (
    <li key={ingredient}>{ingredient}</li>
  ));

  function addIngredient(formData) {
    const newIngredient = formData.get("ingredient");
    setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
  }

  function resetIngredients() {
    setIngredients([]);
  }

  return (
    <main>
      <form action={addIngredient} className="add-ingredient-form">
        <input
          type="text"
          placeholder="type an ingredient"
          aria-label="Add ingredient"
          name="ingredient"
        />
        <button>Add ingredient</button>
        <button onClick={resetIngredients}>Reset Ingredients List</button>
      </form>

      {ingredients.length > 0 ? (
        <IngredientsList
          ref={recipeSection}
          ingredientsListItems={ingredientsListItems}
          getRecipe={getRecipe}
          ingredients={ingredients}
        />
      ) : null}
      {recipe ? <ClaudeRecipe recipe={recipe} /> : null}
    </main>
  );
}
