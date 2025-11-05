import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface Story {
  id: number;
  title: string;
  genre: string;
  preview: string;
  image: string;
  author: string;
  plays: number;
}

const predefinedStories: Story[] = [
  {
    id: 1,
    title: 'Пропавшая сестра',
    genre: 'Мистика',
    preview: 'Она пишет тебе... но её похоронили неделю назад.',
    image: 'https://cdn.poehali.dev/projects/ba034bdd-6913-47ee-b7a3-c219ea29dd9f/files/5108141b-058c-4d65-90e5-baf02fc365e6.jpg',
    author: 'Аноним',
    plays: 2847
  },
  {
    id: 2,
    title: 'Сообщения с того света',
    genre: 'Хоррор',
    preview: 'Неизвестный отправляет тебе сообщения с твоего же номера.',
    image: 'https://cdn.poehali.dev/projects/ba034bdd-6913-47ee-b7a3-c219ea29dd9f/files/00bb6a66-1ff3-4270-a8f1-e8cc971c6d20.jpg',
    author: 'DarkMind',
    plays: 1923
  },
  {
    id: 3,
    title: 'Фотография',
    genre: 'Психологический триллер',
    preview: 'Кто-то отправил тебе фото... где ты стоишь сам за собой.',
    image: 'https://cdn.poehali.dev/projects/ba034bdd-6913-47ee-b7a3-c219ea29dd9f/files/fc9d0127-4045-461d-81c4-7e6cad925cc6.jpg',
    author: 'Nightwalker',
    plays: 3241
  }
];

