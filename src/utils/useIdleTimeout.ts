import { useState } from "react"
import { useIdleTimer } from "react-idle-timer"
import { useAppDispatch } from "../redux/hooks";
import { useNavigate } from "react-router-dom";

const useIdleTimeout = ({ onIdle, idleTime = 1, logoutHandler }) => {
    const idleTimeout = 1000 * idleTime;
    const [isIdle, setIdle] = useState(false)

    const handleLogout = () => logoutHandler();
  
    const handleIdle = () => {
        setIdle(true)
        handleLogout()
    }
    const idleTimer = useIdleTimer({
        timeout: idleTimeout,
        promptTimeout: idleTimeout / 6,
        onPrompt: onIdle,
        onIdle: handleIdle,
        debounce: 500
    })
    return {
        isIdle,
        setIdle,
        idleTimer
    }
}
export default useIdleTimeout;