export interface Question {
  theme: string;
  ko: string;
}

export interface QuestionsData {
  scale: number[];
  scaleLabels: Record<string, string>;
  phase1: Question[];
  phase2Bank: Record<string, string[]>;
  tieBreaker: {
    ko: string;
  };
}

export interface ThemeDescription {
  labelKo: string;
  domain: string;
  kidSpecific: string[];
  develop: string[];
  learn: string[];
  careers: string[];
}

export interface DomainDescription {
  kidCommon: string[];
  develop: string[];
  learn: string[];
  careers: string[];
}

export interface DescriptionsData {
  domains: Record<string, DomainDescription>;
  themes: Record<string, ThemeDescription>;
}

export interface AssessmentState {
  phase: 'welcome' | 'phase1' | 'transition' | 'phase2' | 'results';
  currentIndex: number;
  answers1: Record<string, number>;
  answers2: Record<string, number[]>;
  top10Themes: string[];
  phase2Questions: Question[];
  finalScores: Array<{
    theme: string;
    score: number;
    description: ThemeDescription;
  }>;
  selectedAnswer: number | null;
  questionsData: QuestionsData | null;
  descriptionsData: DescriptionsData | null;
}

export interface ScoreBreakdown {
  theme: string;
  phase1Score: number;
  phase2Score: number;
  consistencyBonus: number;
  finalScore: number;
  count3Phase1: number;
  count3Phase2: number;
}
