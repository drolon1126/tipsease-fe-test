import React from 'react';
import styled from 'styled-components';
import WorkersDropdown from './WorkersDropdown'
import CreateWorkerButton from '../CreateWorker/CreateWorkerButton';

const WorkerButtonsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    width: 100%;

    @media(max-width: 600px) {
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
`;


const WorkerButtons = props => {
    return(
        <WorkerButtonsContainer>
            <CreateWorkerButton></CreateWorkerButton>
            <WorkersDropdown />
        </WorkerButtonsContainer>
    );
}

export default WorkerButtons