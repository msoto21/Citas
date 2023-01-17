import { observer } from "mobx-react-lite";
import { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function CitaForm() {
  const { citaStore } = useStore();
  const { selectedCita, closeForm, createCita, updateCita, loading } = citaStore;

  const initialState = selectedCita ?? {
    id: '',
    fechaHoraInicio: '',
    fechaHoraFin: '',
    cliente: '',
    descripcion: '',
    nota: '',
    titulo: '',
    tratamientos: ''
  }

  const [cita, setCita] = useState(initialState);

  function handleSubmit() {
    cita.id ? updateCita(cita) : createCita(cita);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const {name, value} = event.target;
    setCita({...cita, [name]: value});
  }

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
        <Button onClick={closeForm} floated="right" type="button" content='Cancel' />
      </Form>
    </Segment>
  )
})