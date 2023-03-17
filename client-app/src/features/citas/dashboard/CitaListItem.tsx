import { Link } from "react-router-dom";
import { Button, Icon, Item, Segment } from "semantic-ui-react";
import { Cita } from "../../../app/models/cita";

interface Props {
  cita: Cita
}

export default function CitaListItem({ cita }: Props) {

  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size="tiny" circular src='/assets/user.png' />
            <Item.Content>
              <Item.Header as={Link} to={`/citas/${cita.id}`}>
                {cita.titulo}
              </Item.Header>
              <Item.Description>Hosted by Bob</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name="clock" /> {cita.fechaHoraInicio}
          <Icon name="marker" /> {cita.descripcion}
        </span>
      </Segment>
      <Segment secondary>
        Client: {cita.cliente}
      </Segment>
      <Segment clearing>
        <span>{cita.nota}</span>
        <Button as={Link} to={`/citas/${cita.id}`} color="teal" floated="right" content="View" />
      </Segment>
    </Segment.Group>
  )
}