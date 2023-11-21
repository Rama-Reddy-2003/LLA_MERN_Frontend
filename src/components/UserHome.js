import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from 'axios';
import UserHomeSlides from "./UserHomeSlides";
import UserSubmissions from "./UserSubmissions";

function UserHome() {
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState("home");
  const [Name,setname]=useState("");
  const mystyle = {
    height: "100vh",
    backgroundImage: 'url("https://images.unsplash.com/photo-1557683311-eac922347aa1?q=80&w=2029&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
    backgroundSize: 'cover',
    overflow: "hidden",
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    Axios.get(`https://lla-backend.onrender.com/UserRoute/updateuser/${id}`)
        .then((res) => {
            if (res.status === 200) {
                const { name} = res.data;
                setname(name);
            } else {
                Promise.reject();
            }
        })
        .catch((err) => alert(err));
}, [id]);

  return (
    <div style={mystyle}>
      <div className="container-lg">
        <div style={{ paddingTop: "0.9vh" }}>
        <h1 className="text-center" style={{ borderRadius: "15px", backgroundColor: "rgba(220,220,220,0.627)", padding: "1vh 0vh", fontFamily: "'Century Gothic', sans-serif", fontWeight: "bold"}}>Language  Learning  App</h1>
          <p className="btn btn-md h3 " style={{ borderRadius: "15px", backgroundColor: "rgba(220,220,220,0.627)", paddingBottom: "2vh", fontWeight: "bold",marginRight: "2vw", fontFamily: "'Century Gothic', sans-serif"}}><i class="bi bi-person-circle"></i>&ensp;Hello {Name}</p>
          <button onClick={() => handlePageChange("home")} className="btn btn-md h3 " style={{marginRight: "2vw", borderRadius: "15px", backgroundColor: "rgba(220,220,220,0.627)", paddingBottom: "2vh", fontWeight: "bold", fontFamily: "'Century Gothic', sans-serif" }}>Home</button>
          <button onClick={() => handlePageChange("submissions")} className="btn btn-md h3 " style={{ borderRadius: "15px", backgroundColor: "rgba(220,220,220,0.627)", paddingBottom: "2vh", fontWeight: "bold", fontFamily: "'Century Gothic', sans-serif" }}>Submissions</button>
          <div style={{ textAlign: "end", marginTop: "-55px" }}>
            <button onClick={() => { window.location = window.location.origin }} className="btn btn-md h3 " style={{ borderRadius: "15px", backgroundColor: "rgba(220,220,220,0.627)", paddingBottom: "2vh", fontWeight: "bold", fontFamily: "'Century Gothic', sans-serif" }}>Log out&ensp; <i class="bi bi-box-arrow-in-left"></i></button>
          </div>
          {currentPage === "home" && <UserHomeSlides />}
          {currentPage === "submissions" && <UserSubmissions userId={id} />}
        </div>
        <div>

        </div>

      </div>
    </div>
  );
}

export default UserHome;
