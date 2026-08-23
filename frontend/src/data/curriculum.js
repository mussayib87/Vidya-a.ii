// frontend/src/data/curriculum.js

/*
=========================================================
VIDYA AI - CURRICULUM DATABASE
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

The curriculum is intentionally stored in a reusable
format so more classes, boards, subjects and languages
can be added later.
=========================================================
*/

const mathematicsKannada = [
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
        englishTitle: "Relationship Between Zeros and Coefficients",
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
    englishTitle: "Pair of Linear Equations in Two Variables",
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
        englishTitle: "Basic Proportionality Theorem",
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
    englishTitle: "Introduction to Trigonometry",
    topics: [
      {
        id: "trigonometric-ratios",
        title: "ತ್ರಿಕೋನಮಿತಿಯ ಅನುಪಾತಗಳು",
        englishTitle: "Trigonometric Ratios",
      },
      {
        id: "trigonometric-identities",
        title: "ತ್ರಿಕೋನಮಿತಿಯ ಸರ್ವಸಮೀಕರಣಗಳು",
        englishTitle: "Trigonometric Identities",
      },
      {
        id: "values-ratios",
        title: "ತ್ರಿಕೋನಮಿತಿಯ ಅನುಪಾತಗಳ ಮೌಲ್ಯಗಳು",
        englishTitle: "Values of Trigonometric Ratios",
      },
    ],
  },

  {
    id: "applications-trigonometry",
    title: "ತ್ರಿಕೋನಮಿತಿಯ ಅನ್ವಯಗಳು",
    englishTitle: "Some Applications of Trigonometry",
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
        englishTitle: "Properties of Tangents",
      },
    ],
  },

  {
    id: "areas-related-circles",
    title: "ವೃತ್ತಗಳಿಗೆ ಸಂಬಂಧಿಸಿದ ವಿಸ್ತೀರ್ಣಗಳು",
    englishTitle: "Areas Related to Circles",
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
    englishTitle: "Surface Areas and Volumes",
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
        englishTitle: "Basics of Probability",
      },
      {
        id: "probability-events",
        title: "ಘಟನೆಗಳ ಸಂಭವನೀಯತೆ",
        englishTitle: "Probability of Events",
      },
    ],
  },
];

/*
=========================================================
MATHEMATICS - ENGLISH
=========================================================
*/

const mathematicsEnglish = [
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
        englishTitle: "Fundamental Theorem of Arithmetic",
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
        title: "Relationship Between Zeros and Coefficients",
        englishTitle: "Relationship Between Zeros and Coefficients",
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
    title: "Pair of Linear Equations in Two Variables",
    englishTitle: "Pair of Linear Equations in Two Variables",
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
        title: "Basic Proportionality Theorem",
        englishTitle: "Basic Proportionality Theorem",
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
    englishTitle: "Introduction to Trigonometry",
    topics: [
      {
        id: "trigonometric-ratios",
        title: "Trigonometric Ratios",
        englishTitle: "Trigonometric Ratios",
      },
      {
        id: "trigonometric-identities",
        title: "Trigonometric Identities",
        englishTitle: "Trigonometric Identities",
      },
      {
        id: "values-ratios",
        title: "Values of Trigonometric Ratios",
        englishTitle: "Values of Trigonometric Ratios",
      },
    ],
  },

  {
    id: "applications-trigonometry",
    title: "Some Applications of Trigonometry",
    englishTitle: "Some Applications of Trigonometry",
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
        englishTitle: "Properties of Tangents",
      },
    ],
  },

  {
    id: "areas-related-circles",
    title: "Areas Related to Circles",
    englishTitle: "Areas Related to Circles",
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
    englishTitle: "Surface Areas and Volumes",
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
        englishTitle: "Basics of Probability",
      },
      {
        id: "probability-events",
        title: "Probability of Events",
        englishTitle: "Probability of Events",
      },
    ],
  },
];

/*
=========================================================
SCIENCE
=========================================================
*/

