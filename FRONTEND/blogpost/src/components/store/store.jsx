import { createContext, useEffect, useReducer, useState } from "react";
import axios from 'axios'; 
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

export const blogStore = createContext({
    postSignUpUser: () => {},
    postLoginUser: () => {},
    postList: [],
    addPost: () => {},
    updatePost: () => {},
    deletePost: () => {},
    searchTerm: () => {},
    getMyBlogs: () => {},
    invoker: true,
    setInvoker: () => {},
    authInformation: [],
    adminActive: () => {},
    adminCallUser: () => {}
})


function pureReducerPostFunction(currentState, action) {
    let newPostList = currentState;
    if(action.type === "INITIAL_POSTS"){
        newPostList = action.payload.data;
    }else if(action.type === "ADD_POSTS"){
        newPostList = [action.payload.data, ...currentState];
    }else if(action.type === "EDIT_POSTS"){
        let filterPost = currentState.filter((x) => x["_id"] !== action.payload.id);
        newPostList = [action.payload.data, ...filterPost];
    }else if(action.type === "DELETE_POSTS"){
        let removedPostList = currentState.filter((x) => x['_id'] !== action.payload.id);
        newPostList = removedPostList;   
    }else if(action.type === "SEARCH_POSTS"){
        newPostList = action.payload.data
    }else if(action.type === "USER_BLOGS") {
        newPostList = action.payload.data;
    }else if(action.type === "AUTHUSER_BLOGS"){
        newPostList = action.payload.data;
    }
    return newPostList;
}


function pureReducerAuthInfo(currentState, action){
    let newAuthList = currentState;
    if(action.type === "AUTH_INFO"){
        newAuthList = action.payload.data;
    }
    return newAuthList
}


