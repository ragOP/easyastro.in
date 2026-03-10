'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, ChevronLeft } from "lucide-react";
import FloatingElements from "@/components/quiz/FloatingElements";

interface QuizQuestion {
  id: string;
  question: string;
  options: { value: string; label: string; emoji?: string }[];
  type: "single" | "date";
}

const questions: QuizQuestion[] = [
  {
    id: "gender",
    question: "What's your gender?",
    options: [
      { value: "male", label: "Male", emoji: "👨" },
      { value: "female", label: "Female", emoji: "👩" },
      { value: "other", label: "Prefer not to say", emoji: "✨" },
    ],
    type: "single",
  },
  {
    id: "birthdate",
    question: "When were you born?",
    options: [],
    type: "date",
  },
  {
    id: "status",
    question: "What's your current relationship status?",
    options: [
      { value: "single", label: "Single", emoji: "💫" },
      { value: "healing", label: "Healing from past", emoji: "🌱" },
      { value: "confused", label: "Emotionally confused", emoji: "💭" },
      { value: "waiting", label: 'Waiting for "the one"', emoji: "🌟" },
    ],
    type: "single",
  },
  {
    id: "attraction",
    question: "What attracts you most in a partner?",
    options: [
      { value: "emotional", label: "Emotional depth", emoji: "💝" },
      { value: "physical", label: "Physical presence", emoji: "✨" },
      { value: "stability", label: "Stability & safety", emoji: "🏡" },
      { value: "mystery", label: "Mystery & intensity", emoji: "🔮" },
    ],
    type: "single",
  },
  {
    id: "craving",
    question: "What do you crave most right now?",
    options: [
      { value: "love", label: "Love", emoji: "❤️" },
      { value: "closure", label: "Closure", emoji: "🕊️" },
      { value: "clarity", label: "Clarity", emoji: "💎" },
      { value: "connection", label: "Connection", emoji: "🤝" },
    ],
    type: "single",
  },
  {
    id: "feeling",
    question: "When you imagine your soulmate, you feel…",
    options: [
      { value: "calm", label: "Calm", emoji: "🌊" },
      { value: "curious", label: "Curious", emoji: "🦋" },
      { value: "nervous", label: "Nervous", emoji: "💓" },
      { value: "excited", label: "Excited", emoji: "⚡" },
    ],
    type: "single",
  },
];

const loadingMessages = [
  "Reading your emotional patterns…",
  "Aligning astrological energy…",
  "Visualizing soulmate traits…",
  "Connecting cosmic signatures…",
];