const scienceEnglish = [
  {
    id: "chemical-reactions",
    title: "Chemical Reactions and Equations",
    englishTitle: "Chemical Reactions and Equations",
    topics: [
      {
        id: "chemical-equations",
        title: "Writing Chemical Equations",
        englishTitle: "Writing Chemical Equations",
      },
      {
        id: "types-reactions",
        title: "Types of Chemical Reactions",
        englishTitle: "Types of Chemical Reactions",
      },
      {
        id: "oxidation-reduction",
        title: "Oxidation and Reduction",
        englishTitle: "Oxidation and Reduction",
      },
    ],
  },

  {
    id: "acids-bases-salts",
    title: "Acids, Bases and Salts",
    englishTitle: "Acids, Bases and Salts",
    topics: [
      {
        id: "acids",
        title: "Acids",
        englishTitle: "Acids",
      },
      {
        id: "bases",
        title: "Bases",
        englishTitle: "Bases",
      },
      {
        id: "salts",
        title: "Salts",
        englishTitle: "Salts",
      },
    ],
  },

  {
    id: "metals-nonmetals",
    title: "Metals and Non-metals",
    englishTitle: "Metals and Non-metals",
    topics: [
      {
        id: "properties-metals",
        title: "Properties of Metals",
        englishTitle: "Properties of Metals",
      },
      {
        id: "properties-nonmetals",
        title: "Properties of Non-metals",
        englishTitle: "Properties of Non-metals",
      },
      {
        id: "corrosion",
        title: "Corrosion",
        englishTitle: "Corrosion",
      },
    ],
  },

  {
    id: "carbon-compounds",
    title: "Carbon and Its Compounds",
    englishTitle: "Carbon and Its Compounds",
    topics: [
      {
        id: "carbon-bonding",
        title: "Bonding in Carbon",
        englishTitle: "Bonding in Carbon",
      },
      {
        id: "hydrocarbons",
        title: "Hydrocarbons",
        englishTitle: "Hydrocarbons",
      },
      {
        id: "functional-groups",
        title: "Functional Groups",
        englishTitle: "Functional Groups",
      },
    ],
  },

  {
    id: "life-processes",
    title: "Life Processes",
    englishTitle: "Life Processes",
    topics: [
      {
        id: "nutrition",
        title: "Nutrition",
        englishTitle: "Nutrition",
      },
      {
        id: "respiration",
        title: "Respiration",
        englishTitle: "Respiration",
      },
      {
        id: "transportation",
        title: "Transportation",
        englishTitle: "Transportation",
      },
    ],
  },

  {
    id: "control-coordination",
    title: "Control and Coordination",
    englishTitle: "Control and Coordination",
    topics: [
      {
        id: "nervous-system",
        title: "Nervous System",
        englishTitle: "Nervous System",
      },
      {
        id: "hormones",
        title: "Hormones",
        englishTitle: "Hormones",
      },
      {
        id: "plant-movements",
        title: "Plant Movements",
        englishTitle: "Plant Movements",
      },
    ],
  },

  {
    id: "reproduction",
    title: "How Do Organisms Reproduce?",
    englishTitle: "How Do Organisms Reproduce?",
    topics: [
      {
        id: "asexual-reproduction",
        title: "Asexual Reproduction",
        englishTitle: "Asexual Reproduction",
      },
      {
        id: "sexual-reproduction",
        title: "Sexual Reproduction",
        englishTitle: "Sexual Reproduction",
      },
      {
        id: "human-reproduction",
        title: "Human Reproduction",
        englishTitle: "Human Reproduction",
      },
    ],
  },

  {
    id: "heredity",
    title: "Heredity",
    englishTitle: "Heredity",
    topics: [
      {
        id: "genes",
        title: "Genes and Traits",
        englishTitle: "Genes and Traits",
      },
      {
        id: "mendel",
        title: "Mendel's Experiments",
        englishTitle: "Mendel's Experiments",
      },
      {
        id: "evolution",
        title: "Evolution",
        englishTitle: "Evolution",
      },
    ],
  },

  {
    id: "light",
    title: "Light",
    englishTitle: "Light",
    topics: [
      {
        id: "reflection",
        title: "Reflection of Light",
        englishTitle: "Reflection of Light",
      },
      {
        id: "refraction",
        title: "Refraction of Light",
        englishTitle: "Refraction of Light",
      },
      {
        id: "lens",
        title: "Lenses",
        englishTitle: "Lenses",
      },
    ],
  },

  {
    id: "human-eye",
    title: "The Human Eye and the Colourful World",
    englishTitle: "The Human Eye and the Colourful World",
    topics: [
      {
        id: "human-eye",
        title: "Human Eye",
        englishTitle: "Human Eye",
      },
      {
        id: "defects-vision",
        title: "Defects of Vision",
        englishTitle: "Defects of Vision",
      },
      {
        id: "dispersion",
        title: "Dispersion of Light",
        englishTitle: "Dispersion of Light",
      },
    ],
  },

  {
    id: "electricity",
    title: "Electricity",
    englishTitle: "Electricity",
    topics: [
      {
        id: "electric-current",
        title: "Electric Current",
        englishTitle: "Electric Current",
      },
      {
        id: "potential-difference",
        title: "Potential Difference",
        englishTitle: "Potential Difference",
      },
      {
     id: "ohms-law",
        title: "Ohm's Law",
        englishTitle: "Ohm's Law",
      },
    ],
  },

  {
    id: "magnetic-effects",
    title: "Magnetic Effects of Electric Current",
    englishTitle: "Magnetic Effects of Electric Current",
    topics: [
      {
        id: "magnetic-field",
        title: "Magnetic Field",
        englishTitle: "Magnetic Field",
      },
      {
        id: "electromagnetic-induction",
        title: "Electromagnetic Induction",
        englishTitle: "Electromagnetic Induction",
      },
      {
        id: "electric-motor",
        title: "Electric Motor",
        englishTitle: "Electric Motor",
      },
    ],
  },

  {
    id: "environment",
    title: "Our Environment",
    englishTitle: "Our Environment",
    topics: [
      {
        id: "ecosystem",
        title: "Ecosystem",
        englishTitle: "Ecosystem",
      },
      {
        id: "food-chain",
        title: "Food Chain",
        englishTitle: "Food Chain",
      },
      {
        id: "biodegradable",
        title: "Biodegradable and Non-biodegradable Materials",
        englishTitle: "Biodegradable and Non-biodegradable Materials",
      },
    ],
  },
];

