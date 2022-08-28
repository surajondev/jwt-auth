import './App.css';
import {useState} from 'react'
import axios from 'axios'

function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState('')
  const [data, setData] = useState() 
  const [error, setError] = useState() 
  const handleRegister = () => {
    axios.post('http://localhost:8000/register', {
      username,
      password
    })
    .then(res => {
      setToken(res.data)
      console.log(token)
    })
  }

  const handleSecret = () => {
    axios.post('http://localhost:8000/secret', {}, {
      headers:{
        'x-auth-token':token
      }
    })
    .then(res => {
      if(res.data.img){
        setData(res.data)
        setError()
      }else{
        setError(res.data)
      }
    })
  }

  return (
    <div className="App">
      <h1>Register User </h1>
      Username: <input type="text" onChange={(e)=> setUsername(e.target.value)}/>
      <br />
      Password: <input type="password" onChange={(e)=> setPassword(e.target.password)}/>
      <br />
      <button onClick={handleRegister}>Register</button>
      <br/>
      <h1>Protected Path</h1>
      <button onClick={handleSecret}>Image</button><br/>
      {
        data && 
        <div>
          <p>Hello {data.username}</p>
          <img height={200} src={data.img} alt="img" />
        </div>      
      }
      {
        error &&
        <p>{error.msg}</p>
      }
    </div>
  );
}

export default App;
