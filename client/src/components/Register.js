import React, {useState, useContext } from 'react';
import {AuthContext} from '../index'
import * as firebase from 'firebase'
import {withRouter} from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import KetoLogo from '../assets/keto_logo.png'

const useStyles = makeStyles(theme => ({
    root: {
      height: '100vh',
    },
    image: {
      backgroundImage: 'url(https://cdn.pixabay.com/photo/2014/07/10/17/17/swimming-pool-389267_1280.jpg)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: '#0b0080',
    },
    form: {
      width: '60%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      backgroundColor: "#0b0080"
    },
    toolbarLogo: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        ...theme.mixins.toolbar,
    },
    googleBtn: {
        width: '100%',
        margin: theme.spacing(3, 0, 2),
        display: 'flex',
        justifyContent: 'center',
        fontSize: '16px',
    },  
    googleBtnImg: {
        width: '16px',
        height: '16px',
        padding: '0',
        margin: '0 5px',
        verticalAlign: 'middle',
    },

}));



const Register = ({history}) => {
    const classes = useStyles();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setErrors] = useState("");

    const Auth = useContext(AuthContext);

    const handleForm = e => {
        e.preventDefault();
        firebase
            .auth()
            .setPersistence(firebase.auth.Auth.Persistence.SESSION)
                .then(() => {
                    firebase
                    .auth()
                    .createUserWithEmailAndPassword(email, password)
                    .then(res => {
                        history.push('/dashboard')
                        if(res.user) Auth.setLoggedIn(true);
                    })     
                    .catch(e => {
                        setErrors(e.message)
                    });                               
                })
            


    };
    const handleGoogleLogin = () => {
        const provider = new firebase.auth.GoogleAuthProvider();

        firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.SESSION)
            .then(() => {
                firebase
                .auth()
                .signInWithPopup(provider)
                .then(result => {
                    console.log(result)
                    history.push('/dashboard')
                    Auth.setLoggedIn(true)
                })
                .catch(e => setErrors(e.message))
            })
    }

    return (
        
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={12} sm={6} md={4} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <span className={classes.toolbarLogo}>
                        <img src={KetoLogo} alt="logo"  />
                    </span>
                    <Avatar className={classes.avatar}>
                        <Icon>person_add</Icon>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Register
                    </Typography>
                    
                    <form className={classes.form} noValidate onSubmit={e => handleForm(e)}>
                        <span>{error}</span>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            type="email"
                            autoFocus
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <TextField
                            onChange={e => setPassword(e.target.value)}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            value={password}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >Create Account</Button>
                        <Grid container>
                            <Grid item>
                                <Link href="/login" variant="body2">
                                {"Already have an account?"}
                                </Link>
                            </Grid>
                            
                        </Grid>
                        <Grid item xs={12} component={Paper} elevation={6} square>
                            <Button
                                className={classes.googleBtn}
                                type="button"
                                fullWidth
                                onClick={() => handleGoogleLogin()}
                                align="center"
                            >
                            <img
                                className={classes.googleBtnImg}
                                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                                alt="logo"
                            />
                            Join With Google
                            </Button>
                        </Grid>
                    </form>
                </div>
            </Grid>
            <Grid item xs={false} sm={6} md={8} className={classes.image} />
           

        </Grid>

)

}


export default withRouter(Register);