const USERS_URL = process.env.PUBLIC_URL + 'Data/users.json';

export const login = async (username,password) => {
  try {
    const response = await fetch(USERS_URL)
    const data = await response.json();
    const user = data.users.find((user) => user.username === username && user.password === password);
    return user;
  } catch (error) {
    console.error("Error trying to login", error);
    return [];
  }
};

