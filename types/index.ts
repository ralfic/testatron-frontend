export interface IUser {
  email: string;
  fullName: string;
  id: string;
}

export interface ITest {
  id: number;
  code?: string;
  isExpired: boolean;
  expiresAt?: Date;
  title: string;
  isPublished: boolean;
  showCorrectAnswers: boolean;
  showOptionsScore: boolean;
  description: string | null;
  questions?: IQuestion[];
}

export interface IQuestion {
  id: number | string;
  type: QuestionType;
  description: string | null;
  isRequired: boolean;
  text: string;
  testId: number;
  score: number;
  options?: IOption[];
}

export interface IOption {
  id: number | string;
  text: string;
  questionId: number | string;
  isCorrect: boolean;
}

export interface ITestUpdate extends Omit<ITest, 'questions'> {
  questions?: IQuestionUpdate[];
}
export interface IQuestionUpdate extends Omit<IQuestion, 'options' | 'id'> {
  id: number | undefined;
  options?: IOptionUpdate[];
}

export interface IOptionUpdate extends Omit<IOption, 'id' | 'questionId'> {
  id: number | undefined;
  questionId: number | undefined;
}

export enum QuestionType {
  MULTIPLE = 'MULTIPLE',
  SINGLE = 'SINGLE',
}
