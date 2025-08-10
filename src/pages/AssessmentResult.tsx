import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Award,
  CheckCircle,
  XCircle,
  ArrowRight,
  Download,
  Home,
} from "lucide-react";

const AssessmentResultsPage = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const stepParam = params.get("step") || "1";
  const step = Number.parseInt(stepParam, 10) || 1;
  const score = Number.parseFloat(params.get("score") || "0");
  const level = params.get("level") || "";
  const canProceed = params.get("canProceed") === "true";

  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (score >= 25) {
      setShowConfetti(true);
      const t = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(t);
    }
  }, [score]);

  const result = useMemo(() => {
    if (score < 25) {
      return {
        title: "Assessment Not Passed",
        message:
          "Unfortunately, you did not meet the minimum requirements. You cannot retake this assessment.",
        color: "text-red-600",
        icon: <XCircle className="h-12 w-12 text-red-500" />,
      };
    }
    if (score >= 75 && canProceed) {
      return {
        title: "Excellent Performance!",
        message: `Congratulations! You've achieved ${level} certification and can proceed to the next step.`,
        color: "text-green-600",
        icon: <CheckCircle className="h-12 w-12 text-green-500" />,
      };
    }
    return {
      title: "Certification Achieved!",
      message: `Congratulations! You've achieved ${level} certification.`,
      color: "text-blue-600",
      icon: <Award className="h-12 w-12 text-blue-500" />,
    };
  }, [score, canProceed, level]);

  const isFailed = score < 25 || level === "Failed" || level === "Fail";

  const getScoreColor = () => {
    if (score < 25) return "text-red-600";
    if (score < 50) return "text-orange-600";
    if (score < 75) return "text-yellow-600";
    return "text-green-600";
  };

  // Reserved for potential future use

  const handleNextStep = () => {
    const nextStep = step + 1;
    navigate(`/assessment?step=${nextStep}`);
  };

  const handleDownloadCertificate = () => {
    navigate("/certificate");
  };

  const handleBackToDashboard = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="absolute top-0 left-1/2 -translate-x-1/2">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-bounce"
                style={{
                  left: `${Math.random() * 100}px`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        </div>
      )}

      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center mb-4">{result.icon}</div>
          <CardTitle className={`text-3xl ${result.color}`}>
            {result.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className={`text-6xl font-bold ${getScoreColor()}`}>
              {Math.round(score)}%
            </div>
            <p className="text-gray-600 mt-2">Your Score</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-lg">{result.message}</p>
          </div>

          {!isFailed && level && (
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">
                Certification Level Achieved
              </p>
              <span className="inline-flex items-center text-2xl px-6 py-2 rounded-md bg-blue-600 text-white">
                Level {level}
              </span>
            </div>
          )}

          {!isFailed && (
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  Step {step}
                </div>
                <p className="text-sm text-gray-600">Assessment Completed</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {level || "None"}
                </div>
                <p className="text-sm text-gray-600">Certification Level</p>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {canProceed && (
              <Button onClick={handleNextStep} className="w-full" size="lg">
                <ArrowRight className="h-5 w-5 mr-2" />
                Proceed to Next Step
              </Button>
            )}

            {!isFailed && level && (
              <Button
                onClick={handleDownloadCertificate}
                variant="outline"
                className="w-full bg-transparent"
                size="lg"
              >
                <Download className="h-5 w-5 mr-2" />
                Download Certificate
              </Button>
            )}

            <Button
              onClick={handleBackToDashboard}
              variant="outline"
              className="w-full bg-transparent"
              size="lg"
            >
              <Home className="h-5 w-5 mr-2" />
              Back to Dashboard
            </Button>

            {isFailed && (
              <Button
                onClick={() => navigate(`/assessment?step=${step}`)}
                className="w-full"
                size="lg"
              >
                Retake Assessment
              </Button>
            )}
          </div>

          {!canProceed && !isFailed && (
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-semibold text-yellow-800 mb-2">
                What's Next?
              </h4>
              <p className="text-sm text-yellow-700">
                You've achieved {level} certification! While you cannot proceed
                to the next assessment step, you can download your certificate
                and continue learning to improve your skills.
              </p>
            </div>
          )}

          {isFailed && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <h4 className="font-semibold text-red-800 mb-2">
                Assessment Policy
              </h4>
              <p className="text-sm text-red-700">
                As per our assessment policy, retakes are not allowed for scores
                below 25%. We recommend additional study and preparation before
                attempting future assessments.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AssessmentResultsPage;
