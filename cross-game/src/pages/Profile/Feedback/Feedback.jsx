import React, { useEffect, useState } from "react";
import ProfileNavbar from "../../../components/ProfileNavbar/ProfileNavbar";
import Sidebar from "../../../components/Sidebar/Sidebar";
import "./Feedback.css";
import imgUserProfile from "../../../assets/index-page/testeImg.png"
import axios from "axios";


function ProfileJogo() {    

    const [feedback, setFeedback] = useState([])

    useEffect(() => {
        const config = {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem("ACESS_TOKEN")
            }
        };
        axios.get(`http://localhost:8080/feedbacks/${sessionStorage.getItem("ID")}`, config)
            .then(response => {
                setFeedback(response.data)
                console.log(response.data)
            })
            .catch(error => {
                console.error(error);
            });
    }, [1])

    function adicionar() {
        return (
            <>
                <div className="ProfileFeedbackContainer" id="FeedbackUsername">
                    {feedback.map((feedbackItem, index) => (
                    <div className="ProfileFeedbackCard" key={index}>
                        <div className="ProfileFeedbackCardTop">
                            <div className="ProfileFeedbackCardTopFistChild">
                                <img src={imgUserProfile} alt="" />
                                <span>{feedbackItem.userGivenFeedback}</span>
                            </div>
                            <div>{feedbackItem.feedbackGivenDate}</div>
                        </div>
                        <div className="ProfileFeedbackCardCenter">
                            <span>{feedbackItem.feedbackText}</span>
                        </div>
                        <div className="ProfileFeedbackCardBottom">
                            <div>Comportamento
                                <span className="ProfileFeedbackValor" >{feedbackItem.behavior}</span>
                            </div>
                            <div>Habilidade
                                <span className="ProfileFeedbackValor" >{feedbackItem.skill}</span>
                            </div>
                        </div>
                    </div>
                ))}
                </div>
            </>
        )
    }
    return (
        <>
            <ProfileNavbar feedbacks={{ color: '#fff', borderBottom: '2px solid #0f3' }}
                sidebar={<Sidebar />}
                adicionar={adicionar()}
            />
        </>
    )
}

export default ProfileJogo;