import React from 'react';
import { format } from 'date-fns';
import { Trash2, Clock } from 'lucide-react';

export function HistoryList({ records, onDelete }) {
  if (!records || records.length === 0) {
    return null;
  }

  const getStatus = (sys, dia) => {
    if (sys < 120 && dia < 80) return { label: '正常', type: 'normal' };
    if (sys >= 140 || dia >= 90) return { label: '高血壓', type: 'high' };
    return { label: '偏高', type: 'elevated' };
  };

  return (
    <div className="glass-panel animate-fade-in" style={{ animationDelay: '0.3s' }}>
      <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Clock size={24} color="var(--color-text-muted)" />
        歷史紀錄
      </h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {records.map((record) => {
          const status = getStatus(record.sys, record.dia);
          return (
            <div key={record.id} className="glass-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.25rem' }}>
                  <span style={{ fontSize: '1.25rem', fontWeight: 600 }}>
                    {record.sys} <span style={{ color: 'var(--color-text-muted)', fontSize: '1rem' }}>/</span> {record.dia}
                  </span>
                  <span className={`badge ${status.type}`}>
                    {status.label}
                  </span>
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', display: 'flex', gap: '1rem' }}>
                  <span>心率: {record.pulse}</span>
                  <span>{format(new Date(record.date), 'yyyy-MM-dd HH:mm')}</span>
                </div>
              </div>
              
              <button 
                className="glass-button icon-only danger"
                onClick={() => onDelete(record.id)}
                title="刪除紀錄"
              >
                <Trash2 size={18} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
