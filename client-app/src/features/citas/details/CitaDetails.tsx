import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import CitaDetailedChat from "./CitaDetailedChat";
import CitaDetailedHeader from "./CitaDetailedHeader";
import CitaDetailedInfo from "./CitaDetailedInfo";
import CitaDetailedSidebar from "./CitaDetailedSidebar";

export default observer(function CitaDetails() {
  const { citaStore } = useStore();
  const { selectedCita: cita, loadCita, loadingInitial } = citaStore;
  const {id} = useParams();

  useEffect(() => {
    if (id) loadCita(id);
  },[id, loadCita]);

  if (loadingInitial || !cita) return <LoadingComponent />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <CitaDetailedHeader cita={cita} />
        <CitaDetailedInfo cita={cita} />
        <CitaDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <CitaDetailedSidebar />
      </Grid.Column>
    </Grid>
  )
})