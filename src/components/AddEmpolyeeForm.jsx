import React from 'react';
import { isTodayAnniversary, getYearsOfService } from '../utils/dateUtils';

const AddEmployeeForm = ({ addEmployee, setAddEmployee, employees, setEmployees, onEmployeeAdded }) => {
  const handleAddEmployee = (e) => {
    e.preventDefault();
    const newEmployee = {
      ...addEmployee,
      isAnniversary: isTodayAnniversary(addEmployee.joinDate),
      yearsOfService: getYearsOfService(addEmployee.joinDate)
    };
    const newList = [...employees, newEmployee];
    setEmployees(newList);
    onEmployeeAdded(newList);
    setAddEmployee({ id: '', name: '', birthday: '', joinDate: '' });
  };

  return (
    <div className='information'>
      <h3 className='text-center-xl text-black'>ADD INFORMATION</h3>
      <form onSubmit={handleAddEmployee} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-6">
        <div className="mb-4">
          <label htmlFor="id" className="block text-sm font-medium text-gray-700">ID</label>
          <input
            type="text"
            id="id"
            value={addEmployee.id}
            onChange={(e) => setAddEmployee({ ...addEmployee, id: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            value={addEmployee.name}
            onChange={(e) => setAddEmployee({ ...addEmployee, name: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="birthday" className="block text-sm font-medium text-gray-700">Birthday</label>
          <input
            type="date"
            id="birthday"
            value={addEmployee.birthday}
            onChange={(e) => setAddEmployee({ ...addEmployee, birthday: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="joinDate" className="block text-sm font-medium text-gray-700">Join Date</label>
          <input
            type="date"
            id="joinDate"
            value={addEmployee.joinDate}
            onChange={(e) => setAddEmployee({ ...addEmployee, joinDate: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-200"
        >
          Add Employee
        </button>
      </form>
    </div>
  );
};

export default AddEmployeeForm;