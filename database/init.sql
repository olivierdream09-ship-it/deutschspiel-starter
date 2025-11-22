-- DeutschSpiel Database Schema

-- Table des utilisateurs
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    current_level VARCHAR(3) DEFAULT 'A1',
    total_xp INTEGER DEFAULT 0,
    daily_streak INTEGER DEFAULT 0,
    last_active_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Table du vocabulaire
CREATE TABLE IF NOT EXISTS vocabulary (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    german_word VARCHAR(200) NOT NULL,
    translation VARCHAR(200) NOT NULL,
    article VARCHAR(10),
    plural_form VARCHAR(200),
    level VARCHAR(3) NOT NULL,
    category VARCHAR(100) NOT NULL,
    audio_url VARCHAR(500),
    image_url VARCHAR(500),
    example_sentence TEXT,
    difficulty_score DECIMAL(3,2) DEFAULT 0.5,
    times_used INTEGER DEFAULT 0,
    success_rate DECIMAL(4,3) DEFAULT 0.0,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Table des sessions de jeu
CREATE TABLE IF NOT EXISTS game_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    game_type VARCHAR(50) NOT NULL,
    difficulty_level VARCHAR(20) NOT NULL,
    score INTEGER DEFAULT 0,
    max_score INTEGER NOT NULL,
    time_spent INTEGER DEFAULT 0,
    completed_at TIMESTAMP DEFAULT NOW(),
    metadata JSONB
);

-- Table des compétences utilisateur
CREATE TABLE IF NOT EXISTS user_skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    skill_type VARCHAR(50) NOT NULL,
    skill_name VARCHAR(100) NOT NULL,
    mastery_level DECIMAL(3,2) DEFAULT 0.0,
    questions_answered INTEGER DEFAULT 0,
    correct_answers INTEGER DEFAULT 0,
    last_practiced TIMESTAMP DEFAULT NOW()
);

-- Table des saisons de contenu
CREATE TABLE IF NOT EXISTS content_seasons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(200) NOT NULL,
    theme VARCHAR(100) NOT NULL,
    description TEXT,
    pedagogical_goals JSONB,
    level_range VARCHAR(10) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_active BOOLEAN DEFAULT false,
    cover_image_url VARCHAR(500),
    color_scheme VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Insertion de données de démonstration
INSERT INTO vocabulary (german_word, translation, article, level, category) VALUES 
('Haus', 'house', 'das', 'A1', 'habitation'),
('Buch', 'book', 'das', 'A1', 'éducation'),
('Freund', 'friend', 'der', 'A1', 'social'),
('Apfel', 'apple', 'der', 'A1', 'nourriture'),
('Wasser', 'water', 'das', 'A1', 'nourriture'),
('Mutter', 'mother', 'die', 'A1', 'famille'),
('Schule', 'school', 'die', 'A1', 'éducation'),
('Auto', 'car', 'das', 'A1', 'transport'),

('Beruf', 'profession', 'der', 'A2', 'travail'),
('Universität', 'university', 'die', 'A2', 'éducation'),
('Gesundheit', 'health', 'die', 'A2', 'santé'),
('Reisen', 'travel', 'das', 'A2', 'voyage'),

('Wirtschaft', 'economy', 'die', 'B1', 'société'),
('Umwelt', 'environment', 'die', 'B1', 'science'),
('Technologie', 'technology', 'die', 'B1', 'technologie');

-- Création des index pour les performances
CREATE INDEX IF NOT EXISTS idx_user_skills_user_id ON user_skills(user_id);
CREATE INDEX IF NOT EXISTS idx_vocabulary_level ON vocabulary(level);
CREATE INDEX IF NOT EXISTS idx_vocabulary_category ON vocabulary(category);
CREATE INDEX IF NOT EXISTS idx_game_sessions_user_id ON game_sessions(user_id);
