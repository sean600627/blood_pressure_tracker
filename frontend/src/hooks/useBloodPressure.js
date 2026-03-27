import { useState, useEffect } from 'react';

const STORAGE_KEY = 'blood_pressure_records';

export const useBloodPressure = () => {
  const [records, setRecords] = useState(() => {
    try {
      const item = window.localStorage.getItem(STORAGE_KEY);
      return item ? JSON.parse(item) : [];
    } catch (error) {
      console.error('Error reading localStorage', error);
      return [];
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    } catch (error) {
      console.error('Error setting localStorage', error);
    }
  }, [records]);

  const addRecord = (record) => {
    const newRecord = {
      ...record,
      id: Date.now().toString(),
    };
    // Sort array by date descending (newest first)
    setRecords((prev) => 
      [...prev, newRecord].sort((a, b) => new Date(b.date) - new Date(a.date))
    );
  };

  const deleteRecord = (id) => {
    setRecords((prev) => prev.filter((r) => r.id !== id));
  };

  const latestRecord = records.length > 0 ? records[0] : null;

  return {
    records,
    addRecord,
    deleteRecord,
    latestRecord
  };
};
