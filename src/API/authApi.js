const USERS_URL = process.env.PUBLIC_URL + 'Data/users.json';

export const login = async (username, password) => {
  try {
    const response = await fetch(USERS_URL);
    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      return null;
    }

    const data = await response.json();
    const user = data.users.find((user) => user.username === username && user.password === password);

    if (!user) {
      console.error("Invalid username or password");
      return null;
    }

    console.log(`User ${user.username} logged in successfully`);
    return user;
  } catch (error) {
    console.error("Error trying to login", error);
    return null;
  }
};

