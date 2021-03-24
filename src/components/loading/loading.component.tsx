import React from 'react';
import { Spinner } from 'react-bootstrap';
import { LoadingContainer } from './loading.styles';


const Loading = () => (
  <LoadingContainer>
    <div>
      <h2>Loading
        <Spinner className="ball" animation="grow" variant="primary" />
        <Spinner className="ball" animation="grow" variant="secondary" />
        <Spinner className="ball" animation="grow" variant="success" />
        <Spinner className="ball" animation="grow" variant="danger" />
      </h2>
    </div>

  </LoadingContainer>
);


export default Loading;
