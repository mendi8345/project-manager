import {
    TableRow,
    TableCell
  } from "@mui/material";

const ProjectTableRow = ({ project, onClick }) => {
    const { name, description, status, owner } = project;
  
    return (
      <TableRow style={{cursor:"pointer"}} onClick={e =>onClick(project)}>
        <TableCell>{name}</TableCell>
        <TableCell>{description.length > 70 ? `${description.substring(0, 70)}...` : description}</TableCell>
        <TableCell>{status}</TableCell>
        <TableCell>{owner}</TableCell>
      </TableRow>
    );
  };
  export default ProjectTableRow;