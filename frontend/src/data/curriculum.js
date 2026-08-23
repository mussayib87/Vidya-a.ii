// frontend/src/data/curriculum.js

/*
=========================================================
VIDYA AI - CURRICULUM DATA
=========================================================

Structure:

Class
  ↓
Board
  ↓
Subject
  ↓
Language
  ↓
Chapters
  ↓
Topics
=========================================================
*/

const curriculum = {
  "10": {
    "Karnataka State Board": {
      Mathematics: {
        Kannada: [
          {
            id: "real-numbers",
            title: "ವಾಸ್ತವ ಸಂಖ್ಯೆಗಳು",
            englishTitle: "Real Numbers",
            topics: [
              {
                id: "euclids-division",
                title: "ಯೂಕ್ಲಿಡ್ ಭಾಗಾಕಾರ ಅಲ್ಗಾರಿದಮ್",
                englishTitle: "Euclid's Division Algorithm",
              },
              {
                id: "fundamental-theorem",
                title: "ಅಂಕಗಣಿತದ ಮೂಲ ಪ್ರಮೇಯ",
                englishTitle: "Fundamental Theorem of Arithmetic",
              },
              {
                id: "irrational-numbers",
                title: "ಅಪರಿಮೇಯ ಸಂಖ್ಯೆಗಳು",
                englishTitle: "Irrational Numbers",
              },
            ],
          },

          {
            id: "polynomials",
            title: "ಬಹುಪದಿಗಳು",
            englishTitle: "Polynomials",
            topics: [
              {
                id: "zeros-polynomial",
                title: "ಬಹುಪದಿಯ ಶೂನ್ಯಗಳು",
                englishTitle: "Zeros of a Polynomial",
              },
              {
                id: "relationship-zeros-coefficients",
                title: "ಶೂನ್ಯಗಳು ಮತ್ತು ಗುಣಾಂಕಗಳ ನಡುವಿನ ಸಂಬಂಧ",
                englishTitle:
                  "Relationship Between Zeros and Coefficients",
              },
              {
                id: "division-polynomials",
                title: "ಬಹುಪದಿಗಳ ಭಾಗಾಕಾರ",
                englishTitle: "Division of Polynomials",
              },
            ],
          },

          {
            id: "pair-linear-equations",
            title: "ಎರಡು ಚರಗಳ ರೇಖೀಯ ಸಮೀಕರಣಗಳ ಜೋಡಿ",
            englishTitle:
              "Pair of Linear Equations in Two Variables",
            topics: [
              {
                id: "graphical-method",
                title: "ಗ್ರಾಫಿಕಲ್ ವಿಧಾನ",
                englishTitle: "Graphical Method",
              },
              {
                id: "substitution-method",
                title: "ಸ್ಥಾಪನಾ ವಿಧಾನ",
                englishTitle: "Substitution Method",
              },
              {
                id: "elimination-method",
                title: "ನಿರ್ಮೂಲನಾ ವಿಧಾನ",
                englishTitle: "Elimination Method",
              },
            ],
          },

          {
            id: "quadratic-equations",
            title: "ವರ್ಗ ಸಮೀಕರಣಗಳು",
            englishTitle: "Quadratic Equations",
            topics: [
              {
                id: "standard-form",
                title: "ಪ್ರಮಾಣಿತ ರೂಪ",
                englishTitle: "Standard Form",
              },
              {
                id: "factorisation",
                title: "ಅಪವರ್ತನ ವಿಧಾನ",
                englishTitle: "Factorisation",
              },
              {
                id: "quadratic-formula",
                title: "ವರ್ಗ ಸಮೀಕರಣದ ಸೂತ್ರ",
                englishTitle: "Quadratic Formula",
              },
            ],
          },

          {
            id: "arithmetic-progressions",
            title: "ಅಂಕಗಣಿತ ಶ್ರೇಢಿಗಳು",
            englishTitle: "Arithmetic Progressions",
            topics: [
              {
                id: "sequence",
                title: "ಅನುಕ್ರಮ ಮತ್ತು ಶ್ರೇಢಿ",
                englishTitle: "Sequence and Progression",
              },
              {
                id: "nth-term",
                title: "nನೇ ಪದ",
                englishTitle: "nth Term",
              },
              {
                id: "sum-ap",
                title: "ಮೊದಲ n ಪದಗಳ ಮೊತ್ತ",
                englishTitle: "Sum of First n Terms",
              },
            ],
          },

          {
            id: "triangles",
            title: "ತ್ರಿಭುಜಗಳು",
            englishTitle: "Triangles",
            topics: [
              {
                id: "similar-triangles",
                title: "ಸಾದೃಶ್ಯ ತ್ರಿಭುಜಗಳು",
                englishTitle: "Similar Triangles",
              },
              {
                id: "basic-proportionality",
                title: "ಮೂಲ ಅನುಪಾತ ಪ್ರಮೇಯ",
                englishTitle:
                  "Basic Proportionality Theorem",
              },
              {
                id: "pythagoras",
                title: "ಪೈಥಾಗರಸ್ ಪ್ರಮೇಯ",
                englishTitle: "Pythagoras Theorem",
              },
            ],
          },

          {
            id: "coordinate-geometry",
            title: "ನಿರ್ದೇಶಾಂಕ ರೇಖಾಗಣಿತ",
            englishTitle: "Coordinate Geometry",
            topics: [
              {
                id: "distance-formula",
                title: "ದೂರ ಸೂತ್ರ",
                englishTitle: "Distance Formula",
              },
              {
                id: "section-formula",
                title: "ವಿಭಾಗ ಸೂತ್ರ",
                englishTitle: "Section Formula",
              },
              {
                id: "area-triangle",
                title: "ತ್ರಿಭುಜದ ವಿಸ್ತೀರ್ಣ",
                englishTitle: "Area of Triangle",
              },
            ],
          },

          {
            id: "introduction-trigonometry",
            title: "ತ್ರಿಕೋನಮಿತಿಯ ಪರಿಚಯ",
            englishTitle:
              "Introduction to Trigonometry",
            topics: [
              {
                id: "trigonometric-ratios",
                title: "ತ್ರಿಕೋನಮಿತಿಯ ಅನುಪಾತಗಳು",
                englishTitle: "Trigonometric Ratios",
              },
              {
                id: "trigonometric-identities",
                title: "ತ್ರಿಕೋನಮಿತಿಯ ಸರ್ವಸಮೀಕರಣಗಳು",
                englishTitle:
                  "Trigonometric Identities",
              },
              {
                id: "values-ratios",
                title: "ತ್ರಿಕೋನಮಿತಿಯ ಅನುಪಾತಗಳ ಮೌಲ್ಯಗಳು",
                englishTitle:
                  "Values of Trigonometric Ratios",
              },
            ],
          },

          {
            id: "applications-trigonometry",
            title: "ತ್ರಿಕೋನಮಿತಿಯ ಅನ್ವಯಗಳು",
            englishTitle:
              "Some Applications of Trigonometry",
            topics: [
              {
                id: "heights-distances",
                title: "ಎತ್ತರಗಳು ಮತ್ತು ದೂರಗಳು",
                englishTitle: "Heights and Distances",
              },
              {
                id: "angle-elevation",
                title: "ಉನ್ನತಿ ಕೋನ",
                englishTitle: "Angle of Elevation",
              },
              {
                id: "angle-depression",
                title: "ಅವನತಿ ಕೋನ",
                englishTitle: "Angle of Depression",
              },
            ],
          },

          {
            id: "circles",
            title: "ವೃತ್ತಗಳು",
            englishTitle: "Circles",
            topics: [
              {
                id: "tangent-circle",
                title: "ವೃತ್ತದ ಸ್ಪರ್ಶಕ",
                englishTitle: "Tangent to a Circle",
              },
              {
                id: "tangent-properties",
                title: "ಸ್ಪರ್ಶಕದ ಗುಣಲಕ್ಷಣಗಳು",
                englishTitle:
                  "Properties of Tangents",
              },
            ],
          },

          {
            id: "areas-related-circles",
            title: "ವೃತ್ತಗಳಿಗೆ ಸಂಬಂಧಿಸಿದ ವಿಸ್ತೀರ್ಣಗಳು",
            englishTitle:
              "Areas Related to Circles",
            topics: [
              {
                id: "area-circle",
                title: "ವೃತ್ತದ ವಿಸ್ತೀರ್ಣ",
                englishTitle: "Area of a Circle",
              },
              {
                id: "sector",
                title: "ವೃತ್ತಖಂಡ",
                englishTitle: "Sector",
              },
              {
                id: "segment",
                title: "ವೃತ್ತಭಾಗ",
                englishTitle: "Segment",
              },
            ],
          },

          {
            id: "surface-areas-volumes",
            title: "ಮೇಲ್ಮೈ ವಿಸ್ತೀರ್ಣಗಳು ಮತ್ತು ಘನಫಲಗಳು",
            englishTitle:
              "Surface Areas and Volumes",
            topics: [
              {
                id: "cylinder",
                title: "ಸಿಲಿಂಡರ್",
                englishTitle: "Cylinder",
              },
              {
                id: "cone",
                title: "ಶಂಕು",
                englishTitle: "Cone",
              },
              {
                id: "sphere",
                title: "ಗೋಳ",
                englishTitle: "Sphere",
              },
            ],
          },

          {
            id: "statistics",
            title: "ಅಂಕಿಅಂಶಶಾಸ್ತ್ರ",
            englishTitle: "Statistics",
            topics: [
              {
                id: "mean",
                title: "ಸರಾಸರಿ",
                englishTitle: "Mean",
              },
              {
                id: "median",
                title: "ಮಧ್ಯಕ",
                englishTitle: "Median",
              },
              {
                id: "mode",
                title: "ಬಹುಲಕ",
                englishTitle: "Mode",
              },
            ],
          },

          {
            id: "probability",
            title: "ಸಂಭವನೀಯತೆ",
            englishTitle: "Probability",
            topics: [
              {
                id: "probability-basics",
                title: "ಸಂಭವನೀಯತೆಯ ಮೂಲಭೂತ ಅಂಶಗಳು",
                englishTitle:
                  "Basics of Probability",
              },
              {
                id: "probability-events",
                title: "ಘಟನೆಗಳ ಸಂಭವನೀಯತೆ",
                englishTitle:
                  "Probability of Events",
              },
            ],
          },
        ],

        /*
        -------------------------------------------------
        ENGLISH VERSION
        -------------------------------------------------

        Same Karnataka Class 10 Mathematics curriculum,
        but displayed in English.
        -------------------------------------------------
        */

        English: [
          {
            id: "real-numbers",
            title: "Real Numbers",
            englishTitle: "Real Numbers",
            topics: [
              {
                id: "euclids-division",
                title: "Euclid's Division Algorithm",
                englishTitle: "Euclid's Division Algorithm",
              },
              {
                id: "fundamental-theorem",
                title: "Fundamental Theorem of Arithmetic",
                englishTitle:
                  "Fundamental Theorem of Arithmetic",
              },
              {
                id: "irrational-numbers",
                title: "Irrational Numbers",
                englishTitle: "Irrational Numbers",
              },
            ],
          },

          {
            id: "polynomials",
            title: "Polynomials",
            englishTitle: "Polynomials",
            topics: [
              {
                id: "zeros-polynomial",
                title: "Zeros of a Polynomial",
                englishTitle: "Zeros of a Polynomial",
              },
              {
                id: "relationship-zeros-coefficients",
                title:
                  "Relationship Between Zeros and Coefficients",
                englishTitle:
                  "Relationship Between Zeros and Coefficients",
              },
              {
                id: "division-polynomials",
                title: "Division of Polynomials",
                englishTitle: "Division of Polynomials",
              },
            ],
          },

          {
            id: "pair-linear-equations",
            title:
              "Pair of Linear Equations in Two Variables",
            englishTitle:
              "Pair of Linear Equations in Two Variables",
            topics: [
              {
                id: "graphical-method",
                title: "Graphical Method",
                englishTitle: "Graphical Method",
              },
              {
                id: "substitution-method",
                title: "Substitution Method",
                englishTitle: "Substitution Method",
              },
              {
                id: "elimination-method",
                title: "Elimination Method",
                englishTitle: "Elimination Method",
              },
            ],
          },

          {
            id: "quadratic-equations",
            title: "Quadratic Equations",
            englishTitle: "Quadratic Equations",
            topics: [
              {
                id: "standard-form",
                title: "Standard Form",
                englishTitle: "Standard Form",
              },
              {
                id: "factorisation",
                title: "Factorisation",
                englishTitle: "Factorisation",
              },
              {
                id: "quadratic-formula",
                title: "Quadratic Formula",
                englishTitle: "Quadratic Formula",
              },
            ],
          },

          {
            id: "arithmetic-progressions",
            title: "Arithmetic Progressions",
            englishTitle: "Arithmetic Progressions",
            topics: [
              {
                id: "sequence",
                title: "Sequence and Progression",
                englishTitle: "Sequence and Progression",
              },
              {
                id: "nth-term",
                title: "nth Term",
                englishTitle: "nth Term",
              },
              {
                id: "sum-ap",
                title: "Sum of First n Terms",
                englishTitle: "Sum of First n Terms",
              },
            ],
          },

          {
            id: "triangles",
            title: "Triangles",
            englishTitle: "Triangles",
            topics: [
              {
                id: "similar-triangles",
                title: "Similar Triangles",
                englishTitle: "Similar Triangles",
              },
              {
                id: "basic-proportionality",
                title:
                  "Basic Proportionality Theorem",
                englishTitle:
                  "Basic Proportionality Theorem",
              },
              {
                id: "pythagoras",
                title: "Pythagoras Theorem",
                englishTitle: "Pythagoras Theorem",
              },
            ],
          },

          {
            id: "coordinate-geometry",
            title: "Coordinate Geometry",
            englishTitle: "Coordinate Geometry",
            topics: [
              {
                id: "distance-formula",
                title: "Distance Formula",
                englishTitle: "Distance Formula",
              },
              {
                id: "section-formula",
                title: "Section Formula",
                englishTitle: "Section Formula",
              },
              {
                id: "area-triangle",
                title: "Area of Triangle",
                englishTitle: "Area of Triangle",
              },
            ],
          },

          {
            id: "introduction-trigonometry",
            title: "Introduction to Trigonometry",
            englishTitle:
              "Introduction to Trigonometry",
            topics: [
              {
                id: "trigonometric-ratios",
                title: "Trigonometric Ratios",
                englishTitle: "Trigonometric Ratios",
              },
              {
                id: "trigonometric-identities",
                title: "Trigonometric Identities",
                englishTitle:
                  "Trigonometric Identities",
              },
              {
                id: "values-ratios",
                title:
                  "Values of Trigonometric Ratios",
                englishTitle:
                  "Values of Trigonometric Ratios",
              },
            ],
          },

          {
            id: "applications-trigonometry",
            title:
              "Some Applications of Trigonometry",
            englishTitle:
              "Some Applications of Trigonometry",
            topics: [
              {
                id: "heights-distances",
                title: "Heights and Distances",
                englishTitle: "Heights and Distances",
              },
              {
                id: "angle-elevation",
                title: "Angle of Elevation",
                englishTitle: "Angle of Elevation",
              },
              {
                id: "angle-depression",
                title: "Angle of Depression",
                englishTitle: "Angle of Depression",
              },
            ],
          },

          {
            id: "circles",
            title: "Circles",
            englishTitle: "Circles",
            topics: [
              {
                id: "tangent-circle",
                title: "Tangent to a Circle",
                englishTitle: "Tangent to a Circle",
              },
              {
                id: "tangent-properties",
                title: "Properties of Tangents",
                englishTitle:
                  "Properties of Tangents",
              },
            ],
          },

          {
            id: "areas-related-circles",
            title: "Areas Related to Circles",
            englishTitle:
              "Areas Related to Circles",
            topics: [
              {
                id: "area-circle",
                title: "Area of a Circle",
                englishTitle: "Area of a Circle",
              },
              {
                id: "sector",
                title: "Sector",
                englishTitle: "Sector",
              },
              {
                id: "segment",
                title: "Segment",
                englishTitle: "Segment",
              },
            ],
          },

          {
            id: "surface-areas-volumes",
            title: "Surface Areas and Volumes",
            englishTitle:
              "Surface Areas and Volumes",
            topics: [
              {
                id: "cylinder",
                title: "Cylinder",
                englishTitle: "Cylinder",
              },
              {
                id: "cone",
                title: "Cone",
                englishTitle: "Cone",
              },
              {
                id: "sphere",
                title: "Sphere",
                englishTitle: "Sphere",
              },
            ],
          },

          {
            id: "statistics",
            title: "Statistics",
            englishTitle: "Statistics",
            topics: [
              {
                id: "mean",
                title: "Mean",
                englishTitle: "Mean",
              },
              {
                id: "median",
                title: "Median",
                englishTitle: "Median",
              },
              {
                id: "mode",
                title: "Mode",
                englishTitle: "Mode",
              },
            ],
          },

          {
            id: "probability",
            title: "Probability",
            englishTitle: "Probability",
            topics: [
              {
                id: "probability-basics",
                title: "Basics of Probability",
                englishTitle:
                  "Basics of Probability",
              },
              {
                id: "probability-events",
                title: "Probability of Events",
                englishTitle:
                  "Probability of Events",
              },
            ],
          },
        ],
      },
    },
  },
};