/*
=========================================================
SOCIAL SCIENCE
=========================================================
*/

const socialScienceEnglish = [
  {
    id: "india-after-independence",
    title: "India After Independence",
    englishTitle: "India After Independence",
    topics: [
      {
        id: "independence",
        title: "Indian Independence",
        englishTitle: "Indian Independence",
      },
      {
        id: "constitution",
        title: "Indian Constitution",
        englishTitle: "Indian Constitution",
      },
      {
        id: "nation-building",
        title: "Nation Building",
        englishTitle: "Nation Building",
      },
    ],
  },

  {
    id: "nationalism",
    title: "Nationalism in India",
    englishTitle: "Nationalism in India",
    topics: [
      {
        id: "non-cooperation",
        title: "Non-Cooperation Movement",
        englishTitle: "Non-Cooperation Movement",
      },
      {
        id: "civil-disobedience",
        title: "Civil Disobedience Movement",
        englishTitle: "Civil Disobedience Movement",
      },
      {
        id: "quit-india",
        title: "Quit India Movement",
        englishTitle: "Quit India Movement",
      },
    ],
  },

  {
    id: "resources-development",
    title: "Resources and Development",
    englishTitle: "Resources and Development",
    topics: [
      {
        id: "natural-resources",
        title: "Natural Resources",
        englishTitle: "Natural Resources",
      },
      {
        id: "resource-planning",
        title: "Resource Planning",
        englishTitle: "Resource Planning",
      },
      {
        id: "sustainable-development",
        title: "Sustainable Development",
        englishTitle: "Sustainable Development",
      },
    ],
  },

  {
    id: "agriculture",
    title: "Agriculture",
    englishTitle: "Agriculture",
    topics: [
      {
        id: "types-farming",
        title: "Types of Farming",
        englishTitle: "Types of Farming",
      },
      {
        id: "major-crops",
        title: "Major Crops",
        englishTitle: "Major Crops",
      },
      {
        id: "agriculture-india",
        title: "Agriculture in India",
        englishTitle: "Agriculture in India",
      },
    ],
  },

  {
    id: "manufacturing-industries",
    title: "Manufacturing Industries",
    englishTitle: "Manufacturing Industries",
    topics: [
      {
        id: "industrialization",
        title: "Industrialization",
        englishTitle: "Industrialization",
      },
      {
        id: "industries",
        title: "Major Industries",
        englishTitle: "Major Industries",
      },
      {
        id: "industrial-pollution",
        title: "Industrial Pollution",
        englishTitle: "Industrial Pollution",
      },
    ],
  },

  {
    id: "power-sharing",
    title: "Power Sharing",
    englishTitle: "Power Sharing",
    topics: [
      {
        id: "forms-power-sharing",
        title: "Forms of Power Sharing",
        englishTitle: "Forms of Power Sharing",
      },
      {
        id: "democracy",
        title: "Democracy",
        englishTitle: "Democracy",
      },
      {
        id: "federalism",
        title: "Federalism",
        englishTitle: "Federalism",
      },
    ],
  },

  {
    id: "development",
    title: "Development",
    englishTitle: "Development",
    topics: [
      {
        id: "development-goals",
        title: "Development Goals",
        englishTitle: "Development Goals",
      },
      {
        id: "income",
        title: "Income and Other Criteria",
        englishTitle: "Income and Other Criteria",
      },
      {
        id: "human-development",
        title: "Human Development",
        englishTitle: "Human Development",
      },
    ],
  },

  {
    id: "money-credit",
    title: "Money and Credit",
    englishTitle: "Money and Credit",
    topics: [
      {
        id: "money",
        title: "Money",
        englishTitle: "Money",
      },
      {
        id: "credit",
        title: "Credit",
        englishTitle: "Credit",
      },
      {
        id: "banking",
        title: "Banking System",
        englishTitle: "Banking System",
      },
    ],
  },

  {
    id: "globalisation",
    title: "Globalisation and the Indian Economy",
    englishTitle: "Globalisation and the Indian Economy",
    topics: [
      {
        id: "globalisation",
        title: "Globalisation",
        englishTitle: "Globalisation",
      },
      {
        id: "mnc",
        title: "Multinational Corporations",
        englishTitle: "Multinational Corporations",
      },
      {
        id: "liberalisation",
        title: "Liberalisation",
        englishTitle: "Liberalisation",
      },
    ],
    },
  ];
