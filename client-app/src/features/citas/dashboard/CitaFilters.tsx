import { Calendar } from "react-calendar";
import { Header, Menu } from "semantic-ui-react";

export default function CitaFilters() {
  return (
    <>
      <Menu vertical size="large" style={{ width: '100%', marginTop: 26 }}>
        <Header icon='filter' attached color="teal" content="Filters" />
        <Menu.Item content="Todas las Citas" />
        <Menu.Item content="Yo voy" />
        <Menu.Item content="Yo soy el anfitrión" />
      </Menu>
      <Header />
      <Calendar />
    </>
  )
}