import React from "react";

const languages = [
  {
    value: "english",
    label: "English",
  },
  {
    value: "hindi",
    label: "हिन्दी",
  },
  {
    value: "kannada",
    label: "ಕನ್ನಡ",
  },
  {
    value: "urdu",
    label: "اردو",
  },
];

function LanguageSelector({
  value,
  onChange,
}) {
  return (
    <div className="language-selector">
      {languages.map((language) => (
        <button
          key={language.value}
          type="button"
          className={
            value === language.value
              ? "language-option language-option-selected"
              : "language-option"
          }
          onClick={() =>
            onChange(language.value)
          }
        >
          {language.label}
        </button>
      ))}
    </div>
  );
}

export default LanguageSelector;
