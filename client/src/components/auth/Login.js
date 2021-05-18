
import React, {  useState} from 'react';
import { Link } from 'react-router-dom';

const Login = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();

  };

 


  return (
    <section>
    <section class=" container-auth p-2">
      <div>
      <div >
    <h1 className="large text-primary"> Sign Up</h1>
    <p className="lead">
      <i className="fas fa-user"/> Create Your Account
    </p>
 

    <form   className=" form form-group"
    onSubmit={e => onSubmit(e)} >

   

      <div className=" form form-group">
        <input
          type="email"
          placeholder="Email Address"
          name="email"
          value={email} 
          onChange={e => onChange(e)}  
          required />
        
      
      </div>
      <div  className=" form form-group">
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password} 
          onChange={e => onChange(e)}  
          required
          
        />
      </div>
     
      <input type="submit" className="btn btn-primary " value="Login" />
    </form>
    <p className="my-1">
    Don't have an account? <Link to="/register">Register</Link>
    </p>
    </div>
      </div>
      <div class="pic ">
     
      </div>
    </section>
  </section>
  
   
  );
};


export default Login

/*
const Login = () => {
  return (
    <section className="container-auth p-2" >
    <h1 className="large text-primary">Sign In</h1>
    <p className="lead">
      <i className="fas fa-user"/> Sign Into Your Account
    </p>
    <form className="form" >
      <div>
        <input
          type="email"
          placeholder="Email Address"
          name="email"
          required
        />
      </div>
      <div >
        <input
          type="password"
          placeholder="Password"
          name="password"
       
          minLength="6"
        />
      </div>
      <input type="submit" className="btn btn-primary " value="Login" />
    </form>
    <p className="my-1">
      Don't have an account? <Link to="/register">Sign Up</Link>
    </p>
  </section>
  )
}

*/