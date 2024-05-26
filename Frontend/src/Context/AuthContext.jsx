import { createContext , useContext, useReducer } from "react";

const AuthContext = createContext();

const AuthReducer = (state,action)=>{

    switch (action.type) {
        case "LOGIN":  
            return {
                user:action.payload
            };

         case 'LOGOUT':
            localStorage.removeItem('auth_token')
            return{
                user:null
            }   
    
        default:
            return  state;
    }

}

export const AuthContextProvider = ({children})=>{
    
    const [state,dispatch] = useReducer(AuthReducer,{
        user:null
    });
    
    return(
<AuthContext.Provider value={{...state , dispatch}}>
    {children}
</AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}
