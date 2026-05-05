# Архитектура проекта КВАНТОРА

## Общая архитектура

Проект следует **модульной архитектуре** с разделением на независимые CSS и JavaScript модули. Это open source проект, созданный для сообщества, поэтому код максимально прозрачен и хорошо документирован.

## Принципы проектирования

### 1. Модульность
- Каждый CSS/JS файл отвечает за конкретную функциональность
- Лёгкость добавления, удаления или замены модулей
- Минимальные зависимости между модулями

### 2. Открытость
- Весь код доступен для изучения и модификации
- Чёткие комментарии и документация
- Простые паттерны, понятные новичкам

### 3. Производительность
- Ленивая загрузка данных через Fetch API
- Оптимизированные анимации с `will-change`
- Минимальные перерисовки
- Использование `requestAnimationFrame`

### 4. Доступность
- Семантический HTML
- ARIA атрибуты
- Клавиатурная навигация
- Учёт предпочтений (`prefers-reduced-motion`)

## Структура HTML страниц

### Базовый шаблон
```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <!-- Мета-теги -->
    <!-- Подключение CSS модулей (общие + специфичные) -->
</head>
<body>
    <div class="cursor"></div>
    <div class="cursor-follower"></div>
    <div class="header-include"></div>

    <!-- Специфичный контент страницы -->

    <div class="footer-include"></div>

    <!-- Подключение JS модулей -->
    <!-- Динамическая загрузка header/footer -->
</body>
</html>
```

### Динамические компоненты
- **Header**: `special/header.html` — подключается через Fetch API
- **Footer**: `special/footer.html` — подключается через Fetch API
- **Данные**: `services.json`, `portfolio.json` — загружаются динамически

## CSS Архитектура

### Иерархия загрузки

1. **EOFCSSVariables3.css** — CSS переменные (дизайн-система)
2. **EOFCSSReset3.css** — сброс стилей
3. **EOFcursor3.css** — кастомный курсор
4. **EOFNavigation3.css** — навигация
5. **EOFContainer3.css** — контейнеры
6. **EOFSectionStyles3.css** — базовые стили секций
7. **Модульные CSS** — специфичные компоненты
8. **Адаптивные CSS** — медиа-запросы
9. **Утилитарные CSS** — вспомогательные классы

### Дизайн-система

Все значения хранятся в CSS переменных (`:root`):

```css
:root {
    /* Цвета */
    --color-bg: #0a0a0a;
    --color-text: #ffffff;
    --color-primary: #ffffff;
    --color-accent: #000000;

    /* Градиенты */
    --gradient-primary: linear-gradient(135deg, #ffffff 0%, #e0e0e0 50%, #000000 100%);

    /* Glass effect */
    --glass-bg: rgba(0, 0, 0, 0.3);
    --glass-border: rgba(255, 255, 255, 0.1);

    /* Тени */
    --shadow-sm, --shadow-md, --shadow-lg

    /* Радиусы */
    --radius-sm (8px), --radius-md (12px), --radius-lg (20px), --radius-xl (32px)

    /* Транзишены */
    --transition-fast (0.2s), --transition-normal (0.3s), --transition-slow (0.5s)

    /* Шрифты */
    --font-family: 'Inter', sans-serif
}
```

## JavaScript Архитектура

### Модульная система

Каждый JS файл — независимый модуль:
- Инициализируется при загрузке DOM
- Работает только если нужные элементы существуют
- Не создаёт глобальных переменных (кроме своих классов)

### Основные модули

#### Инициализация
- **EOFInit3.js** — точка входа

#### UI Компоненты
- **EOFcursor3.js** — кастомный курсор
- **EOFNavigation3.js** — навигация и плавный скролл

#### Анимации
- **EOFGlobalBackground3.js** — интерактивный фон
- **EOFScrollReveal3.js** — появление при скролле

#### Данные
- **EOFServiceLoader3.js** — загрузка проектов из JSON
- **EOFPortfolioLoader3.js** — загрузка портфолио
- **EOFPortfolioFilterDynamic3.js** — фильтрация проектов

#### Утилиты
- **EOFStatsCounter3.js** — анимированные счётчики

### Паттерн класса

```javascript
class ModuleName {
    constructor() {
        this.init();
    }

    init() {
        if (this.shouldInitialize()) {
            this.cacheElements();
            this.bindEvents();
        }
    }

    shouldInitialize() {
        return document.querySelector('.required-element') !== null;
    }

    cacheElements() {
        this.elements = {
            container: document.querySelector('.container'),
            items: document.querySelectorAll('.item')
        };
    }

    bindEvents() {
        // Привязка обработчиков событий
    }
}

// Автоматическая инициализация
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new ModuleName());
} else {
    new ModuleName();
}
```

## Данные

### JSON структуры

**services.json** — категории проектов:
```json
[
  {
    "id": "opensource",
    "title": "Open Source Проекты",
    "description": "Создаём и поддерживаем открытые проекты",
    "image": "services/opensource.svg",
    "tags": ["GitHub", "Community", "Free"]
  }
]
```

**portfolio.json** — конкретные проекты:
```json
[
  {
    "id": 1,
    "title": "Community Dashboard",
    "category": "opensource",
    "description": "Открытая панель управления для локальных сообществ",
    "image": "portfolio/project1.jpg",
    "link": "https://github.com/kvantora/community-dashboard"
  }
]
```

## Производительность

### Оптимизации
1. **CSS**: минимизация перерисовок, `will-change`
2. **JS**: кэширование DOM, делегирование событий
3. **Изображения**: lazy loading (если нужно)
4. **Сети**: кэширование, сжатие

### Метрики
- First Contentful Paint < 1.5s
- Time to Interactive < 3s
- Lighthouse score > 90

## Расширяемость

### Добавление нового проекта

1. Добавьте запись в `portfolio.json`
2. Убедитесь, что категория соответствует фильтрам
3. Добавьте изображение в папку `portfolio/`
4. Обновите документацию

### Добавление новой страницы

1. Создайте HTML файл по шаблону
2. Подключите нужные CSS/JS модули
3. Добавьте ссылку в навигацию (`special/header.html`)
4. Протестируйте

## Безопасность

- **XSS защита**: экранирование пользовательского ввода
- **CORS**: same-origin для Fetch API
- **LocalStorage**: только для чата, без чувствительных данных
- **HTTPS**: обязательно для продакшена

## Лицензия

Проект доступен под лицензией MIT, если не указано иное.

---

*Версия: 1.0.0 | Последнее обновление: 2024*