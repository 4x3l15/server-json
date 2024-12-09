import React, { useEffect, useState } from 'react';
import { jsonServerApi } from '../api';

const Productos = () => {
  const [products, setProducts] = useState([]);
  const [productForm, setProductForm] = useState({ title: '', price: '' });
  const [editProduct, setEditProduct] = useState(null);

  // Obtener productos
  const fetchProducts = async () => {
    try {
      const response = await jsonServerApi.get('/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  };

  // Agregar producto
  const addProduct = async () => {
    try {
      const response = await jsonServerApi.post('/products', productForm);
      setProducts([...products, response.data]);
      setProductForm({ title: '', price: '' }); // Limpiar formulario
    } catch (error) {
      console.error('Error al agregar producto:', error);
    }
  };

  // Actualizar producto
  const updateProduct = async () => {
    try {
      const response = await jsonServerApi.put(`/products/${editProduct.id}`, productForm);
      setProducts(products.map(p => (p.id === editProduct.id ? response.data : p)));
      setEditProduct(null); // Limpiar producto en edición
      setProductForm({ title: '', price: '' }); // Limpiar formulario
    } catch (error) {
      console.error('Error al actualizar producto:', error);
    }
  };

  // Eliminar producto
  const deleteProduct = async (id) => {
    try {
      await jsonServerApi.delete(`/products/${id}`);
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    }
  };

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductForm({ ...productForm, [name]: value });
  };

  // Cargar productos al montar el componente
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Gestión de Productos</h2>

      {/* Formulario para agregar o editar producto */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (editProduct) {
            updateProduct();  // Si estamos editando, actualizar producto
          } else {
            addProduct();  // Si no, agregar producto
          }
        }}
      >
        <input
          type="text"
          name="title"
          placeholder="Nombre del producto"
          value={productForm.title}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Precio"
          value={productForm.price}
          onChange={handleInputChange}
          required
        />
        
        {/* Botones de agregar o editar */}
        <button type="submit">{editProduct ? 'Actualizar Producto' : 'Agregar Producto'}</button>
      </form>

      {/* Lista de productos */}
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.title} - ${product.price}
            {/* Botones de editar y eliminar */}
            <button onClick={() => {
              setEditProduct(product);
              setProductForm({ title: product.title, price: product.price });  // Cargar producto en el formulario
            }}>Editar</button>
            <button onClick={() => deleteProduct(product.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Productos;
