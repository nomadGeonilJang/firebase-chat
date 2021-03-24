import React from 'react';
import styled from "styled-components";
import { Spinner } from 'react-bootstrap';
import color from 'utils/style/color';

function Loading() {
  return (
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
}

const LoadingContainer = styled.section`
    background-color:${color.darkBlue};
    height:100%;
    width:100%;
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;
    h2{
        margin-bottom:20px;
        color:white;
        text-transform:uppercase;
        letter-spacing:1.1rem;
    }
    .ball{
        margin:5px;
        width:20px;
        height:20px;
        
    }

`; 

export default Loading;
