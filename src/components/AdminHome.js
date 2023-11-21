import { useNavigate } from "react-router-dom";
import AdminHomeSlide from "./AdminHomeSlides";

function AdminHome(){
    const navigate=useNavigate();
    const mystyle = {
        height: "100vh",
        backgroundImage: 'url("https://images.unsplash.com/photo-1557683311-eac922347aa1?q=80&w=2029&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
        backgroundSize: 'cover',
        overflow:"hidden"
    };
    
    return(
        <div style={mystyle}>
            <div className="container-lg" >
                <div style={{paddingTop:"0.9vh"}}>
                <h1 className="text-center " style={{borderRadius:"15px",backgroundColor:"rgba(220,220,220,0.627)",padding:"1vh 0vh", fontFamily: "'Century Gothic', sans-serif", fontWeight: "bolder"}}>Language Learning App</h1>
                <button onClick={()=>{navigate('/AddContent')}} className="btn btn-md h3 " style={{borderRadius:"15px",backgroundColor:"rgba(220,220,220,0.627)",paddingBottom:"2vh",fontWeight:"bold", fontFamily: "'Century Gothic', sans-serif",}}>Add New Language</button>
                <div style={{ textAlign:"end",marginTop:"-55px"}}>
                <button onClick={()=>{navigate('/')}} className="btn btn-md h3 " style={{borderRadius:"15px",backgroundColor:"rgba(220,220,220,0.627)",paddingBottom:"2vh",fontWeight:"bold", fontFamily: "'Century Gothic', sans-serif",}}>Log out</button>
                </div>
                
                <div>
                    <AdminHomeSlide/>
                </div>
                </div>
                
            </div>
        </div>
    )
}
export default AdminHome;