import { Bot, Calendar, FileText, BarChart2, Check } from "lucide-react";

const Demo = () => {
  const chatMessages = [
    {
      type: "bot",
      content: "Привет, Алексей! Как ты применяешь техники обратной связи со своей командой?",
    },
    {
      type: "user",
      content: "Честно говоря, пока не успел. Очень много работы.",
    },
    {
      type: "bot",
      content: "Давай сделаем это управляемым. Есть ли в команде человек, которому был бы полезен разговор о развитии?",
    },
    {
      type: "user",
      content: "Да, Мария. Она готова к большей ответственности.",
    },
    {
      type: "bot",
      content: "Отлично! Какой самый маленький первый шаг ты мог бы сделать?",
    },
    {
      type: "user",
      content: "Могу назначить 1:1 и подготовить тезисы для разговора.",
    },
    {
      type: "bot",
      content: "Хороший план. Помогу подготовиться. Когда удобно назначить встречу?",
    },
    {
      type: "user",
      content: "Во вторник в 14:30?",
    },
    {
      type: "bot",
      content: "Готово! Создал приглашение в календаре и шаблон для обсуждения в Notion. У тебя получится!",
    },
  ];

  const outputs = [
    {
      icon: Calendar,
      app: "Google Calendar",
      title: "1:1 с Марией — Обсуждение роста",
      details: "Вт, 14:30 - 15:00",
      subdetails: "Google Meet",
      status: "Создано",
    },
    {
      icon: FileText,
      app: "Notion",
      title: "План обсуждения: Мария",
      details: "Итоги Q1",
      list: ["Вклад в проекты", "Сильные стороны", "Зоны развития", "Карьерные цели"],
      status: "Создано",
    },
    {
      icon: BarChart2,
      app: "Дашборд обновлён",
      title: "Статус Алексея: Активен",
      details: "Навык применён: Обратная связь и коучинг",
      status: "Записано",
    },
  ];

  return (
    <section id="features" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Один разговор. Три конкретных действия.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Посмотрите, как 2-минутная AI-сессия превращает намерения в конкретные шаги.
          </p>
        </div>

        {/* Demo content */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Chat interface */}
          <div className="bg-white rounded-2xl shadow-lg border border-border overflow-hidden">
            {/* Chat header */}
            <div className="bg-primary/5 px-6 py-4 border-b border-border flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-foreground">SkillCoach AI</p>
                <p className="text-xs text-muted-foreground">Пост-тренинг follow-up</p>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-xs text-muted-foreground">Активен</span>
              </div>
            </div>

            {/* Chat messages */}
            <div className="p-4 space-y-4 max-h-[480px] overflow-y-auto">
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                      msg.type === "user"
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "bg-muted text-foreground rounded-bl-md"
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Outputs */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground mb-4">
              От разговора к действию
              <span className="block text-sm font-normal text-muted-foreground mt-1">
                Реальные результаты за 24 часа
              </span>
            </h3>

            {outputs.map((output, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-border p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <output.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                      {output.app}
                    </p>
                    <p className="font-semibold text-foreground mb-1">{output.title}</p>
                    <p className="text-sm text-muted-foreground">{output.details}</p>
                    {output.subdetails && (
                      <p className="text-sm text-muted-foreground">{output.subdetails}</p>
                    )}
                    {output.list && (
                      <ul className="mt-2 space-y-1">
                        {output.list.map((item, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                            <span className="w-1 h-1 bg-muted-foreground rounded-full"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-green-600">
                    <Check className="w-4 h-4" />
                    <span className="text-xs font-medium">{output.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Caption */}
        <p className="text-center text-muted-foreground mt-8 text-sm">
          Реальное формирование привычек — не гипотетические результаты.
        </p>
      </div>
    </section>
  );
};

export default Demo;
