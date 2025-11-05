CREATE TABLE stories (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    genre VARCHAR(100) NOT NULL,
    preview TEXT NOT NULL,
    initial_prompt TEXT NOT NULL,
    image_url TEXT,
    author VARCHAR(100) DEFAULT 'Аноним',
    plays INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    story_id INT NOT NULL REFERENCES stories(id),
    text TEXT NOT NULL,
    sender VARCHAR(10) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_messages_story_id ON messages(story_id);
CREATE INDEX idx_stories_created_at ON stories(created_at DESC);

INSERT INTO stories (title, genre, preview, initial_prompt, image_url, author, plays) VALUES
('Пропавшая сестра', 'Мистика', 'Она пишет тебе... но её похоронили неделю назад.', 'Ты получаешь сообщение от своей сестры, которая пропала неделю назад. Полиция нашла её тело вчера.', 'https://cdn.poehali.dev/projects/ba034bdd-6913-47ee-b7a3-c219ea29dd9f/files/5108141b-058c-4d65-90e5-baf02fc365e6.jpg', 'Аноним', 2847),
('Сообщения с того света', 'Хоррор', 'Неизвестный отправляет тебе сообщения с твоего же номера.', 'Тебе приходят сообщения с твоего собственного номера телефона. Кто-то знает всё о тебе.', 'https://cdn.poehali.dev/projects/ba034bdd-6913-47ee-b7a3-c219ea29dd9f/files/00bb6a66-1ff3-4270-a8f1-e8cc971c6d20.jpg', 'DarkMind', 1923),
('Фотография', 'Психологический триллер', 'Кто-то отправил тебе фото... где ты стоишь сам за собой.', 'На фотографии ты видишь себя спящим. Но кто мог это сфотографировать?', 'https://cdn.poehali.dev/projects/ba034bdd-6913-47ee-b7a3-c219ea29dd9f/files/fc9d0127-4045-461d-81c4-7e6cad925cc6.jpg', 'Nightwalker', 3241);
