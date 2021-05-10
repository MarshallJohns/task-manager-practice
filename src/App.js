import './App.css';
import routes from './routes'
import { withRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      {routes}
    </div>
  );
}

export default withRouter(App);
