import { useState } from "react";
import { useNavigate } from 'react-router-dom';  
import './loginstyle.css';
import Axios from 'axios';  
import { Link } from "react-router-dom";
function CreateNewUser() {
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();  

    const handlelogin = () => {
        const url = 'https://lla-backend.onrender.com/UserRoute';

        if (!email.trim()) {
            alert("Please enter a valid email");
        } else {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (Array.isArray(data)) {
                        const foundPerson = data.find(person => person.email === email);
                        if (foundPerson) {
                            alert(`Account already existed with ${email}`);
                        } else {
                            var data_to_be_added = { "name": name, "email": email, "password": password, "submissions": [] }
                            Axios.post("https://lla-backend.onrender.com/UserRoute/Adduser", data_to_be_added)
                                .then((res) => {
                                    if (res.status === 200) {
                                        alert("Account Created Successfully");
                                        navigate("/");
                                    } else {
                                        alert("OOPS !! Failed to Create Account. Please try again.");
                                    }
                                })
                                .catch((err) => alert(err));
                        }
                    } else {
                        console.log('The data structure is not as expected.');
                    }
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    alert('Failed to fetch data. Please try again.');
                });
        }
    }

    return (
        <div style={{fontFamily: "'Century Gothic', sans-serif",}}>
            <div>
                <div className="app">
                    <div className="login-form" style={{fontFamily: "'Century Gothic', sans-serif", padding: "30px 75px", }}>
                    <div className="title">Create a new account</div>
                    <form onSubmit={handlelogin}>
                        <b></b>
                        <p style={{ margin: 3 }}>Name</p>
                        <input value={name} onChange={(event) => setname(event.target.value)} style={{ width: 270 }}></input>
                        <p style={{ margin: 3 }}>Email</p>
                        <input value={email} type="email" onChange={(event) => setemail(event.target.value)} style={{ width: 270 }}></input>
                        <p style={{ margin: 3 }}>Password</p>
                        <input value={password} onChange={(event) => setPassword(event.target.value)} style={{ width: 270 }}></input>
                        <br />
                        <br />
                        <center><Link to="/" className="text-primary text-center" style={{textDecoration:"none",textAlign:"center"}}><span style={{color: "black"}}>Already have an account???</span></Link></center>

                        <div className="text-center">
                            <button className="btn btn-info" style={{ marginTop: '7.5px' }}>Create</button>
                        </div>
                    </form>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default CreateNewUser;
