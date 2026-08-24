-- Seed data: database/seed.sql
-- Description: Sample starter curriculum lessons and quizzes for Class 10 Karnataka State Board

-- Sample Lesson 1: Real Numbers (Mathematics Class 10)
INSERT INTO public.lessons (
    id,
    title,
    description,
    content,
    subject,
    grade_level,
    board,
    language,
    is_published,
    metadata
)
VALUES (
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'Real Numbers & Euclid''s Division Lemma',
    'Understanding Euclid''s Division Lemma, Fundamental Theorem of Arithmetic and irrationality proofs.',
    '# Chapter 1: Real Numbers (ವಾಸ್ತವ ಸಂಖ್ಯೆಗಳು)

## 1. Introduction
In Class 9, you explored irrational numbers. In Class 10, we begin with two very important properties of positive integers: **Euclid''s Division Algorithm** and the **Fundamental Theorem of Arithmetic**.

## 2. Euclid''s Division Lemma
Given positive integers $a$ and $b$, there exist unique integers $q$ and $r$ satisfying:
$$a = bq + r, \quad 0 \le r < b$$

- **Dividend** = $(\text{Divisor} \times \text{Quotient}) + \text{Remainder}$

### Finding HCF of 455 and 42:
1. $455 = 42 \times 10 + 35$
2. $42 = 35 \times 1 + 7$
3. $35 = 7 \times 5 + 0$
Since remainder is $0$, $\text{HCF}(455, 42) = 7$.

## 3. The Fundamental Theorem of Arithmetic
Every composite number can be expressed (factorised) as a product of primes, and this factorisation is unique, apart from the order in which the prime factors occur.

$$\text{HCF}(a, b) \times \text{LCM}(a, b) = a \times b$$
',
    'Mathematics',
    '10',
    'Karnataka State Board',
    'English',
    true,
    '{"chapterId": "real-numbers", "estimatedMinutes": 45}'::jsonb
)
ON CONFLICT (id) DO NOTHING;

-- Sample Lesson 2: Polynomials (Mathematics Class 10)
INSERT INTO public.lessons (
    id,
    title,
    description,
    content,
    subject,
    grade_level,
    board,
    language,
    is_published,
    metadata
)
VALUES (
    'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
    'Polynomials: Zeros & Coefficients',
    'Exploring linear, quadratic, and cubic polynomials, their geometric representations and relationships.',
    '# Chapter 2: Polynomials (ಬಹುಪದಿಗಳು)

## 1. Geometric Meaning of Zeros of a Polynomial
For a quadratic polynomial $p(x) = ax^2 + bx + c$ ($a \neq 0$), the graph of the corresponding equation $y = ax^2 + bx + c$ is a **parabola** opening upwards (if $a > 0$) or downwards (if $a < 0$).
The zeros are the x-coordinates of the points where the parabola intersects the x-axis.

## 2. Relationship between Zeros and Coefficients
If $\alpha$ and $\beta$ are the zeros of the quadratic polynomial $p(x) = ax^2 + bx + c$, then:
- **Sum of zeros**: $\alpha + \beta = -\frac{b}{a} = -\frac{\text{Coefficient of } x}{\text{Coefficient of } x^2}$
- **Product of zeros**: $\alpha\beta = \frac{c}{a} = \frac{\text{Constant term}}{\text{Coefficient of } x^2}$
',
    'Mathematics',
    '10',
    'Karnataka State Board',
    'English',
    true,
    '{"chapterId": "polynomials", "estimatedMinutes": 40}'::jsonb
)
ON CONFLICT (id) DO NOTHING;

-- Sample Quiz 1: Real Numbers Practice Quiz
INSERT INTO public.quizzes (
    id,
    title,
    description,
    subject,
    grade_level,
    time_limit_minutes,
    passing_score,
    is_published,
    questions
)
VALUES (
    'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33',
    'Real Numbers Mastery Quiz',
    'Test your knowledge on Euclid''s Division Lemma, HCF and LCM relationships.',
    'Mathematics',
    '10',
    15,
    60,
    true,
    '[
        {
            "id": 1,
            "question": "For any two positive integers a and b, if HCF(a, b) = 12 and a * b = 1800, what is LCM(a, b)?",
            "options": ["150", "120", "300", "180"],
            "correctAnswer": "150",
            "explanation": "LCM(a, b) = (a * b) / HCF(a, b) = 1800 / 12 = 150."
        },
        {
            "id": 2,
            "question": "According to Euclid''s Division Lemma, for a = bq + r, what condition must the remainder r satisfy?",
            "options": ["0 <= r < b", "0 < r <= b", "0 <= r <= b", "r > b"],
            "correctAnswer": "0 <= r < b",
            "explanation": "The remainder r must be non-negative and strictly less than the divisor b."
        },
        {
            "id": 3,
            "question": "Which of the following is an irrational number?",
            "options": ["sqrt(2)", "2/3", "sqrt(16)", "0.25"],
            "correctAnswer": "sqrt(2)",
            "explanation": "The square root of a non-perfect square positive integer is always irrational."
        }
    ]'::jsonb
)
ON CONFLICT (id) DO NOTHING;
