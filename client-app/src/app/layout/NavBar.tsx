import { Button, Container, Menu } from "semantic-ui-react";
import { useStore } from "../stores/store";

export default function NavBar() {
  const { citaStore } = useStore();

  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item header>
          <img src="/assets/logo.png" alt="logo" style={{marginRight: '10px'}}/>
          Citas
        </Menu.Item>
        <Menu.Item name="Citas" />
        <Menu.Item>
          <Button onClick={() => citaStore.openForm()} positive content="Crear Cita" />
        </Menu.Item>
      </Container>
    </Menu>
  )
}