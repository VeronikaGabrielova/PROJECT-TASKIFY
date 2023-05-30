import {useState} from "react"
import {useCookies} from "react-cookie"

const Auth = () => {
  const [cookies,setCookies, removeCookies] = useCookies(null)
  const [isLogIn, setLogIn] = useState(true)
   const [email, setEmail] = useState(null)
   const [password, setPassword] = useState(null)
   const [confirmPassword, setConfirmPassword] = useState(null)
  const [error, setError] = useState(null)
  console.log(cookies)
 
 const viewLogin = (status) => {
  setError(null)
  setLogIn(status)
 }
 const handleSubmit = async (e, endpoint) => {
  e.preventDefault()
  if (!isLogIn && password !== confirmPassword){
    setError("Wrong password!")
    return
  }
 const response = await fetch(`${process.env.REACT_APP_SERVERURL}/${endpoint}`,{
     method: "POST",
     headers: {"Content-Type" : "application/json" },
     body: JSON.stringify({email,password})
  })
 const data = await response.json()
if (data.detail){
  setError(data.detail)
}else {
  setCookies("Email", data.email)
  setCookies("AuthToken", data.token)
  window.location.reload()

}
 }

    return (
      <div className="auth-container">
        <div className="auth-box">
          <form className="auth-form">
            <h2 className="auth-header">{isLogIn? "Login" : "Sign up"}</h2>
            <input type="email" placeholder="Your email *" onChange ={(e)=> setEmail(e.target.value)} />
            <input type="password"
             placeholder="Your password *"
             onChange={(e)=>setPassword(e.target.value)}
             />
            {!isLogIn && <input type="password"
             placeholder="Confirm password *"
             onChange={(e)=> setConfirmPassword(e.target.value)}
             />}
           <input type="submit" className="auth-submit" value="Submit" onClick={(e)=>handleSubmit(e,isLogIn ? "login" : "signup" )}/>
           {error && <p className="auth-error">{error}</p>}
          </form>
<div className="auth-options">
  <button 
   onClick = {()=>viewLogin(false)}
   style = {{backgroundColor : !isLogIn ? 'rgb(255,255,255)':'rgb(139 177 79)'}} 
  >Sign Up</button>
  <button onClick = {()=>viewLogin(true)}
  style = {{backgroundColor : isLogIn ? 'rgb(255,255,255)':'rgb(139 177 79)'}}
  >Log In</button>
</div>
        </div>
  
      </div>
    )
  }
  
  export default Auth