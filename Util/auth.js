import axios from "axios";

const AUTH_URL = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="
const API_KEY = "AIzaSyBs5-x1ShYDngW8gNcv8FiepKZBjwuFHCM"

export async function authenticate(email, password){
    const URL = AUTH_URL + API_KEY
    const response = await axios.post(URL, 
        {
            email: email,
            password: password,
            returnSecureToken: true
        })
    
        const token = response.data.idToken

        return token 

}
