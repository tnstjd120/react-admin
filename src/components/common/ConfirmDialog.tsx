import React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Box,
} from "@mui/material";

type Props = {
  title: string;
  text: string;
  open: boolean;
  confirmFunction?: () => void;
  handleClose: () => void;
};

const ConfirmDialog = ({
  title,
  text,
  open,
  confirmFunction,
  handleClose,
}: Props) => {
  const handleConfirm = async () => {
    try {
      if (confirmFunction) {
        await confirmFunction();
        handleClose();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Box p={1}>
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {confirmFunction && (
            <Button color="error" onClick={handleClose}>
              취소
            </Button>
          )}
          <Button onClick={handleConfirm} autoFocus>
            확인
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default ConfirmDialog;