export default function Index() {
  const [screen, setScreen] = useState<'home' | 'stories' | 'chat' | 'create'>('home');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [createTitle, setCreateTitle] = useState('');
  const [createGenre, setCreateGenre] = useState('');
  const [createPrompt, setCreatePrompt] = useState('');

  const startChat = (story: Story) => {
    setSelectedStory(story);
    setMessages([
      {
        id: 1,
        text: getInitialMessage(story.title),
        sender: 'ai',
        timestamp: new Date()
      }
    ]);
    setScreen('chat');
  };

  const getInitialMessage = (title: string) => {
    const initialMessages: Record<string, string> = {
      'Пропавшая сестра': 'Привет... это я. Знаю, ты не ожидал услышать от меня.',
      'Сообщения с того света': 'Я знаю, где ты сейчас.',
      'Фотография': 'Посмотри на это фото внимательнее...'
    };
    return initialMessages[title] || 'Привет...';
  };

  const generateAIResponse = (userMessage: string) => {
    const responses = [
      'Почему ты не отвечаешь?..',
      'Я всё это время ждала тебя.',
      'Ты не понимаешь, что происходит.',
      'Послушай меня внимательно...',
      'Не уходи. Пожалуйста.',
      'Я знаю твой секрет.',
      'Тебе не стоило этого делать.'
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const sendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const aiMessage: Message = {
        id: messages.length + 2,
        text: generateAIResponse(inputValue),
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, Math.random() * 2000 + 1500);
  };

  const createStory = () => {
    if (!createTitle || !createGenre || !createPrompt) return;
    
    const newStory: Story = {
      id: Date.now(),
      title: createTitle,
      genre: createGenre,
      preview: createPrompt.slice(0, 60) + '...',
      image: predefinedStories[Math.floor(Math.random() * predefinedStories.length)].image,
      author: 'Ты',
      plays: 0
    };

    predefinedStories.push(newStory);
    setScreen('stories');
    setCreateTitle('');
    setCreateGenre('');
    setCreatePrompt('');
  };

  if (screen === 'home') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.1),transparent_50%)]" />
        
        <div className="z-10 text-center space-y-8 animate-fade-in max-w-2xl">
          <div className="space-y-4">
            <h1 className="text-6xl font-bold tracking-tight">
              Dark<span className="text-primary">Chat</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Разговор, из которого не выйти
            </p>
          </div>

          <div className="w-64 h-64 mx-auto relative animate-glitch">
            <img 
              src="https://cdn.poehali.dev/projects/ba034bdd-6913-47ee-b7a3-c219ea29dd9f/files/fc9d0127-4045-461d-81c4-7e6cad925cc6.jpg"
              alt="Dark phone"
              className="w-full h-full object-cover rounded-2xl shadow-2xl shadow-primary/20"
            />
          </div>

          <p className="text-lg text-muted-foreground italic">
            "Кто-то ждёт тебя в этом чате..."
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => setScreen('stories')}
              className="bg-primary hover:bg-primary/90 text-white gap-2"
            >
              <Icon name="MessageSquare" size={20} />
              Выбрать историю
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => setScreen('create')}
              className="gap-2"
            >
              <Icon name="Plus" size={20} />
              Создать свою
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 'create') {
    return (
      <div className="min-h-screen p-6">
        <div className="max-w-2xl mx-auto space-y-6 animate-slide-up">
          <Button 
            variant="ghost" 
            onClick={() => setScreen('home')}
            className="mb-4"
          >
            <Icon name="ArrowLeft" size={20} />
            Назад
          </Button>

          <Card className="p-6 space-y-6 border-border bg-card">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">Создать историю</h2>
              <p className="text-muted-foreground">
                Задай начало — AI продолжит непредсказуемо
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Название истории</label>
                <Input 
                  placeholder="Например: Последнее сообщение"
                  value={createTitle}
                  onChange={(e) => setCreateTitle(e.target.value)}
                  className="bg-background border-border"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Жанр</label>
                <Input 
                  placeholder="Мистика, Хоррор, Психологический триллер..."
                  value={createGenre}
                  onChange={(e) => setCreateGenre(e.target.value)}
                  className="bg-background border-border"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Начало истории</label>
                <Textarea 
                  placeholder="Опиши начальную ситуацию. AI продолжит историю за тебя..."
                  value={createPrompt}
                  onChange={(e) => setCreatePrompt(e.target.value)}
                  rows={6}
                  className="bg-background border-border resize-none"
                />
              </div>

              <Button 
                onClick={createStory}
                disabled={!createTitle || !createGenre || !createPrompt}
                className="w-full bg-primary hover:bg-primary/90"
              >
                <Icon name="Sparkles" size={20} />
                Создать историю
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (screen === 'stories') {
    return (
      <div className="min-h-screen p-6">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => setScreen('home')}
            >
              <Icon name="ArrowLeft" size={20} />
              Назад
            </Button>
            <Button 
              variant="outline"
              onClick={() => setScreen('create')}
            >
              <Icon name="Plus" size={20} />
              Создать свою
            </Button>
          </div>

          <div className="space-y-4 animate-slide-up">
            <h2 className="text-4xl font-bold">Истории</h2>
            <p className="text-muted-foreground text-lg">
              Выбери историю и погрузись в переписку
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {predefinedStories.map((story, index) => (
              <Card 
                key={story.id}
                className="overflow-hidden border-border bg-card hover:border-primary/50 transition-all cursor-pointer group"
                onClick={() => startChat(story)}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                  <Badge className="absolute top-4 right-4 bg-primary/90">
                    {story.genre}
                  </Badge>
                </div>
                
                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {story.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-2">
                    {story.preview}
                  </p>
                  
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Icon name="User" size={16} />
                      {story.author}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Icon name="Play" size={16} />
                      {story.plays}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (screen === 'chat') {
    return (
      <div className="h-screen flex flex-col bg-background">
        <div className="flex items-center gap-4 p-4 border-b border-border bg-card">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setScreen('stories')}
          >
            <Icon name="ArrowLeft" size={20} />
          </Button>
          
          <Avatar className="h-10 w-10">
            <AvatarImage src={selectedStory?.image} />
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <h3 className="font-semibold">{selectedStory?.title}</h3>
            <p className="text-xs text-muted-foreground">в сети</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div 
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div 
                className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                  message.sender === 'user' 
                    ? 'bg-primary text-white' 
                    : 'bg-card border border-border'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className={`text-xs mt-1 ${
                  message.sender === 'user' ? 'text-white/70' : 'text-muted-foreground'
                }`}>
                  {message.timestamp.toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start animate-fade-in">
              <div className="bg-card border border-border rounded-2xl px-4 py-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-border bg-card">
          <div className="flex gap-2">
            <Input 
              placeholder="Напиши сообщение..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              className="bg-background border-border"
            />
            <Button 
              onClick={sendMessage}
              disabled={!inputValue.trim()}
              size="icon"
              className="bg-primary hover:bg-primary/90"
            >
              <Icon name="Send" size={20} />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
