import React from 'react';
import styled from 'styled-components';

import BackgroundImage from '../ui/molecules/BackgroundImage';
import Dashboard from '../ui/pages/Dashboard';

const App: React.FC = () => (
  <Page>
    <Dashboard />
    <BackgroundImage />
  </Page>
);

const Page = styled.div`
  height: 100vh;
  width: 100vw;
`;

export default App;
