import './App.css';
import Login from './Components/Login/Login'
import routes from './routes'
import { withRouter } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      {routes}
    </div>
  );
}

export default withRouter(App);
