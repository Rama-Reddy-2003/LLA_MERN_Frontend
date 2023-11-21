import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Axios from 'axios';
import Content from './Content';
import Quiz from './Quiz';

function ContentShow() {
  const navigate = useNavigate();
  const { id1, id2 } = useParams();
  const [content, setcontent] = useState();
  const [view, setView] = useState('content'); // 'content' or 'quiz'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get(`https://lla-backend.onrender.com/AdminRoute/updatecontent/${id2}`);
        if (response.status === 200) {
          setcontent(response.data);
        } else {
          throw new Error('Failed to fetch content.');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id2]);

  if (!content) {
    return <div>Loading</div>;
  }

  const mystyle = {
    height: "100vh",
    backgroundImage: `url(https://images.unsplash.com/photo-1557683311-eac922347aa1?q=80&w=2029&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
    backgroundSize: 'cover',
    overflow:"hidden"
  };

  const handleContentClick = () => {
    setView('content');
  };

  const handleQuizClick = () => {
    setView('quiz');
  };
  const handleVideosClick = () => {
    setView('videos');
  };

  return (
    <div>
      <div style={mystyle}>
        <div className="container-lg">
          <div style={{ paddingTop: "0.9vh" }}>
            <h1 className="text-center " style={{ borderRadius: "15px", backgroundColor: "rgba(220,220,220,0.627)", padding: "1vh 0vh", fontFamily: "'Century Gothic', sans-serif", fontWeight: "bold" }}>{content.name}</h1>
            <button onClick={handleContentClick} className="btn btn-md h3" style={{ borderRadius: "15px", backgroundColor: "rgba(220,220,220,0.627)", paddingBottom: "2vh", fontWeight: "bold",marginRight:"2vw", fontFamily: "'Century Gothic', sans-serif" }}>Content</button>
            <button onClick={handleVideosClick} className="btn btn-md h3 " style={{ borderRadius: "15px", backgroundColor: "rgba(220,220,220,0.627)", paddingBottom: "2vh", fontWeight: "bold",marginRight:"2vw", fontFamily: "'Century Gothic', sans-serif" }}>Videos</button>
            <button onClick={handleQuizClick} className="btn btn-md h3 " style={{ borderRadius: "15px", backgroundColor: "rgba(220,220,220,0.627)", paddingBottom: "2vh", fontWeight: "bold", fontFamily: "'Century Gothic', sans-serif" }}>Take a Quiz</button>
            
            <div style={{ textAlign: "end", marginTop: "-55px" , fontFamily: "'Century Gothic', sans-serif"}}>
              <button onClick={() => { navigate("/UserHome/" + id1) }} className="btn btn-md h3" style={{fontFamily: "'Century Gothic', sans-serif", borderRadius: "15px", backgroundColor: "rgba(220,220,220,0.627)", paddingBottom: "2vh", fontWeight:"bolder" }}>Back to Home</button>
            </div>
          </div>
        </div>
        {view === 'content' && <Content content={content.content} />}
        {view === 'quiz' && <Quiz quizData={content.quiz} id={id1} languagename={content.name} />}
        {view === 'videos' && 
          <div style={{fontFamily: "'Century Gothic', sans-serif", fontWeight: "bold"}}>
            <div className="row  justify-content-center mt-3">
                <div className="col-11 col-xl-9">
                    <div className="example" style={{ borderRadius: "25px", backgroundColor: "rgba(220, 220, 220, 0.627)" ,maxHeight:"90vh",overflowY:"scroll", fontFamily: "'Century Gothic', sans-serif"}}>
                        <div style={{fontFamily: "'Century Gothic', sans-serif"}}>
                            <iframe
                                className="mx-3 my-4"
                                width="98%"
                                height="500vh"
                                src={content.image[1]}
                                title="YouTube video player"
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowfullscreen
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>

          </div>
        }
      </div>
    </div>
  );
}

export default ContentShow;
