
import { useState } from "react";

const categories = [
  "Дресинг за салата",
  "Сосове за картофи",
  "Сосове за риба",
  "Сосове за пиле",
  "Сосове за свинско",
  "Сосове за вегетарианци",
  "Веган сосове",
  "Сосове за паста",
  "Сосове за барбекю",
  "Сосове за бургери и дюнери",
  "Сосове и кремове за десерти"
];

export default function App() {
  const [recipes, setRecipes] = useState([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(categories[0]);

  const addRecipe = () => {
    if (!title.trim()) return;
    setRecipes([
      ...recipes,
      {
        id: Date.now(),
        title,
        category,
        products: [],
        newProduct: "",
        newQty: "",
        newPrice: ""
      }
    ]);
    setTitle("");
    setCategory(categories[0]);
  };

  const updateProduct = (recipeId, key, value) => {
    setRecipes((prev) =>
      prev.map((r) =>
        r.id === recipeId ? { ...r, [key]: value } : r
      )
    );
  };

  const addProduct = (recipeId) => {
    setRecipes((prev) =>
      prev.map((r) =>
        r.id === recipeId
          ? {
              ...r,
              products: [
                ...r.products,
                {
                  id: Date.now(),
                  name: r.newProduct,
                  quantity: r.newQty,
                  price: r.newPrice,
                  bought: false
                }
              ],
              newProduct: "",
              newQty: "",
              newPrice: ""
            }
          : r
      )
    );
  };

  const toggleBought = (recipeId, productId) => {
    setRecipes((prev) =>
      prev.map((r) =>
        r.id === recipeId
          ? {
              ...r,
              products: r.products.map((p) =>
                p.id === productId ? { ...p, bought: !p.bought } : p
              )
            }
          : r
      )
    );
  };

  const deleteProduct = (recipeId, productId) => {
    setRecipes((prev) =>
      prev.map((r) =>
        r.id === recipeId
          ? {
              ...r,
              products: r.products.filter((p) => p.id !== productId)
            }
          : r
      )
    );
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 16 }}>
      <h1 style={{ textAlign: "center" }}>Пазарувай лесно със СосБук</h1>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <input
          placeholder="Заглавие на рецепта"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ flex: 1, padding: 8 }}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ padding: 8 }}
        >
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
        <button onClick={addRecipe} style={{ padding: "8px 16px" }}>
          Добави
        </button>
      </div>

      {recipes.map((r) => (
        <div key={r.id} style={{ border: "1px solid #ccc", padding: 12, marginBottom: 16 }}>
          <h2>{r.title} <span style={{ fontWeight: "normal", fontSize: 14 }}>({r.category})</span></h2>
          <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
            <input
              placeholder="Продукт"
              value={r.newProduct}
              onChange={(e) => updateProduct(r.id, "newProduct", e.target.value)}
              style={{ flex: 1, padding: 6 }}
            />
            <input
              type="number"
              placeholder="Брой"
              value={r.newQty}
              onChange={(e) => updateProduct(r.id, "newQty", e.target.value)}
              style={{ width: 80, padding: 6 }}
            />
            <input
              type="number"
              placeholder="Цена"
              value={r.newPrice}
              onChange={(e) => updateProduct(r.id, "newPrice", e.target.value)}
              style={{ width: 100, padding: 6 }}
            />
            <button onClick={() => addProduct(r.id)}>Добави продукт</button>
          </div>
          <ul style={{ paddingLeft: 20 }}>
            {r.products.map((p) => (
              <li key={p.id} style={{ marginBottom: 4 }}>
                <span style={{ textDecoration: p.bought ? "line-through" : "none" }}>
                  {p.name} - {p.quantity} бр. - {p.price} лв.
                </span>
                {" "}
                <button onClick={() => toggleBought(r.id, p.id)}>
                  {p.bought ? "Отмени" : "Купено"}
                </button>
                {" "}
                <button onClick={() => deleteProduct(r.id, p.id)} style={{ color: "red" }}>
                  Изтрий
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
