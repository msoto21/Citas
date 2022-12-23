import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Cita } from '../models/cita';
import NavBar from './NavBar';
import CitaDashboard from '../../features/citas/dashboard/CitaDashboard';
import {v4 as uuid} from 'uuid';

function App() {
  const [citas, setCitas] = useState<Cita[]>([]);
  const [selectedCita, setSelectedCita] = useState<Cita | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<Cita[]>('http://localhost:5000/api/citas').then(response => {
      setCitas(response.data);
    })
  }, []);

  function handleSelectCita (id: string){
    setSelectedCita(citas.find(x => x.id === id));
  }

  function handleCancelSelectCita (){
    setSelectedCita(undefined);
  }

  function handleFormOpen (id? : string) {
    id ? handleSelectCita(id) : handleCancelSelectCita();
    setEditMode(true);
  }

  function handleFormClose () {
    setEditMode(false);
  }

  function handleCreateOrEditCita(cita: Cita) {
    cita.id
      ? setCitas([...citas.filter(x => x.id !== cita.id), cita])
      : setCitas([...citas, {...cita, id: uuid()}]);
    setEditMode(false);
    setSelectedCita(cita);
  }

  function handleDeleteCita(id: string) {
    setCitas([...citas.filter(x => x.id !== id)]);
  }

  return (
    <Fragment>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: '7em' }}>
        <CitaDashboard
          citas = {citas}
          selectedCita = {selectedCita}
          selectCita = {handleSelectCita}
          cancelSelectCita = {handleCancelSelectCita}
          editMode = {editMode}
          openForm = {handleFormOpen}
          closeForm = {handleFormClose}
          createOrEdit = {handleCreateOrEditCita}
          deleteCita = {handleDeleteCita}
        />
      </Container>
    </Fragment>
  );
}

export default App;
