
import React, {  useState} from 'react';
import {connect} from 'react-redux'; 
import { Link } from 'react-router-dom';
import { setAlert } from '../../actions/alert';

const Register = ({ setAlert, register, isAuthenticated })  => {

const [formData, setFormData] = useState({
  name:'', 
  email:'', 
  password:'', 
  password2:''
}); 

/*formData.name */
const {name, email, password, password2} = formData;

//with the [e.target.name we can use that for every field]
const onChange = e =>  
setFormData({...formData, [e.target.name]: e.target.value})



const onSubmit = async e => {
  e.preventDefault(); 
  if(password !== password2){
   setAlert('Password do not match', 'danger')
  }else {
    console.log('onSubmit works :-)')
  }
}
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

      <div  className=" form form-group" >
        <input
          type="text"
          placeholder="Name"
          name="name" 
          value={name} 
          onChange={e => onChange(e)}    
          required  
        />
      </div>

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
      <div  className=" form form-group">
        <input
          value={password2} 
          onChange={e => onChange(e)}  
          type="password"
          placeholder="Confirm Password"
          name="password2"
          required
         
        />
      </div>
      <input type="submit" className="btn btn-primary" value="Register" />
    </form>
    <p className="my-1">
      Already have an account? <Link to="/login">Login</Link>
    </p>
    </div>
      </div>
      <div class="pic ">
     
      </div>
    </section>
  </section>
  
  )
}


export default connect( null, {setAlert}) (Register);


/*c
 to test the backend anc access

const Register = () => {

const [formData, setFormData] = useState({
  name:'', 
  email:'', 
  password:'', 
  password2:''
}); 

/*formData.name 
const {name, email, password, password2} = formData;

//with the [e.target.name we can use that for every field]
const onChange = e =>  setFormData({...formData, [e.target.name] : e.target.value})

const onSubmit = async e => {
  e.preventDefault(); 
  if(password !== password2){
   console.log('Password do not match')
  }else {
    console.log(formData)
    const newUser = {
      name, 
      email: email, 
      password
    }

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'   
      }
    }
      const body = JSON.stringify(newUser); 

      const res = await axios.post('/api/users', body, config);
      console.log(res.data)

    } catch(err){
console.error(err.response.data)
    }
  }
} */