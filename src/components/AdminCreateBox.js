import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./style.css"

function AdminCreateBox(props) {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [image, setImage] = useState(["",""]);
    const [content, setContent] = useState("");
    const [questions, setQuestions] = useState([
        ["", "", "", "", "", ""],
        ["", "", "", "", "", ""],
        ["", "", "", "", "", ""],
        ["", "", "", "", "", ""],
        ["", "", "", "", "", ""],
    ]);

    useEffect(() => {
        setName(props.nameValue);
        setImage(props.imageValue);
        setContent(props.contentValue);
        setQuestions(props.questionValue);
    }, [props.nameValue, props.imageValue, props.contentValue, props.questionValue]);

    const inputFieldStyle = {
        background: 'transparent',
        border: '2px solid black',
    
        width: '100%',
    };

    const textareaStyle = {
        background: 'transparent',
        border: '2px solid black',
        width: '100%',
        height: '60vh',
    };
    

    const handleOptionChange = (rowIndex, optionIndex, event) => {
        const newQuestions = [...questions];
        newQuestions[rowIndex][optionIndex] = event.target.value;
        setQuestions(newQuestions);
    };

    const handleQuestionChange = (rowIndex, event) => {
        const newQuestions = [...questions];
        newQuestions[rowIndex][0] = event.target.value;
        setQuestions(newQuestions);
    };

    const handleAnswerChange = (rowIndex, event) => {
        const newQuestions = [...questions];
        newQuestions[rowIndex][5] = event.target.value;
        setQuestions(newQuestions);
    };

    const arr = [name, image, content, questions];

    const handleClick = () => {
        props.getState(arr);
    };
    const cardStyle = {
        backgroundImage: `url(https://images.unsplash.com/photo-1557683311-eac922347aa1?q=80&w=2029&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`, 
        backgroundSize: 'cover',
        height:'100vh',
        overflow:"hidden",
        borderRadius:"0px"
    };
    
    return (
        <div>
             <div className="card" style={cardStyle}>
            <div className="h-100">
                <div style={{paddingLeft:"5px"}}>
                <button className='btn btn-primary mt-2 ' onClick={() => { navigate("/AdminHome") }} style={{fontFamily: "'Century Gothic', sans-serif", fontWeight: "bold"}}>Home</button>
                </div>
                
                <div className="row h-100 justify-content-center mt-3" style={{fontFamily: "'Century Gothic', sans-serif", fontWeight: "bold"}}>
                    <div className="col-11 col-xl-9">
                        <div className="example " style={{borderRadius:"10px",backgroundColor:"rgba(220,220,220,0.627)", maxHeight: "90vh", overflowY: "scroll" }}>
                            <div className="mx-3   mb-5">
                                <h3 className="card-title">Name of the Language</h3>
                                <input
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                    type="text"
                                    style={inputFieldStyle}
                                />
                                <h5 className="card-title">Image Url</h5>
                                <input
                                    value={image[0]}
                                    onChange={(event) => {
                                        const newImage = [...image];
                                        newImage[0] = event.target.value;
                                        setImage(newImage);
                                    }}
                                    type="text"
                                    style={inputFieldStyle}
                                />
                                <h5 className="card-title">Video Url 1</h5>
                                <input
                                    value={image[1]}
                                    onChange={(event) => {
                                        const newImage = [...image];
                                        newImage[1] = event.target.value;
                                        setImage(newImage);
                                    }}
                                    type="text"
                                    style={inputFieldStyle}
                                />
                                <h5 className="card-title">Content</h5>
                                <textarea className='example'
                                    value={content}
                                    onChange={(event) => setContent(event.target.value)}
                                    style={textareaStyle}
                                ></textarea>
                                <div>
                                    <h3 className='text-center mt-2'>Quiz Questions</h3>
                                    {questions.map((question, rowIndex) => (
                                        <div key={rowIndex} className='mt-3'>
                                            <h5 >Question {rowIndex + 1}</h5>
                                            <input className='mt-2'
                                                value={question[0]}
                                                type="text"
                                                style={inputFieldStyle}
                                                onChange={(event) => handleQuestionChange(rowIndex, event)}
                                            ></input>
                                            <div className='mt-3'>
                                                <span>Option A</span>&ensp;&ensp;
                                                <input
                                                    value={question[1]}
                                                    onChange={(event) => handleOptionChange(rowIndex, 1, event)}
                                                ></input><br /><br />
                                                <span>Option B</span>&ensp;&ensp;
                                                <input
                                                    value={question[2]}
                                                    onChange={(event) => handleOptionChange(rowIndex, 2, event)}
                                                ></input><br /><br />
                                                <span>Option C</span>&ensp;&ensp;
                                                <input
                                                    value={question[3]}
                                                    onChange={(event) => handleOptionChange(rowIndex, 3, event)}
                                                ></input><br /><br />
                                                <span>Option D</span>&ensp;&ensp;
                                                <input
                                                    value={question[4]}
                                                    onChange={(event) => handleOptionChange(rowIndex, 4, event)}
                                                ></input><br /><br />
                                                <span>Answer&ensp;</span>&ensp;&ensp;&ensp;&ensp;&ensp;
                                                <select
                                                    value={question[5]}
                                                    onChange={(event) => handleAnswerChange(rowIndex, event)}
                                                >
                                                    <option value="" disabled>Select Answer</option>
                                                    <option value="Option A" >Option A</option>
                                                    <option value="Option B" >Option B</option>
                                                    <option value="Option C" >Option C</option>
                                                    <option value="Option D" >Option D</option>
                                                </select>
                                            </div>
                                        </div>
                                    ))}
                                    <button
                                        onClick={handleClick}
                                        className="btn btn-success my-3 d-block mx-auto"
                                        type="submit"
                                    >
                                        {props.children}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}

export default AdminCreateBox;
