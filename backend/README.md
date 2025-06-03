# Nutrition App Backend

## Опис
Backend для додатку з відстеження харчування та фізичної активності. Реалізовано на Express.js з використанням Prisma ORM.

## Запуск локально
1. Встановіть залежності:
   ```bash
   npm install
   ```
2. Налаштуйте змінні середовища (див. `.env.example`).
3. Запустіть сервер:
   ```bash
   npm run dev
   ```

## Запуск тестів
```bash
npm test
```

## API Документація
Swagger UI доступний за адресою: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Оновлення Swagger
Swagger-документація генерується автоматично з JSDoc-коментарів. Для оновлення:
1. Додайте/оновіть JSDoc-коментарі у роутах.
2. Перезапустіть сервер.

## Структура проєкту
- `src/controllers` - контролери
- `src/routes` - роути
- `src/services` - бізнес-логіка
- `src/__tests__` - тести 