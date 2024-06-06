import { createContext, useEffect, useState } from "react";
import axios from 'axios'; 
import { useNavigate } from "react-router-dom";

export const blogStore = createContext({
    postSignUpUser: () => {},
    postLoginUser: () => {}
})

const BlogStoreProvider = ({children}) => {
    const [signupUserData, setSignUpUserData] = useState("");
    const [loginUserData, setLoginUserData] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
        const postSignup = async(user) => {
            try{
                const {data} = await axios.post('http://127.0.0.1:8081/auth/signup', {
                    ...user
                })
                navigate("/login")
                console.log(data)
            }catch(error){
                console.log(error)
            }
        }
        
        if(signupUserData){
            postSignup(signupUserData)
        }
    }, [signupUserData])


    useEffect(() => {
        const postLogin = async(user) => {
            try{
                const {data} = await axios.post('http://127.0.0.1:8081/auth/login', {
                    ...user
                })
                navigate("/")
                console.log(data)
            }catch(error){
                console.log(error)
            }
        }
        
        if(loginUserData){
            postLogin(loginUserData)
        }
    }, [loginUserData])

    const postSignUpUser = (user) => {
        setSignUpUserData({...user});
    }

    const postLoginUser = (user) => {
        setLoginUserData({...user});
    }
    
    return(
        <blogStore.Provider value={{postLoginUser, postSignUpUser}}>
            {children}
        </blogStore.Provider>
    )
}

export default BlogStoreProvider;