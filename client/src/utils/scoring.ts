import { ScoreBreakdown } from '@/types/assessment';

const WEIGHT_PHASE2 = 1.5;
const CONSISTENCY_BONUS_MULTIPLIER = 0.2;
const MAX_CONSISTENCY_BONUS = 0.4;

export function calculateTop10Themes(
  answers1: Record<string, number>,
  phase1Questions: any[]
): string[] {
  // Calculate scores for each theme
  const themeScores: Array<{ theme: string; score: number; count3: number }> = [];
  
  phase1Questions.forEach((question) => {
    const score = answers1[question.theme] || 0;
    const count3 = score === 3 ? 1 : 0;
    
    themeScores.push({
      theme: question.theme,
      score,
      count3
    });
  });

  // Sort by score first, then by 3-point frequency for tie-breaking
  themeScores.sort((a, b) => {
    if (a.score !== b.score) {
      return b.score - a.score; // Higher score first
    }
    return b.count3 - a.count3; // More 3-point answers first
  });

  return themeScores.slice(0, 10).map(item => item.theme);
}

export function calculateFinalScores(
  answers1: Record<string, number>,
  answers2: Record<string, number[]>,
  top10Themes: string[]
): ScoreBreakdown[] {
  const scoreBreakdowns: ScoreBreakdown[] = [];

  top10Themes.forEach((theme) => {
    const phase1Score = answers1[theme] || 0;
    const phase2Answers = answers2[theme] || [];
    const phase2Score = phase2Answers.reduce((sum, score) => sum + score, 0);
    
    const count3Phase1 = phase1Score === 3 ? 1 : 0;
    const count3Phase2 = phase2Answers.filter(score => score === 3).length;
    
    const consistencyBonus = Math.min(
      MAX_CONSISTENCY_BONUS,
      CONSISTENCY_BONUS_MULTIPLIER * count3Phase2
    );
    
    const finalScore = phase1Score + (WEIGHT_PHASE2 * phase2Score) + consistencyBonus;
    
    scoreBreakdowns.push({
      theme,
      phase1Score,
      phase2Score,
      consistencyBonus,
      finalScore,
      count3Phase1,
      count3Phase2
    });
  });

  // Sort by final score, then by phase2 score, then by total 3-point frequency
  scoreBreakdowns.sort((a, b) => {
    if (a.finalScore !== b.finalScore) {
      return b.finalScore - a.finalScore;
    }
    if (a.phase2Score !== b.phase2Score) {
      return b.phase2Score - a.phase2Score;
    }
    return (b.count3Phase1 + b.count3Phase2) - (a.count3Phase1 + a.count3Phase2);
  });

  return scoreBreakdowns;
}

export function generatePhase2Questions(
  top10Themes: string[],
  phase2Bank: Record<string, string[]>
): Array<{ theme: string; ko: string }> {
  const questions: Array<{ theme: string; ko: string }> = [];
  
  top10Themes.forEach((theme) => {
    const themeQuestions = phase2Bank[theme] || [];
    themeQuestions.forEach((questionText) => {
      questions.push({
        theme,
        ko: questionText
      });
    });
  });

  return questions;
}
