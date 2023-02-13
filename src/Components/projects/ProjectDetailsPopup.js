import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

function ProjectDetailsPopup(props) {
  const {project, onClose} = props;
  const [isOpen, setIsOpen] = useState(true);

  function handleClose() {
    setIsOpen(false);
    onClose()
  }
  return (
    <>
    
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>{project.name}</DialogTitle>
      <DialogContent>
        <DialogContentText><span style={{fontWeight:"bold"}}>Description: </span>{project.description}</DialogContentText>
        <DialogContentText><span style={{fontWeight:"bold"}}>Status: </span> {project.status}</DialogContentText>
        <DialogContentText><span style={{fontWeight:"bold"}}>owner: </span>  {project.owner}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  </>
  );
}
export default ProjectDetailsPopup;
