// frontend/src/data/curriculum.js

/*
  VIDYA AI CURRICULUM

  Structure:

  Class
    ↓
  Board
    ↓
  Subject
    ↓
  Chapters
    ↓
  Topics

  IMPORTANT:
  Language is NOT used to find curriculum.
  Language will be used later by the AI Tutor.
*/

// =====================================================
// CLASS 10 - KARNATAKA STATE BOARD - MATHEMATICS
// =====================================================

const mathematicsClass10Karnataka = [
  {
    id: "real-numbers",
    title: "Real Numbers",
    topics: [
      {
        id: "euclids-division",
        title: "Euclid's Division Algorithm",
      },
      {
        id: "fundamental-theorem",
        title: "Fundamental Theorem of Arithmetic",
      },
      {
        id: "irrational-numbers",
        title: "Irrational Numbers",
      },
    ],
  },

  {
    id: "polynomials",
    title: "Polynomials",
    topics: [
      {
        id: "zeros-polynomial",
        title: "Zeros of a Polynomial",
      },
      {
        id: "relationship-zeros-coefficients",
        title: "Relationship Between Zeros and Coefficients",
      },
      {
        id: "division-polynomials",
        title: "Division of Polynomials",
      },
    ],
  },

  {
    id: "pair-linear-equations",
    title: "Pair of Linear Equations in Two Variables",
    topics: [
      {
        id: "graphical-method",
        title: "Graphical Method",
      },
      {
        id: "substitution-method",
        title: "Substitution Method",
      },
      {
        id: "elimination-method",
        title: "Elimination Method",
      },
    ],
  },

  {
    id: "quadratic-equations",
    title: "Quadratic Equations",
    topics: [
      {
        id: "standard-form",
        title: "Standard Form",
      },
      {
        id: "factorisation",
        title: "Factorisation",
      },
      {
        id: "quadratic-formula",
        title: "Quadratic Formula",
      },
    ],
  },

  {
    id: "arithmetic-progressions",
    title: "Arithmetic Progressions",
    topics: [
      {
        id: "sequence",
        title: "Sequence and Progression",
      },
      {
        id: "nth-term",
        title: "nth Term",
      },
      {
        id: "sum-ap",
        title: "Sum of First n Terms",
      },
    ],
  },

  {
    id: "triangles",
    title: "Triangles",
    topics: [
      {
        id: "similar-triangles",
        title: "Similar Triangles",
      },
      {
        id: "basic-proportionality",
        title: "Basic Proportionality Theorem",
      },
      {
        id: "pythagoras",
        title: "Pythagoras Theorem",
      },
    ],
  },

  {
    id: "coordinate-geometry",
    title: "Coordinate Geometry",
    topics: [
      {
        id: "distance-formula",
        title: "Distance Formula",
      },
      {
        id: "section-formula",
        title: "Section Formula",
      },
      {
        id: "area-triangle",
        title: "Area of Triangle",
      },
    ],
  },

  {
    id: "introduction-trigonometry",
    title: "Introduction to Trigonometry",
    topics: [
      {
        id: "trigonometric-ratios",
        title: "Trigonometric Ratios",
      },
      {
        id: "trigonometric-identities",
        title: "Trigonometric Identities",
      },
      {
        id: "values-ratios",
        title: "Values of Trigonometric Ratios",
      },
    ],
  },

  {
    id: "applications-trigonometry",
    title: "Some Applications of Trigonometry",
    topics: [
      {
        id: "heights-distances",
        title: "Heights and Distances",
      },
      {
        id: "angle-elevation",
        title: "Angle of Elevation",
      },
      {
        id: "angle-depression",
        title: "Angle of Depression",
      },
    ],
  },

  {
    id: "circles",
    title: "Circles",
    topics: [
      {
        id: "tangent-circle",
        title: "Tangent to a Circle",
      },
      {
        id: "tangent-properties",
        title: "Properties of Tangents",
      },
    ],
  },

  {
    id: "areas-related-circles",
    title: "Areas Related to Circles",
    topics: [
      {
        id: "area-circle",
        title: "Area of a Circle",
      },
      {
        id: "sector",
        title: "Sector",
      },
      {
        id: "segment",
        title: "Segment",
      },
    ],
  },

  {
    id: "surface-areas-volumes",
    title: "Surface Areas and Volumes",
    topics: [
      {
        id: "cylinder",
        title: "Cylinder",
      },
      {
        id: "cone",
        title: "Cone",
      },
      {
        id: "sphere",
        title: "Sphere",
      },
    ],
  },

  {
    id: "statistics",
    title: "Statistics",
    topics: [
      {
        id: "mean",
        title: "Mean",
      },
      {
        id: "median",
        title: "Median",
      },
      {
        id: "mode",
        title: "Mode",
      },
    ],
  },

  {
    id: "probability",
    title: "Probability",
    topics: [
      {
        id: "probability-basics",
        title: "Basics of Probability",
      },
      {
        id: "probability-events",
        title: "Probability of Events",
      },
    ],
  },
];

