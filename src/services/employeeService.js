import * as XLSX from 'xlsx';
import { parseExcelDate, isTodayAnniversary, getYearsOfService } from '../utils/dateUtils';

// Fetch employee data from Excel file
export const fetchExcelFile = async () => {
  try {
    const response = await fetch('/employee_detail.xlsx');
    const arrayBuffer = await response.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: '' });

    const formattedData = jsonData.map((row) => {
      const joinDate = parseExcelDate(row['Join Date'] || row.joinDate || '');
      const birthday = parseExcelDate(row['Birthday'] || row.birthday || row.DOB || '');
      return {
        id: row.ID || row.id || '',
        name: row.Name || row.name || '',
        birthday,
        joinDate,
        isAnniversary: isTodayAnniversary(joinDate),
        yearsOfService: getYearsOfService(joinDate)
      };
    });

    return formattedData;
  } catch (error) {
    console.error('Error reading Excel file:', error);
    throw error;
  }
};

// Filter employees by birthday date
export const filterBirthdaysByDate = (employees, date) => {
  return employees.filter((emp) => {
    const d = new Date(emp.birthday);
    return d.getDate() === date.getDate() && d.getMonth() === date.getMonth();
  });
};

// Filter employees by join date
export const filterJoinEmployee = (employees, date) => {
  return employees.filter((emp) => {
    const d = new Date(emp.joinDate);
    return d.getDate() === date.getDate() && d.getMonth() === date.getMonth();
  });
};

// Check today's birthdays
export const checkTodaysBirthdays = (employees) => {
  const today = new Date();
  return employees.filter((emp) => {
    const date = new Date(emp.birthday);
    return date.getDate() === today.getDate() && date.getMonth() === today.getMonth();
  });
};

// Check today's work anniversaries
export const checkTodayJoin = (employees) => {
  const today = new Date();
  return employees.filter((emp) => {
    const date = new Date(emp.joinDate);
    return date.getDate() === today.getDate() && date.getMonth() === today.getMonth();
  });
};

// Check if any employee has birthday on specific date
export const hasBirthdayOnDate = (employees, currentMonth, day) => {
  const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
  return employees.some((emp) => {
    const d = new Date(emp.birthday);
    return d.getDate() === date.getDate() && d.getMonth() === date.getMonth();
  });
};

// Check if any employee joined on specific date
export const isJoinDate = (employees, currentMonth, day) => {
  const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
  return employees.some((emp) => {
    const d = new Date(emp.joinDate);
    return d.getDate() === date.getDate() && d.getMonth() === date.getMonth();
  });
};