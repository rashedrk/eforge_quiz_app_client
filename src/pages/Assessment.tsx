import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetQuestionsByStepQuery } from "@/redux/features/question/questionApi";
import type { Question } from "@/types/assessment";
import { Clock, Loader2 } from "lucide-react";
import QuestionCard from "@/components/question/QuestionCard";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";
import { useCreateCertificateMutation } from "@/redux/features/certificate/certificateApi";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";

const formatTime = (totalSeconds: number) =>
  dayjs().startOf("day").add(totalSeconds, "second").format("mm:ss");

const Assessment = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const step = Number(params.get("step") || 1);
  const { data, isLoading } = useGetQuestionsByStepQuery(step);
  const user = useAppSelector(selectCurrentUser);
  const [createCertificate] = useCreateCertificateMutation();

  const questions = useMemo<Question[]>(() => data?.data || [], [data]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);

  // Initialize/reset timer and answers when step or questions change
  useEffect(() => {
    if (questions.length > 0) {
      setTimeLeft(questions.length * 60);
      setAnswers({});
      setTimerStarted(true);
    }
  }, [step, questions.length]);

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = async () => {
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
    const scorePercent =
      questions.length > 0 ? (totalCorrect / questions.length) * 100 : 0;
    console.log(
      "Total correct:",
      totalCorrect,
      "Score %:",
      scorePercent.toFixed(2)
    );

    let levelAchieved = "";
    let proceedMessage = "";
    if (step === 1) {
      if (scorePercent < 25) {
        levelAchieved = "Fail"; // no retake allowed
      } else if (scorePercent < 50) {
        levelAchieved = "A1";
      } else if (scorePercent < 75) {
        levelAchieved = "A2";
      } else {
        levelAchieved = "A2";
        proceedMessage = "Proceed to Step 2";
      }
    } else if (step === 2) {
      if (scorePercent < 25) {
        levelAchieved = "A2"; // remain at A2
      } else if (scorePercent < 50) {
        levelAchieved = "B1";
      } else if (scorePercent < 75) {
        levelAchieved = "B2";
      } else {
        levelAchieved = "B2";
        proceedMessage = "Proceed to Step 3";
      }
    } else {
      // step 3
      if (scorePercent < 25) {
        levelAchieved = "B2"; // remain at B2
      } else if (scorePercent < 50) {
        levelAchieved = "C1";
      } else {
        levelAchieved = "C2";
      }
    }

    // Call certificate API if user exists and a level is determined (ignore Fail)
    if (user?.id && levelAchieved && levelAchieved !== "Fail") {
      try {
        await createCertificate({
          userId: user.id,
          levelAchieved,
          score: Number(scorePercent.toFixed(2)),
        }).unwrap();
        console.log("Certificate created for", user.id, levelAchieved);
      } catch (err) {
        console.error("Certificate creation failed", err);
      }
    }

    const canProceed = proceedMessage !== "";
    const resultParams = new URLSearchParams({
      step: String(step),
      score: scorePercent.toFixed(2),
      level: levelAchieved || "Failed",
      canProceed: String(canProceed),
    });
    // Navigate to result page without full reload to preserve auth state
    navigate(`/assessment/result?${resultParams.toString()}`);
  };

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (timerStarted && timeLeft === 0 && questions.length > 0) {
      handleSubmit();
    }
  }, [timeLeft, timerStarted, questions.length]);

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
