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
    searchTerm: () => {}
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
    }
    return newPostList;
}



const BlogStoreProvider = ({children}) => {
    const [signupUserData, setSignUpUserData] = useState("");
    const [loginUserData, setLoginUserData] = useState("");
    const navigate = useNavigate();
    const [newPosts, setNewPosts] = useState("");
    const [deletedPosts, setDeletedPosts] = useState("");
    const [updatedPosts, setUpdatedPosts] = useState("");
    const [searchPosts, setSearchedPosts] = useState("");

    const [postList, dispatchPostList] = useReducer(pureReducerPostFunction, []);

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
                const {data} = await axios.get('http://127.0.0.1:8081/blogs/read', {signal});
                dispatchPostList({type: "INITIAL_POSTS", payload: {
                    data
                }})
            }catch(error){  
                console.log(error);
            }
        }
        
        fetchPostList();

        return () => {
            controller.abort();
        }
    }, [])

    useEffect(() => {
        const addNewPosts = async(blog) => {
            try{
                const {data} = await axios.post('http://127.0.0.1:8081/blogs/new', {
                    ...blog, fullname: JSON.parse(sessionStorage.getItem('active')).fullname
                })
                console.log(data);
                dispatchPostList({type: "ADD_POSTS", payload: {
                    data
                }})
            }catch(error){
                console.log(error)
            }
        }

        if(newPosts){
            addNewPosts(newPosts)
        }
    }, [newPosts])

    useEffect(() => {
        const removePosts = async(id) => {
            try{
                await axios.delete(`http://127.0.0.1:8081/blogs/remove/${id}`);
                dispatchPostList({type: "DELETE_POSTS", payload: {
                    id
                }})

            }catch(error){
                console.log(error)
            }
        }

        if(deletedPosts){
            removePosts(deletedPosts)
        }
    }, [deletedPosts])

    useEffect(() => {
        const updatePosts = async({author, title, body, tags, id}) => {
            try{
                const {data} = await axios.put(`http://127.0.0.1:8081/blogs/edit/${id}`,{
                    author,title, body, tags
                })
                dispatchPostList({type: "EDIT_POSTS", payload: {
                    data, id
                }})
            }catch(error){
                console.log(error)
            }
        }
        if(updatedPosts){
            updatePosts(updatedPosts)
        }

    }, [updatedPosts])

    useEffect(() => {
        const searchPostFromList = async(title) => {
            try{
                const {data} = await axios.get(`http://127.0.0.1:8081/blogs/search?title=${title}`)
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
    
    return(
        <blogStore.Provider value={{postLoginUser, postSignUpUser, postList, addPost, deletePost, updatePost, searchTerm}}>
            {children}
        </blogStore.Provider>
    )
}

export default BlogStoreProvider;