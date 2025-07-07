import React,{useContext, useState} from "react";
import authContext from "../context/auth/authContext";

const Login = () => {
  const context = useContext(authContext);
  const login = context.login;
  console.log(context)

  const [cred, setCred] = useState({email: '', password: ''});
  const handleSubmit = (e)=>{
    e.preventDefault();
    login(cred.email, cred.password)
    
  }

    const onChange = (e)=>{
    setCred({...cred, [e.target.name]: e.target.value})
  }
  return (
    <form className="container">
      <div className="mb-3">
        <label for="exampleInputEmail1" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          aria-describedby="emailHelp"
          value={cred.email}
          onChange={onChange}
        />
        <div id="emailHelp" className="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div className="mb-3">
      
        <label for="exampleInputPassword1" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          value={cred.password}
          onChange={onChange}
        />
      </div>
      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="check"
        />
        <label className="form-check-label" for="exampleCheck1">
          Check me out
        </label>
      </div>
      <button type="submit" className="btn btn-primary" onSubmit={handleSubmit}>
        Submit
      </button>
    </form>
  );
};
export default Login;
