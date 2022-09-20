import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getProfile} from "../../selectors/profile-selectors";
import {withdraw} from "../../redux/profile-reducer";
import {useNavigate} from "react-router-dom";

const Withdraw = () => {

    const dispatch = useDispatch()
    const profile = useSelector(getProfile)
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(withdraw(profile.residualBalance))
        navigate('/profile')
    },[])

    return (
        <div>

        </div>
    );
};

export default Withdraw;