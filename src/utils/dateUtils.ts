import * as XLSX from 'xlsx';

// Calculate person's age from birthday
export const calculateAge = (birthday) => {
  const today = new Date();
  const birthDate = new Date(birthday);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

// Calculate years of service from join date
export const getYearsOfService = (joinDate) => {
  const today = new Date();
  const joined = new Date(joinDate);
  let years = today.getFullYear() - joined.getFullYear();
  if (
    today.getMonth() < joined.getMonth() ||
    (today.getMonth() === joined.getMonth() && today.getDate() < joined.getDate())
  ) {
    years--;
  }
  return years;
};

// Check if today is anniversary
export const isTodayAnniversary = (dateStr) => {
  if (!dateStr) return false;
  const today = new Date();
  const date = new Date(dateStr);
  return today.getDate() === date.getDate() && today.getMonth() === date.getMonth();
};

// Parse Excel date format
export const parseExcelDate = (excelDate) => {
  if (!excelDate) return '';
  if (typeof excelDate === 'string') return new Date(excelDate).toISOString().split('T')[0];
  const date = XLSX.SSF.parse_date_code(excelDate);
  if (!date) return '';
  return `${date.y}-${String(date.m).padStart(2, '0')}-${String(date.d).padStart(2, '0')}`;
};

// Format date for display
export const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

// Calendar utility functions
export const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
export const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();