// =====================================================
// GENERIC CURRICULUM
// =====================================================

function createGenericCurriculum(subject) {
  const safeName = String(subject)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return [
    {
      id: `${safeName}-foundations`,
      title: `${subject} Foundations`,
      topics: [
        {
          id: `${safeName}-introduction`,
          title: `Introduction to ${subject}`,
        },
        {
          id: `${safeName}-basic-concepts`,
          title: `Basic Concepts`,
        },
        {
          id: `${safeName}-applications`,
          title: `Applications`,
        },
      ],
    },

    {
      id: `${safeName}-core-concepts`,
      title: "Core Concepts",
      topics: [
        {
          id: `${safeName}-important-concepts`,
          title: "Important Concepts",
        },
        {
          id: `${safeName}-examples`,
          title: "Examples and Applications",
        },
        {
          id: `${safeName}-practice`,
          title: "Practice Questions",
        },
      ],
    },

    {
      id: `${safeName}-revision`,
      title: "Revision and Practice",
      topics: [
        {
          id: `${safeName}-revision-topics`,
          title: "Revision",
        },
        {
          id: `${safeName}-important-questions`,
          title: "Important Questions",
        },
        {
          id: `${safeName}-assessment`,
          title: "Self Assessment",
        },
      ],
    },
  ];
}

// =====================================================
// CURRICULUM DATABASE
// =====================================================

