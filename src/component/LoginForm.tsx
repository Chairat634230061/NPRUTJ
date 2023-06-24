import { FC, useState } from "react";
import { string, z } from "zod";
import { useNavigate } from "react-router-dom";
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { Alert } from '../component/Alert'


const LoginForm: FC = () => {
  // script
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("Error");
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();



  // validate schema
  const userModel = z.object({
    email: string().email(),
    password: string().min(1),
  });

  const onLoginClick = () => {
    const model = userModel.safeParse({ email, password });
    if (model.success) {
      loginApi(
        model.data.email,
        model.data.password);
    } else {
      setTitle("Warning");
      setMessage("Invalid login form please verify inupt.");
      setShow(true);

    }
  };

  const loginApi = async (username: string, password: string) => {
    try {
      const resp = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          username,
          password,
        })
      });
      if (resp.status === 200 ) { 
      const result = await resp.text();

      if (result != "fail") {
        sessionStorage.setItem("AUTH_TOKEN","Bearer " + result);
        navigate('/admin/menu');
      } else {
        setTitle("Login Error");
        setMessage("Login fail. Please try again.");
        setShow(true);
      }
    } else {
      setTitle("Error");
      setMessage("Server error. Please contact admin.");
      setShow(true);
    }
  } catch (e) {
    setTitle("Error");
    setMessage("Server error. Please contact admin.");
    setShow(true);
  }
};





  // template
  return (
    <>
      <div className="flex flex-col border rounded-lg p-4 shadow-md border-white shadow-vor bg-[#6633CC] m-auto w-full sm:w-1/2 md:w-1/3">
        <img className="w-32 h-32 m-auto" src="logo.svg" />
        <h1 className="m-auto text-2xl text-white">Login</h1>
        <label htmlFor="email" className="text-white">Email</label>
        <input
          id="email"
          type="text"
          className="npru-input"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <label htmlFor="password" className="text-white">Password</label>
        <input
          id="password"
          type="password"
          className="npru-input "
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button className="mt-4 npru-button" onClick={onLoginClick}>
          <div className="flax-row flex justify-center"> 
          <ArrowRightOnRectangleIcon
          className="w-6 h-6" 
          />Login
          </div>
        </button>
      </div>
      <Alert
       title={title}
       message={message}
       show={show}
       setShow={setShow} 
       />
    </>
  );
};

export { LoginForm };
