import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Card, Image, Button } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";

export default observer(function CitaDetails() {
  const { citaStore } = useStore();
  const { selectedCita: cita, loadCita, loadingInitial } = citaStore;
  const {id} = useParams();

  useEffect(() => {
    if (id) loadCita(id);
  },[id, loadCita]);

  if (loadingInitial || !cita) return <LoadingComponent />;

  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${cita.tratamientos}.jpg`} />
      <Card.Content>
        <Card.Header>{cita.titulo}</Card.Header>
        <Card.Meta>
          <span>{cita.fechaHoraInicio.toString()}</span>
        </Card.Meta>
        <Card.Description>
          {cita.descripcion}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths='2'>
          <Button as={Link} to={`/manage/${cita.id}`} basic color="blue" content="Edit" />
          <Button as={Link} to='/citas' basic color="grey" content="Cancel" />
        </Button.Group>
      </Card.Content>
    </Card>
  )
})