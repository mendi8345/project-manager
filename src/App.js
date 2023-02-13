import { BrowserRouter as Router, Route , Routes,Navigate } from 'react-router-dom';
import LoginPage from './Components/Auth/LoginPage';
import ProjectTable from './Components/projects/ProjectTable';

function withAuth(Component) {
  function AuthenticatedRoute(props) {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
      return <Navigate to="/" />;
    }

    return <Component {...props} />;
  };

  return AuthenticatedRoute();
}

function App() {
 
  
  return (
    <Router>
    <Routes>
    <Route exact path="/" element={<LoginPage />} />
    <Route exact path="/projects" element={withAuth(ProjectTable)}
        />
    </Routes>  
    </Router>
  );
}



export default App;
