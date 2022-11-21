import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {getProfile} from '../../selectors/profile-selectors';
import {useActions} from "../../components/utils/helpers/hooks";

const Withdraw = () => {
  const {withdraw} = useActions()
  const profile = useSelector(getProfile);
  const navigate = useNavigate();

  useEffect(() => {
    withdraw(profile.residualBalance);
    navigate('/profile');
  }, [withdraw, navigate, profile.residualBalance]);

  return (
    <div />
  );
};

export default Withdraw;
