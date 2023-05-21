import React from "react";
import ProfileNavbar from "../../../components/ProfileNavbar/ProfileNavbar"
import Sidebar from "../../../components/Sidebar/Sidebar"

function ProfileJogo() {
    return (
        <>
            <ProfileNavbar feedbacks={{ color: '#fff', borderBottom: '2px solid #0f3' }}
                sidebar={<Sidebar />}
            />
        </>
    )
}

export default ProfileJogo;