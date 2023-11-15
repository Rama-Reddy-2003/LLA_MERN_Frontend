

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
    backgroundImage: `url(${content.image})`,
    backgroundSize: 'cover',
    overflow:"hidden"
  };

  const handleContentClick = () => {
    setView('content');
  };

  const handleQuizClick = () => {
    setView('quiz');
  };

  return (
    <div>
      <div style={mystyle}>
        <div className="container-lg">
          <div style={{ paddingTop: "0.9vh" }}>
            <h1 className="text-center " style={{ borderRadius: "15px", backgroundColor: "rgba(220,220,220,0.7)", padding: "1vh 0vh" }}>{content.name}</h1>
            <button onClick={handleContentClick} className="btn btn-md h3" style={{ borderRadius: "15px", backgroundColor: "rgba(220,220,220,0.7)", paddingBottom: "2vh", fontWeight: "bold",marginRight:"2vw" }}>Content</button>
            <button onClick={handleQuizClick} className="btn btn-md h3 " style={{ borderRadius: "15px", backgroundColor: "rgba(220,220,220,0.7)", paddingBottom: "2vh", fontWeight: "bold" }}>Take a Quiz</button>
            <div style={{ textAlign: "end", marginTop: "-55px" }}>
              <button onClick={() => { navigate("/UserHome/" + id1) }} className="btn btn-md h3" style={{ borderRadius: "15px", backgroundColor: "rgba(220,220,220,0.7)", paddingBottom: "2vh", fontWeight: "bold" }}>Back to Home</button>
            </div>
          </div>
        </div>
        {view === 'content' && <Content content={content.content} />}
        {view === 'quiz' && <Quiz quizData={content.quiz} id={id1} languagename={content.name} />}
      </div>
    </div>
  );
}

export default ContentShow;
