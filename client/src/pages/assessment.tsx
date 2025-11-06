import { useAssessment } from '@/hooks/useAssessment';
import { ProgressBar } from '@/components/ProgressBar';
import { WelcomeScreen } from '@/components/WelcomeScreen';
import { QuestionCard } from '@/components/QuestionCard';
import { PhaseTransition } from '@/components/PhaseTransition';
import { ResultsScreen } from '@/components/ResultsScreen';

export default function Assessment() {
  const {
    state,
    startAssessment,
    selectAnswer,
    nextQuestion,
    previousQuestion,
    continueToPhase2,
    restartAssessment,
    getTotalAnswered,
    getCurrentQuestionNumber,
    getProgressPercentage,
    getCurrentQuestion,
  } = useAssessment();

  const currentQuestion = getCurrentQuestion();

  // Show loading state if data is not yet loaded
  if (state.phase !== 'welcome' && (!state.questionsData || !state.descriptionsData)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">데이터를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {state.phase !== 'welcome' && (
        <ProgressBar 
          current={getTotalAnswered()} 
          total={54} 
          phase={state.phase} 
        />
      )}
      
      <main className={state.phase !== 'welcome' ? 'pt-24 pb-8' : 'pt-8 pb-8'}>
        {state.phase === 'welcome' && (
          <WelcomeScreen onStart={startAssessment} />
        )}

        {(state.phase === 'phase1' || state.phase === 'phase2') && currentQuestion && (
          <QuestionCard
            question={currentQuestion}
            questionNumber={getCurrentQuestionNumber()}
            selectedAnswer={state.selectedAnswer}
            scaleLabels={state.questionsData!.scaleLabels}
            onSelectAnswer={selectAnswer}
            onNext={nextQuestion}
            onPrevious={previousQuestion}
            canGoPrevious={state.currentIndex > 0}
          />
        )}

        {state.phase === 'transition' && (
          <PhaseTransition
            top10Themes={state.top10Themes}
            descriptions={state.descriptionsData!}
            onContinue={continueToPhase2}
          />
        )}

        {state.phase === 'results' && (
          <ResultsScreen
            finalScores={state.finalScores}
            domainDescriptions={state.descriptionsData!.domains}
            onRestart={restartAssessment}
          />
        )}
      </main>
    </div>
  );
}
