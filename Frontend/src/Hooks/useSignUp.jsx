
export const useSignup = async(name , email , password , setError)=>{
    try {
        const data = await fetch(`${import.meta.env.VITE_DBURL}/api/user/signup`,{
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify({ name: name.trim() , email: email.trim() , password:password.trim()})

        })
        const Data = await data.json()
        console.log(Data)
        if(!Data.success){
            setError(Data.error)
            return false
        }
        if(Data.success){
            setError(null)
            localStorage.setItem("auth_token", JSON.stringify(Data?.token));
            return true;
        }

    } catch (error) {
        setError("Error during Signup ",error)
        console.log(error)
    }
}