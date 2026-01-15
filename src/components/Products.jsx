import { useState, useEffect } from "react";
import Chat from "./Chat.jsx";

export default function Products() {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [products, setProducts] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");

  const HOST = "https://store-backend-1-0-0.onrender.com";

  /** -------------------------
   * LOGIN
   --------------------------*/
  async function handleLogin(e) {
    e.preventDefault();
    try {

      const query_params = `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
      const url = `${HOST}/login?${query_params}`;
      console.log("Login URL:", url);
      const res = await fetch(url, {
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Login failed");

      const data = await res.json();
      setToken(data.token); // Guardamos el token
    } catch (err) {
      alert("Error en login");
    }
  }

  /** -------------------------
   * GET PRODUCTS
   --------------------------*/
  async function loadProducts() {
    try {
      const res = await fetch(`${HOST}/products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Error fetching products");

      const data = await res.json();
      setProducts(data);
    } catch (err) {
      alert("Error cargando productos");
    }
  }

  // Cuando haya token → cargar productos
  useEffect(() => {
    if (token) {
      loadProducts();
    }
  }, [token]);

  /** -------------------------
   * CREATE PRODUCT (POST)
   --------------------------*/
  async function handleCreateProduct(e) {
    e.preventDefault();
    try {
      const res = await fetch(`${HOST}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: newName,
          price: Number(newPrice),
        }),
      });

      if (!res.ok) throw new Error("Error creating product");

      setNewName("");
      setNewPrice("");

      loadProducts(); // refresca la tabla
    } catch (err) {
      alert("No se pudo crear el producto");
    }
  }

  /** -------------------------
   * UI
   --------------------------*/

  // Si NO está logeado → mostrar login
  if (!token) {
    return (
      <div style={{ maxWidth: 300, margin: "40px auto" }}>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <br /><br />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br /><br />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  // Si está logeado → productos + formulario
  return (
    <div style={{ padding: 20 }}>
      <h2>Productos</h2>

      {/* Tabla */}
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>${p.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Agregar Producto</h3>
      <form onSubmit={handleCreateProduct}>
        <input
          type="text"
          placeholder="Nombre"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          required
        />
        <br /><br />
        <input
          type="number"
          placeholder="Precio"
          value={newPrice}
          onChange={(e) => setNewPrice(e.target.value)}
          required
        />
        <br /><br />
        <button type="submit">Agregar</button>
      </form>
      {/* ---- CHAT ---- */}
      <Chat username={username} />
    </div>
  );
}
