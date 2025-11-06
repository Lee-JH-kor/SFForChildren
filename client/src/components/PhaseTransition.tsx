import { Button } from '@/components/ui/button';
import { DescriptionsData } from '@/types/assessment';

interface PhaseTransitionProps {
  top10Themes: string[];
  descriptions: DescriptionsData;
  onContinue: () => void;
}

export function PhaseTransition({ top10Themes, descriptions, onContinue }: PhaseTransitionProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-white rounded-xl p-8 shadow-md border border-gray-200">
          <div className="mb-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
              <div className="text-2xl">✓</div>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            1단계 완료!
          </h2>
            
          <div className="space-y-3 mb-6">
            <p className="text-base text-gray-700">
              상위 10개 강점을 분석했습니다
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              이제 더 자세한 질문으로 우리 아이의<br/>
              진짜 강점 5가지를 찾아보겠습니다
            </p>
          </div>
            
          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <h3 className="text-base font-medium text-gray-800 mb-4 text-center">
              현재 상위 10개 강점 테마
            </h3>
            <div className="grid grid-cols-2 gap-2 text-sm" data-testid="top10-themes-grid">
              {top10Themes.map((theme, index) => (
                <div
                  key={theme}
                  className="bg-white p-3 rounded-xl text-gray-800 border border-gray-100 text-center"
                  data-testid={`theme-${index}`}
                >
                  <span className="font-medium">{descriptions.themes[theme]?.labelKo || theme}</span>
                </div>
              ))}
            </div>
          </div>
            
          <Button
            onClick={onContinue}
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-xl text-base font-medium transition-colors duration-200 min-h-[48px] w-full"
            data-testid="button-continue-phase2"
            aria-label="2단계 계속하기"
          >
            2단계 계속하기
          </Button>
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            2단계에서는 20개의 추가 질문으로<br/>
            우리 아이의 진짜 강점 5가지를 찾아냅니다
          </p>
        </div>
      </div>
    </div>
  );
}
