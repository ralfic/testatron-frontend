import { IOption, IQuestion, ITest, ITestUpdate, QuestionType } from '@/types';
import { create } from 'zustand';

let tempIdCounter = 0;

const generateTempId = () => {
  return `temp-${tempIdCounter++}`;
};

interface TestStore {
  test: ITest | null;
  updateTestStore: (data: Partial<ITest>) => void;
  setTest: (test: ITest | null) => void;
  addQuestion: () => void;
  addOption: (questionId: number | string) => void;
  updateQuestion: (
    questionId: number | string,
    data: Partial<IQuestion>
  ) => void;
  updateOption: (
    questionId: number | string,
    optionId: number | string,
    data: Partial<IOption>
  ) => void;
  deleteQuestion: (questionId: number | string) => void;
  deleteOption: (
    questionId: number | string,
    optionId: number | string
  ) => void;
  clearStore: () => void;
}

export const useTestStore = create<TestStore>((set) => ({
  test: null,
  setTest: (test) => set({ test }),
  updateTestStore: (data: Partial<ITest>) =>
    set((state) => ({
      test: state.test ? { ...state.test, ...data } : null,
    })),
  addQuestion: () => {
    const questionId = generateTempId();
    set((state) => ({
      test: state.test
        ? {
            ...state.test,
            questions: [
              ...(state.test.questions ?? []),
              {
                id: questionId,
                type: QuestionType.SINGLE,
                description: null,
                isRequired: false,
                score: 3,
                text: 'New question',
                options: [
                  {
                    id: generateTempId(),
                    text: 'Option 1',
                    questionId: questionId,
                    isCorrect: false,
                  },
                  {
                    id: generateTempId(),
                    text: 'Option 2',
                    questionId: questionId,
                    isCorrect: false,
                  },
                ],
                testId: state.test.id,
              },
            ],
          }
        : null,
    }));
  },
  addOption: (questionId) => {
    set((state) => ({
      test: state.test
        ? {
            ...state.test,
            questions: state.test.questions?.map((question) => ({
              ...question,
              options:
                question.id === questionId
                  ? [
                      ...(question.options ?? []),
                      {
                        id: generateTempId(),
                        text: 'New option',
                        questionId,
                        isCorrect: false,
                      },
                    ]
                  : question.options,
            })),
          }
        : null,
    }));
  },
  updateQuestion: (questionId, data) => {
    set((state) => ({
      test: state.test
        ? {
            ...state.test,
            questions: state.test.questions?.map((question) => ({
              ...question,
              ...(question.id === questionId ? data : {}),
            })),
          }
        : null,
    }));
  },
  updateOption: (questionId, optionId, data) => {
    set((state) => ({
      test: state.test
        ? {
            ...state.test,
            questions: state.test.questions?.map((question) => ({
              ...question,
              ...(question.id === questionId
                ? {
                    options: question.options?.map((option) => ({
                      ...option,
                      ...(option.id === optionId ? data : {}),
                    })),
                  }
                : {}),
            })),
          }
        : null,
    }));
  },
  deleteQuestion: (questionId) => {
    set((state) => ({
      test: state.test
        ? {
            ...state.test,
            questions: state.test.questions?.filter(
              (question) => question.id !== questionId
            ),
          }
        : null,
    }));
  },
  deleteOption: (questionId, optionId) => {
    set((state) => ({
      test: state.test
        ? {
            ...state.test,
            questions: state.test.questions?.map((question) => ({
              ...question,
              ...(question.id === questionId
                ? {
                    options: question.options?.filter(
                      (option) => option.id !== optionId
                    ),
                  }
                : {}),
            })),
          }
        : null,
    }));
  },
  clearStore: () => set({ test: null }),
}));

export const prepareDataForBackend = (test: ITest): ITestUpdate => {
  return {
    ...test,
    questions: test.questions?.map((question) => ({
      ...question,
      testId: test.id,
      id: question.id?.toString().startsWith('temp-')
        ? undefined
        : Number(question.id),
      options: question.options?.map((option) => ({
        ...option,
        id: option.id?.toString().startsWith('temp-')
          ? undefined
          : Number(option.id),
        questionId: option.questionId?.toString().startsWith('temp-')
          ? undefined
          : Number(option.questionId),
      })),
    })),
  };
};
