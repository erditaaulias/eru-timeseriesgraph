export interface SuccessCheck {
  id: string;
  text: string;
  completed: boolean;
  stepNumber: number;
}

export interface GraphPart {
  id: string;
  name: string;
  role: string;
  explanation: string;
  cambridgeNote: string;
  x: number;
  y: number;
  indicatorX: number;
  indicatorY: number;
}

export interface ScenarioPoint {
  time: string;
  value: number;
  label?: string;
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  horizontalLabel: string;
  verticalLabel: string;
  unit: string;
  points: ScenarioPoint[];
  trendType: 'upward' | 'downward' | 'fluctuating';
  trendExplanation: string;
  keyQuestion: string;
  keyOptions: string[];
  correctOptionIndex: number;
  explanation: string;
}

export interface ExamQuestion {
  id: number;
  questionNumber: string;
  title: string;
  scenarioDescription: string;
  graphType: 'single' | 'dual';
  lines: {
    name: string;
    color: string;
    points: { label: string; value: number }[];
  }[];
  horizontalLabel: string;
  verticalLabel: string;
  unit: string;
  prompt: string;
  type: 'multiple-choice' | 'number-input' | 'trend-select';
  options?: string[];
  correctAnswer: string | number;
  tolerance?: number;
  hint: string;
  explanation: string;
  cambridgeTip: string;
}

export interface GlossaryTerm {
  term: string;
  definition: string;
  example: string;
  remember: string;
}