/*
=========================================================
NORMALIZE VALUES
==========================
*/
function normalize(value) {
  return String(value || "")
   .trim()
   .toLowerCase();
}

export function getCurriculum({
  classLevel,
  board,
  subject,
  language,
}) {
  const classData = curriculum?.[String(classLevel)];

  if (!classData) {
    return [];
  }

  const boardData = classData?.[board];

  if (!boardData) {
    return [];
  }

  const subjectKey = Object.keys(boardData).find(
    (key) => normalize(key) === normalize(subject)
  );

  if (!subjectKey) {
    return [];
  }

  const subjectData = boardData[subjectKey];

  if (!subjectData) {
    return [];
  }

  const languageKey = Object.keys(subjectData).find(
    (key) => normalize(key) === normalize(language)
  );

  if (languageKey) {
    return subjectData[languageKey] || [];
  }

  if (normalize(language) === "english") {
    const englishKey = Object.keys(subjectData).find(
      (key) => normalize(key) === "english"
    );

    if (englishKey) {
      return subjectData[englishKey];
    }
  }

  if (normalize(language) === "kannada") {
    const kannadaKey = Object.keys(subjectData).find(
      (key) => normalize(key) === "kannada"
    );

    if (kannadaKey) {
      return subjectData[kannadaKey];
    }
  }

  const availableLanguages = Object.keys(subjectData);

  if (availableLanguages.length > 0) {
    return subjectData[availableLanguages[0]] || [];
  }

  return [];
}

