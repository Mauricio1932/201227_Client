import React, {useState} from 'react'
import axios from "axios";
import { Link } from 'react-router-dom';
import '.././Assets/style.css'

import {Grid,Paper,Typography,Avatar,TextField,Button} from '@mui/material';

//const accessToken = '143220b711a0a19dc885ff207663f5c7fcaebbc7';
const url ='http://localhost:8000/api/v1/register/';


function Register(){

    const [error,setError] = useState("")
    const [form,setForm] = useState({});
    const [pass,setPass] = useState(false)

    const handleChange = e  =>{
        setForm({
            ...form,[e.target.name]:e.target.value,
        });
    };

    const verPassword = () =>{
        if (pass == false){
            setPass(true)
        }else{
            setPass(false)
        }
        console.log(pass)
    }
    
    const fetchData = (e)=>{
        console.log(form.password)
        console.log(form.repeatPass)
        if ((form.password === "" &&  form.repeatPass ==="") || (form.password != form.repeatPass)){
            setError("verifica tu contraseña")
            setTimeout(() => {
                setError("")
            }, 5000);
        }else{
            console.log("son iguales")
            axios.post(url,{
                "username":form.username,
                "password":form.password,
                "password2": form.repeatPass,
                "email":form.email,
                "first_name":form.firstname,
                "last_name":form.lastname
            }).then(
                res=>{
                    console.log(res)
                    alert("Usuario registrado")
                    setForm({})
                    
                },
                err=>{
                    setError("El usuario o gmail ya se estan ocupando")
                    setTimeout(() => {
                        setError("")
                    }, 5000);
                }
            )
        }

        // axios.post(url,{

        //     'username':username,
        //     'email':email,
        //     'password':password

        // }).then(response=>{console.log(response.data)})

    }

    return(   
        <div className="maincontainer">
            <div class="container-fluid">
                <div class="row no-gutter">
                    <div class="col-md-6 d-none d-md-flex bg-image"></div>
                    
                    <div class="col-md-6 bg-light">
                        <div class="login d-flex align-items-center py-5">                           
                            <div class="container">
                                <div class="row">
                                    <div class="col-lg-10 col-xl-7 mx-auto">
                                        <h3 class="display-4">Sign up</h3>
                                        <p class="text-muted mb-4">Hola un gusto tenerte en nuestra pagina!</p>
                                        <form>
                                            <p className='color'>{error}</p>
                                            <div class="mb-3">
                                                <input id="inputEmail" type="email" name='username'  placeholder="Username" required="" autofocus="" onChange={handleChange} class="form-control border-0 shadow-sm px-4" />
                                            </div>
                                            <div class="mb-3">
                                                <input id="inputEmail" type="email" name='firstname'  placeholder="Fist name" required="" autofocus="" onChange={handleChange}  class="form-control border-0 shadow-sm px-4" />
                                            </div>
                                            <div class="mb-3">
                                                <input id="inputEmail" type="email" name='lastname'  placeholder="Last name" required="" autofocus="" onChange={handleChange}  class="form-control border-0 shadow-sm px-4" />
                                            </div>
                                            <div class="mb-3">
                                                <input id="inputEmail" type="email" name='email' placeholder="Email address" required="" autofocus="" onChange={handleChange}  class="form-control border-0 shadow-sm px-4" />
                                            </div>
                                            <div class="mb-3 input-group shadow border rounded rounded-pill">
                                                <input id="inputPassword" type={pass ? "text" : "password"} name='password'  placeholder="Password" required="" onChange={handleChange}  class="form-control border-0 shadow-sm px-4 text-primary" />
                                                <input type="button" className='input-group-text bg-dark text-light' onClick={()=>verPassword()} value="Show"/>
                                            </div>
                                            <div class="mb-3 input-group shadow border rounded rounded-pill">
                                                <input id="inputPassword" type={pass ? "text" : "password"} name='repeatPass' placeholder="Repeat password" onChange={handleChange}  required="" class="form-control border-0 shadow-sm px-4 text-primary" />
                                            </div>
                                            <div class="d-grid gap-2 mt-2">
                                            <input type="button" className="btn btn-primary btn-block text-uppercase mb-2 shadow-sm" onClick={()=>fetchData()} value="Sign up"/>
                                            </div>
                                            <div clasName="text-center d-flex justify-content-between mt-4">you have an account?
                                            <Link to='/'>Login</Link>
                                            </div>
                                            
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
     
    )
}

export default Register;