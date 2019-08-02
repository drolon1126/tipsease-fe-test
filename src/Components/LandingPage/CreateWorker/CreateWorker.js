import React,{useState,useContext} from "react";
import CreateForm from "./CreateForm";
import {WorkersListContext} from '../../Context/Contexts'

function CreateWorker() {
const {workerList,setWorkerList} = useState(WorkersListContext);
  return (
    <div>
      <CreateForm
        workerList={workerList}
        setWorkerList={setWorkerList}
      />
    </div>
  );
}

export default CreateWorker;