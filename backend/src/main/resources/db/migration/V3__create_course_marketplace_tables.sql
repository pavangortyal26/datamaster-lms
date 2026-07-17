-- Phase 5: Course Marketplace. Replaces the frontend's hardcoded course array with
-- real, queryable data. Course structure (modules/sections/lessons) is intentionally
-- NOT here yet — that's Phase 7 (Student Learning Portal).

CREATE TABLE course_categories (
    id      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name    VARCHAR(100) NOT NULL UNIQUE,
    slug    VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE courses (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug                VARCHAR(150) NOT NULL UNIQUE,
    title               VARCHAR(255) NOT NULL,
    category_id         UUID NOT NULL REFERENCES course_categories(id),
    description         TEXT NOT NULL,
    instructor_name     VARCHAR(150) NOT NULL,
    instructor_bio      TEXT,
    duration            VARCHAR(50) NOT NULL,
    level               VARCHAR(20) NOT NULL CHECK (level IN ('Beginner', 'Intermediate', 'Advanced')),
    price               NUMERIC(10, 2) NOT NULL,
    original_price      NUMERIC(10, 2),
    rating              NUMERIC(2, 1) NOT NULL DEFAULT 0,
    students_count      INTEGER NOT NULL DEFAULT 0,
    thumbnail_url       VARCHAR(500),
    banner_url          VARCHAR(500),
    is_published        BOOLEAN NOT NULL DEFAULT TRUE,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_courses_category_id ON courses(category_id);
CREATE INDEX idx_courses_slug ON courses(slug);
CREATE INDEX idx_courses_is_published ON courses(is_published);

CREATE TABLE course_learning_outcomes (
    course_id   UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    outcome     TEXT NOT NULL,
    sort_order  INTEGER NOT NULL
);
CREATE INDEX idx_learning_outcomes_course_id ON course_learning_outcomes(course_id);

CREATE TABLE course_skills (
    course_id   UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    skill       VARCHAR(100) NOT NULL,
    sort_order  INTEGER NOT NULL
);
CREATE INDEX idx_skills_course_id ON course_skills(course_id);

CREATE TABLE course_faqs (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id   UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    question    VARCHAR(500) NOT NULL,
    answer      TEXT NOT NULL,
    sort_order  INTEGER NOT NULL
);
CREATE INDEX idx_faqs_course_id ON course_faqs(course_id);

CREATE TABLE wishlists (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_id   UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (user_id, course_id)
);
CREATE INDEX idx_wishlists_user_id ON wishlists(user_id);

-- Seed categories
INSERT INTO course_categories (id, name, slug) VALUES
    ('11111111-1111-1111-1111-111111111101', 'Data Engineering', 'data-engineering'),
    ('11111111-1111-1111-1111-111111111102', 'Generative AI', 'generative-ai'),
    ('11111111-1111-1111-1111-111111111103', 'Data Analytics', 'data-analytics'),
    ('11111111-1111-1111-1111-111111111104', 'Python', 'python'),
    ('11111111-1111-1111-1111-111111111105', 'SQL', 'sql'),
    ('11111111-1111-1111-1111-111111111106', 'Machine Learning', 'machine-learning');

-- Seed courses (matches what the frontend previously hardcoded, now the real source of truth)
INSERT INTO courses (id, slug, title, category_id, description, instructor_name, instructor_bio, duration, level, price, original_price, rating, students_count, is_published) VALUES
    ('22222222-2222-2222-2222-222222222201', 'data-engineering-bootcamp', 'Data Engineering Bootcamp', '11111111-1111-1111-1111-111111111101',
     'Build production pipelines with Spark, Airflow, and cloud warehouses. Twelve weeks of hands-on projects modeled on real data platform work, not toy datasets.',
     'Rohan Kulkarni', 'Rohan has spent eight years building data platforms, most recently leading the data infrastructure team at a Series C fintech.',
     '12 weeks', 'Intermediate', 24999, 34999, 4.8, 2140, true),

    ('22222222-2222-2222-2222-222222222202', 'generative-ai-for-engineers', 'Generative AI for Engineers', '11111111-1111-1111-1111-111111111102',
     'Prompt engineering, RAG pipelines, and fine-tuning LLMs for real products, taught by an engineer shipping generative AI features in production.',
     'Ananya Deshpande', 'Ananya is an ML engineer who has shipped LLM-powered features for two Y Combinator-backed startups.',
     '8 weeks', 'Intermediate', 21999, 29999, 4.9, 3120, true),

    ('22222222-2222-2222-2222-222222222203', 'data-analytics-foundations', 'Data Analytics Foundations', '11111111-1111-1111-1111-111111111103',
     'Turn raw data into decisions with dashboards, statistics, and storytelling. No coding background required.',
     'Vikram Iyer', 'Vikram leads analytics at a D2C retail company and previously trained analyst cohorts at a Big Four consulting firm.',
     '10 weeks', 'Beginner', 16999, 22999, 4.7, 4310, true),

    ('22222222-2222-2222-2222-222222222204', 'python-for-data-professionals', 'Python for Data Professionals', '11111111-1111-1111-1111-111111111104',
     'From syntax to pandas, NumPy, and clean, testable data code. The most common starting point for career switchers.',
     'Sneha Patil', 'Sneha is a backend engineer turned data educator, with a focus on writing production-quality Python.',
     '6 weeks', 'Beginner', 9999, 14999, 4.8, 5680, true),

    ('22222222-2222-2222-2222-222222222205', 'advanced-sql-query-optimization', 'Advanced SQL & Query Optimization', '11111111-1111-1111-1111-111111111105',
     'Window functions, indexing strategy, and query plans that scale. The single most-requested course from working analysts.',
     'Rohan Kulkarni', 'Rohan has spent eight years building data platforms, most recently leading the data infrastructure team at a Series C fintech.',
     '5 weeks', 'Intermediate', 8999, 12999, 4.9, 3890, true),

    ('22222222-2222-2222-2222-222222222206', 'machine-learning-in-production', 'Machine Learning in Production', '11111111-1111-1111-1111-111111111106',
     'Model training, evaluation, and deployment with MLOps fundamentals. Spends as much time on monitoring and deployment as on training.',
     'Ananya Deshpande', 'Ananya is an ML engineer who has shipped LLM-powered features for two Y Combinator-backed startups.',
     '14 weeks', 'Advanced', 27999, 37999, 4.8, 1870, true);

-- Learning outcomes
INSERT INTO course_learning_outcomes (course_id, outcome, sort_order) VALUES
    ('22222222-2222-2222-2222-222222222201', 'Design and build batch and streaming data pipelines', 0),
    ('22222222-2222-2222-2222-222222222201', 'Orchestrate workflows with Apache Airflow', 1),
    ('22222222-2222-2222-2222-222222222201', 'Model data warehouses for analytics workloads', 2),
    ('22222222-2222-2222-2222-222222222201', 'Deploy and monitor pipelines in production', 3),
    ('22222222-2222-2222-2222-222222222202', 'Write effective prompts for production use cases', 0),
    ('22222222-2222-2222-2222-222222222202', 'Build retrieval-augmented generation (RAG) systems', 1),
    ('22222222-2222-2222-2222-222222222202', 'Fine-tune open-source LLMs on custom data', 2),
    ('22222222-2222-2222-2222-222222222203', 'Build dashboards that answer real business questions', 0),
    ('22222222-2222-2222-2222-222222222203', 'Apply core statistics to avoid common analysis mistakes', 1),
    ('22222222-2222-2222-2222-222222222203', 'Present data findings clearly to non-technical stakeholders', 2),
    ('22222222-2222-2222-2222-222222222204', 'Write clean, idiomatic Python for data work', 0),
    ('22222222-2222-2222-2222-222222222204', 'Manipulate data confidently with pandas and NumPy', 1),
    ('22222222-2222-2222-2222-222222222205', 'Use window functions to solve real query problems', 0),
    ('22222222-2222-2222-2222-222222222205', 'Read and act on query execution plans', 1),
    ('22222222-2222-2222-2222-222222222205', 'Design indexes that actually get used', 2),
    ('22222222-2222-2222-2222-222222222206', 'Train and evaluate models with reproducible pipelines', 0),
    ('22222222-2222-2222-2222-222222222206', 'Deploy models behind production-grade APIs', 1),
    ('22222222-2222-2222-2222-222222222206', 'Monitor models for drift and degradation', 2);

-- Skills
INSERT INTO course_skills (course_id, skill, sort_order) VALUES
    ('22222222-2222-2222-2222-222222222201', 'Apache Spark', 0),
    ('22222222-2222-2222-2222-222222222201', 'Airflow', 1),
    ('22222222-2222-2222-2222-222222222201', 'SQL', 2),
    ('22222222-2222-2222-2222-222222222201', 'AWS', 3),
    ('22222222-2222-2222-2222-222222222202', 'Prompt Engineering', 0),
    ('22222222-2222-2222-2222-222222222202', 'LangChain', 1),
    ('22222222-2222-2222-2222-222222222202', 'Vector Databases', 2),
    ('22222222-2222-2222-2222-222222222203', 'Excel', 0),
    ('22222222-2222-2222-2222-222222222203', 'SQL', 1),
    ('22222222-2222-2222-2222-222222222203', 'Tableau', 2),
    ('22222222-2222-2222-2222-222222222204', 'Python', 0),
    ('22222222-2222-2222-2222-222222222204', 'pandas', 1),
    ('22222222-2222-2222-2222-222222222204', 'NumPy', 2),
    ('22222222-2222-2222-2222-222222222205', 'SQL', 0),
    ('22222222-2222-2222-2222-222222222205', 'PostgreSQL', 1),
    ('22222222-2222-2222-2222-222222222206', 'Python', 0),
    ('22222222-2222-2222-2222-222222222206', 'scikit-learn', 1),
    ('22222222-2222-2222-2222-222222222206', 'MLOps', 2);

-- FAQs (course-specific; general FAQs stay on the landing page)
INSERT INTO course_faqs (course_id, question, answer, sort_order) VALUES
    ('22222222-2222-2222-2222-222222222201', 'Do I need prior data engineering experience?', 'Basic SQL and Python familiarity is expected — the course starts from pipeline fundamentals but moves quickly.', 0),
    ('22222222-2222-2222-2222-222222222201', 'What cloud platform is used?', 'Projects primarily use AWS, with the core concepts transferring directly to GCP or Azure.', 1),
    ('22222222-2222-2222-2222-222222222202', 'Do I need a GPU to take this course?', 'No — fine-tuning exercises use hosted compute provided as part of the course.', 0),
    ('22222222-2222-2222-2222-222222222203', 'Is coding required?', 'No coding background is required. SQL is introduced gradually starting week 3.', 0),
    ('22222222-2222-2222-2222-222222222204', 'How much Python do I need to know already?', 'None — this is the recommended starting point if you are new to Python.', 0),
    ('22222222-2222-2222-2222-222222222205', 'Is this course useful if I already know basic SQL?', 'Yes — it assumes basic SQL and focuses entirely on the advanced techniques interviewers actually ask about.', 0),
    ('22222222-2222-2222-2222-222222222206', 'Do I need to complete the Data Engineering Bootcamp first?', 'No, but comfort with Python and basic statistics is expected.', 0);