/*
=========================================================
ENGLISH
=========================================================
*/

const englishLanguage = [
  {
    id: "prose",
    title: "Prose",
    englishTitle: "Prose",
    topics: [
      {
        id: "reading-comprehension",
        title: "Reading Comprehension",
        englishTitle: "Reading Comprehension",
      },
      {
        id: "main-idea",
        title: "Finding the Main Idea",
        englishTitle: "Finding the Main Idea",
      },
      {
        id: "character-analysis",
        title: "Character Analysis",
        englishTitle: "Character Analysis",
      },
    ],
  },

  {
    id: "poetry",
    title: "Poetry",
    englishTitle: "Poetry",
    topics: [
      {
        id: "poetic-devices",
        title: "Poetic Devices",
        englishTitle: "Poetic Devices",
      },
      {
        id: "theme",
        title: "Theme and Meaning",
        englishTitle: "Theme and Meaning",
      },
      {
        id: "appreciation",
        title: "Poem Appreciation",
        englishTitle: "Poem Appreciation",
      },
    ],
  },

  {
    id: "grammar",
    title: "Grammar",
    englishTitle: "Grammar",
    topics: [
      {
        id: "tenses",
        title: "Tenses",
        englishTitle: "Tenses",
      },
      {
        id: "modals",
        title: "Modals",
        englishTitle: "Modals",
      },
      {
        id: "reported-speech",
        title: "Reported Speech",
        englishTitle: "Reported Speech",
      },
    ],
  },

  {
    id: "writing",
    title: "Writing Skills",
    englishTitle: "Writing Skills",
    topics: [
      {
        id: "letter-writing",
        title: "Letter Writing",
        englishTitle: "Letter Writing",
      },
      {
        id: "essay-writing",
        title: "Essay Writing",
        englishTitle: "Essay Writing",
      },
      {
        id: "report-writing",
        title: "Report Writing",
        englishTitle: "Report Writing",
      },
    ],
  },
];

