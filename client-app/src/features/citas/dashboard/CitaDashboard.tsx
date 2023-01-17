import { observer } from "mobx-react-lite";
import { Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import CitaDetails from "../details/CitaDetails";
import CitaForm from "../form/CitaForm";
import CitaList from "./CitaList";

export default observer(function CitaDashboard() {
  const { citaStore } = useStore();
  const { selectedCita, editMode } = citaStore;

  return (
    <Grid>
      <Grid.Column width='10'>
        <CitaList />
      </Grid.Column>
      <Grid.Column width='6'>
        {selectedCita && !editMode &&
        <CitaDetails />}
        {editMode && <CitaForm />}
      </Grid.Column>
    </Grid>
  )
})