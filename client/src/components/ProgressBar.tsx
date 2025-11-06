import { Card } from '@/components/ui/card';

interface ProgressBarProps {
  current: number;
  total: number;
  phase: string;
}

export function ProgressBar({ current, total, phase }: ProgressBarProps) {
  const percentage = Math.round((current / total) * 100);
  
  const getPhaseText = (phase: string) => {
    switch (phase) {
      case 'phase1':
        return '1단계 진행 중';
      case 'transition':
        return '1단계 완료';
      case 'phase2':
        return '2단계 진행 중';
      case 'results':
        return '진단 완료';
      default:
        return '';
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-4xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-base font-medium text-gray-800">우리 아이 강점 찾기</h1>
          <div className="text-sm text-gray-600">
            <span data-testid="progress-current" className="font-medium">{current}</span>
            <span className="mx-1">/</span>
            <span data-testid="progress-total">{total}</span>
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full progress-fill transition-all duration-300" 
            style={{ width: `${percentage}%` }}
            data-testid="progress-bar"
          />
        </div>
        
        <div className="flex items-center justify-between mt-2">
          <div className="text-xs text-gray-500" data-testid="progress-phase">
            {getPhaseText(phase)}
          </div>
          <div className="text-xs text-gray-500">
            {percentage}%
          </div>
        </div>
      </div>
    </div>
  );
}
