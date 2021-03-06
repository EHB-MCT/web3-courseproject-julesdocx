import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';

//import { Container } from 'semantic-ui-react'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MenuBar from './components/MenuBar';
import { AuthProvider } from './context/auth'
import AuthRoute from './utils/AuthRoute';
import SinglePost from './pages/SinglePost';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="ui container">
          <MenuBar/>
          <Route exact path='/' component={Home}/>
          <AuthRoute exact path='/Login' component={Login}/>
          <AuthRoute exact path='/Register' component={Register}/>
          <Route exact path="/posts/:postId" component={SinglePost}/>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
