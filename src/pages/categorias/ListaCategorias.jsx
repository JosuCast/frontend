import Dashboard from "../dashboard/Dashboard"
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../../useFetch";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './ListaCategoria.css'
import * as BiIcons from "react-icons/bi";
import * as AiIcons from "react-icons/ai";

const Lista_Categorias = () =>{

    const navigate = useNavigate();

    const { data } = useFetch("http://localhost:4000/api/comidas/verificar");

    const [categorias, setCategorias] = useState(null);

    useEffect(() => {
        fetch("http://localhost:4000/api/categoria")
        .then((response) => response.json())
        .then((categorias) => setCategorias(categorias));
    }, []);

    return (
        <>
        <Dashboard/>
        <div className="boton">
          <button className="agregar">Agregar categoria</button>
        </div>
        <div className="table">
            <table>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Dia de creación</th>
                    <th></th>
                </tr>
                {categorias?.map((categoria)=>(
                <tr>
                        <td>{categoria.id_categoria} </td>
                        <td>{categoria.nombre} </td>
                        <td>{categoria.createdAt} </td>
                        <td>
                            <BiIcons.BiEdit className="funcion" />
                            <AiIcons.AiFillDelete className="funcion"/>
                        </td>
                </tr>
                ))}
            </table>
        </div>
        </>
    )
}


export default Lista_Categorias;