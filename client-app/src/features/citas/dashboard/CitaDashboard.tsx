import { Grid } from "semantic-ui-react";
import { Cita } from "../../../app/models/cita";
import CitaDetails from "../details/CitaDetails";
import CitaForm from "../form/CitaForm";
import CitaList from "./CitaList";

interface Props {
  citas: Cita[];
  selectedCita: Cita | undefined;
  selectCita: (id: string) => void;
  cancelSelectCita: () => void;
  editMode: boolean;
  openForm: (id: string) => void;
  closeForm: () => void;
  createOrEdit: (cita: Cita) => void;
  deleteCita: (id: string) => void;
  submitting: boolean;
}

export default function CitaDashboard({ citas, selectedCita, selectCita, cancelSelectCita,
   editMode, openForm, closeForm, createOrEdit, deleteCita, submitting }: Props) {
  return (
    <Grid>
      <Grid.Column width='10'>
        <CitaList citas={citas} selectCita={selectCita} deleteCita={deleteCita} submitting={submitting}/>
      </Grid.Column>
      <Grid.Column width='6'>
        {selectedCita && !editMode &&
        <CitaDetails 
          cita={selectedCita} 
          cancelSelectCita={cancelSelectCita}
          openForm={openForm} 
        />}
        {editMode && <CitaForm closeForm={closeForm} cita={selectedCita} createOrEdit={createOrEdit} submitting={submitting} />}
      </Grid.Column>
    </Grid>
  )
}