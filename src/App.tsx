import React, { useState, useEffect } from 'react';
import { Gift, Cake } from 'lucide-react';
import './App.css';
import Calendar from './components/Calender';
import TodayCelebrations from './components/TodayCelebration';
import EmployeeDetails from './components/EmployeeDetails';
import AddEmployeeForm from './components/AddEmployeeForm';
import { 
  fetchExcelFile, 
  filterBirthdaysByDate, 
  filterJoinEmployee, 
  checkTodaysBirthdays, 
  checkTodayJoin 
} from './services/employeeService';

// Import sample data
import sampleEmployees from './data/sampleEmployees';

const EmployeeBirthdayApp = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [birthdayEmployees, setBirthdayEmployees] = useState([]);
  const [todaysBirthdays, setTodaysBirthdays] = useState([]);
  const [todayJoin, setTodayJoin] = useState([]);
  const [joinEmployee, setJoinEmployee] = useState([]);
  const [addEmployee, setAddEmployee] = useState({
    id: '',
    name: '',
    birthday: '',
    joinDate: ''
  });

  // Initialize employees data
  useEffect(() => {
    const initializeData = async () => {
      try {
        const excelData = await fetchExcelFile();
        setEmployees(excelData);
        setTodaysBirthdays(checkTodaysBirthdays(excelData));
        setTodayJoin(checkTodayJoin(excelData));
      } catch (error) {
        // Fall back to sample data if Excel file can't be loaded
        console.error('Using sample data due to error:', error);
        setEmployees(sampleEmployees);
        setTodaysBirthdays(checkTodaysBirthdays(sampleEmployees));
        setTodayJoin(checkTodayJoin(sampleEmployees));
      }
    };

    initializeData();
  }, []);

  // Update filtered data when selected date or employees change
  useEffect(() => {
    setBirthdayEmployees(filterBirthdaysByDate(employees, selectedDate));
    setJoinEmployee(filterJoinEmployee(employees, selectedDate));
  }, [selectedDate, employees]);

  // Handle employee addition callback
  const handleEmployeeAdded = (newEmployeeList) => {
    setTodaysBirthdays(checkTodaysBirthdays(newEmployeeList));
    setTodayJoin(checkTodayJoin(newEmployeeList));
    setBirthdayEmployees(filterBirthdaysByDate(newEmployeeList, selectedDate));
    setJoinEmployee(filterJoinEmployee(newEmployeeList, selectedDate));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100">
      <div className="container mx-auto px-4 py-8 text-center">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-purple-800 mb-2 flex items-center justify-center gap-3">
            <Gift className="text-pink-600" />
            Employee Birthday Planning
            <Cake className="text-pink-600" />
          </h1>
          <p className="text-gray-600">We always remember your birthday celebration!</p>
        </div>

        {/* Today's Celebrations */}
        <TodayCelebrations 
          todaysBirthdays={todaysBirthdays} 
          todayJoin={todayJoin} 
        />

        {/* Calendar and Employee Details */}
        <div className="row">
          <Calendar 
            currentMonth={currentMonth}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            setCurrentMonth={setCurrentMonth}
            employees={employees}
          />
        </div>

        <EmployeeDetails 
          selectedDate={selectedDate}
          birthdayEmployees={birthdayEmployees}
          joinEmployee={joinEmployee}
          employees={employees}
          currentMonth={currentMonth}
        />

        {/* Add Employee Form */}
        <AddEmployeeForm 
          addEmployee={addEmployee}
          setAddEmployee={setAddEmployee}
          employees={employees}
          setEmployees={setEmployees}
          onEmployeeAdded={handleEmployeeAdded}
        />

      </div>
    </div>
  );
};

export default EmployeeBirthdayApp;
