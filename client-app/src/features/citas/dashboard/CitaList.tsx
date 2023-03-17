import { observer } from 'mobx-react-lite';
import { Fragment } from 'react';
import { Header } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import CitaListItem from './CitaListItem';

export default observer(function CitaList() {
  const { citaStore } = useStore();
  const { groupedCitas } = citaStore;

  return (
    <>
      {groupedCitas.map(([group, citas]) => (
        <Fragment key={group}>
          <Header sub color='teal'>
            {group}
          </Header>
          {citas.map(cita => (
            <CitaListItem key={cita.id} cita={cita} />
          ))}
        </Fragment>
      ))}
    </>
  )
})