import React, {useState} from 'react';
import {Link} from 'react-router-dom'
import * as actions from '../store/actions/index';
import { connect } from 'react-redux';

function LoginForm(props) {
    const [state , setState] = useState({
        username : "",
        password : ""
    })
    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    const handleSubmitClick = (e) => {
        e.preventDefault();
        if(state.username.length && state.password.length) {
            props.changeError(null);
            props.login({
                "username":state.username,
                "password":state.password,
            })  
        } else {
            props.changeError('Please enter valid username and password')    
        }  
        
    }

    return(
        <div className="card col-12 col-lg-4 login-card p-4">
            <h5 className="text-center">Login Form</h5>
            <form className="mt-2 mb-3">
                <div className="form-group text-left">
                <label htmlFor="exampleInputUsername1">Username</label>
                <input type="text" 
                       className="form-control" 
                       id="username" 
                       aria-describedby="usernameHelp" 
                       placeholder="Enter Username" 
                       value={state.username}
                       onChange={handleChange}
                />
                </div>
                <div className="form-group text-left">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" 
                       className="form-control" 
                       id="password" 
                       placeholder="Password"
                       value={state.password}
                       onChange={handleChange} 
                />
                </div>
                <button 
                    type="submit" 
                    className="btn btn-primary mt-2"
                    onClick={handleSubmitClick}
                >Submit</button>
            </form>
            <div className="mb-4">
                <span>Dont have an account? </span>
                <span><Link to="/register">Register here</Link></span> 
            </div>
        </div>
    )
}
const mapDispatchToProps = dispatch => {
    return {
      changeError: (error) => dispatch(actions.changeError(error)),
      login: (data) => dispatch(actions.login(data))
    };
  };
  
export default connect(null,mapDispatchToProps)(LoginForm)