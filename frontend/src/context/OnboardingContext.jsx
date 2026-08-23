import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const OnboardingContext = createContext(null);

const STORAGE_KEY = "vidya_ai_onboarding";

const initialData = {
  classLevel: "",
  board: "",
  language: "",
  subjects: [],
  learningGoal: "",
  learningStyle: "",
  pace: "",
};

function loadSavedData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return initialData;
    }

    const parsed = JSON.parse(saved);

    return {
      ...initialData,
      ...parsed,
      subjects: Array.isArray(parsed.subjects)
        ? parsed.subjects
        : [],
    };
  } catch (error) {
    console.error("Failed to load onboarding data:", error);
    return initialData;
  }
}

export function OnboardingProvider({ children }) {
  const [data, setData] = useState(loadSavedData);

  /*
   * Save onboarding data whenever it changes.
   */
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(data)
      );
    } catch (error) {
      console.error(
        "Failed to save onboarding data:",
        error
      );
    }
  }, [data]);

  function updateData(updates) {
    setData((current) => ({
      ...current,
      ...updates,
    }));
  }

  function toggleSubject(subject) {
    setData((current) => {
      const currentSubjects = Array.isArray(current.subjects)
        ? current.subjects
        : [];

      const exists = currentSubjects.includes(subject);

      return {
        ...current,
        subjects: exists
          ? currentSubjects.filter(
              (item) => item !== subject
            )
          : [...currentSubjects, subject],
      };
    });
  }

  function resetOnboarding() {
    setData(initialData);

    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error(
        "Failed to clear onboarding data:",
        error
      );
    }
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
