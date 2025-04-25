'use client';
import { ITestSession } from '@/types';
import { TestingHeader } from './header/TestingHeader';
import { Container } from '../../Container';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { TestingQuestion } from './question/TestingQuestion';
import { RadioGroup } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';

export function TestingQuestions({ data }: { data: ITestSession }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  return (
    <div>
      <TestingHeader data={data} />
      <Container className=" mt-4">
        <div className="bg-white rounded-md p-2 mx-auto max-w-[600px] flex gap-2  w-fit ">
          {data.test.questions?.map((question, i) => (
            <Button
              className={cn('w-8 h-8 bg-muted', {
                'bg-primary text-white': i === currentQuestion,
                'bg-secondary':
                  !!data.answers?.find(
                    (answer) => answer.questionId === question.id
                  ) && i !== currentQuestion,
              })}
              key={i}
              variant="ghost"
              size={'icon'}
              type="button"
              onClick={() => setCurrentQuestion(i)}
            >
              {i + 1}
            </Button>
          ))}
        </div>
        <div className="bg-card mt-4 p-6 mx-auto max-w-[600px] flex flex-col rounded-md">
          <RadioGroup>
            {data.test.questions?.map((question, i) => {
              if (i === currentQuestion) {
                return (
                  <TestingQuestion
                    key={question.id}
                    question={question}
                    totalScore={data.test.questions?.reduce(
                      (acc, question) => acc + question.score,
                      0
                    )}
                    answer={data.answers.find(
                      (answer) => answer.questionId === question.id
                    )}
                    testSessionId={data.id}
                    testSessionUuid={data.uuid}
                    setCurrentQuestion={() => {
                      if (i < (data.test.questions?.length ?? 0) - 1) {
                        setCurrentQuestion(i + 1);
                      }
                    }}
                  />
                );
              }
            })}
          </RadioGroup>
        </div>
      </Container>
    </div>
  );
}
