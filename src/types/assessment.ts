export type Question = {
    _id: string;
    question: string;
    options: string[];
    answer: string;
    level: string;
    competency: string;
    createdBy: string;
    createdAt: string;
};

export type Answer = {
    questionId: string;
    value: string;
};

