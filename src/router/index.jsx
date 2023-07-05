import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login, Lista, Agregar,Editar, Lista_Categorias } from "../pages"

const Router = () =>{
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/lista" element={<Lista/>}/>
                <Route path="/agregar" element={<Agregar/>}/>
                <Route path="/editar/:id" element={<Editar/>}/>
                <Route path="/categorias" element={<Lista_Categorias/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;