const curriculum = {
  "6": {
    "CBSE": {
      Mathematics: createGenericCurriculum("Mathematics"),
      Science: createGenericCurriculum("Science"),
      English: createGenericCurriculum("English"),
      "Social Science": createGenericCurriculum("Social Science"),
      "Computer Science": createGenericCurriculum("Computer Science"),
      Kannada: createGenericCurriculum("Kannada"),
    },

    "ICSE": {
      Mathematics: createGenericCurriculum("Mathematics"),
      Science: createGenericCurriculum("Science"),
      English: createGenericCurriculum("English"),
      "Social Science": createGenericCurriculum("Social Science"),
      "Computer Science": createGenericCurriculum("Computer Science"),
      Kannada: createGenericCurriculum("Kannada"),
    },

    "Karnataka State Board": {
      Mathematics: createGenericCurriculum("Mathematics"),
      Science: createGenericCurriculum("Science"),
      English: createGenericCurriculum("English"),
      "Social Science": createGenericCurriculum("Social Science"),
      "Computer Science": createGenericCurriculum("Computer Science"),
      Kannada: createGenericCurriculum("Kannada"),
    },

    "Other State Board": {
      Mathematics: createGenericCurriculum("Mathematics"),
      Science: createGenericCurriculum("Science"),
      English: createGenericCurriculum("English"),
      "Social Science": createGenericCurriculum("Social Science"),
      "Computer Science": createGenericCurriculum("Computer Science"),
      Kannada: createGenericCurriculum("Kannada"),
    },
  },

  "7": {
    "CBSE": {
      Mathematics: createGenericCurriculum("Mathematics"),
      Science: createGenericCurriculum("Science"),
      English: createGenericCurriculum("English"),
      "Social Science": createGenericCurriculum("Social Science"),
      "Computer Science": createGenericCurriculum("Computer Science"),
      Kannada: createGenericCurriculum("Kannada"),
    },

    "ICSE": {
      Mathematics: createGenericCurriculum("Mathematics"),
      Science: createGenericCurriculum("Science"),
      English: createGenericCurriculum("English"),
      "Social Science": createGenericCurriculum("Social Science"),
      "Computer Science": createGenericCurriculum("Computer Science"),
      Kannada: createGenericCurriculum("Kannada"),
    },

    "Karnataka State Board": {
      Mathematics: createGenericCurriculum("Mathematics"),
      Science: createGenericCurriculum("Science"),
      English: createGenericCurriculum("English"),
      "Social Science": createGenericCurriculum("Social Science"),
      "Computer Science": createGenericCurriculum("Computer Science"),
      Kannada: createGenericCurriculum("Kannada"),
    },

    "Other State Board": {
      Mathematics: createGenericCurriculum("Mathematics"),
      Science: createGenericCurriculum("Science"),
      English: createGenericCurriculum("English"),
      "Social Science": createGenericCurriculum("Social Science"),
      "Computer Science": createGenericCurriculum("Computer Science"),
      Kannada: createGenericCurriculum("Kannada"),
    },
  },

  "8": {
    "CBSE": {
      Mathematics: createGenericCurriculum("Mathematics"),
      Science: createGenericCurriculum("Science"),
      English: createGenericCurriculum("English"),
      "Social Science": createGenericCurriculum("Social Science"),
      "Computer Science": createGenericCurriculum("Computer Science"),
      Kannada: createGenericCurriculum("Kannada"),
    },

    "ICSE": {
      Mathematics: createGenericCurriculum("Mathematics"),
      Science: createGenericCurriculum("Science"),
      English: createGenericCurriculum("English"),
      "Social Science": createGenericCurriculum("Social Science"),
      "Computer Science": createGenericCurriculum("Computer Science"),
      Kannada: createGenericCurriculum("Kannada"),
    },

    "Karnataka State Board": {
      Mathematics: createGenericCurriculum("Mathematics"),
      Science: createGenericCurriculum("Science"),
      English: createGenericCurriculum("English"),
      "Social Science": createGenericCurriculum("Social Science"),
      "Computer Science": createGenericCurriculum("Computer Science"),
      Kannada: createGenericCurriculum("Kannada"),
    },

    "Other State Board": {
      Mathematics: createGenericCurriculum("Mathematics"),
      Science: createGenericCurriculum("Science"),
      English: createGenericCurriculum("English"),
      "Social Science": createGenericCurriculum("Social Science"),
      "Computer Science": createGenericCurriculum("Computer Science"),
      Kannada: createGenericCurriculum("Kannada"),
    },
  },

  "9": {
    "CBSE": {
      Mathematics: createGenericCurriculum("Mathematics"),
      Science: createGenericCurriculum("Science"),
      English: createGenericCurriculum("English"),
      "Social Science": createGenericCurriculum("Social Science"),
      "Computer Science": createGenericCurriculum("Computer Science"),
      Kannada: createGenericCurriculum("Kannada"),
    },

    "ICSE": {
      Mathematics: createGenericCurriculum("Mathematics"),
      Science: createGenericCurriculum("Science"),
      English: createGenericCurriculum("English"),
      "Social Science": createGenericCurriculum("Social Science"),
      "Computer Science": createGenericCurriculum("Computer Science"),
      Kannada: createGenericCurriculum("Kannada"),
    },

    "Karnataka State Board": {
      Mathematics: createGenericCurriculum("Mathematics"),
      Science: createGenericCurriculum("Science"),
      English: createGenericCurriculum("English"),
      "Social Science": createGenericCurriculum("Social Science"),
      "Computer Science": createGenericCurriculum("Computer Science"),
      Kannada: createGenericCurriculum("Kannada"),
    },

    "Other State Board": {
      Mathematics: createGenericCurriculum("Mathematics"),
      Science: createGenericCurriculum("Science"),
      English: createGenericCurriculum("English"),
      "Social Science": createGenericCurriculum("Social Science"),
      "Computer Science": createGenericCurriculum("Computer Science"),
      Kannada: createGenericCurriculum("Kannada"),
    },
  },

  "10": {
    "CBSE": {
      Mathematics: createGenericCurriculum("Mathematics"),
      Science: createGenericCurriculum("Science"),
      English: createGenericCurriculum("English"),
      "Social Science": createGenericCurriculum("Social Science"),
      "Computer Science": createGenericCurriculum("Computer Science"),
      Kannada: createGenericCurriculum("Kannada"),
    },

    "ICSE": {
      Mathematics: createGenericCurriculum("Mathematics"),
      Science: createGenericCurriculum("Science"),
      English: createGenericCurriculum("English"),
      "Social Science": createGenericCurriculum("Social Science"),
      "Computer Science": createGenericCurriculum("Computer Science"),
      Kannada: createGenericCurriculum("Kannada"),
    },

    "Karnataka State Board": {
      Mathematics: mathematicsClass10Karnataka,
      Science: createGenericCurriculum("Science"),
      English: createGenericCurriculum("English"),
      "Social Science": createGenericCurriculum("Social Science"),
      "Computer Science": createGenericCurriculum("Computer Science"),
      Kannada: createGenericCurriculum("Kannada"),
    },

    "Other State Board": {
      Mathematics: createGenericCurriculum("Mathematics"),
      Science: createGenericCurriculum("Science"),
      English: createGenericCurriculum("English"),
      "Social Science": createGenericCurriculum("Social Science"),
      "Computer Science": createGenericCurriculum("Computer Science"),
      Kannada: createGenericCurriculum("Kannada"),
    },
  },

  "11": {
    "CBSE": {
      Mathematics: createGenericCurriculum("Mathematics"),
      Science: createGenericCurriculum("Science"),
      English: createGenericCurriculum("English"),
      "Social Science": createGenericCurriculum("Social Science"),
      "Computer Science": createGenericCurriculum("Computer Science"),
      Kannada: createGenericCurriculum("Kannada"),
    },

    "ICSE": {
      Mathematics: createGenericCurriculum("Mathematics"),
      Science: createGenericCurriculum("Science"),
      English: createGenericCurriculum("English"),
      "Social Science": createGenericCurriculum("Social Science"),
      "Computer Science": createGenericCurriculum("Computer Science"),
      Kannada: createGenericCurriculum("Kannada"),
    },

    "Karnataka State Board": {
      Mathematics: createGenericCurriculum("Mathematics"),
      Science: createGenericCurriculum("Science"),
      English: createGenericCurriculum("English"),
      "Social Science": createGenericCurriculum("Social Science"),
      "Computer Science": createGenericCurriculum("Computer Science"),
      Kannada: createGenericCurriculum("Kannada"),
    },

    "Other State Board": {
      Mathematics: createGenericCurriculum("Mathematics"),
      Science: createGenericCurriculum("Science"),
      English: createGenericCurriculum("English"),
      "Social Science": createGenericCurriculum("Social Science"),
      "Computer Science": createGenericCurriculum("Computer Science"),
      Kannada: createGenericCurriculum("Kannada"),
    },
  },

  "12": {
    "CBSE": {
      Mathematics: createGenericCurriculum("Mathematics"),
      Science: createGenericCurriculum("Science"),
      English: createGenericCurriculum("English"),
      "Social Science": createGenericCurriculum("Social Science"),
      "Computer Science": createGenericCurriculum("Computer Science"),
      Kannada: createGenericCurriculum("Kannada"),
    },

    "ICSE": {
      Mathematics: createGenericCurriculum("Mathematics"),
      Science: createGenericCurriculum("Science"),
      English: createGenericCurriculum("English"),
      "Social Science": createGenericCurriculum("Social Science"),
      "Computer Science": createGenericCurriculum("Computer Science"),
      Kannada: createGenericCurriculum("Kannada"),
    },

    "Karnataka State Board": {
      Mathematics: createGenericCurriculum("Mathematics"),
      Science: createGenericCurriculum("Science"),
      English: createGenericCurriculum("English"),
      "Social Science": createGenericCurriculum("Social Science"),
      "Computer Science": createGenericCurriculum("Computer Science"),
      Kannada: createGenericCurriculum("Kannada"),
    },

    "Other State Board": {
      Mathematics: createGenericCurriculum("Mathematics"),
      Science: createGenericCurriculum("Science"),
      English: createGenericCurriculum("English"),
      "Social Science": createGenericCurriculum("Social Science"),
      "Computer Science": createGenericCurriculum("Computer Science"),
      Kannada: createGenericCurriculum("Kannada"),
    },
  },
};

