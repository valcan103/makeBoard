import React, { useState } from 'react'
import { loginUser } from '../../../_actions/user_action'
import { useDispatch } from "react-redux"
import { useNavigate } from 'react-router-dom'

function LoginPage() {
  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value)
  }

  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value)
  }

  const onSubmitHandler = (e) => {
    e.preventDefault()
    console.log(Email, Password)

    let body = {
      email: Email,
      password: Password
    }

    dispatch(loginUser(body))
      .then(response => {
        if(response.payload.loginSuccess) {
          alert("로그인 성공!")
          setTimeout(() => {
            navigate("/")
          }, 1000);
        }
        else {
          alert(response.payload.message)
        }
      })
  }

  return (
    <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "819px"}}>
      <form style={{display: "flex", flexDirection: "column"}} onSubmit={onSubmitHandler}>
        <label style={{fontSize: "20px"}}>Email</label>
        <input type= "email" value={Email} onChange={onEmailHandler} style={{width: "400px", height: "30px"}} />

        <br />
        <label style={{fontSize: "20px"}}>Password</label>
        <input type= "password" value={Password} onChange={onPasswordHandler} style={{width: "400px", height: "30px"}} />

        <br />
        <br />
        <button style={{width: "60%", height: "40px", fontSize: "15px", display: "flex", justifyContent: "center", alignItems: "center", marginLeft: "20%"}}>Login</button>
      </form>
    </div>
  )
}

export default LoginPage