import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { auth } from '../_actions/user_action'

export default function (SpecificComponent, option, adminRoute = null) {
  function AuthenticationCheck(props) {
    let user = useSelector(state => state.user);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
      dispatch(auth()).then(response => {
        if(!response.payload.isAuth) {
          if(option) {
              alert("로그인이 필요합니다")
              navigate("/login")
            }
          } else {
              if(adminRoute && !response.payload.isAdmin) {
                navigate("/")
              } else {
                  if(option === false) {
                    navigate("/")
                  }
                }
            }
      })
    }, [])
    return <SpecificComponent {...props} user={user} />
  }
  return AuthenticationCheck
}