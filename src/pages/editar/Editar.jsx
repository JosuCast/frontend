import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { useFetch } from "../../../useFetch";

const Editar = () => {

  const {id} = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: '',
    categoria: '',
    precio: '',
  });

  const { data } = useFetch("https://apiapptesis.up.railway.app/api/comidas/verificar");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://apiapptesis.up.railway.app/api/comidas/${id}`,{
          headers:{
            'access-token' : localStorage.getItem("token")
        } 
        }).catch((error)=>{
          navigate('/');
      });
        const data = await response.json();
        console.log(data);
        const { nombre, categoria, precio } = data;
        setFormData({ nombre, categoria, precio });
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(`https://apiapptesis.up.railway.app/api/comidas/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Respuesta:', data);
        navigate("/lista");
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error:', error);
        // Manejar errores o mostrar un mensaje de error al usuario
      });
  };

  return (
    <div>
      <h2>Editar elemento {id}</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="nombre"
          type="text"
          value={formData.nombre}
          onChange={handleChange}
        />
        <input
          name="categoria"
          type="text"
          value={formData.categoria}
          onChange={handleChange}
        />
        <input
          name="precio"
          type="text"
          value={formData.precio}
          onChange={handleChange}
        />
        <button type="submit">Guardar cambios</button>
      </form>
    </div>
  );
};

export default Editar;
