import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useEffect, useRef, useState } from "react";

export const SoundNotification = ({ playNotif, soundNotification, setSoundNotification, setPlaySound }) => {
  const soundUrl = "/sounds/digital-clock-digital-alarm-buzzer.wav";
  const audio = new Audio(soundUrl);
  const audioRef = useRef(null);
  const [open, setOpen] = useState(false);

  const [isSoundEnabled, setIsSoundEnabled] = useState(() => {
    return JSON.parse(localStorage.getItem("isSoundEnabled")) || false;
  });
  
  
  const enableSound = (verdict: boolean) => {
    if(open){
      setOpen(false)
    }

    if(verdict){
      setIsSoundEnabled(true);
      setSoundNotification(true);
      
      localStorage.setItem("isSoundEnabled", JSON.stringify(true));
      localStorage.setItem("playSound", JSON.stringify(true));

      setPlaySound(true)

      setTimeout(() => {
        setPlaySound(false)
      }, 500);
    }else{
      setIsSoundEnabled(false);
      setSoundNotification(false);

      localStorage.setItem("isSoundEnabled", JSON.stringify(false));
      localStorage.setItem("playSound", JSON.stringify(false));
    }
  };
  
  
  const toggleSoundNotification = () => {
    if (!isSoundEnabled) {
      setOpen(true)
    }else{
      const newSoundNotification = !soundNotification;
      setSoundNotification(newSoundNotification);
  
      localStorage.setItem("playSound", JSON.stringify(newSoundNotification));
    }
  };


  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isSoundEnabled) {
        setOpen(true)
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, [isSoundEnabled, soundNotification]);

  useEffect(() => {
    audioRef.current = new Audio(soundUrl);
    const audio = audioRef.current;

    if (playNotif && isSoundEnabled) {
      const playPromise = audio.play();
      const duration = 5000;
  
      if (playPromise !== undefined) {
        playPromise?.then(() => {
          const timer = setTimeout(() => {
            audio.pause();
            audio.currentTime = 0;
          }, duration);
    
          return () => {
            clearTimeout(timer);
            audio.pause();
            audio.currentTime = 0;
          };
        }).catch((error: any) => {
          console.error("Error playing sound:", error);
        });
      }
    }
  }, [playNotif, isSoundEnabled, soundUrl]);

  return (
    <>
      <div
          className="flex items-center gap-1 bg-[#EDECEC] px-3 py-2 rounded-full text-xs font_medium cursor-pointer"
          onClick={toggleSoundNotification}
      >
          {soundNotification ? (
          <>
              <p className="text-base font_bold text-[#6D6D6D]">On</p>
              <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#06C167"
              className="size-6"
              >
              <path
                  fillRule="evenodd"
                  d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z"
                  clipRule="evenodd"
              />
              </svg>
          </>
          ) : (
          <>
              <p className="text-base font_bold text-[#6D6D6D]">Off</p>
              <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#292D32"
              className="size-6"
              >
              <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM20.57 16.476c-.223.082-.448.161-.674.238L7.319 4.137A6.75 6.75 0 0 1 18.75 9v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206Z" />
              <path
                  fillRule="evenodd"
                  d="M5.25 9c0-.184.007-.366.022-.546l10.384 10.384a3.751 3.751 0 0 1-7.396-1.119 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z"
                  clipRule="evenodd"
              />
              </svg>
          </>
          )}
      </div>
          
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Allow Sound?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please click agree to allow sound.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => enableSound(true)}>Agree</Button>
          <Button onClick={() => enableSound(false)}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};