const BlogStoreProvider = ({children}) => {
    const [signupUserData, setSignUpUserData] = useState("");
    const [loginUserData, setLoginUserData] = useState("");
    const navigate = useNavigate();
    const [newPosts, setNewPosts] = useState("");
    const [deletedPosts, setDeletedPosts] = useState("");
    const [updatedPosts, setUpdatedPosts] = useState("");
    const [searchPosts, setSearchedPosts] = useState("");
    const [getUser, setUser] = useState(true);
    const [invoker, setInvoker] = useState(true);
    const [getAuthUsers, setAuthUsers] = useState(true);
    const [getUserSpecific, setUserSpecific] = useState('');

    const [postList, dispatchPostList] = useReducer(pureReducerPostFunction, []);

    const [authInformation, dispatchAuthInformation] = useReducer(pureReducerAuthInfo, []);

    useEffect(() => {
        const postSignup = async(user) => {
            try{
                await axios.post('https://blogs-mern-m6yo.vercel.app/auth/signup', {
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
                const {data} = await axios.post('https://blogs-mern-m6yo.vercel.app/auth/login', {
                    ...user
                })
                sessionStorage.setItem('active', JSON.stringify(data));
                if(JSON.parse(sessionStorage.getItem('active')).isLoggedIn){
                    enqueueSnackbar(`Logged in as ${JSON.parse(sessionStorage.getItem('active')).fullname}`)
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

    useEffect(() => {
        const controller = new AbortController();
        const {signal} = controller;
        const fetchPostList = async() => {
            try{
                const {data} = await axios.get('https://blogs-mern-m6yo.vercel.app/blogs/read', {signal});
                dispatchPostList({type: "INITIAL_POSTS", payload: {
                    data
                }})
            }catch(error){  
                console.log(error);
            }
        }
        
        if(invoker || !invoker){
            fetchPostList();
        }

        return () => {
            controller.abort();
        }
    }, [invoker])

    useEffect(() => {
        const addNewPosts = async(blog) => {
            try{
                const {data} = await axios.post('https://blogs-mern-m6yo.vercel.app/blogs/new', {
                    ...blog, fullname: JSON.parse(sessionStorage.getItem('active')).fullname
                })
                
                dispatchPostList({type: "ADD_POSTS", payload: {
                    data
                }})
                enqueueSnackbar(`New Post added`, {variant: "default"})
            }catch(error){
                enqueueSnackbar(error.message, {variant: "error",preventDuplicate: true})
            }
        }

        if(newPosts){
            addNewPosts(newPosts)
        }
    }, [newPosts])

    useEffect(() => {
        const removePosts = async(id) => {
            try{
                await axios.delete(`https://blogs-mern-m6yo.vercel.app/blogs/remove/${id}`);
                dispatchPostList({type: "DELETE_POSTS", payload: {
                    id
                }})
                enqueueSnackbar(`Post removed`, {variant: "default"})
            }catch(error){
                enqueueSnackbar(error.message, {variant: "error",preventDuplicate: true})
            }
        }

        if(deletedPosts){
            removePosts(deletedPosts)
        }
    }, [deletedPosts])

    useEffect(() => {
        const updatePosts = async({author, title, body, tags, id}) => {
            try{
                const {data} = await axios.put(`https://blogs-mern-m6yo.vercel.app/blogs/edit/${id}`,{
                    author,title, body, tags
                })
                dispatchPostList({type: "EDIT_POSTS", payload: {
                    data, id
                }})
                enqueueSnackbar(`Post updated`, {variant: "default"})
            }catch(error){
                enqueueSnackbar(error.message, {variant: "error",preventDuplicate: true})
            }
        }
        if(updatedPosts){
            updatePosts(updatedPosts)
        }

    }, [updatedPosts])

    useEffect(() => {
        const searchPostFromList = async(title) => {
            try{
                const {data} = await axios.get(`https://blogs-mern-m6yo.vercel.app/blogs/search?title=${title}`)
                dispatchPostList({type: "SEARCH_POSTS", payload: {
                    data
                }})

            }catch(error){
                console.log(error)
            }
        }
        
        let interval = setTimeout(() => {
               return searchPostFromList(searchPosts)
        }, 600)

        return () => {
            clearInterval(interval)
        }


    }, [searchPosts])

    useEffect(() => {
        const fetchUserBlog = async() => {
            try{
                const {data} = await axios.get(`https://blogs-mern-m6yo.vercel.app/blogs/user?fullname=${JSON.parse(sessionStorage.getItem('active')).fullname}`)
                dispatchPostList({type: "USER_BLOGS", payload: {
                    data
                }})
            }catch(error){
                console.log(error)
            }
        }

        if(getUser || !getUser){
            fetchUserBlog();
        }
    }, [getUser])

    useEffect(() => {
        const fetchUserSpecificBlog = async(name) => {
            try{
                const {data} = await axios.get(`https://blogs-mern-m6yo.vercel.app/blogs/user?fullname=${name}`)
                dispatchPostList({type: "AUTHUSER_BLOGS", payload: {
                    data
                }})
                enqueueSnackbar(`Blogs of ${name}`, {variant: "default"})
            }catch(error){
                console.log(error)
            }
        }

        if(getUserSpecific){
            fetchUserSpecificBlog(getUserSpecific);
        }
    }, [getUserSpecific])

    useEffect(() => {
        const fetchAllUsers = async() => {
            try{
                const {data} = await axios.get(`https://blogs-mern-m6yo.vercel.app/auth/authusers`);
                dispatchAuthInformation({type: "AUTH_INFO", payload: {
                    data
                }})
            }catch(error){
                console.log(error);
            }
        } 

        if(getAuthUsers || !getAuthUsers){
            fetchAllUsers();
        }
    }, [getAuthUsers])

    const postSignUpUser = (user) => {
        setSignUpUserData({...user});
    }

    const postLoginUser = (user) => {
        setLoginUserData({...user});
    }

    const addPost = (blog) => {
        setNewPosts(blog)
    }

    const deletePost = (id) => {
        setDeletedPosts(id)
    }

    const updatePost = (blog) => {
        setUpdatedPosts(blog)
    }

    const searchTerm = (title) => {
        setSearchedPosts(title);
    }

    const getMyBlogs = () => {
        setUser(!getUser)
    }

    const adminActive = () => {
        setAuthUsers(!getAuthUsers);
    }

    const adminCallUser = (name) => {
        setUserSpecific(name)
    }
    
    return(
        <blogStore.Provider value={{postLoginUser, postSignUpUser, postList, addPost, deletePost, updatePost, searchTerm, getMyBlogs, invoker, setInvoker, authInformation,  adminActive, adminCallUser}}>
            {children}
        </blogStore.Provider>
    )
}

export default BlogStoreProvider;