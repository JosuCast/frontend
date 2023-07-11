import "./login.css";
import comida from "../../assets/img/comida.png";
import logo_tecsup from "../../assets/img/logo_tecsup.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInputChange  = (event) => {
    const { name, value, type, files } = event.target;
    const inputValue = type === "file" ? files[0] : value;

    setValues({
      ...values,
      [name]: inputValue,
    });
  };
  
  const handleForm = (event) => {
    event.preventDefault();
    

  fetch("https://apiapptesis.up.railway.app/login", { 
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.user.email = values.email) {
        navigate('/lista');
      } else {
        alert("Error al iniciar sesión");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  };

 
  return (
    <div className="pages-body login-page p-d-flex p-jc-center p-ai-center">
      <div className="card p-p-0 containerImgForm">
        <div className="p-d-flex">
          <img src={comida} alt="imagen" className="imgLeft" />
          <div className="p-d-flex p-flex-column p-jc-center p-ai-center p-px-6 containerRight">
            <div className="pages-header p-px-3 p-py-1 logoTecsup">
              <img src={logo_tecsup} alt="" />
            </div>
            <h4 className="p-text-center">
              Sistema Acádemico CPE <br /> TECSUP Comedor
            </h4>

            <form
              method="POST"
              encType="multipart/form-data"
              className="p-d-flex p-jc-center p-ai-center p-flex-column p-mt-3 p-mb-5 ng-pristine ng-star-inserted ng-invalid ng-touched"
              onSubmit={handleForm}
            >
              <div className="input-panel p-d-flex p-flex-column p-px-3 usernameEmail">
                <div lass="p-inputgroup p-d-flex p-flex-column">
                  <span className="p-float-label">
                    <input
                      
                      name="email"
                      id="email"
                      type="text"
                      value={values.email}
                      onChange={handleInputChange}
                      required
                      placeholder="Usuario (Dni)"
                      className=" form-control p-inputtext p-component ng-touched ng-dirty ng-invalid"
                    />
                    
                  </span>
                </div>
                <div className="p-inputgroup p-mt-3 p-mb-1 p-d-flex p-flex-column">
                  <span className="p-float-label">
                    <input 
                      name="password"
                      id="password"
                      type="password"
                      value={values.password}
                      onChange={handleInputChange}
                      required        
                      className="form-control p-inputtext p-component ng-touched ng-dirty ng-invalid"
                      placeholder="Contraseña"
                    />
                  </span>
                </div>
              </div>
              <div className="p-grid p-mt-1 p-flex-column p-mb-4">
                <div className="p-col text-forgot-password p-text-center">
                  <a href="">¿Olvidó la contraseña?</a>
                </div>
              </div>

              <button
                type="submit"
                className="buttonSesion p-button p-component"
              >
                Iniciar Sesión
              </button>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
