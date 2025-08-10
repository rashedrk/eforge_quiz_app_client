import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetQuestionsByStepQuery } from "@/redux/features/question/questionApi";
import type { Question } from "@/types/assessment";
import { Clock, Loader2 } from "lucide-react";
import QuestionCard from "@/components/question/QuestionCard";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";

const formatTime = (totalSeconds: number) =>
  dayjs().startOf("day").add(totalSeconds, "second").format("mm:ss");

const Assessment = () => {
  const [params] = useSearchParams();
  const step = Number(params.get("step") || 1);
  const { data, isLoading } = useGetQuestionsByStepQuery(step);

  const questions = useMemo<Question[]>(() => data?.data || [], [data]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(0);

  // Initialize/reset timer and answers when step or questions change
  useEffect(() => {
    if (questions.length > 0) {
      setTimeLeft(questions.length * 60);
      setAnswers({});
    }
  }, [step, questions.length]);

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = () => {
    // Compare selected option TEXT with question.answer TEXT
    const totalCorrect = questions.reduce((count, q) => {
      const selectedIndexString = answers[q._id];
      if (selectedIndexString == null || selectedIndexString === "")
        return count;
      const selectedIndex = Number.parseInt(selectedIndexString, 10);
      if (
        Number.isNaN(selectedIndex) ||
        selectedIndex < 0 ||
        selectedIndex >= q.options.length
      )
        return count;
      const selectedText = q.options[selectedIndex];
      return count + (selectedText === q.answer ? 1 : 0);
    }, 0);
    console.log("Total correct:", totalCorrect);
  };

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      handleSubmit();
    }
  }, [timeLeft]);

  return (
    <div className="min-h-screen bg-gray-50 ">
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <>
          <header className="bg-white border-b">
            <div className="container mx-auto max-w-4xl px-4 py-4">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-bold">Step {step} Assessment</h1>
                  <p className="text-gray-600">
                    {step === 1
                      ? "Foundation Level (A1 & A2)"
                      : step === 2
                      ? "Intermediate Level (B1 & B2)"
                      : step === 3
                      ? "Advanced Level (C1 & C2)"
                      : ""}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 text-lg font-mono">
                    <Clock className="h-5 w-5" />
                    <span
                      className={
                        timeLeft <= 300 ? "text-red-600" : "text-gray-700"
                      }
                    >
                      {formatTime(timeLeft)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <div className="container mx-auto px-4 py-8">
            {questions.map((question, index) => (
              <QuestionCard
                key={question._id}
                question={question}
                index={index}
                value={answers[question._id] ?? ""}
                onChange={(val) => handleAnswerChange(question._id, val)}
              />
            ))}

            {questions.length > 0 && (
              <div className="max-w-sm mx-auto mt-6">
                <Button onClick={handleSubmit} className="w-full">
                  Submit
                </Button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Assessment;
