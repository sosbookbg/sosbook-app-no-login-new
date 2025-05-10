import React, { useState } from "react";


function App() {
  const [recipes, setRecipes] = useState([
    { id: 1, title: "Цезар дресинг", favorite: false },
    { id: 2, title: "Сос за риба", favorite: false },
  ]);

  const toggleFavorite = (id) => {
    setRecipes(recipes.map(r => r.id === id ? { ...r, favorite: !r.favorite } : r));
  };

  return (
    <div>
      <h1>СосБук – Любими рецепти</h1>
      <h2>Всички рецепти</h2>
      <ul>
        {recipes.map(recipe => (
          <li key={recipe.id}>
            {recipe.title}
            <button onClick={() => toggleFavorite(recipe.id)}>
              {recipe.favorite ? "Премахни от любими" : "Добави в любими"}
            </button>
          </li>
        ))}
      </ul>
      <h2>Любими</h2>
      <ul>
        {recipes.filter(r => r.favorite).map(recipe => (
          <li key={recipe.id}>{recipe.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
