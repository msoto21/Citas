import { Link } from "react-router-dom";
import { Button, Container, Header, Image, Segment } from "semantic-ui-react";

export default function HomePage() {
  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        <Header as='h1' inverted>
          <Image size="massive" src="/assets/logo.png" alt="logo" style={{marginTop: 12}} />
          Citas
        </Header>
        <Header as="h2" inverted content="Bienvenido a Citas" />
        <Button as={Link} to="/citas" size="huge" inverted>
          Lléveme a las Citas!
        </Button>
      </Container>
    </Segment>
  )
}