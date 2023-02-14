import React, { useState, useEffect, useRef } from "react";
import ProjectDetailsPopup from "./ProjectDetailsPopup";
import ProjectTableRow from "./ProjectTableRow";
import { getProjects } from "../../API/projectApi";
import { styled } from "@mui/material/styles";
import {Table, TableBody,TableCell,TableContainer,TableHead,TableRow,Paper, TextField,InputAdornment,Select,MenuItem,} from "@mui/material";
import {Search as SearchIcon, FilterList as FilterIcon} from "@mui/icons-material";

function ProjectTable() {
  // Initialize state variables for search and sort
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("name");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [filterdProjects, setFilterdProjects] = useState(projects);
  const searchRef = useRef(null);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    fontWeight: "bold",
  }));

  useEffect(() => {
    getProjects().then((data) => {
      setProjects(data);
    });
  },[]);

  useEffect(() => {
    searchRef.current.focus();
  }, [search]);

  
  useEffect(() => {
    setFilterdProjects(projects);
  }, [projects]);

  
  function handleSort(e) {
    const value = e.target.value;
    setSortKey(value);
    const sortedProjects = [...filterdProjects];
    sortedProjects.sort((a, b) => {
      const valueA = a[value];
      const valueB = b[value];
      const compare = valueA.localeCompare(valueB);
      return compare ;
    });
    setFilterdProjects(sortedProjects);
    return sortedProjects;
  }

  function handleSearch(e) {
    const value = e.target.value;
    setSearch(value);
    if (value !== "") {
      setFilterdProjects(
        projects.filter(
          (i) =>
            i.status.toLowerCase().includes(value.toLowerCase()) ||
            i.description.toLowerCase().includes(value.toLowerCase()) ||
            i.name.toLowerCase().includes(value.toLowerCase()) ||
            i.owner.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setFilterdProjects(projects);
    }

  }
  function handleSelect(project) {
    setSelectedProject(project);
    setShowPopup( true  )
  }

  function handleSelectClose() {
    setSelectedProject(null);
    setShowPopup(false);
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>
              <TextField
                placeholder="Search"
                value={search}
                onChange={handleSearch}
                inputRef={searchRef}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </StyledTableCell>
            <StyledTableCell>
              <Select
                value={sortKey}
                onChange={handleSort}
                startAdornment={
                  <InputAdornment position="start">
                    <FilterIcon />
                  </InputAdornment>
                }
              >
                <MenuItem value="name">Name</MenuItem>
                <MenuItem value="description">Description</MenuItem>
                <MenuItem value="status">Status</MenuItem>
                <MenuItem value="owner">Owner</MenuItem>
              </Select>
            </StyledTableCell>
          </TableRow>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Description</StyledTableCell>
            <StyledTableCell>Status</StyledTableCell>
            <StyledTableCell>owner</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filterdProjects.map((project) => (
            <ProjectTableRow
              key={project.id}
              project={project}
              onClick={(e) => handleSelect(project)}
            />
          ))}
        </TableBody>
      </Table>
      {showPopup ? (
        <ProjectDetailsPopup
          project={selectedProject}
          onClose={() => {
            handleSelectClose();
          }}
        />
      ) : (
        ""
      )}
    </TableContainer>
  );
}
export default ProjectTable;


