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
  status: TestStatus;
  showCorrectAnswers: boolean;
  showQuestionScore: boolean;
  description: string | null;
  questions?: IQuestion[];
  createdAt: Date;
}

export type ITestPublish = Pick<
  ITest,
  'expiresAt' | 'showCorrectAnswers' | 'showQuestionScore'
>;

export interface IQuestion {
  id: number;
  type: QuestionType;
  description: string | null;
  text: string;
  testId: number;
  score: number;
  options?: IOption[];
}

export interface IOption {
  id: number;
  text: string;
  questionId: number;
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

export interface IQuestionCreate
  extends Omit<IQuestion, 'id' | 'testId' | 'options'> {
  options?: IOptionCreate[];
}

export type IOptionCreate = Omit<IOption, 'id' | 'questionId'>;

export enum QuestionType {
  MULTIPLE = 'MULTIPLE',
  SINGLE = 'SINGLE',
}

export enum TestStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  EXPIRED = 'EXPIRED',
}
