import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import CitaList from "./CitaList";

export default observer(function CitaDashboard() {
  const { citaStore } = useStore();
  const {loadCitas, citaRegistry} = citaStore;

  useEffect(() => {
    if (citaRegistry.size <= 1) loadCitas();
  }, [loadCitas, citaRegistry.size]);

  if (citaStore.loadingInitial) return <LoadingComponent content='Loading app' />

  return (
    <Grid>
      <Grid.Column width='10'>
        <CitaList />
      </Grid.Column>
      <Grid.Column width='6'>
        <h2>Cita filters</h2>
      </Grid.Column>
    </Grid>
  )
})