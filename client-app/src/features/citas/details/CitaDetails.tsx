import { Card, Image, Button } from "semantic-ui-react";
import { Cita } from "../../../app/models/cita";

interface Props {
  cita: Cita;
  cancelSelectCita: () => void;
  openForm: (id: string) => void;
}

export default function CitaDetails({cita, cancelSelectCita, openForm}: Props) {
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
          <Button onClick={cancelSelectCita} basic color="grey" content="Cancel" />
        </Button.Group>
      </Card.Content>
    </Card>
  )
}