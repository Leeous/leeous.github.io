import BackButtonIcon from "../assets/svg/back-button.svg"
import { Navigate, useNavigate } from "react-router-dom";

export default function BackButton() {
    const navigate = useNavigate();

    function goBack() {
        navigate(-1);
    }

    return(
        <button onClick={() => goBack()} className="back-button"><img src={BackButtonIcon} alt="Back button icon"/> Back</button>
    );
}