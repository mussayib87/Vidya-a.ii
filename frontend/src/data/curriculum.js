// frontend/src/data/curriculum.js

/*
  VIDYA AI CURRICULUM
  ===================

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
  Language is NOT part of the curriculum lookup.

  Language belongs to the student's learning preference
  and will be used later by the AI lesson/tutor.

  Example:

  Class 10
  Karnataka State Board
  Mathematics
        ↓
  Chapters
        ↓
  Topics
        ↓
  AI explains in English / Kannada / Hindi / etc.
*/

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

/*
  Generic curriculum used temporarily for subjects
  whose complete board-specific syllabus has not yet
  been entered.

  This prevents the application from showing
  "Curriculum coming soon" and gives us a working
  Chapter → Topic → AI Lesson flow.

  Later these can be replaced with official,
  board-specific curriculum data.
*/

const createGenericCurriculum = (subject) => [
  {
    id: `${slugify(subject)}-foundations`,
    title: `${subject} Foundations`,
    topics: [
      {
        id: `${slugify(subject)}-introduction`,
        title: `Introduction to ${subject}`,
      },
      {
        id: `${slugify(subject)}-basic-concepts`,
        title: `Basic Concepts of ${subject}`,
      },
      {
        id: `${slugify(subject)}-applications`,
        title: `${subject} Applications`,
      },
    ],
  },

  {
    id: `${slugify(subject)}-core-concepts`,
    title: `Core Concepts`,
    topics: [
      {
        id: `${slugify(subject)}-important-concepts`,
        title: `Important Concepts`,
      },
      {
        id: `${slugify(subject)}-examples`,
        title: `Examples and Applications`,
      },
      {
        id: `${slugify(subject)}-practice`,
        title: `Practice Questions`,
      },
    ],
  },

  {
    id: `${slugify(subject)}-revision`,
    title: `Revision and Practice`,
    topics: [
      {
        id: `${slugify(subject)}-revision`,
        title: `${subject} Revision`,
      },
      {
        id: `${slugify(subject)}-questions`,
        title: `Important Questions`,
      },
      {
        id: `${slugify(subject)}-assessment`,
        title: `Self Assessment`,
      },
    ],
  },
];

/*
  Convert a subject name into a URL-safe ID.
*/
function slugify(value = "") {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/*
  Supported subjects from Subjects.jsx
*/
const supportedSubjects = [
  "Mathematics",
  "Science",
  "English",
  "Social Science",
  "Computer Science",
  "Kannada",
];

/*
  Boards used by the onboarding UI.

  We keep the structure flexible so additional boards
  can be added later without changing SubjectLearning.jsx.
*/
const supportedBoards = [
  "CBSE",
  "ICSE",
  "Karnataka State Board",
  "Other State Board",
];

/*
  Classes supported by the onboarding system.
*/
const supportedClasses = [
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
];

/*
  Main curriculum database.
*/
const curriculum = {};

/*
  Build the available structure for all supported
  classes and boards.

  Mathematics Class 10 Karnataka has the detailed
  curriculum above.

  Other combinations currently receive a generic
  curriculum so navigation continues to work.
*/
supportedClasses.forEach((classLevel) => {
  curriculum[classLevel] = {};

  supportedBoards.forEach((board) => {
    curriculum[classLevel][board] = {};

    supportedSubjects.forEach((subject) => {
      /*
        Detailed Class 10 Karnataka Mathematics
      */
      if (
        classLevel === "10" &&
        board === "Karnataka State Board" &&
        subject === "Mathematics"
      ) {
        curriculum[classLevel][board][subject] =
          mathematicsClass10Karnataka;
      } else {
        /*
          Temporary working curriculum for other
          combinations.

          This means:
          Class 11 + ICSE + Social Science
          will work.

          Class 10 + Karnataka + Kannada
          will work.

          Class 8 + CBSE + Science
          will work.

          etc.
        */
        curriculum[classLevel][board][subject] =
          createGenericCurriculum(subject);
      }
    });
  });
}

/*
  ======================================================
  GET CURRICULUM
  ======================================================

  IMPORTANT:

  Language is intentionally NOT required here.

  Curriculum depends on:

  Class
  Board
  Subject
*/
export function getCurriculum({
  classLevel,
  board,
  subject,
}) {
  const normalizedClass = String(
    classLevel || ""
  ).trim();

  const normalizedBoard = String(
    board || ""
  ).trim();

  const normalizedSubject = String(
    subject || ""
  ).trim();

  if (
    !normalizedClass ||
    !normalizedBoard ||
    !normalizedSubject
  ) {
    return [];
  }

  const result =
    curriculum?.[
      normalizedClass
    ]?.[
      normalizedBoard
    ]?.[
      normalizedSubject
    ];

  return Array.isArray(result) ? result : [];
}

/*
  ======================================================
  GET CHAPTER
  ======================================================
*/
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

  if (!Array.isArray(chapters)) {
    return null;
  }

  return (
    chapters.find(
      (chapter) =>
        chapter.id === chapterId
    ) || null
  );
}

/*
  ======================================================
  GET TOPIC
  ======================================================
*/
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

  const topics = Array.isArray(
    chapter.topics
  )
    ? chapter.topics
    : [];

  return (
    topics.find(
      (topic) =>
        topic.id === topicId
    ) || null
  );
}

/*
  ======================================================
  GET AVAILABLE SUBJECTS
  ======================================================
*/
export function getAvailableSubjects({
  classLevel,
  board,
}) {
  const normalizedClass = String(
    classLevel || ""
  ).trim();

  const normalizedBoard = String(
    board || ""
  ).trim();

  if (
    !normalizedClass ||
    !normalizedBoard
  ) {
    return [];
  }

  const boardData =
    curriculum?.[
      normalizedClass
    ]?.[
      normalizedBoard
    ];

  if (!boardData) {
    return [];
  }

  return Object.keys(boardData);
}

/*
  ======================================================
  CHECK WHETHER CURRICULUM EXISTS
  ======================================================
*/
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

/*
  ======================================================
  EXPORT
  ======================================================
*/
export default curriculum;
