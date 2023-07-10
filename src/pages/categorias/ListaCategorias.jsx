import Dashboard from "../dashboard/Dashboard";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../../useFetch";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ListaCategoria.css";
import * as BiIcons from "react-icons/bi";
import * as AiIcons from "react-icons/ai";

const Lista_Categorias = () => {

  const [values, setValues] = useState({
    nombre: ""
  });

  const handleInputChange = (event) => {
    const { name, value, type, files } = event.target;
    const inputValue = type === "file" ? files[0] : value;
    setValues({
      ...values,
      [name]: inputValue,
    });
  };

  const navigate = useNavigate();

  const { data } = useFetch("https://apiapp-production.up.railway.app/api/comidas/verificar");

  const [categorias, setCategorias] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const showModalView = () => setShowModal(!showModal);

  useEffect(() => {
    fetch("https://apiapp-production.up.railway.app/api/categoria")
      .then((response) => response.json())
      .then((categorias) => setCategorias(categorias));
  }, []);

  const handleForm = (event) => {
    event.preventDefault();
    console.log(values);

    const formData = new FormData();
    formData.append("nombre", values.nombre);

    fetch("https://apiapp-production.up.railway.app/api/categoria", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Respuesta:", data);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleDelete = (id) =>{
    console.log(id);
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          fetch(`https://apiapp-production.up.railway.app/api/categoria/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => response.json())
            .then((data) => {
              setResponse(data);
              
            })
            .catch((error) => {
              console.error("Error:", error);
              // Manejar errores o mostrar un mensaje de error al usuario
            });
          swalWithBootstrapButtons.fire(
            "Deleted!",
            "Your file has been deleted.",
            "success",
          );
          setTimeout(()=>{
            window.location.reload(false);
          }, 1500);
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your imaginary file is safe :)",
            "error"
          );
        }
      });
  }

  return (
    <>
      <Dashboard />
      <div className="boton">
        <button className="agregar" onClick={showModalView}>Agregar categoria</button>
      </div>
      {showModal && (
  <div className="modal">
    <div className="modal-content">
      <div className="boton-div">
      <button className="cerrar" onClick={showModalView}>X</button>
      </div>
      <h2>Agregar categoría</h2>
      {/* Aquí puedes agregar los campos y elementos necesarios para agregar una categoría */}
      <form className="form-categoria" onSubmit={handleForm}>
        <input type="text" name="nombre" value={values.nombre} placeholder="Nombre" onChange={handleInputChange}/>
        {/* Otros campos y elementos */}
        <button type="submit" className="agregar">Guardar</button>
      </form>
    </div>
  </div>
)}
      <div className="table">
        <table>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Dia de creación</th>
            <th></th>
          </tr>
          {categorias?.map((categoria) => (
            <tr key={categoria.id_categoria}>
              <td>{categoria.id_categoria} </td>
              <td>{categoria.nombre} </td>
              <td>{categoria.createdAt} </td>
              <td>
                <BiIcons.BiEdit className="funcion" />
                <AiIcons.AiFillDelete className="funcion" onClick={() => handleDelete(categoria.id_categoria)}/>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </>
  );
};

export default Lista_Categorias;
