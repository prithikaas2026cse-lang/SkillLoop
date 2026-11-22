import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useSkillLoop } from '../../context/SkillLoopContext';

export const Toast = () => {
  const { toast } = useSkillLoop();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />,
    warning: <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />,
    info: <Info className="w-5 h-5 text-blue-500 flex-shrink-0" />
  };

  const bgStyles = {
    success: 'bg-white border-emerald-200 text-slate-800 shadow-lg',
    warning: 'bg-white border-amber-200 text-slate-800 shadow-lg',
    info: 'bg-white border-blue-200 text-slate-800 shadow-lg'
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 transition-all duration-300 transform translate-y-0 opacity-100 max-w-md">
      <div className={`flex items-start gap-3 p-4 rounded-xl border ${bgStyles[toast.type] || bgStyles.info} shadow-soft`}>
        {icons[toast.type] || icons.info}
        <div className="text-sm font-medium text-slate-700 leading-snug">
          {toast.message}
        </div>
      </div>
    </div>
  );
};
