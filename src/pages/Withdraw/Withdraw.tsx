import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getProfile } from '../../selectors/profile-selectors';
import { withdraw } from '../../redux/profile-reducer';
import {useThunkDispatch} from "../../components/utils/helpers/hooks";

const Withdraw = () => {
  const dispatch = useDispatch();
  const profile = useSelector(getProfile);
  const navigate = useNavigate();

  useEffect(() => {
    // @ts-ignore
    dispatch(withdraw(profile.residualBalance));
    navigate('/profile');
  }, [dispatch, navigate, profile.residualBalance]);

  return (
    <div />
  );
};

export default Withdraw;
