import { Card, Image, Button } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";

export default function CitaDetails() {
  const { citaStore } = useStore();
  const { selectedCita: cita, openForm, cancelSelectedCita } = citaStore;

  if (!cita) return <LoadingComponent />;

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
        <Button.Group>
          <Button onClick={() => openForm(cita.id)} basic color="blue" content="Edit" />
          <Button onClick={cancelSelectedCita} basic color="grey" content="Cancel" />
        </Button.Group>
      </Card.Content>
    </Card>
  )
}