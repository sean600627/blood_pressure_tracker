import React, { useState } from 'react';
import { PlusCircle, Heart, Activity } from 'lucide-react';
import { format } from 'date-fns';

export function BloodPressureForm({ onAdd }) {
  const [sys, setSys] = useState('');
  const [dia, setDia] = useState('');
  const [pulse, setPulse] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!sys || !dia || !pulse) return;
    
    onAdd({
      sys: parseInt(sys, 10),
      dia: parseInt(dia, 10),
      pulse: parseInt(pulse, 10),
      date: new Date().toISOString()
    });
    
    setSys('');
    setDia('');
    setPulse('');
  };

  return (
    <div className="glass-panel animate-fade-in" style={{ animationDelay: '0.1s' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
        <PlusCircle size={24} color="var(--color-primary)" />
        <h2>新增測量記錄</h2>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'flex', gap: '0.5rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
              <Activity size={16} /> 收縮壓 (高壓)
            </label>
            <input
              type="number"
              className="glass-input"
              value={sys}
              onChange={(e) => setSys(e.target.value)}
              placeholder="例如: 120"
              min="50" max="250"
              required
            />
          </div>
          <div>
            <label style={{ display: 'flex', gap: '0.5rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
              <Activity size={16} /> 舒張壓 (低壓)
            </label>
            <input
              type="number"
              className="glass-input"
              value={dia}
              onChange={(e) => setDia(e.target.value)}
              placeholder="例如: 80"
              min="30" max="150"
              required
            />
          </div>
        </div>
        
        <div>
          <label style={{ display: 'flex', gap: '0.5rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
            <Heart size={16} color="var(--color-accent)" /> 心率 (次/分)
          </label>
          <input
            type="number"
            className="glass-input"
            value={pulse}
            onChange={(e) => setPulse(e.target.value)}
            placeholder="例如: 72"
            min="30" max="200"
            required
          />
        </div>

        <button type="submit" className="glass-button" style={{ marginTop: '0.5rem' }}>
          <PlusCircle size={20} />
          儲存記錄
        </button>
      </form>
    </div>
  );
}
