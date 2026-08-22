
import { createContext, useContext, useMemo, useState } from "react";

const OnboardingContext = createContext(null);

const initialData = {
  classLevel: "",
  board: "",
  language: "",
  subjects: [],
  learningGoal: "",
  learningStyle: "",
  pace: "",
};

export function OnboardingProvider({ children }) {
  const [data, setData] = useState(initialData);

  function updateData(updates) {
    setData((current) => ({
      ...current,
      ...updates,
    }));
  }

  function toggleSubject(subject) {
    setData((current) => {
      const exists = current.subjects.includes(subject);

      return {
        ...current,
        subjects: exists
          ? current.subjects.filter((item) => item !== subject)
          : [...current.subjects, subject],
      };
    });
  }

  function resetOnboarding() {
    setData(initialData);
  }

  const value = useMemo(
    () => ({
      data,
      updateData,
      toggleSubject,
      resetOnboarding,
    }),
    [data]
  );

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);

  if (!context) {
    throw new Error(
      "useOnboarding must be used inside OnboardingProvider"
    );
  }

  return context;
      }
