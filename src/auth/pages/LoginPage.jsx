import { useForm } from '@/hooks';
import './LoginPage.css';
import { useState } from 'react';

const loginFormFields = {
  loginEmail: '',
  loginPassword: '',
};

const registerFormFields = {
  registerName: '',
  registerEmail: '',
  registerPassword: '',
  registerPassword2: '',
};

export const LoginPage = () => {
  const [loginShowPassword, setLoginShowPassword] = useState(false);
  const [registerShowPassword, setRegisterShowPassword] = useState(false);
  const [registerShowPassword2, setRegisterShowPassword2] = useState(false);

  const {
    loginEmail,
    loginPassword,
    onInputChange: onLoginInputChange,
  } = useForm(loginFormFields);

  const {
    registerName,
    registerEmail,
    registerPassword,
    registerPassword2,
    onInputChange: onRegisterInputChange,
  } = useForm(registerFormFields);

  const loginSubmit = (event) => {
    event.preventDefault();
    console.log({ loginEmail, loginPassword });
  };

  const registerSubmit = (event) => {
    event.preventDefault();
    console.log({
      registerName,
      registerEmail,
      registerPassword,
      registerPassword2,
    });
  };

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={loginSubmit}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Correo"
                name="loginEmail"
                value={loginEmail}
                onChange={onLoginInputChange}
              />
            </div>
            <div className="form-group mb-2 position-relative">
              <input
                type={loginShowPassword ? 'text' : 'password'}
                className="form-control pe-5"
                placeholder="Contraseña"
                name="loginPassword"
                value={loginPassword}
                onChange={onLoginInputChange}
              />

              <span
                onClick={() => setLoginShowPassword(!loginShowPassword)}
                className={`password-toggle position-absolute top-50 end-0 translate-middle-y me-3 ${
                  loginShowPassword ? 'visible' : ''
                }`}
              >
                <i
                  className={`bi ${loginShowPassword ? 'bi-eye-slash' : 'bi-eye'}`}
                ></i>
              </span>
            </div>
            <div className="d-grid">
              <input type="submit" className="btnSubmit" value="Login" />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form onSubmit={registerSubmit}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                name="registerName"
                value={registerName}
                onChange={onRegisterInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                name="registerEmail"
                value={registerEmail}
                onChange={onRegisterInputChange}
              />
            </div>
            <div className="form-group mb-2 position-relative">
              <input
                type={registerShowPassword ? 'text' : 'password'}
                className="form-control"
                placeholder="Contraseña"
                name="registerPassword"
                value={registerPassword}
                onChange={onRegisterInputChange}
              />
              <span
                onClick={() => setRegisterShowPassword(!registerShowPassword)}
                className={`password-toggle position-absolute top-50 end-0 translate-middle-y me-3 ${
                  registerShowPassword ? 'visible' : ''
                }`}
              >
                <i
                  className={`bi ${registerShowPassword ? 'bi-eye-slash' : 'bi-eye'}`}
                ></i>
              </span>
            </div>

            <div className="d-grid gap-2 position-relative">
              <input
                type={registerShowPassword2 ? 'text' : 'password'}
                className="form-control"
                placeholder="Repita la contraseña"
                name="registerPassword2"
                value={registerPassword2}
                onChange={onRegisterInputChange}
              />
              <span
                onClick={() => setRegisterShowPassword2(!registerShowPassword2)}
                className={`password-toggle position-absolute top-50 end-0 translate-middle-y me-3 ${
                  registerShowPassword2 ? 'visible' : ''
                }`}
              >
                <i
                  className={`bi ${registerShowPassword2 ? 'bi-eye-slash' : 'bi-eye'}`}
                ></i>
              </span>
            </div>

            <div className="form-group mb-2">
              <input type="submit" className="btnSubmit" value="Crear cuenta" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
