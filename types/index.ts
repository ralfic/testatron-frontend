export interface IUser {
  email: string;
  fullName: string;
  id: string;
  role: UserRole;
}

export enum UserRole {
  ADMIN = 'ADMIN',
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT',
}

export interface ITest {
  id: number;
  code?: string;
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

export type ITestUpdateInfo = Partial<
  Pick<
    Omit<ITest, 'questions'>,
    | 'title'
    | 'description'
    | 'expiresAt'
    | 'showCorrectAnswers'
    | 'showQuestionScore'
  >
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

export interface IAnswer {
  testSessionId: number;
  questionId: number;
  selectedOptions?: IOption[];
  id: number;
  score: number;
  status: AnswerStatus;
}

interface IAnswerResult extends IAnswer {
  status: AnswerStatus;
  score: number;
}

export interface ITestSession {
  id: number;
  status: TestSessionStatus;
  guestName: string | null;
  createdAt: Date;
  updatedAt: Date;
  testId: number;
  uuid: string;
  userId: number | null;
  test: Pick<ITest, 'questions' | 'code'>;
  endedAt?: Date;
  answers: IAnswer[];
}

interface ITestSessionWithResult
  extends Omit<ITestSession, 'answers' | 'test'> {
  completedAt: string | number | Date;
  answers: IAnswerResult[];
  test: ITest;
}

export interface ITestResult {
  id: number;
  testSession: ITestSessionWithResult;
  score: number;
  countCorrect: number;
  countWrong: number;
  countAlmostCorrect: number;
  countSkipped: number;
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

export enum TestSessionStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  FINISHED = 'FINISHED',
}

export enum AnswerStatus {
  CORRECT = 'CORRECT',
  INCORRECT = 'INCORRECT',
  ALMOST_CORRECT = 'ALMOST_CORRECT',
  SKIPPED = 'SKIPPED',
}
