import Dashboard from "../dashboard/Dashboard";
import "./lista_comidas.css";
import { useFetch } from "../../../useFetch";
import { Link } from "react-router-dom";
import * as BiIcons from "react-icons/bi";
import * as AiIcons from "react-icons/ai";
import Swal from "sweetalert2";

const Lista = () => {

  const { data } = useFetch("https://apiapp-production.up.railway.app/api/comidas/");

  if (data === null) {
    return <div>Loading...</div>;
  }
  console.log(data);
  
  // Dividir el array de datos en subconjuntos de 3 elementos
  const groupedData = [];
  for (let i = 0; i < data.length; i += 3) {
    groupedData.push(data.slice(i, i + 3));
  }
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
          fetch(`https://apiapp-production.up.railway.app/api/comidas/${id}`, {
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
  };

  return (
    <div>
      <Dashboard />
      <div className="boton">
        <Link to="/agregar">
          <button className="agregar">Agregar producto</button>
        </Link>
      </div>
      <div className="lista">
        {groupedData.map((group, index) => (
          <div className="card-group" key={index}>
            {group.map((comida) => (
              <div className="card-comida" key={comida.id}>
                <div className="img">
                  <img src={comida.fileUrl} className="img-comida" />
                </div>
                <div className="texto">
                  <h2>{comida.nombre}</h2>
                  <p>{comida.Categorium.nombre}</p>
                  <p>S/ {comida.precio}</p>
                </div>
                <div className="funciones">
                  <Link to={`/editar/${comida.id}`}>
                    <BiIcons.BiEdit className="funcion" />
                  </Link>

                  <AiIcons.AiFillDelete
                    className="funcion"
                    onClick={() => handleDelete(comida.id)}
                  />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lista;
