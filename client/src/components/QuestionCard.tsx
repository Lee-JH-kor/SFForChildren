import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Question } from '@/types/assessment';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  selectedAnswer: number | null;
  scaleLabels: Record<string, string>;
  onSelectAnswer: (value: number) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoPrevious: boolean;
}

export function QuestionCard({
  question,
  questionNumber,
  selectedAnswer,
  scaleLabels,
  onSelectAnswer,
  onNext,
  onPrevious,
  canGoPrevious,
}: QuestionCardProps) {
  const scaleOptions = [0, 1, 2, 3];

  return (
    <div className="max-w-2xl mx-auto px-4">
      <Card className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
        <div className="text-center mb-6">
          <h2 className="text-xl font-medium text-gray-800 mb-4" data-testid="text-question-number">
            질문 {questionNumber}
          </h2>
        </div>

        <div className="bg-gray-50 rounded-xl p-5 mb-6">
          <p className="text-base text-center leading-relaxed text-gray-800" data-testid="text-question-content">
            {question.ko}
          </p>
        </div>

        <div className="space-y-3">
          <div className="text-center mb-5">
            <p className="text-sm font-medium text-gray-600 mb-4">
              평소 아이의 모습을 생각하며 응답해주세요
            </p>
          </div>
          
          {scaleOptions.map((value) => {
            const isSelected = selectedAnswer === value;
            
            return (
              <button
                key={value}
                onClick={() => onSelectAnswer(value)}
                className={`scale-button w-full p-4 rounded-xl border-2 flex items-center min-h-[52px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 ${
                  isSelected
                    ? 'selected border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300'
                }`}
                data-testid={`button-scale-${value}`}
                aria-label={`${scaleLabels[value.toString()]} 선택`}
              >
                <div className="flex items-center space-x-3 w-full">
                  <div className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center ${
                    isSelected
                      ? 'bg-blue-500'
                      : 'border-2 border-gray-300'
                  }`}>
                    {isSelected && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <span className="text-left font-medium text-gray-700 flex-1">
                    {scaleLabels[value.toString()]}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between mt-6">
          <Button
            onClick={onPrevious}
            disabled={!canGoPrevious}
            variant="outline"
            className="flex items-center space-x-2 px-5 py-2.5 rounded-xl min-h-[44px] border-gray-300 text-gray-700 hover:bg-gray-50"
            data-testid="button-previous"
            aria-label="이전 질문으로"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>이전</span>
          </Button>
          
          <Button
            onClick={onNext}
            disabled={selectedAnswer === null}
            className="flex items-center space-x-2 px-6 py-2.5 rounded-xl min-h-[44px] bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-200 disabled:opacity-50 disabled:bg-gray-300"
            data-testid="button-next"
            aria-label="다음 질문으로"
          >
            <span>다음</span>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
}