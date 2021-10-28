import React, { useEffect } from "react"
import { Redirect } from "react-router-dom"


const LogoutPage = props => {
  // log the user out by setting the username to an empty string
  // we assume that a setUsername function has been passed as a prop to this component
  useEffect(() => {
    props.setUsername("") 
  }, [])

  // send the user to the home screen
  return <Redirect to="/" />
}

export default LogoutPage