export function getChapter({
  classLevel,
  board,
  subject,
  language,
  chapterId,
}) {
  const chapters = getCurriculum({
    classLevel,
    board,
    subject,
    language,
  });

  return (
    chapters.find(
      (chapter) =>
        chapter.id === chapterId ||
        normalize(chapter.title) === normalize(chapterId) ||
        normalize(chapter.englishTitle) === normalize(chapterId)
    ) || null
  );
}

export function getTopic({
  classLevel,
  board,
  subject,
  language,
  chapterId,
  topicId,
}) {
  const chapter = getChapter({
    classLevel,
    board,
    subject,
    language,
    chapterId,
  });

  if (!chapter) {
    return null;
  }

  return (
    chapter.topics?.find(
      (topic) =>
        topic.id === topicId ||
        normalize(topic.title) === normalize(topicId) ||
        normalize(topic.englishTitle) === normalize(topicId)
    ) || null
  );
}

export function getSubjects({
  classLevel,
  board,
}) {
  const classData = curriculum?.[String(classLevel)];

  if (!classData) {
    return [];
  }

  const boardData = classData?.[board];

  if (!boardData) {
    return [];
  }

  return Object.keys(boardData);
}

export function getChapters({
  classLevel,
  board,
  subject,
  language,
}) {
  return getCurriculum({
    classLevel,
    board,
    subject,
    language,
  });
}

export default curriculum;
