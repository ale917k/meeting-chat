import React, { Dispatch, SetStateAction } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import MuiAlert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";

type Props = {
  alertMessage: AlertMessage;
  setAlertMessage: Dispatch<SetStateAction<AlertMessage>>;
  snackbar?: boolean;
};

/**
 * Reusable alert message component, displayed either through Snackbar or normal Alert.
 * @param {object} alertMessage - Alert message to display.
 * @param {function} setAlertMessage - Hook function for closing alert message.
 * @param {boolean} snackbar - Display message as Snackbar if true, normal Alert if otherwise.
 */
const Alert: React.FC<Props> = ({ alertMessage, setAlertMessage, snackbar }: Props) => {
  // Close snackbar / alert message
  const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    // Disable snackbar closing whenever the user clicks anywhere on the page
    if (reason === "clickaway") {
      return;
    }

    setAlertMessage((prevState) => ({
      ...prevState,
      isActive: false,
    }));
  };

  return (
    <>
      {snackbar ? (
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={alertMessage.isActive}
          autoHideDuration={6000}
          onClose={handleClose}
          action={
            <>
              <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </>
          }
        >
          <MuiAlert onClose={handleClose} severity={alertMessage.severity}>
            {alertMessage.message}
          </MuiAlert>
        </Snackbar>
      ) : (
        alertMessage.isActive && <MuiAlert severity={alertMessage.severity}>{alertMessage.message}</MuiAlert>
      )}
    </>
  );
};

export default Alert;
