import React, { Fragment, useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import CitaDashboard from '../../features/citas/dashboard/CitaDashboard';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {
  const {citaStore} = useStore();

  useEffect(() => {
    citaStore.loadCitas();
  }, [citaStore]);

  if (citaStore.loadingInitial) return <LoadingComponent content='Loading app' />

  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: '7em' }}>
        <CitaDashboard />
      </Container>
    </Fragment>
  );
}

export default observer(App);
