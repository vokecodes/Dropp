import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Button from "@mui/material/Button";
import useIdleTimeout from "./useIdleTimeout";
import { useAppDispatch } from "../redux/hooks";
import { logOutUserAccount } from "../_redux/auth/authAction";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";

const IdleTimerLayout = ({ children }) => {
  const { user } = useSelector(
    (state: any) => ({
      user: state.auth.user,
    }),
    shallowEqual
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logOutUserAccount(navigate));
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    stay();
  };

  const isProtectedPage = ['/waiter', '/waiter/super-waiter', '/chef/kitchen'].includes(location.pathname);
  
  const handleIdle = () => {

    if (user && !isProtectedPage) {
      handleClickOpen();
    }
  };

  const { idleTimer } = useIdleTimeout({
    onIdle: handleIdle,
    idleTime: 1800,
    logoutHandler: !isProtectedPage ? handleLogout : () => {}
  });

  const stay = () => {
    handleClose();
    idleTimer.reset();
  };

  const handleClickLogout = () => {
    handleLogout();
    handleClose();
  };

  return (
    <>
      {children}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Your session is about to expire"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Your session is about to expire. You will be automatically signed
            out.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickLogout}>Sign out now</Button>
          <Button onClick={stay} autoFocus>
            Stay signed in
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default IdleTimerLayout;
