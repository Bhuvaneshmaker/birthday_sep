import React from 'react';
import { Star } from 'lucide-react';
import { calculateAge, getYearsOfService, formatDate } from '../utils/dateUtils';

const TodayCelebrations = ({ todaysBirthdays, todayJoin }) => {
  return (
    <>
      {/* Today's Birthdays */}
      {todaysBirthdays.length > 0 && (
        <div className='today'>
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Star className="text-yellow-300" />
              🎉 Today Birthday Celebrating Person! 🎉
            </h2>
            <div className="row">
              {todaysBirthdays.map((emp, index) => (
                <div key={index} className="col-md-6 mb-3">
                  <div className="bg-white bg-opacity-20 rounded-lg p-4">
                    <h4 className="font-bold text-xl">{emp.name}</h4>
                    <p className="text-pink-100">🎂 Turning {calculateAge(emp.birthday)} years old!</p>
                    <div className="mt-2 p-2 bg-white bg-opacity-10 rounded">
                      <p className="text-sm">
                        🎊 "Wishing you a fantastic birthday filled with joy, laughter, and wonderful memories!"
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Today's Work Anniversaries */}
      {todayJoin.length > 0 && (
        <div className='join'>
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Star className="text-yellow-300" />
              🎉 The Person Steps Into Another Successful Year! 🎉
            </h2>
            <div className="row">
              {todayJoin.map((emp, index) => (
                <div key={index} className="col-md-6 mb-3">
                  <div className="bg-white bg-opacity-20 rounded-lg p-4">
                    <h4 className="font-bold text-xl">{emp.name}</h4>
                    <p className="text-pink-100">🎉 Stepping into {getYearsOfService(emp.joinDate)} years!</p>
                    <div className="mt-2 p-2 bg-white bg-opacity-10 rounded">
                      <p className="text-sm">
                        🎊 "The successful story of {emp.name} in our company since {formatDate(emp.joinDate)}!"
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TodayCelebrations;