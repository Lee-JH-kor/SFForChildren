import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AssessmentState, QuestionsData, DescriptionsData } from '@/types/assessment';
import { calculateTop10Themes, calculateFinalScores, generatePhase2Questions } from '@/utils/scoring';

const initialState: AssessmentState = {
  phase: 'welcome',
  currentIndex: 0,
  answers1: {},
  answers2: {},
  top10Themes: [],
  phase2Questions: [],
  finalScores: [],
  selectedAnswer: null,
  questionsData: null,
  descriptionsData: null,
};

export function useAssessment() {
  const [state, setState] = useState<AssessmentState>(initialState);

  const { data: questionsData } = useQuery<QuestionsData>({
    queryKey: [import.meta.env.MODE === 'production' ? "./questions_v1.json" : "/api/questions"],
  });

  const { data: descriptionsData } = useQuery<DescriptionsData>({
    queryKey: [import.meta.env.MODE === 'production' ? "./descriptions_ko_v2.json" : "/api/descriptions"],
  });

  useEffect(() => {
    if (questionsData && descriptionsData) {
      setState(prev => ({
        ...prev,
        questionsData,
        descriptionsData,
      }));
    }
  }, [questionsData, descriptionsData]);

  const startAssessment = () => {
    setState(prev => ({ ...prev, phase: 'phase1' }));
  };

  const selectAnswer = (value: number) => {
    setState(prev => ({ ...prev, selectedAnswer: value }));
  };

  const nextQuestion = () => {
    if (state.selectedAnswer === null) return;

    const newAnswers1 = { ...state.answers1 };
    const newAnswers2 = { ...state.answers2 };

    if (state.phase === 'phase1') {
      const currentQuestion = state.questionsData!.phase1[state.currentIndex];
      newAnswers1[currentQuestion.theme] = state.selectedAnswer;

      if (state.currentIndex === state.questionsData!.phase1.length - 1) {
        // Phase 1 complete, calculate top 10 themes
        const top10 = calculateTop10Themes(newAnswers1, state.questionsData!.phase1);
        const phase2Questions = generatePhase2Questions(top10, state.questionsData!.phase2Bank);
        
        setState(prev => ({
          ...prev,
          answers1: newAnswers1,
          top10Themes: top10,
          phase2Questions,
          phase: 'transition',
          selectedAnswer: null,
        }));
        return;
      }
    } else if (state.phase === 'phase2') {
      const currentQuestion = state.phase2Questions[state.currentIndex];
      const theme = currentQuestion.theme;
      
      if (!newAnswers2[theme]) {
        newAnswers2[theme] = [];
      }
      newAnswers2[theme].push(state.selectedAnswer);

      if (state.currentIndex === state.phase2Questions.length - 1) {
        // Phase 2 complete, calculate final results
        const scoreBreakdowns = calculateFinalScores(newAnswers1, newAnswers2, state.top10Themes);
        const finalScores = scoreBreakdowns.slice(0, 5).map(breakdown => ({
          theme: breakdown.theme,
          score: breakdown.finalScore,
          description: state.descriptionsData!.themes[breakdown.theme],
        }));

        setState(prev => ({
          ...prev,
          answers2: newAnswers2,
          finalScores,
          phase: 'results',
          selectedAnswer: null,
        }));
        return;
      }
    }

    setState(prev => ({
      ...prev,
      answers1: newAnswers1,
      answers2: newAnswers2,
      currentIndex: prev.currentIndex + 1,
      selectedAnswer: null,
    }));
  };

  const previousQuestion = () => {
    if (state.currentIndex > 0) {
      const newIndex = state.currentIndex - 1;
      let previousAnswer: number | null = null;

      if (state.phase === 'phase1' && state.questionsData) {
        const previousQuestion = state.questionsData.phase1[newIndex];
        previousAnswer = state.answers1[previousQuestion.theme] ?? null;
      } else if (state.phase === 'phase2' && state.phase2Questions.length > 0) {
        const previousQuestion = state.phase2Questions[newIndex];
        const theme = previousQuestion.theme;
        const themeAnswers = state.answers2[theme] || [];
        
        // Count how many questions for this theme come before this index
        let questionIndexWithinTheme = 0;
        for (let i = 0; i < newIndex; i++) {
          if (state.phase2Questions[i].theme === theme) {
            questionIndexWithinTheme++;
          }
        }
        
        previousAnswer = themeAnswers[questionIndexWithinTheme] ?? null;
      }

      setState(prev => ({
        ...prev,
        currentIndex: newIndex,
        selectedAnswer: previousAnswer,
      }));
    }
  };

  const continueToPhase2 = () => {
    setState(prev => ({
      ...prev,
      phase: 'phase2',
      currentIndex: 0,
    }));
  };

  const restartAssessment = () => {
    setState(initialState);
    if (questionsData && descriptionsData) {
      setTimeout(() => {
        setState(prev => ({
          ...prev,
          questionsData,
          descriptionsData,
        }));
      }, 0);
    }
  };

  const getTotalAnswered = () => {
    if (state.phase === 'phase1') {
      return state.currentIndex;
    } else if (state.phase === 'phase2') {
      return 34 + state.currentIndex;
    } else if (state.phase === 'results') {
      return 54;
    }
    return 0;
  };

  const getCurrentQuestionNumber = () => {
    if (state.phase === 'phase1') {
      return state.currentIndex + 1;
    } else if (state.phase === 'phase2') {
      return 34 + state.currentIndex + 1;
    }
    return 1;
  };

  const getProgressPercentage = () => {
    return Math.round((getTotalAnswered() / 54) * 100);
  };

  const getCurrentQuestion = () => {
    if (state.phase === 'phase1' && state.questionsData) {
      return state.questionsData.phase1[state.currentIndex];
    }
    if (state.phase === 'phase2') {
      return state.phase2Questions[state.currentIndex];
    }
    return null;
  };

  return {
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
  };
}
