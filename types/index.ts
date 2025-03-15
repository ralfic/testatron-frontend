export interface IUser {
  email: string;
  fullName: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface ITest {
  id: number;
  title: string;
  description: string | null;
  isGraduate: boolean;
  questions?: IQuestion[];
}

export interface IQuestion {
  id: number | string;
  type: QuestionType;
  description: string | null;
  isRequired: boolean;
  text: string;
  testId: number;
  options?: IOption[];
}

export interface IOption {
  id: number | string;
  text: string;
  questionId: number | string;
  isCorrect: boolean;
}

export interface ITestUpdate {
  id: number;
  title: string;
  description: string | null;
  isGraduate: boolean;
  questions?: IQuestionUpdate[];
}

interface IQuestionUpdate {
  id: number | undefined;
  testId: number;
  type: QuestionType;
  description: string | null;
  isRequired: boolean;
  text: string;
  options?: IOptionUpdate[];
}

interface IOptionUpdate {
  questionId: number | undefined;
  id: number | undefined;
  text: string;
  isCorrect: boolean;
}

export enum QuestionType {
  TEXT = 'TEXT',
  MULTIPLE = 'MULTIPLE',
  SINGLE = 'SINGLE',
}
