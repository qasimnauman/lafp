// src/pages/Claims.jsx
import React from 'react';
import ClaimRequestsTable from '../../components/Admin/claims/claimrequest';



const Claims = () => (
  <div className='px-5'>
       <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 bg-gray-50 p-4 rounded-lg shadow-sm">
  <div>
    <h1 className="text-2xl font-bold text-blue-800">Claim Request</h1>
    <p className="text-sm text-blue-600 mt-1">Review and Manage Claim Requests</p>
  </div>
  
</div>
  <ClaimRequestsTable/>
</div>
);

export default Claims;
