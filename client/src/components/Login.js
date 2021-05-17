
import React  from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <section className="container-auth p-2" >
    <h1 className="large text-primary">Sign In</h1>
    <p className="lead">
      <i className="fas fa-user" /> Sign Into Your Account
    </p>
    <form className="form" >
      <div className="form-group form-text">
        <input
          type="email"
          placeholder="Email Address"
          name="email"
      
          required
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          placeholder="Password"
          name="password"
       
          minLength="6"
        />
      </div>
      <input type="submit" className="btn btn-primary" value="Login" />
    </form>
    <p className="my-1">
      Don't have an account? <Link to="/register">Sign Up</Link>
    </p>
  </section>
  )
}

export default Login