/*
=========================================================
KANNADA
=========================================================
*/

const kannadaLanguage = [
  {
    id: "kannada-prose",
    title: "ಗದ್ಯ",
    englishTitle: "Prose",
    topics: [
      {
        id: "prose-reading",
        title: "ಗದ್ಯ ಓದು",
        englishTitle: "Prose Reading",
      },
      {
        id: "prose-summary",
        title: "ಗದ್ಯ ಸಾರಾಂಶ",
        englishTitle: "Prose Summary",
      },
      {
        id: "character-study",
        title: "ಪಾತ್ರ ಪರಿಚಯ",
        englishTitle: "Character Study",
      },
    ],
  },

  {
    id: "kannada-poetry",
    title: "ಪದ್ಯ",
    englishTitle: "Poetry",
    topics: [
      {
        id: "poem-meaning",
        title: "ಪದ್ಯದ ಅರ್ಥ",
        englishTitle: "Meaning of the Poem",
      },
      {
        id: "poem-summary",
        title: "ಪದ್ಯದ ಸಾರಾಂಶ",
        englishTitle: "Poem Summary",
      },
      {
        id: "poetic-elements",
        title: "ಕಾವ್ಯ ಅಂಶಗಳು",
        englishTitle: "Poetic Elements",
      },
    ],
  },

  {
    id: "kannada-grammar",
    title: "ವ್ಯಾಕರಣ",
    englishTitle: "Grammar",
    topics: [
      {
        id: "sandhi",
        title: "ಸಂಧಿ",
        englishTitle: "Sandhi",
      },
      {
        id: "samasa",
        title: "ಸಮಾಸ",
        englishTitle: "Samasa",
      },
      {
        id: "parts-of-speech",
        title: "ಪದವರ್ಗಗಳು",
        englishTitle: "Parts of Speech",
      },
    ],
  },

  {
    id: "kannada-writing",
    title: "ಬರವಣಿಗೆ ಕೌಶಲ್ಯ",
    englishTitle: "Writing Skills",
    topics: [
      {
        id: "essay",
        title: "ಪ್ರಬಂಧ ಬರವಣಿಗೆ",
        englishTitle: "Essay Writing",
      },
      {
        id: "letter",
        title: "ಪತ್ರ ಬರವಣಿಗೆ",
        englishTitle: "Letter Writing",
      },
      {
        id: "summary",
        title: "ಸಾರಾಂಶ ಬರವಣಿಗೆ",
        englishTitle: "Summary Writing",
      },
    ],
  },
];

/*
=========================================================
HELPER
=========================================================
*/

function cloneCurriculum(items) {
  return items.map((chapter) => ({
    ...chapter,
    topics: (chapter.topics || []).map((topic) => ({
      ...topic,
    })),
  }));
}

/*
=========================================================
MAIN CURRICULUM
=========================================================
*/

