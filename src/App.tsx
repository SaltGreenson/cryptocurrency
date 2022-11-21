import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import classes from "./App.module.css";
import { withSuspense } from "./components/utils/helpers/hocs-helper";
import { getInitialized } from "./selectors/app-selectors";
import Preloader from "./components/common/Preloader/Preloader";
import Header from "./components/Header/Header";

import NotFoundPage from "./pages/NotFound/NotFound";
import { getProfile } from "./selectors/profile-selectors";
import { ProfileType } from "./redux/profileReducer/profileReducer";
import { useActions } from "./components/utils/helpers/hooks";

const MainLazy = React.lazy(() => import("./pages/Main/Main"));
const DescriptionLazy = React.lazy(
  () => import("./pages/Description/Description")
);
const ProfileLazy = React.lazy(() => import("./pages/Profile/Profile"));
const WithdrawLazy = React.lazy(() => import("./pages/Withdraw/Withdraw"));

const SuspendedMainPage = withSuspense(MainLazy);
const SuspendedDescription = withSuspense(DescriptionLazy);
const SuspendedProfile = withSuspense(ProfileLazy);
const SuspendedWithdraw = withSuspense(WithdrawLazy);

type PropsType = {
  profile: ProfileType;
};

export const App: FC<PropsType> = ({ profile }) => (
  <div className={classes.appContainer}>
    <Header profile={profile} />
    <Routes>
      <Route path="/" element={<Navigate to="/coins/:page=1" />} />
      <Route path="/coins/:page" element={<SuspendedMainPage />} />
      <Route path="/:id" element={<SuspendedDescription />} />
      <Route path="/profile" element={<SuspendedProfile />} />
      <Route path="/withdraw" element={<SuspendedWithdraw />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </div>
);

const StartApp: React.FC = () => {
  const dispatch = useDispatch();
  const initialized = useSelector(getInitialized);
  const profile = useSelector(getProfile);
  const { setAssetsTop3, setAssetsOffsets, setAssetsLimit, initializeApp } =
    useActions();

  useEffect(() => {
    const offset = 0;
    const limit = 50;

    setAssetsTop3();
    setAssetsOffsets(offset);
    setAssetsLimit(limit);
    initializeApp(offset, limit);
  }, [dispatch, initialized]);

  if (!initialized) {
    return <Preloader />;
  }

  return <App profile={profile} />;
};

export default StartApp;
