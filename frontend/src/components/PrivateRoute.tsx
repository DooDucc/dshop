import React from "react"
import { Navigate } from "react-router-dom"
import { useAppSelector } from "../redux/store"

const PrivateRoute = ({ children }: { children: any }) => {
  const { user } = useAppSelector(state => state.auth)

  return user?.token === undefined ? <Navigate to="/login" replace /> : children
}

export default PrivateRoute
