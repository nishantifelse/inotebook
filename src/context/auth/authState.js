import React from 'react'
import authContext from './authContext'

const authState = (props) => {
  const host = 'http://localhost:8000'
  const login = async (email, password)=>{
    const response = fetch(`${host}/api/auth/login`, {
      method:'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({email, password})
    });
    const json = await response.json()
    console.log(json)
  }

  const signUp = async (email, password)=>{
    const response = fetch(`${host}/api/auth/login`, {
      method:'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({email, password})
    });
    const json = await response.json()
    console.log(json)
  }

  return (
    
    <authContext.Provider value={{login, signUp}}>
      {props.children}
    </authContext.Provider>
  )
}

export default authState
