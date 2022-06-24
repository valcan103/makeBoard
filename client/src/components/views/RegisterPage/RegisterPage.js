import React, { useState } from 'react'
import { registerUser } from '../../../_actions/user_action'
import { useDispatch } from "react-redux"
import { useNavigate } from 'react-router-dom'

function RegisterPage() {
  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  const [Name, setName] = useState("")
  const [ConfirmPassword, setConfirmPassword] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value)
  }

  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value)
  }

  const onConfirmPasswordHandler = (e) => {
    setConfirmPassword(e.currentTarget.value)
  }

  const onNameHandler = (e) => {
    setName(e.currentTarget.value)
  }

  const onSubmitHandler = (e) => {
    e.preventDefault()
    console.log(Name, Email, Password)

    if(Password === ConfirmPassword && Password.length >= 5) {
      let body = {
      name: Name,
      email: Email,
      password: Password
    }
    
    dispatch(registerUser(body))
    .then(response => {
      if(response.payload.success) {
        alert("회원가입 성공!")
        setTimeout(() => {
          navigate("/login")
        }, 1000);
      }
      else {
        alert(response.payload.message)
      }
    })
  } else if(Password.length < 5) {
    alert ("비밀번호를 5자리 이상으로 설정해 주세요")
  } else {
    alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.")
  }
}

  return (
    <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: "100%", minHeight: "819px"}}>
      <form style={{display: "flex", flexDirection: "column"}} onSubmit={onSubmitHandler}>

        <label style={{fontSize: "20px"}}>Name</label>
        <input type= "text" value={Name} onChange={onNameHandler} style={{width: "400px", height: "30px"}} />
        
        <br />
        <label style={{fontSize: "20px"}}>Email</label>
        <input type= "email" value={Email} onChange={onEmailHandler} style={{width: "400px", height: "30px"}} />

        <br />
        <label style={{fontSize: "20px"}}>Password</label>
        <input type= "password" value={Password} onChange={onPasswordHandler} style={{width: "400px", height: "30px"}} />

        <br />
        <label style={{fontSize: "20px"}}>Confirm Password</label>
        <input type= "password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} style={{width: "400px", height: "30px"}} />

        <br />
        <br />
        <button style={{width: "60%", height: "40px", fontSize: "15px", display: "flex", justifyContent: "center", alignItems: "center", marginLeft: "20%"}}>Register</button>
      </form>
    </div>
  )
}

export default RegisterPage