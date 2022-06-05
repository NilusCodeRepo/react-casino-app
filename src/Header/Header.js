import React from 'react'
import { Box, Typography, AppBar, Button, Toolbar, IconButton, Avatar } from '@mui/material'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useEffect } from 'react';
import {useDispatch} from 'react-redux'
import {login} from '../Redux/userSlice'




const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const paperStyle = {
    backgroundColor: 'tomato',
    border: 'none'
}

const Header = (props) => {

    const [open, setOpen] = React.useState(false);
    const [values, setValues] = React.useState({
        name: 'CardCasino',
        password: '',
        showPassword: false,
        isLoggedIn: false,
    });
    const [uname,setUname]=React.useState();
    const dispatch=useDispatch()


    const handleOpen = () => {
        props.logState ? handleLogout() : setOpen(true);

    }
    const handleClose = () => setOpen(false);

    const handleLogout=()=>{
        setValues({            
            name: 'CardCasino',
            password: '',
            showPassword: false,
            isLoggedIn: !values.isLoggedIn,
            
        })

       // setUname('CardCasino')

        localStorage.setItem('userInfo', JSON.stringify({}));
        localStorage.setItem('Balance', JSON.stringify('0'));
        props.updateUserInfo(values.name)

    }

   const sendData=()=>{
    console.log("logout done",values.name,values.password,values.isLoggedIn)    
    //props.updateUserInfo(values)

   }
    

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    useEffect(() => {
        localStorage.setItem('userInfo', JSON.stringify(values));

      }, [values]);
    
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setValues({
            ...values,
            name: values.name,
            isLoggedIn: !values.isLoggedIn
        })


        props.updateUserInfo(values.name)
        setOpen(false)
    }

   const handleGuestLOgin=(event)=>{
       console.log("inside guest login")
    setValues({
        name: 'Guest',
        password:'',
        showPassword: false,
        isLoggedIn: true,
    })

    props.updateUserInfo(values.name)
    setOpen(false)

   } 
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar color="error" style={paperStyle}>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {props.logState?`Welcome , ${props.heading}`:props.heading}
                        </Typography>
                        <AttachMoneyIcon />
                        <Typography variant="h6" component="div" >
                            <Box sx={{ textAlign: 'right', m: 1 }}>
                            {props.logState?  props.balance : '0'}

                              
                            </Box>
                        </Typography>

                        <IconButton sx={{ p: 0 }}>
                            <Avatar alt="Remy Sharp" src="https://randomuser.me/api/portraits/men/71.jpg" />
                        </IconButton>
                        <Button color="inherit" onClick={handleOpen}>{props.logState ? "Logout" : "Login"}</Button>
                    </Toolbar>
                </AppBar>
            </Box>

            {props.logState?
                <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert severity="success">Logged in as a {props.heading}</Alert>
                 </Stack>
                 :    ''
           
            
          }
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        LOGIN
                    </Typography>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleClose();
                        }}
                    >
                        <FormControl fullWidth sx={{ m: 1, width: '50ch' }} variant="outlined">
                            <TextField id="outlined-basic" label="Name" variant="outlined" value={values.name} onChange={handleChange('name')} />
                        </FormControl>

                        <FormControl fullWidth sx={{ m: 1, width: '50ch' }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.password}
                                onChange={handleChange('password')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl >
                        <FormControl sx={{ m: 1, width: '50ch' }}>
                            <Button variant="contained" color="error" onClick={handleSubmit}>SUBMIT</Button>
                        </FormControl>

                        <FormControl sx={{ m: 1, width: '50ch' }}>
                            <Button variant="outlined" color="error" onClick={handleGuestLOgin}>Login as a Guest</Button>
                        </FormControl>
                    </form>
                </Box>



            </Modal>
        </>
    )
}

export default Header