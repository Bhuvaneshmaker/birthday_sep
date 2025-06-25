import React from 'react';
import { Calendar, Heart } from 'lucide-react';
import { calculateAge, getYearsOfService, formatDate } from '../utils/dateUtils';

const EmployeeDetails = ({ selectedDate, birthdayEmployees, joinEmployee, employees, currentMonth }) => {
  return (
    <div className="row">
      {/* Selected Date: Birthdays */}
      <div className='birth'>
        <div className="col-lg-4 mb-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Calendar className="text-blue-600" />
              {selectedDate.toLocaleDateString('en-US', {
                weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
              })}
            </h3>

            {birthdayEmployees.length > 0 ? (
              <div>
                <h4 className="text-lg font-semibold text-pink-600 mb-3">
                  🎉 Birthday Celebrants ({birthdayEmployees.length})
                </h4>
                {birthdayEmployees.map((emp, index) => (
                  <div key={index} className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-4 mb-3">
                    <h5 className="font-bold text-lg text-purple-800">{emp.name}</h5>
                    <p className="text-sm text-gray-600">🎂 Age: {calculateAge(emp.birthday)} years</p>
                    <p className="text-sm text-gray-600">
                      ⭐ Joined: {formatDate(emp.joinDate)} ({getYearsOfService(emp.joinDate)} years)
                    </p>
                    <div className="mt-3 p-3 bg-white rounded border-l-4 border-pink-500">
                      <p className="text-sm text-pink-700 font-medium">
                        <Heart className="inline w-4 h-4 mr-1" />
                        "Happy Birthday! May your special day be filled with happiness and joy!"
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-6xl mb-3">📅</div>
                <p className="text-gray-500">No birthdays on this date</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Selected Date: Work Anniversaries */}
      <div className='contain'>
        <div className="col-lg-4 mb-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Calendar className="text-blue-600" />
              {selectedDate.toLocaleDateString('en-US', {
                weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
              })}
            </h3>

            {joinEmployee.length > 0 ? (
              <div>
                <h4 className="text-lg font-semibold text-green-600 mb-3">
                  🎉 Work Anniversary ({joinEmployee.length})
                </h4>
                {joinEmployee.map((emp, index) => (
                  <div key={index} className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 mb-3">
                    <h5 className="font-bold text-lg text-blue-800">{emp.name}</h5>
                    <p className="text-sm text-gray-600">
                      ⭐ Joined: {formatDate(emp.joinDate)} ({getYearsOfService(emp.joinDate)} years)
                    </p>
                    <p className="text-sm text-gray-600">
                      🎂 Age: {calculateAge(emp.birthday)} years
                    </p>
                    <div className="mt-3 p-3 bg-white rounded border-l-4 border-green-500">
                      <p className="text-sm text-green-700 font-medium">
                        <Heart className="inline w-4 h-4 mr-1" />
                        "Happy Work Anniversary! Thank you for being an essential part of our journey!"
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-6xl mb-3">📅</div>
                <p className="text-gray-500">No joiners on this date</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats details */}
      <div className='stats'>
        <div className="col-lg-4 mb-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h4 className="text-lg font-semibold mb-3">📊 Quick Stats</h4>
            <div className="space-y-2">
              <p className="text-sm">
                Total Employees: <span className="font-bold text-blue-600">{employees.length}</span>
              </p>
              <p className="text-sm">
                This Month's Birthdays:{" "}
                <span className="font-bold text-purple-600">
                  {employees.filter(emp => new Date(emp.birthday).getMonth() === currentMonth.getMonth()).length}
                </span>
              </p>
              <p className="text-sm">
                This Month's Joinings:{" "}
                <span className="font-bold text-purple-600">
                  {employees.filter(emp => new Date(emp.joinDate).getMonth() === currentMonth.getMonth()).length}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;