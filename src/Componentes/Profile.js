import React, {useEffect,useState} from 'react';
import axios from 'axios';
import Myimg from '../images/pp.jpg';
import '.././Assets/style.css'

import { Link} from 'react-router-dom';
//material UI
import {Grid,Paper,Typography,Avatar,TextField,Button,Box,Container,InputLabel,FormHelperText,Input} from '@mui/material';
import Card from '@mui/material/Card';
import UpdateIcon from '@mui/icons-material/Update';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
///static/images/avatar/1.jpg

const url ='http://localhost:8000/api/v1/register/';



function Profile({userLogin,userProfile}){

    const username = "alejandro1932"
    const name = "Alejandro"
    const lastename= "Mauricio"
    const email = "alex@gmail.com"
    //const id = "1"

    const paperStyle={padding:30, height:'70vh',width:700, margin:"25px auto"}
    const cardStyle = {margin:"10px 10px 20px 30px"}
    const styleButton ={color:'black', backgroundColor:'#93BAF9',margin:'8px 0'}
    const styleInput = {display:"none"}
    const styleSize = {width:"120px", margin:'0 0 -45px' }
    const styleBox = {margin:"210px 170px"}

    const [images,setimages] = useState(Myimg);
    const [usuario,setUsuario] = useState([]);
    const [loadImages,setLoadImages] = useState(true)
    const [inf, setInfo] = useState(null);
    const [error,setError] = useState("")
    //const [user,setUser] = useState(false)


    // useEffect (()=>{
    //     const logUser = localStorage.getItem('token')
    //     if (logUser){
    //         setUser(true)
    //         console.log(lo)
    //     }
    
    // },[])

    //${userProfile.user_id}

    const [userName,setUsername] = useState("");
    const [lastName,setLastName] = useState("");
    const [e_mail,setEmail] = useState("");
    const [firstname,setfirstname] = useState("");

    

    const update = async (e) => {
        const formData = new FormData();
        formData.append('url_img',inf)

        if(userName === ""){
            setUsername(usuario.username)
        }
        if(e_mail === ""){
            setEmail(usuario.email)
        }
        if(firstname === ""){
            setfirstname(usuario.firstname)
        }
        if(lastName === " "){
            setLastName(usuario.lastname)
        }

        
        if(userName != "" && e_mail != "" && firstname != "" && lastName != ""){
            let response = await fetch(`http://localhost:8000/api/v1/userInfo/${userProfile.user_id}`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify({
                    "username": userName,
                    "email":e_mail,
                    "first_name":firstname,
                    "last_name": lastName
                }),
            })

            let res = await fetch(`http://localhost:8000/api/v1/loadImage/imagen/${userProfile.user_id}`,{
                method: 'PUT',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                },
                body:formData,
                })
                alert("Se actualizo correctaente")
        }else{
            alert("surgio un problema, vuelve intentarlo")
        }
        
    }


    const getImgUser = async () =>{
        let response = await fetch(`http://localhost:8000/api/v1/loadImage/imagen/${userProfile.user_id}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer '+localStorage.getItem('token')
            },
            
        })
        
        const data  = await response.json();
        setimages(data.pay_load.url_img)
        console.log(data.pay_load.url_img)


    }

    const getInfo = async () => {
        let response = await fetch(`http://localhost:8000/api/v1/userInfo/${userProfile.user_id}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer '+localStorage.getItem('token')
            },
            
        })
        
        const data  = await response.json();
        console.log(data)

        setUsername(data.username)
        setEmail(data.email)
        setfirstname(data.first_name)
        setLastName(data.last_name)
        
        setUsuario({
                'username': data.username,
                'lastname': data.last_name,
                'firstname':data.first_name,
                'email':data.email
        })
        
    }

    

    useEffect(()=>{
        getInfo()
        getImgUser()
    },[]);
        
    const changeInput = (e) => {    
        const reader = new FileReader();
        reader.onload = () =>{
            if (reader.readyState === 2){
                setimages(reader.result)
            }
        }

        console.log(images)
        reader.readAsDataURL(e.target.files[0])
        console.log(e.target.files[0])
        setInfo(e.target.files[0])
    }


    //disabled
    return (
        <>
            {
                userLogin ?
                    <Grid>
                        <Paper elevation={10} style={paperStyle}>
                            <Grid>
                                <Grid align='center'>
                                    <h2>Profile</h2>
                                    <Avatar alt="Mauricio Alejandro"   sx={{ width: 110, height: 110 }}>
                
                                        <label htmlFor="icon-button-file">
                                            <img  src={images} style={styleSize}/>
                                            <Input accept="image/*" id="icon-button-file" name="imgs" type='file' style={styleInput} onChange={changeInput}></Input>
                                            
                                            <IconButton color="primary" aria-label="upload picture" component="span"> 
                                                <PhotoCamera />
                                            </IconButton>
                                        </label>
                                    </Avatar>
                                    <Button variant="contained" disabled style={styleButton}>ID: {userProfile.user_id}</Button>
                                </Grid>
            
                                <Grid>
                                    <Container>
                                        
                                                <Grid container >
                                                <Grid item order={4} xs={12} sm={6} md={5} style={cardStyle}>
                                                    <Card  elevation={5}>
                                                        <CardContent>
                                                            <p className='color'>{error}</p>
                                                            <TextField fullWidth  id="standard-basic" name='username'  onChange={(e)=>setUsername(e.target.value)} className='textfield' InputLabelProps={{style: {color: 'red' }, }} placeholder='Change USername'  label={usuario.username} variant="standard" />
                                                            <FormHelperText id="name-helper" className='name-helper'>Username</FormHelperText>
                                                            <TextField fullWidth id="standard-basic" placeholder='Change lastname' name='lastname' InputLabelProps={{style: {color: 'black' }, }} onChange={(e)=>setLastName(e.target.value)} aria-describedby="email-helper" label={usuario.lastname} variant="standard" />
                                                            <FormHelperText id="lastname-helper" className='lastname-helper'>Last name</FormHelperText>
                                                        </CardContent>
                                                    </Card>
                                                </Grid>
                                                <Grid item order={4}  xs={10} sm={4} md={5} style={cardStyle}>
                                                    <Card elevation={5}>
                                                        <CardContent>
                                                            <TextField  fullWidth id="standard-basic" name='firstname' placeholder='Change name' InputLabelProps={{style: {color: 'black' }, }} onChange={(e)=>setfirstname(e.target.value)}  label={usuario.firstname} variant="standard"/>
                                                            <FormHelperText id="first-name-helper"  className='first-name-helper'>First Name</FormHelperText>
                                                            <TextField fullWidth id="standard-basic" placeholder='Change email' name='email' InputLabelProps={{style: {color: 'black' }, }} onChange={(e)=>setEmail(e.target.value)} aria-describedby="email-helper" label={usuario.email} variant="standard" />
                                                            <FormHelperText id="email-helper" className='helper'>E-mail</FormHelperText>
                                                        </CardContent>
                                                    </Card>
                                                </Grid>
                                                
                                            </Grid>
                                            
                                            <Grid align='center'>
                                                <Button variant="outlined" endIcon={<UpdateIcon/>} onClick={()=>update()}>Update</Button>
                                                <Button variant="outlined" ><Link to='/' onClick={()=> localStorage.clear()}>Logout</Link></Button>
                                            </Grid>
                                    </Container>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                :
                <Grid>
                    <Paper elevation={10} style={paperStyle}>
                            <Grid style={styleBox}>
                                <Box component="span" sx={{ p: 2, border: '1px dashed grey' }}>
                                    <Button>no estas logeado, haz click  </Button>
                                    <Link to='/login'>Login</Link>
                                </Box>
                            </Grid>
                    </Paper>
                </Grid>
            }
        </>
    )
}

export default Profile;