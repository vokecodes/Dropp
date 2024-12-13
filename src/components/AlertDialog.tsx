import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { alertDialogProps } from '../utils/Interfaces';

export default function AlertDialog({ 
  message,
  handleClose,
  open
 }: alertDialogProps) {
  

  return (
    <React.Fragment>
      
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className='rounded-2xl'
      >
        <DialogTitle id="alert-dialog-title">
          {"Alert"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className='!text-[#06C167] hover:!bg-[#06C167]/10'>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
