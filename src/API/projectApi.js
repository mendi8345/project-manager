const PROJECTS_URL = "../Data/projects.json";

export const getProjects = async () => {
  try {
    const response = await fetch(PROJECTS_URL);
    console.log(response)

    const data = await response.json();
    console.log(data)
    return data.projects;
  } catch (error) {
    console.error("Error getting projects", error);
    return [];
  }
};

export const createProject = async (project) => {
  try {
    const response = await fetch(PROJECTS_URL);
    const data = await response.json();
    data.projects.push(project);
    await fetch(PROJECTS_URL, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    console.log("Project added successfully");
  } catch (error) {
    console.error("Error adding project", error);
  }
};

export const updateProject = async (projectId, updatedProject) => {
  try {
    const response = await fetch(PROJECTS_URL);
    const data = await response.json();
    const index = data.projects.findIndex((p) => p.id === projectId);
    if (index !== -1) {
      data.projects[index] = updatedProject;
      await fetch(PROJECTS_URL, {
        method: "PUT",
        body: JSON.stringify(data),
      });
      console.log("Project updated successfully");
    } else {
      console.error("Project not found");
    }
  } catch (error) {
    console.error("Error updating project", error);
  }
};

export const deleteProject = async (projectId) => {
  try {
    const response = await fetch(PROJECTS_URL);
    const data = await response.json();
    const index = data.projects.findIndex((p) => p.id === projectId);
    if (index !== -1) {
      data.projects.splice(index, 1);
      await fetch(PROJECTS_URL, {
        method: "PUT",
        body: JSON.stringify(data),
      });
      console.log("Project deleted successfully");
    } else {
      console.error("Project not found");
    }
  } catch (error) {
    console.error("Error deleting project", error);
  }
};
