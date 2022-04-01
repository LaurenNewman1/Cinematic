import React from 'react';
import { CircularProgress } from '@mui/material';

const Loading = () => (
  <CircularProgress
    style={{
      position: 'fixed',
      top: '50%',
      bottom: '50%',
      left: '55%',
      right: '45%',
      zIndex: 100,
    }}
  />
);

export default Loading;