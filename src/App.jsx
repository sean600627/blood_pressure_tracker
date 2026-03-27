import React from 'react';
import { Activity, Heart, Info, Droplet } from 'lucide-react';
import { BloodPressureForm } from './components/BloodPressureForm';
import { BloodPressureChart } from './components/BloodPressureChart';
import { HistoryList } from './components/HistoryList';
import { useBloodPressure } from './hooks/useBloodPressure';

export default function App() {
  const { records, addRecord, deleteRecord, latestRecord } = useBloodPressure();

  const getStatus = (sys, dia) => {
    if (!sys || !dia) return { label: '無資料', type: 'normal' };
    if (sys < 120 && dia < 80) return { label: '正常', type: 'normal' };
    if (sys >= 140 || dia >= 90) return { label: '高血壓', type: 'high' };
    return { label: '偏高', type: 'elevated' };
  };

  const status = latestRecord ? getStatus(latestRecord.sys, latestRecord.dia) : null;

  return (
    <div className="container">
      <header className="header animate-fade-in">
        <div style={{ 
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(14, 165, 233, 0.2))',
          width: '80px', height: '80px', borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto',
          boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)'
        }}>
          <Droplet size={40} color="var(--color-primary)" />
        </div>
        <h1>血壓記錄管家</h1>
        <p>您的個人健康追蹤助手，隨時隨地守護您的心血管健康</p>
      </header>

      <div className="dashboard-grid animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <div className="glass-card stat-card">
          <div className="stat-icon" style={{ color: 'var(--color-primary)' }}>
            <Activity size={24} />
          </div>
          <div className="stat-content">
            <h3>最新血壓 (SYS / DIA)</h3>
            <div className="value">
              {latestRecord ? `${latestRecord.sys} / ${latestRecord.dia}` : '-- / --'}
            </div>
          </div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-icon" style={{ color: 'var(--color-accent)' }}>
            <Heart size={24} />
          </div>
          <div className="stat-content">
            <h3>最新心率</h3>
            <div className="value">
              {latestRecord ? latestRecord.pulse : '--'}
            </div>
          </div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-icon" style={{ color: 'var(--color-secondary)' }}>
            <Info size={24} />
          </div>
          <div className="stat-content">
            <h3>目前血壓狀態</h3>
            <div className="value" style={{ display: 'flex', alignItems: 'center' }}>
              {status ? (
                <span className={`badge ${status.type}`} style={{ fontSize: '1rem', marginTop: '0.25rem' }}>
                  {status.label}
                </span>
              ) : (
                '--'
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <BloodPressureForm onAdd={addRecord} />
          <HistoryList records={records} onDelete={deleteRecord} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <BloodPressureChart records={records} />
        </div>
      </div>
    </div>
  );
}
