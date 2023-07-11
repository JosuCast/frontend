import Dashboard from "../dashboard/Dashboard";
import { useParams,useNavigate } from "react-router-dom";
import { useFetch } from "../../../useFetch";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ListaCategoria.css";
import * as BiIcons from "react-icons/bi";
import * as AiIcons from "react-icons/ai";
import Swal from "sweetalert2";

const Lista_Categorias = () => {

  const {id} = useParams();

  const [values, setValues] = useState({
    nombre: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const [categorias, setCategorias] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const [editModalOpen, setEditModalOpen] = useState(false);

  const showEditModal = () => {
    console.log(editModalOpen);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    console.log(editModalOpen);
    setEditModalOpen(false);
  };

  const showModalView = () => setShowModal(!showModal);

  useEffect(() => {
    fetch("https://apiapptesis.up.railway.app/api/categoria")
      .then((response) => response.json())
      .then((categorias) => setCategorias(categorias));
  }, []);

  const handleForm = (event) => {
    event.preventDefault();
    console.log(values);

    fetch("https://apiapptesis.up.railway.app/api/categoria", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Respuesta:", data);
        window.location.reload();
      })
      .catch((error) => {
        console.log(values);
        console.error("Error:", error);
      });
  };

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  const handleDelete = (id) => {
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
          fetch(`https://apiapptesis.up.railway.app/api/categoria/${id}`, {
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
            "success"
          );
          setTimeout(() => {
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
  };

  return (
    <>
      <Dashboard />
      <div className="boton">
        <button className="agregar" onClick={showModalView}>
          Agregar categoria
        </button>
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="boton-div">
              <button className="cerrar" onClick={showModalView}>
                X
              </button>
            </div>
            <h2>Agregar categoría</h2>
            {/* Aquí puedes agregar los campos y elementos necesarios para agregar una categoría */}
            <form className="form-categoria" onSubmit={handleForm}>
              <input
                type="text"
                name="nombre"
                id="nombre"
                value={values.nombre}
                placeholder="Nombre"
                onChange={handleInputChange}
              />
              {/* Otros campos y elementos */}
              <button type="submit" className="agregar">
                Guardar
              </button>
            </form>
          </div>
        </div>
      )}
      ;
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
                <BiIcons.BiEdit className="funcion" onClick={showEditModal} />
                <AiIcons.AiFillDelete
                  className="funcion"
                  onClick={() => handleDelete(categoria.id_categoria)}
                />
              </td>
            </tr>
          ))}
        </table>
      </div>
      {editModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <div className="boton-div">
              <button className="cerrar" onClick={closeEditModal}>
                X
              </button>
            </div>
            <h2>Editar categoría</h2>
           
            <form className="form-categoria" onSubmit={handleSubmit}>
              <input
                type="text"
                name="nombre"
                id="nombre"
                value={formData.nombre}
                placeholder="Nombre"
                onChange={handleInputChange}
              />
              <button type="submit" className="agregar">
                Guardar
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Lista_Categorias;
