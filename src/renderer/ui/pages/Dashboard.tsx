import React from 'react';

import Browser from '../organisms/Browser';
import Showcase from '../organisms/Showcase';

const Dashboard: React.FC = () => {
  return (
    <>
      <Showcase />
      <Browser />
    </>
  );
};

export default Dashboard;
