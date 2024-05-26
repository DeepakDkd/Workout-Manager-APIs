export const useLogin = async (email, password , setError)=>{

    try {
        
    const data = await fetch('http://localhost:8089/api/user/login', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify({
            email: email.trim(),
            password: password.trim(),
        })
    })
    const json = await data.json()
    if(!json.success){
        
        setError(json.error)
        console.log(json.error)
    }

    if(json.success){
        setError(null)
        localStorage.setItem("auth_token" , JSON.stringify(json?.token)) 
        return true
    }
    } catch (error) {
        console.log("Server Error during login" , error )
        setError("Server error during login")
    }
}