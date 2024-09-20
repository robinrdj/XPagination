import React, { useState, useEffect } from 'react';

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [cPage, setCPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [currentEmployees, setCurrentEmployees] = useState([]);

  const totalPages = Math.ceil(employees.length / 10);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
        const data = await response.json();
        setEmployees(data);
        setLoading(false);
      } catch (err) {
        alert('failed to fetch data');
        setLoading(false);
      }
    };

    getData();
  }, []);

  const handlePreviousPage = () => {
    if (cPage > 1) {
      setCPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (cPage < totalPages) {
      setCPage((prevPage) => prevPage + 1);
    }
  };

useEffect(()=>{
  const indexOfLastItem = cPage * 10;
  const indexOfFirstItem = indexOfLastItem - 10;
  setCurrentEmployees(employees.slice(indexOfFirstItem, indexOfLastItem));
});
 

  return (
    <div>
      <h1>Employee Data Table</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table style={{border:"1px solid black",width:"100%"}}>
          <thead style={{backgroundColor:"#009879"}}>
            <tr>
              <th style={{border:"1px solid black", padding:"10px"}}>ID</th>
              <th style={{border:"1px solid black", padding:"10px"}}>Name</th>
              <th style={{border:"1px solid black", padding:"10px"}}>Email</th>
              <th style={{border:"1px solid black", padding:"10px"}}>Role</th>
            </tr>
          </thead>
          <tbody>
            {currentEmployees.map((employee) => (
              <tr key={employee.id}>
                <td style={{border:"1px solid black", padding:"10px"}}>{employee.id}</td>
                <td style={{border:"1px solid black", padding:"10px"}}>{employee.name}</td>
                <td style={{border:"1px solid black", padding:"10px"}}>{employee.email}</td>
                <td style={{border:"1px solid black", padding:"10px"}}>{employee.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="pagination">
        <button onClick={handlePreviousPage} style={{backgroundColor:"#009879",marginRight:"5px", borderRadius:"5px"}}>
          Previous
        </button>
        <span style={{backgroundColor:"#009879", marginRight:"5px"}}>{cPage}</span>
        <button onClick={handleNextPage}  style={{backgroundColor:"#009879",marginRight:"5px", borderRadius:"5px"}}>
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
