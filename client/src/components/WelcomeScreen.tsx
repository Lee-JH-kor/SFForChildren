import { Button } from '@/components/ui/button';

interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md mx-auto text-center">
        <div className="bg-white rounded-xl p-8 mb-6 shadow-md border border-gray-200">
          <div className="mb-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
              <div className="text-2xl">🎯</div>
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            우리 아이 강점 찾기
          </h1>
          
          <div className="space-y-3 mb-6">
            <p className="text-base text-gray-700 leading-relaxed">
              54개 질문으로 우리 아이의 강점을 찾아보세요
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              부모님이 관찰하신 행동을 바탕으로<br/>
              편안하게 응답해주세요
            </p>
          </div>
          
          <Button 
            onClick={onStart}
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-xl text-base font-medium transition-colors duration-200 min-h-[48px] w-full"
            data-testid="button-start-assessment"
            aria-label="강점 테스트 시작하기"
          >
            테스트 시작하기
          </Button>
        </div>
        
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="bg-gray-50 rounded-xl p-3">
            <div className="text-base mb-1">⏱️</div>
            <p className="text-xs text-gray-700 font-medium mb-1">소요시간</p>
            <p className="text-xs text-gray-500">약 10-15분</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3">
            <div className="text-base mb-1">📊</div>
            <p className="text-xs text-gray-700 font-medium mb-1">진단 결과</p>
            <p className="text-xs text-gray-500">상위 5개 강점</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3">
            <div className="text-base mb-1">💡</div>
            <p className="text-xs text-gray-700 font-medium mb-1">맞춤 가이드</p>
            <p className="text-xs text-gray-500">개발 방법 제시</p>
          </div>
        </div>
      </div>
    </div>
  );
}
