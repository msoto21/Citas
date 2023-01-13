import React, { Fragment, useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Cita } from '../models/cita';
import NavBar from './NavBar';
import CitaDashboard from '../../features/citas/dashboard/CitaDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';

function App() {
  const [citas, setCitas] = useState<Cita[]>([]);
  const [selectedCita, setSelectedCita] = useState<Cita | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.Citas.list().then(response => {
      let citas: Cita[] = [];
      response.forEach(cita => {
        cita.fechaHoraInicio = cita.fechaHoraInicio.split('T')[0];
        cita.fechaHoraFin = cita.fechaHoraFin.split('T')[0];
        citas.push(cita);
      })
      setCitas(citas);
      setLoading(false);
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
    setSubmitting(true);
    if (cita.id) {
      agent.Citas.update(cita).then(() => {
        setCitas([...citas.filter(x => x.id !== cita.id), cita]);
        setSelectedCita(cita);
        setEditMode(false);
        setSubmitting(false);
      })
    } else {
      cita.id = uuid();
      agent.Citas.create(cita).then(() => {
        setCitas([...citas, cita]);
        setSelectedCita(cita);
        setEditMode(false);
        setSubmitting(false);
      })
    }
  }

  function handleDeleteCita(id: string) {
    setSubmitting(true);
    agent.Citas.delete(id).then(() => {
      setCitas([...citas.filter(x => x.id !== id)]);
      setSubmitting(false);
    })
  }

  if (loading) return <LoadingComponent content='Loading app' />

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
          submitting = {submitting}
        />
      </Container>
    </Fragment>
  );
}

export default App;
