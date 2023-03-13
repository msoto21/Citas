import { observer } from "mobx-react-lite";
import { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Form, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Cita } from "../../../app/models/cita";
import { useStore } from "../../../app/stores/store";
import {v4 as uuid } from 'uuid';

export default observer(function CitaForm() {
  const { citaStore } = useStore();
  const { createCita, updateCita, loading, loadCita, loadingInitial } = citaStore;
  const {id} = useParams();
  const navigate = useNavigate();

  const [cita, setCita] = useState<Cita>({
    id: '',
    fechaHoraInicio: '',
    fechaHoraFin: '',
    cliente: '',
    descripcion: '',
    nota: '',
    titulo: '',
    tratamientos: ''
  });

  useEffect(() => {
    if (id) loadCita(id).then(cita => setCita(cita!));
  }, [id, loadCita]);

  function handleSubmit() {
    if (!cita.id) {
      cita.id = uuid();
      createCita(cita).then(() => {navigate(`/citas/${cita.id}`)});
    } else {
      updateCita(cita).then(() => {navigate(`/citas/${cita.id}`)});
    }
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const {name, value} = event.target;
    setCita({...cita, [name]: value});
  }

  if (loadingInitial) return <LoadingComponent content="Loading cita..." />

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete='off'>
        <Form.Input placeholder='Título' value={cita.titulo} name='titulo' onChange={handleInputChange} />
        <Form.TextArea placeholder='Descripción' value={cita.descripcion} name='descripcion' onChange={handleInputChange} />
        <Form.Input placeholder='Cliente' value={cita.cliente} name='cliente' onChange={handleInputChange} />
        <Form.Input placeholder='Nota' value={cita.nota} name='nota' onChange={handleInputChange} />
        <Form.Input type="date" placeholder='Fecha y hora de inicio' value={cita.fechaHoraInicio} name='fechaHoraInicio' onChange={handleInputChange} />
        <Form.Input type="date" placeholder='Fecha y hora termino' value={cita.fechaHoraFin} name='fechaHoraFin' onChange={handleInputChange} />
        <Form.Input placeholder='Tratamientos' value={cita.tratamientos} name='tratamientos' onChange={handleInputChange} />
        <Button loading={loading} floated="right" positive type="submit" content='Submit' />
        <Button as={Link} to='/citas' floated="right" type="button" content='Cancel' />
      </Form>
    </Segment>
  )
})