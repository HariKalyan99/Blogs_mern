import { createContext, useEffect, useState } from "react";
import axios from 'axios'; 
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

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
                await axios.post('http://127.0.0.1:8081/auth/signup', {
                    ...user
                })
                enqueueSnackbar(`Registered!`)
                navigate("/login")
            }catch(error){
                enqueueSnackbar(error.message, {variant: "error",preventDuplicate: true})
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
                localStorage.setItem('active', JSON.stringify(data));
                if(JSON.parse(localStorage.getItem('active')).isLoggedIn){
                    enqueueSnackbar(`Logged in as ${JSON.parse(localStorage.getItem('active')).fullname}`)
                    navigate("/")
                }else{
                    enqueueSnackbar("Wrong credentials", {variant: "error",preventDuplicate: true})
                    }
                    }catch(error){
                        enqueueSnackbar(error.message, {variant: "error",preventDuplicate: true})
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