// =====================================================
// GET CURRICULUM
// =====================================================

export function getCurriculum({
  classLevel,
  board,
  subject,
}) {
  const classKey = String(classLevel || "").trim();
  const boardKey = String(board || "").trim();
  const subjectKey = String(subject || "").trim();

  const chapters =
    curriculum?.[classKey]?.[boardKey]?.[subjectKey];

  return Array.isArray(chapters) ? chapters : [];
}

// =====================================================
// GET CHAPTER
// =====================================================

export function getChapter({
  classLevel,
  board,
  subject,
  chapterId,
}) {
  const chapters = getCurriculum({
    classLevel,
    board,
    subject,
  });

  return (
    chapters.find(
      (chapter) => chapter.id === chapterId
    ) || null
  );
}

// =====================================================
// GET TOPIC
// =====================================================

export function getTopic({
  classLevel,
  board,
  subject,
  chapterId,
  topicId,
}) {
  const chapter = getChapter({
    classLevel,
    board,
    subject,
    chapterId,
  });

  if (!chapter) {
    return null;
  }

  const topics = Array.isArray(chapter.topics)
    ? chapter.topics
    : [];

  return (
    topics.find(
      (topic) => topic.id === topicId
    ) || null
  );
}

// =====================================================
// CHECK CURRICULUM
// =====================================================

export function hasCurriculum({
  classLevel,
  board,
  subject,
}) {
  return (
    getCurriculum({
      classLevel,
      board,
      subject,
    }).length > 0
  );
}

// =====================================================
// GET AVAILABLE SUBJECTS
// =====================================================

export function getAvailableSubjects({
  classLevel,
  board,
}) {
  const classKey = String(classLevel || "").trim();
  const boardKey = String(board || "").trim();

  const boardData =
    curriculum?.[classKey]?.[boardKey];

  if (!boardData) {
    return [];
  }

  return Object.keys(boardData);
}

// =====================================================
// DEFAULT EXPORT
// =====================================================

export default curriculum;
