import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { format } from 'date-fns';
import { Activity } from 'lucide-react';

export function BloodPressureChart({ records }) {
  if (!records || records.length === 0) {
    return (
      <div className="glass-panel animate-fade-in" style={{ animationDelay: '0.2s', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Activity size={48} color="var(--color-text-muted)" style={{ opacity: 0.5, marginBottom: '1rem' }} />
        <p style={{ color: 'var(--color-text-muted)' }}>尚無測量記錄，請新增資料以查看趨勢圖表</p>
      </div>
    );
  }

  // format data for charts, taking top 10 recent and reverse it to be chronological
  const chartData = [...records]
    .slice(0, 10)
    .reverse()
    .map((r) => ({
      ...r,
      timeLabel: format(new Date(r.date), 'MM/dd HH:mm'),
    }));

  return (
    <div className="glass-panel animate-fade-in" style={{ animationDelay: '0.2s', height: '100%' }}>
      <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Activity size={24} color="var(--color-secondary)" />
        最近測量趨勢
      </h2>
      <div style={{ width: '100%', height: '300px' }}>
        <ResponsiveContainer>
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="timeLabel" 
              stroke="var(--color-text-muted)" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="var(--color-text-muted)" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
              domain={['dataMin - 10', 'dataMax + 10']}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(15, 17, 26, 0.9)', 
                backdropFilter: 'blur(8px)',
                border: '1px solid var(--color-border-glass)',
                borderRadius: '8px',
                color: '#fff'
              }} 
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="sys" 
              name="收縮壓 (高壓)" 
              stroke="var(--color-primary)" 
              strokeWidth={3}
              activeDot={{ r: 8 }} 
            />
            <Line 
              type="monotone" 
              dataKey="dia" 
              name="舒張壓 (低壓)" 
              stroke="var(--color-secondary)" 
              strokeWidth={3}
            />
            <Line 
              type="monotone" 
              dataKey="pulse" 
              name="心率" 
              stroke="var(--color-accent)" 
              strokeWidth={2}
              strokeDasharray="5 5"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
