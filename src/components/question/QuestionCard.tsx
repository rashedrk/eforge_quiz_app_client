import type { Question } from "@/types/assessment";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

const QuestionCard = ({
  question,
  index,
  value,
  onChange,
}: {
  question: Question;
  index: number;
  value: string;
  onChange: (value: string) => void;
}) => {
  return (
    <div className="max-w-4xl mx-auto mb-4">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>
              {index + 1}. {question.question}
            </CardTitle>
            <div className="text-sm text-gray-600">
              {question.competency} - Level {question.level}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <RadioGroup
              value={value}
              onValueChange={onChange}
              className="space-y-3"
            >
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={optionIndex.toString()}
                    id={`option-${question._id}-${optionIndex}`}
                  />
                  <Label
                    htmlFor={`option-${question._id}-${optionIndex}`}
                    className="flex-1 cursor-pointer"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuestionCard;
