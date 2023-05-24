import React from "react";
import ProfileNavbar from "../../../components/ProfileNavbar/ProfileNavbar";
import Sidebar from "../../../components/Sidebar/Sidebar";
import "./Feedback.css";


function ProfileJogo() {

    function adicionar() {
        return (
            <>
                <div className="ProfileFeedbackContainer">
                    <div className="ProfileFeedbackCard">
                        <h4>Feedback</h4>
                    </div>
                    <div className="ProfileFeedbackCard">
                        <h4>Feedback</h4>
                    </div>
                    <div className="ProfileFeedbackCard">
                        <h4>Feedback</h4>
                    </div>
                    <div className="ProfileFeedbackCard">
                        <h4>Feedback</h4>
                    </div>
                    <div className="ProfileFeedbackCard">
                        <h4>Feedback</h4>
                    </div>
                    <div className="ProfileFeedbackCard">
                        <h4>Feedback</h4>
                    </div>
                    <div className="ProfileFeedbackCard">
                        <h4>Feedback</h4>
                    </div>
                    <div className="ProfileFeedbackCard">
                        <h4>Feedback</h4>
                    </div>
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