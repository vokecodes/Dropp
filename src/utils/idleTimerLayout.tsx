import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Button from "@mui/material/Button";
import { useAppDispatch } from "../redux/hooks";
import { logOutUserAccount } from "../_redux/auth/authAction";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import { useIdleTimer } from "react-idle-timer";

const timeout = 30 * 60_000
const promptBeforeIdle = 5 * 60_000

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
  const [isKitchenTabOpen, setIsKitchenTabOpen] = useState(
    !!localStorage.getItem("kitchenTabActive")
  );

  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logOutUserAccount(navigate));
    setOpen(false);
  };

  const isProtectedPage = ['/waiter', '/waiter/super-waiter', '/chef/kitchen'].includes(location.pathname);
  
  
  const onIdle = () => {
    if (user && !isProtectedPage && !isKitchenTabOpen) {
      handleLogout()
      setOpen(false)
    }
  }

  const onActive = () => {
    setOpen(false)
  }

  const onPrompt = () => {
    if (user && !isProtectedPage && !isKitchenTabOpen) {
      setOpen(true)
    }
  }

  const { activate } = useIdleTimer({
    onIdle,
    onActive,
    onPrompt,
    timeout,
    promptBeforeIdle,
    throttle: 500
  })

  const handleStillHere = () => {
    activate()
  }

  const handleClose = () => {
    setOpen(false);
    handleStillHere();
  };

  const handleClickLogout = () => {
    handleLogout();
    handleClose();
  };

  useEffect(() => {
    const handleStorageChange = (event: any) => {
      if (event.key === "kitchenTabActive") {
        setIsKitchenTabOpen(!!event.newValue);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

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
          <Button onClick={handleStillHere} autoFocus>
            Stay signed in
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default IdleTimerLayout;
