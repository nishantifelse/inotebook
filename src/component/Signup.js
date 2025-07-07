import React, {useContext} from 'react'
import authContext from "../context/auth/authContext";

const Signup = () => {
  const context = useContext(authContext);
  const {signup} = context;
  return (
    <div>
      I am sign up
    </div>
  )
}

export default Signup
