import React , {useState} from 'react'
import "./Register.css"
import { NavLink, useNavigate } from 'react-router-dom'

const Register = () => {
    const navigate = useNavigate();
    const [user,setUser] = useState({
        name:"",email:"",pass:"",cpass:"",role:"",ph_n:"",location:""
    })

    let name,value
    const handleInputs = (e) => {
        name = e.target.name;
        value= e.target.value;

        setUser({...user, [name]:value}) //takes in dynamic data from the input
    }

    const PostData = async (e) => {
        e.preventDefault();

        const {name,email,pass,cpass,role,ph_n,location} =user
        const res = await fetch("http://localhost:5000/register", {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                // "Access-Control-Allow-Origin": "http://localhost:5000"
            },
            body: JSON.stringify({
                name,email,pass,cpass,role,ph_n,location
            })
        });
        const data = await res.json();
        console.log(res);
        // if (res.status === 200) {
        //     const data = await res.json();
        // }
        if(res.status === 400 || !data){
            window.alert("Invalid Reg")
        }else{
            window.alert("Successful Reg")
            navigate("/login")
        } 

    }


  return (
    
    <>
    <div className="bg-img">
        <section className="content">
                        <header className="form-title">Sign Up</header>
                            <form method="POST" className="register-form" id="registerForm"> 
                                <div className="field">
                                    <label htmlFor="name">
                                    <span className="fa fa-user"></span>
                                    </label>
                                    <input type="text" name='name' id='name' 
                                        value={user.name}
                                        onChange={handleInputs}
                                        placeholder='Your Name'
                                    />
                                </div>
                                <div className="field space">
                                    <label htmlFor="email">
                                    <span className="fa fa-envelope"></span>
                                    </label>
                                    <input type="email" name='email' id='email' 
                                    value={user.email}
                                    onChange={handleInputs}
                                    placeholder='Your Email'/>
                                </div>
                                <div className="field space">
                                    <label htmlFor="pass">
                                    <span className="fa fa-lock"></span>
                                    </label>
                                    <input type="password" name='pass' id='pass' 
                                    value={user.pass }
                                    onChange={handleInputs}
                                    placeholder='Enter Password'/>
                                </div>
                                <div className="field space">
                                    <label htmlFor="cpass">
                                    <span className="fa fa-key"></span>
                                    </label>
                                    <input type="password" name='cpass' id='cpass' 
                                    value={user.cpass }
                                    onChange={handleInputs}                                    
                                    placeholder='Re-Enter Password'/>
                                </div>
                                <div className="field space">
                                    <label htmlFor="role">
                                        <span className="fa fa-user"></span>
                                    </label>
                                    <select
                                        name="role"
                                        id="role"
                                        value={user.role}
                                        onChange={handleInputs}
                                    >
                                        <option value="">Select a role</option>
                                        <option value="Admin">Admin</option>
                                        <option value="Restaurant">Restaurant</option>
                                        <option value="Customer">Customer</option>
                                    </select>
                                </div>

                                <div className="field space">
                                    <label htmlFor="ph_n">
                                    <span className="fa fa-user"></span>
                                    </label>
                                    <input type="text" name='ph_n' id='ph_n' 
                                        value={user.ph_n}
                                        onChange={handleInputs}
                                        placeholder='Contact'
                                    />
                                </div>
                                <div className="field space">
                                    <label htmlFor="location">
                                    <span className="fa fa-user"></span>
                                    </label>
                                    <input type="text" name='location' id='location' 
                                        value={user.location}
                                        onChange={handleInputs}
                                        placeholder='Location'
                                    />
                                </div>
                                <div className="field">
                                <input type="submit" name='register' id='register' value= "Sign Up"
                                onClick={PostData}
                                />
                                </div>
                                    <div className="log-in">Already registered? <NavLink to="/login">Log in</NavLink></div>
                            </form>
        </section>
        </div>
    </>
  );
}

export default Register