import React from "react"
import { useCookies } from "react-cookie"
import { NavBar } from "./NavBar"
import { Outlet, Navigate } from "react-router-dom"
import { useAppSelector } from "../redux/hooks"

export const RouterLayout: React.FC<{}> = () => {

    const [ _, setCookie, remove] = useCookies()
    const { isAuth, isExpired, accessToken } = useAppSelector((satate) => satate.authReducer)

    React.useEffect(() => {
        if(accessToken) {
            setCookie("accessToken", accessToken)
        }
    }, [accessToken])

    React.useEffect(() => {
        if(isExpired) {
            remove("accessToken")
        }
    }, [isExpired])

    return isAuth ? 
        <>
            <NavBar/>
            <Outlet/>
        </>
        :
        <Navigate to="/login"/>
    
}
