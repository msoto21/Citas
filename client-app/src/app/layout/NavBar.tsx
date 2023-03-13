import { NavLink } from "react-router-dom";
import { Button, Container, Menu } from "semantic-ui-react";

export default function NavBar() {

  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={NavLink} to='/' header>
          <img src="/assets/logo.png" alt="logo" style={{marginRight: '10px'}}/>
          Citas
        </Menu.Item>
        <Menu.Item as={NavLink} to='/citas' name="Citas" />
        <Menu.Item>
          <Button as={NavLink} to='/createCita' positive content="Crear Cita" />
        </Menu.Item>
      </Container>
    </Menu>
  )
}