const Quiz = () => {
 const router = useRouter();
  const [currentStep, setCurrentStep] = useState(-1);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [loadingIndex, setLoadingIndex] = useState(0);
  const [birthDate, setBirthDate] = useState({ month: "", day: "", year: "" });

  const progress = ((currentStep + 1) / questions.length) * 100;
  const currentQuestion = questions[currentStep];
  const isIntro = currentStep === -1;

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setLoadingIndex((prev) => (prev + 1) % loadingMessages.length);
      }, 2000);
      
      const timeout = setTimeout(() => {
        localStorage.setItem("quizAnswers", JSON.stringify(answers));
       router.push("/myquiz/quiz-checkout");
      }, 6000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [isLoading, answers, router]);

  const handleStart = () => {
    setCurrentStep(0);
  };

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);

    if (currentStep < questions.length - 1) {
      setTimeout(() => setCurrentStep(currentStep + 1), 300);
    } else {
      setIsLoading(true);
    }
  };

  const handleDateSubmit = () => {
    if (birthDate.month && birthDate.day && birthDate.year) {
      const dateString = `${birthDate.year}-${birthDate.month}-${birthDate.day}`;
      handleAnswer(dateString);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else if (currentStep === 0) {
      setCurrentStep(-1);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen gradient-hero flex items-center justify-center relative overflow-hidden">
        <FloatingElements />
        <Helmet>
          <title>Analyzing Your Energy | Soulmate Sketch</title>
        </Helmet>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center relative z-10 px-4"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="w-24 h-24 mx-auto mb-8 rounded-full gradient-primary flex items-center justify-center shadow-glow"
          >
            <Sparkles className="w-12 h-12 text-primary-foreground" />
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.p
              key={loadingIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-lg md:text-xl text-foreground/80 mb-4"
            >
              {loadingMessages[loadingIndex]}
            </motion.p>
          </AnimatePresence>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="font-serif text-2xl md:text-3xl font-medium text-foreground"
          >
            Your soulmate's sketch is forming…
          </motion.h2>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-hero flex flex-col relative overflow-hidden">
      <FloatingElements />
      <Helmet>
        <title>Soulmate Quiz | Soulmate Sketch</title>
        <meta name="description" content="Take our intuitive quiz to reveal your soulmate's energy signature and appearance." />
      </Helmet>

      {/* Header */}
      <div className="relative z-10 p-4 md:p-6">
        {currentStep >= 0 && (
          <div className="max-w-xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={handleBack}
                className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
                <span className="text-sm">Back</span>
              </button>
              <span className="text-sm text-muted-foreground">
                {currentStep + 1} of {questions.length}
              </span>
            </div>
            
            {/* Progress bar */}
            <div className="h-2 bg-primary/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full gradient-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-4 relative z-10">
        <AnimatePresence mode="wait">
          {isIntro || currentStep === -1 ? (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-lg mx-auto text-center px-4"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl gradient-primary flex items-center justify-center shadow-button">
                <Sparkles className="w-10 h-10 text-primary-foreground" />
              </div>

              <h1 className="font-serif text-3xl md:text-4xl font-medium mb-3">
                Let's Begin Your Journey
              </h1>
              <p className="text-muted-foreground text-base md:text-lg mb-6">
                This quiz helps us tune into your soulmate's energy signature.
              </p>

              {/* What to expect */}
              <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-5 mb-6 border border-border/50 text-left">
                <h3 className="font-semibold text-foreground text-sm mb-3 text-center">What to Expect</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-semibold text-primary">1</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      <span className="text-foreground font-medium">6 simple questions</span> about your emotions and desires
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-semibold text-primary">2</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      <span className="text-foreground font-medium">Takes less than 2 minutes</span> to complete
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-semibold text-primary">3</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      <span className="text-foreground font-medium">100% personalized</span> based on your unique energy
                    </p>
                  </div>
                </div>
              </div>

              {/* Trust indicators */}
              <div className="flex justify-center gap-4 text-xs text-muted-foreground mb-6">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-coral" />
                  Private & Secure
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  No signup required
                </span>
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button variant="hero" size="xl" onClick={handleStart} className="w-full max-w-xs">
                  <motion.span
                    className="flex items-center gap-2"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: [1, 0.8, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Begin Quiz
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </motion.span>
                </Button>
              </motion.div>
              
              <p className="text-xs text-muted-foreground mt-4">
                ✨ Your answers are kept confidential
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="max-w-lg mx-auto w-full"
            >
              <motion.h2 
                className="font-serif text-2xl md:text-3xl font-medium text-center mb-8"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {currentQuestion.question}
              </motion.h2>

              {currentQuestion.type === "date" ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm text-muted-foreground mb-2">Month</label>
                      <select
                        value={birthDate.month}
                        onChange={(e) => setBirthDate({ ...birthDate, month: e.target.value })}
                        className="w-full h-14 rounded-xl bg-card border border-border px-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      >
                        <option value="">MM</option>
                        {Array.from({ length: 12 }, (_, i) => (
                          <option key={i + 1} value={String(i + 1).padStart(2, "0")}>
                            {String(i + 1).padStart(2, "0")}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-muted-foreground mb-2">Day</label>
                      <select
                        value={birthDate.day}
                        onChange={(e) => setBirthDate({ ...birthDate, day: e.target.value })}
                        className="w-full h-14 rounded-xl bg-card border border-border px-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      >
                        <option value="">DD</option>
                        {Array.from({ length: 31 }, (_, i) => (
                          <option key={i + 1} value={String(i + 1).padStart(2, "0")}>
                            {String(i + 1).padStart(2, "0")}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-muted-foreground mb-2">Year</label>
                      <select
                        value={birthDate.year}
                        onChange={(e) => setBirthDate({ ...birthDate, year: e.target.value })}
                        className="w-full h-14 rounded-xl bg-card border border-border px-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      >
                        <option value="">YYYY</option>
                        {Array.from({ length: 80 }, (_, i) => (
                          <option key={2006 - i} value={String(2006 - i)}>
                            {2006 - i}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <Button
                    variant="hero"
                    size="lg"
                    onClick={handleDateSubmit}
                    disabled={!birthDate.month || !birthDate.day || !birthDate.year}
                    className="w-full"
                  >
                    Continue
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {currentQuestion.options.map((option, index) => (
                    <motion.div
                      key={option.value}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        <Card
                          variant="elevated"
                          className={`p-5 cursor-pointer transition-all duration-200 ${
                            answers[currentQuestion.id] === option.value
                              ? "ring-2 ring-primary shadow-glow"
                              : "hover:shadow-lg"
                          }`}
                          onClick={() => handleAnswer(option.value)}
                        >
                          <div className="flex items-center gap-4">
                            <motion.span 
                              className="text-2xl"
                              animate={{ rotate: answers[currentQuestion.id] === option.value ? [0, -10, 10, 0] : 0 }}
                              transition={{ duration: 0.4 }}
                            >
                              {option.emoji}
                            </motion.span>
                            <span className="text-lg font-medium text-foreground">
                              {option.label}
                            </span>
                          </div>
                        </Card>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Quiz;
