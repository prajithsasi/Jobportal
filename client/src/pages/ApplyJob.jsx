import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";

const ApplyJob = () => {
  const { id } = useParams()

  const [JobData,setJobData] = useState(null)

  const {jobs} = useContext()

  const fetchJob = async () => {

  }
  return (
    <div>
          
    </div>
  );
};

export default ApplyJob;
