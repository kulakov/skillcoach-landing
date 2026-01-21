# SkillCoach — Инструкция по деплою

## Что нужно для деплоя

1. **Аккаунт Vercel** — бесплатно на vercel.com
2. **База данных PostgreSQL** — бесплатно на supabase.com или neon.tech
3. **OpenAI API ключ** — platform.openai.com (нужна карта, но есть $5 free credits)

---

## Шаг 1: Создаём базу данных

### Вариант A: Supabase (рекомендую)

1. Зайди на https://supabase.com и создай аккаунт
2. Создай новый проект (любое имя, выбери регион Europe)
3. Подожди пока создастся (~2 минуты)
4. Перейди в **Settings → Database**
5. Скопируй **Connection string** (URI) — это твой `DATABASE_URL`
   - Замени `[YOUR-PASSWORD]` на пароль, который задал при создании проекта

### Вариант B: Neon

1. Зайди на https://neon.tech и создай аккаунт
2. Создай новый проект
3. Скопируй **Connection string** — это твой `DATABASE_URL`

---

## Шаг 2: Получаем OpenAI API ключ

1. Зайди на https://platform.openai.com
2. Перейди в **API Keys**
3. Создай новый ключ (Create new secret key)
4. Скопируй его — это твой `OPENAI_API_KEY`

---

## Шаг 3: Деплоим на Vercel

### Через GitHub (рекомендую)

1. Создай репозиторий на GitHub и залей код:
   ```bash
   cd skillcoach
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/USERNAME/skillcoach.git
   git push -u origin main
   ```

2. Зайди на https://vercel.com
3. Нажми **Add New → Project**
4. Импортируй репозиторий с GitHub
5. В **Environment Variables** добавь:
   - `DATABASE_URL` — строка подключения к Supabase/Neon
   - `NEXTAUTH_SECRET` — сгенерируй: `openssl rand -base64 32`
   - `NEXTAUTH_URL` — оставь пустым для Vercel (он подставит автоматически)
   - `OPENAI_API_KEY` — твой ключ OpenAI
6. Нажми **Deploy**

### После деплоя

1. Зайди в консоль Vercel → твой проект → Settings → Environment Variables
2. Добавь `NEXTAUTH_URL` = `https://твой-домен.vercel.app`
3. Передеплой проект (Deployments → Redeploy)

---

## Шаг 4: Применяем схему базы данных

После первого деплоя нужно применить схему к базе данных.

### Вариант A: Локально

```bash
# Создай .env файл локально
cp .env.example .env
# Заполни DATABASE_URL в .env

# Применить схему
npm run db:push
```

### Вариант B: Через Vercel CLI

```bash
# Установи Vercel CLI
npm i -g vercel

# Залогинься
vercel login

# Линкани проект
vercel link

# Запусти команду с переменными из Vercel
vercel env pull .env.local
npm run db:push
```

---

## Готово!

Теперь ты можешь:
1. Открыть сайт по URL от Vercel
2. Зарегистрироваться (создастся твоя организация)
3. Создать первую программу обучения
4. Добавить участников
5. Запустить программу и получить ссылки для участников

---

## Troubleshooting

### "Invalid database URL"
- Проверь, что DATABASE_URL начинается с `postgresql://` или `postgres://`
- Проверь, что пароль не содержит специальных символов (если есть @ или # — закодируй их)

### "OpenAI API error"
- Проверь, что ключ правильный и начинается с `sk-`
- Проверь, что на аккаунте есть баланс (platform.openai.com → Usage)

### Страница не загружается после деплоя
- Проверь логи в Vercel (Deployments → твой деплой → Logs)
- Убедись, что все переменные окружения заданы

---

## Стоимость

- **Vercel**: бесплатно (Hobby plan)
- **Supabase/Neon**: бесплатно (Free tier — 500MB)
- **OpenAI**: ~$0.01-0.05 за разговор (gpt-4o-mini очень дешёвый)

При 100 участниках в месяц — примерно $5-10 на OpenAI.
