import { useState } from 'react';
import { productos, buscarProducto } from './data/productos';
import './App.css';
import ProductoCard from './components/ProductoCard';

function App() {
  const [busquedaId, setBusquedaId] = useState('');
  const [productoEncontrado, setProductoEncontrado] = useState(null);


  const productosDisponibles = productos.filter((producto) => producto.stock > 0);

  const hayAgotados = productos.some((producto) => producto.stock === 0);

  const valorTotalInventario = productos.reduce(
    (acumulador, producto) => acumulador + producto.precio * producto.stock,
    0
  );

  const manejarBusqueda = (e) => {
    const idIngresado = e.target.value;
    setBusquedaId(idIngresado);

    if (idIngresado) {
      setProductoEncontrado(buscarProducto(idIngresado));
    } else {
      setProductoEncontrado(null);
    }
  };

  return (
    <main>
      <h1>Tienda React</h1>


      <section>
        <h2>Resumen de Inventario</h2>
        <p>
          <strong>Valor total del inventario:</strong> ${valorTotalInventario.toLocaleString('es-CO')}
        </p>
      </section>


      <section>
        <h2>Buscar Producto por ID</h2>
        <input
          type="number"
          placeholder="Escribe un ID (1 al 10)"
          value={busquedaId}
          onChange={manejarBusqueda}
        />

        {busquedaId && (
          <div>
            {productoEncontrado ? (
              <ProductoCard producto={productoEncontrado} />
            ) : (
              <p>No existe ningún producto con el ID {busquedaId}.</p>
            )}
          </div>
        )}
      </section>


      <section>
        <h2>Todos los Productos ({productos.length})</h2>
        <div className="productos-grid">
          {productos.map((prod) => (
            <ProductoCard key={prod.id} producto={prod} />
          ))}
        </div>
      </section>


      <section>
        <h2>Productos Disponibles ({productosDisponibles.length})</h2>
        <div className="productos-grid">
          {productosDisponibles.map((prod) => (
            <ProductoCard key={prod.id} producto={prod} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;
