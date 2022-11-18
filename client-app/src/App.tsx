import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';

function App() {
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/citas').then(response => {
      console.log(response);
      setCitas(response.data);
    })
  }, []);

  return (
    <div>
      <Header as='h2' icon='users' content='Citas'/>
        <List>
          {citas.map((cita: any) => (
            <List.Item key={cita.id}>
              {cita.titulo}
            </List.Item>
          ))}
        </List>
    </div>
  );
}

export default App;
