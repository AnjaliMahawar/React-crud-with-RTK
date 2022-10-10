import logo from './logo.svg';
import './App.css';
import UserList from './features/users/UserList';

function App() {

  return (
    <div className="App">
      <h5>Crud With RTk</h5>
      <h1 style={{color:"blue"}}>FaceBook</h1>
    <UserList/>
    </div>
  );
}

export default App;
