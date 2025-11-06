import { Award, Target, BookOpen, Briefcase, Download, Share2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { ThemeDescription, DomainDescription } from '@/types/assessment';

interface ResultsScreenProps {
  finalScores: Array<{
    theme: string;
    score: number;
    description: ThemeDescription;
  }>;
  domainDescriptions: Record<string, DomainDescription>;
  onRestart: () => void;
}

const pastelColors = [
  'custom-pastel-blue',
  'custom-pastel-peach', 
  'custom-pastel-lavender',
  'custom-pastel-mint',
  'custom-pastel-blue'
];

export function ResultsScreen({ finalScores, domainDescriptions, onRestart }: ResultsScreenProps) {
  const { toast } = useToast();

  const handleSave = () => {
    // 브라우저 인쇄 기능 사용 (PDF 저장 가능)
    window.print();
  };

  const handleShare = async () => {
    const shareData = {
      title: '우리 아이의 강점은?',
      text: '우리 아이의 강점을 진단하고 찾아보세요.',
      url: window.location.href
    };

    try {
      // Web Share API 지원 확인
      if (navigator.share) {
        await navigator.share(shareData);
        toast({
          title: "공유 완료",
          description: "진단 결과가 공유되었습니다.",
        });
      } else {
        // 지원하지 않는 경우 클립보드에 URL 복사
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: "링크 복사 완료",
          description: "진단 링크가 클립보드에 복사되었습니다.",
        });
      }
    } catch (error) {
      // 사용자가 공유를 취소하거나 에러가 발생한 경우
      if ((error as Error).name !== 'AbortError') {
        toast({
          title: "공유 실패",
          description: "공유 중 문제가 발생했습니다.",
          variant: "destructive",
        });
      }
    }
  };

  const getFullDescription = (theme: ThemeDescription, domainDesc: DomainDescription) => {
    return [...domainDesc.kidCommon, ...theme.kidSpecific];
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="text-center mb-8">
        <div className="mb-6">
          <div className="w-20 h-20 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
            <div className="text-3xl">🏆</div>
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-4" data-testid="text-results-title">
          우리 아이의 강점 발견
        </h1>
        
        <div className="bg-gray-50 rounded-xl p-5 max-w-xl mx-auto">
          <p className="text-base text-gray-700 font-medium mb-2">
            54개 질문 응답 완료!
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            우리 아이의 <span className="font-semibold">상위 5가지 강점</span>을 찾았어요<br/>
            아래 결과를 살펴보며 우리 아이의 재능을 키워주세요
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {finalScores.map((result, index) => {
          const domainDesc = domainDescriptions[result.description.domain];
          const fullDescription = getFullDescription(result.description, domainDesc);
          
          return (
            <Card
              key={result.theme}
              className="bg-white rounded-xl p-6 shadow-md border border-gray-200"
              data-testid={`result-card-${index + 1}`}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-lg font-bold text-blue-600">{index + 1}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-800" data-testid={`text-theme-name-${index + 1}`}>
                      {result.description.labelKo}
                    </h3>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium" data-testid={`text-domain-${index + 1}`}>
                      {result.description.domain}
                    </span>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-4 mb-6">
                    <h4 className="font-medium text-gray-800 mb-3">
                      강점 설명
                    </h4>
                    <div className="space-y-2" data-testid={`text-description-${index + 1}`}>
                      {fullDescription.map((line, lineIndex) => (
                        <p key={lineIndex} className="text-sm text-gray-700 leading-relaxed">
                          • {line}
                        </p>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-green-50 rounded-xl p-4">
                      <h5 className="font-medium text-green-800 mb-3 flex items-center">
                        <Target className="w-4 h-4 mr-1" />
                        강점 기르기
                      </h5>
                      <ul className="text-xs text-green-800 space-y-2" data-testid={`list-develop-${index + 1}`}>
                        {result.description.develop.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start">
                            <span className="text-green-600 mr-1 mt-0.5">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-blue-50 rounded-xl p-4">
                      <h5 className="font-medium text-blue-800 mb-3 flex items-center">
                        <BookOpen className="w-4 h-4 mr-1" />
                        학습 방법
                      </h5>
                      <ul className="text-xs text-blue-800 space-y-2" data-testid={`list-learn-${index + 1}`}>
                        {result.description.learn.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start">
                            <span className="text-blue-600 mr-1 mt-0.5">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-purple-50 rounded-xl p-4">
                      <h5 className="font-medium text-purple-800 mb-3 flex items-center">
                        <Briefcase className="w-4 h-4 mr-1" />
                        추천 직업
                      </h5>
                      <ul className="text-xs text-purple-800 space-y-2" data-testid={`list-careers-${index + 1}`}>
                        {result.description.careers.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start">
                            <span className="text-purple-600 mr-1 mt-0.5">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center mt-12">
        <Button
          onClick={handleSave}
          variant="outline"
          className="flex items-center justify-center space-x-2 px-6 py-3 rounded-xl min-h-[44px] border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
          data-testid="button-save-results"
          aria-label="결과 저장하기"
        >
          <Download className="w-4 h-4" />
          <span>결과 저장하기</span>
        </Button>
        
        <Button
          onClick={handleShare}
          className="flex items-center justify-center space-x-2 px-6 py-3 rounded-xl min-h-[44px] bg-green-500 hover:bg-green-600 text-white transition-colors duration-200"
          data-testid="button-share-results"
          aria-label="결과 공유하기"
        >
          <Share2 className="w-4 h-4" />
          <span>결과 공유하기</span>
        </Button>
        
        <Button
          onClick={onRestart}
          className="flex items-center justify-center space-x-2 px-6 py-3 rounded-xl min-h-[44px] bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-200"
          data-testid="button-restart-assessment"
          aria-label="다시 진단하기"
        >
          <RefreshCw className="w-4 h-4" />
          <span>다시 진단하기</span>
        </Button>
      </div>
      
      <Card className="bg-yellow-50 rounded-xl p-6 mt-12 text-center border border-yellow-200">
        <h4 className="font-medium text-yellow-800 text-base mb-3">진단 결과 안내</h4>
        <p className="text-sm text-yellow-700 leading-relaxed" data-testid="text-disclaimer">
          이 진단 결과는 <span className="font-medium">현재 시점의 강점 경향성</span>을 보여줍니다.<br/><br/>
          강점은 <span className="font-medium">지속적인 개발과 경험</span>을 통해 더욱 발전시킬 수 있으며, 시간이 지남에 따라 새로운 강점이 나타날 수도 있습니다.<br/><br/>
          이 결과를 바탕으로 우리 아이만의 독특한 강점을 발견하고 계속 키워나가세요.
        </p>
      </Card>
    </div>
  );
}