const curriculum = {
  "10": {
    "Karnataka State Board": {
      Mathematics: {
        Kannada: mathematicsKannada,
        English: mathematicsEnglish,
        Hindi: mathematicsEnglish,
      },

      Science: {
        Kannada: cloneCurriculum(scienceEnglish),
        English: cloneCurriculum(scienceEnglish),
        Hindi: cloneCurriculum(scienceEnglish),
      },

      "Social Science": {
        Kannada: cloneCurriculum(socialScienceEnglish),
        English: cloneCurriculum(socialScienceEnglish),
        Hindi: cloneCurriculum(socialScienceEnglish),
      },

      English: {
        Kannada: cloneCurriculum(englishLanguage),
        English: cloneCurriculum(englishLanguage),
        Hindi: cloneCurriculum(englishLanguage),
      },

      Kannada: {
        Kannada: cloneCurriculum(kannadaLanguage),
        English: cloneCurriculum(kannadaLanguage),
        Hindi: cloneCurriculum(kannadaLanguage),
      },
    },
  },
};

/*
=========================================================
NORMALIZATION
=========================================================
*/

function normalizeClassLevel(value) {
  if (!value) return "";

  const text = String(value)
    .trim()
    .toLowerCase();

  const match = text.match(/\d+/);

  if (match) {
    return match[0];
  }

  const words = {
    one: "1",
    two: "2",
    three: "3",
    four: "4",
    five: "5",
    six: "6",
    seven: "7",
    eight: "8",
    nine: "9",
    ten: "10",
    eleven: "11",
    twelve: "12",
  };

  return words[text] || text;
}

function normalizeBoard(value) {
  if (!value) return "";

  const text = String(value)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");

  if (
    text === "karnataka" ||
    text === "karnataka board" ||
    text === "karnataka state board" ||
    text === "state board"
  ) {
    return "Karnataka State Board";
  }

  return String(value).trim();
}

function normalizeSubject(value) {
  if (!value) return "";

  const text = String(value)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");

  const subjects = {
    math: "Mathematics",
    maths: "Mathematics",
    mathematics: "Mathematics",

    science: "Science",

    social: "Social Science",
    "social science": "Social Science",
    socialscience: "Social Science",

    english: "English",

    kannada: "Kannada",
    ಕನ್ನಡ: "Kannada",
  };

  return subjects[text] || String(value).trim();
}

function normalizeLanguage(value) {
  if (!value) return "";

  const text = String(value)
    .trim()
    .toLowerCase();

  const languages = {
    kannada: "Kannada",
    ಕನ್ನಡ: "Kannada",
    kn: "Kannada",

    english: "English",
    en: "English",

    hindi: "Hindi",
    हिंदी: "Hindi",
    hi: "Hindi",
  };

  return languages[text] || String(value).trim();
          }
/*
=========================================================
GET CHAPTER
=========================================================
*/

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
=========================================================
GET TOPIC
=========================================================
*/

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
        topic.title === topicId ||
        topic.englishTitle === topicId
    ) || null
  );
}

/*
=========================================================
GET ALL SUBJECTS
=========================================================
*/

export function getSubjects({
  classLevel,
  board,
}) {
  const normalizedClass =
    normalizeClassLevel(classLevel);

  const normalizedBoard =
    normalizeBoard(board);

  const subjects =
    curriculum?.[normalizedClass]?.[
      normalizedBoard
    ];

  if (!subjects) {
    return [];
  }

  return Object.keys(subjects);
}

/*
=========================================================
GET ALL CHAPTERS
=========================================================
*/

export function getAllChapters({
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

/*
=========================================================
GET ALL TOPICS
=========================================================
*/

export function getAllTopics({
  classLevel,
  board,
  subject,
  language,
}) {
  const chapters = getCurriculum({
    classLevel,
    board,
    subject,
    language,
  });

  return chapters.flatMap(
    (chapter) =>
      (chapter.topics || []).map(
        (topic) => ({
          ...topic,
          chapterId: chapter.id,
          chapterTitle: chapter.title,
        })
      )
  );
}

/*
=========================================================
DEFAULT EXPORT
=========================================================
*/
      export default curriculum;
