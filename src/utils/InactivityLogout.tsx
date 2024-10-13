import React, { useEffect } from "react";
import { useAppDispatch } from "../redux/hooks";
import { useNavigate } from "react-router-dom";
import { logOutUserAccount } from "../_redux/auth/authAction";

const InactivityLogout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const inactivityTimeout = 30 * 60 * 1000; // 30 minutes in milliseconds
  let timeoutId;

  const resetTimer = () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(logout, inactivityTimeout);
  };

  const logout = () => {
    // Clear user data and redirect
    dispatch(logOutUserAccount(navigate));
  };

  useEffect(() => {
    // Set up event listeners for user activity
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    window.addEventListener("scroll", resetTimer);
    window.addEventListener("click", resetTimer);

    // Start the timer on mount
    resetTimer();

    return () => {
      // Cleanup event listeners and timeout on unmount
      clearTimeout(timeoutId);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("scroll", resetTimer);
      window.removeEventListener("click", resetTimer);
    };
  }, []);

  return null; // This component does not render anything
};

export default InactivityLogout;
