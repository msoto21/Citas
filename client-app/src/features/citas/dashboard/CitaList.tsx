import { observer } from 'mobx-react-lite';
import { SyntheticEvent, useState } from 'react';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

export default observer(function CitaList() {
  const { citaStore } = useStore();
  const { deleteCita, citasByDate, loading } = citaStore;
  const [target, setTarget] = useState("");

  function handleDeleteCita(e: SyntheticEvent<HTMLButtonElement>, id: string) {
    setTarget(e.currentTarget.name);
    deleteCita(id);
  }

  return (
    <Segment>
      <Item.Group divided>
        {citasByDate.map(cita => (
          <Item key={cita.id}>
            <Item.Content>
              <Item.Header as='a'>{cita.titulo}</Item.Header>
              <Item.Meta>{cita.fechaHoraInicio.toString()}</Item.Meta>
              <Item.Description>
                <div>{cita.descripcion}</div>
                <div>{cita.cliente}, {cita.nota}</div>
              </Item.Description>
              <Item.Extra>
                <Button onClick={() => citaStore.selectCita(cita.id)} floated='right' content='View' color='blue' />
                <Button 
                  name={cita.id}
                  loading={loading && target === cita.id} 
                  onClick={(e) => handleDeleteCita(e, cita.id)} 
                  floated='right' 
                  content='Delete' 
                  color='red' />
                <Label basic content={cita.tratamientos} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  )
})