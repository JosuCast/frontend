import Dashboard from "../dashboard/Dashboard";
import "../agregar/agregar.css";
import img from "../../assets/img/comedortecsuplogo1.png";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../../useFetch";
import { useState, useEffect } from "react";

const Agregar = () => {
  const [values, setValues] = useState({
    nombre: "",
    id_categoria: "",
    precio: "",
    imagen: null,
  });

  const navigate = useNavigate();

  const { data } = useFetch("https://apiapp-production.up.railway.app/api/comidas/verificar");

  const [categorias, setCategorias] = useState(null);

  useEffect(() => {
    fetch("https://apiapp-production.up.railway.app/api/categoria")
      .then((response) => response.json())
      .then((categorias) => setCategorias(categorias));
  }, []);

  const handleInputChange = (event) => {
    const { name, value, type, files } = event.target;
    const inputValue = type === "file" ? files[0] : value;

    setValues({
      ...values,
      [name]: inputValue,
    });
  };

  const handleForm = (event) => {
    event.preventDefault();
    console.log(values);

    const formData = new FormData();
    formData.append("nombre", values.nombre);
    formData.append("id_categoria", values.id_categoria);
    formData.append("precio", values.precio);
    formData.append("imagen", values.imagen);

    fetch("http://localhost:4000/api/comidas", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Respuesta:", data);
        navigate("/lista");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <Dashboard />
      <div className="body">
        <div className="formulario">
          <div className="img">
            <img
              className="img-comida"
              width="100%"
              height="100%"
              src={values.imagen ? URL.createObjectURL(values.imagen) : "#"}
            />
          </div>
          <div className="texto">
            <img src={img} alt="" />
            <h4>Agregar producto</h4>
            <form
              method="post"
              encType="multipart/form-data"
              onSubmit={handleForm}
            >
              <input
                className="input"
                name="nombre"
                type="text"
                value={values.nombre}
                placeholder="Ingresar nombre"
                onChange={handleInputChange}
              />

              <select className="select" name="id_categoria" onChange={handleInputChange}>
                <option></option>
                {categorias?.map((categoria) => (
                  <option
                    key={categoria.id_categoria}
                    value={categoria.id_categoria}
                  >
                    {categoria.nombre}
                  </option>
                ))}
              </select>
              <input
                className="input"
                name="precio"
                type="text"
                value={values.precio}
                placeholder="Ingresar el precio"
                onChange={handleInputChange}
              />
              <input
                type="file"
                name="imagen"
                accept="image/*"
                onChange={handleInputChange}
              />
              <div className="button">
                <button type="submit">Agregar producto</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Agregar;
