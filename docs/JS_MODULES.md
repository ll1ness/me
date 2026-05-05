# JavaScript Модули проекта КВАНТОРА

## Открытый проект для сообщества

Этот проект состоит из модульных JavaScript компонентов, разработанных для поддержки открытых проектов и сообщества разработчиков. Все модули доступны под лицензией MIT и могут свободно использоваться, модифицироваться и распространяться.

## Полный список JS модулей

### Инициализация

#### 1. EOFInit3.js
**Назначение**: Точка входа, инициализация всех модулей

**Содержание**:
```javascript
console.log('КВАНТОРА open source project initialized successfully');
```

**Примечание**: Простой лог, остальные модули инициализируются самостоятельно через DOMContentLoaded. Этот модуль демонстрирует философию минимализма и открытости кода.

### UI Компоненты

#### 2. EOFcursor3.js
**Назначение**: Кастомный курсор для улучшения пользовательского опыта

**Класс**: `CustomCursor` (глобальный экземпляр)

**Функционал**:
- Двойной курсор (точка + кружок-след) для плавного визуального эффекта
- Анимация следования с разной скоростью
- Увеличение при наведении на интерактивные элементы
- Поддержка touch-устройств (автоматическое скрытие)
- Полная кастомизация через CSS переменные

**Инициализация**:
```javascript
// Автоматическая при загрузке DOM
// Ищет элементы: .cursor, .cursor-follower
```

**Обработчики**:
```javascript
const hoverElements = document.querySelectorAll('a, button, .service-card, .portfolio-item, .filter-btn');
// Добавляет hover-эффекты для улучшения навигации
```

**Сообщество**: Модуль разработан и поддерживается сообществом. Вклад принимается через GitHub Issues и Pull Requests.

#### 3. EOFNavigation3.js
**Назначение**: Навигация и плавный скролл для доступности и удобства

**Класс**: `Navigation` (глобальные функции)

**Функционал**:
- Фиксированная навигация при скролле
- Мобильное меню (гамбургер) с доступностью
- Плавный скролл к якорям
- Закрытие меню при клике на ссылку
- Поддержка клавиатурной навигации

**События**:
```javascript
window.addEventListener('scroll', handleScroll);
navToggle.addEventListener('click', toggleMenu);
navLinks.forEach(link => link.addEventListener('click', closeMenu));
```

**Параметры**:
- Offset для скролла: 80px
- Анимация: 300ms ease-in-out

**Доступность**: Соответствует стандартам WCAG 2.1, поддерживает фокус-менеджмент.

#### 4. EOFChat3.js
**Назначение**: Чат-бот для взаимодействия с сообществом

**Класс**: `ChatBot`

**Функционал**:
- Отправка сообщений
- Получение ответов (симуляция ИИ)
- Хранение истории в localStorage
- Индикатор онлайн-статуса
- Поддержка markdown в ответах

**Использование**:
```javascript
const chat = new ChatBot();
chat.init();
```

**API**:
- `sendMessage(text)` - отправить сообщение
- `getResponse(userMessage)` - получить ответ (искусственный интеллект)
- `saveHistory()` / `loadHistory()` - работа с localStorage

**Сообщество**: Чат-бот может быть расширен сообществом для ответов на часто задаваемые вопросы о проекте.

### Анимации

#### 5. EOFGlobalBackground3.js
**Назначение**: Интерактивный фон с орбами для визуальной привлекательности

**Класс**: `GlobalBackground`

**Функционал**:
- Создание 5 градиентных орбов с настраиваемыми цветами
- Анимация плавающего движения
- Параллакс при движении мыши
- Риппл-эффекты при нажатии клавиш
- Взрыв частиц при клике
- Поддержка touch-устройств

**Конфигурация орбов**:
```javascript
const orbConfigs = [
    { className: 'bg-orb-1', speed: 0.02, radius: 300 }, // Индиго
    { className: 'bg-orb-2', speed: 0.015, radius: 250 }, // Циан
    { className: 'bg-orb-3', speed: 0.01, radius: 200 },  // Розовый
    { className: 'bg-orb-4', speed: 0.025, radius: 150 }, // Желтый
    { className: 'bg-orb-5', speed: 0.018, radius: 225 }  // Циан
];
```

**Интерактивность**:
- **Mouse move**: орбы следуют за курсором с разной скоростью (параллакс)
- **Key down**: создание ripple-эффекта в случайной позиции
- **Click**: создание burst из 8 частиц
- **Touch**: поддержка сенсорных экранов

**Анимация**:
```javascript
animate() {
    this.updateOrbs(); // Обновление позиций
    this.animationFrame = requestAnimationFrame(() => this.animate());
}
```

**Производительность**: Оптимизировано для 60 FPS, использует requestAnimationFrame и GPU-ускорение.

#### 6. EOFScrollReveal3.js
**Назначение**: Появление элементов при скролле для улучшения UX

**Класс**: `ScrollReveal`

**Функционал**:
- Наблюдение за элементами с классом `.reveal`
- Добавление класса `.active` при входе в viewport
- Настройка порога (threshold)
- Опциональная отмена анимации (prefers-reduced-motion)
- Поддержка последовательных анимаций

**Использование**:
```javascript
const reveal = new ScrollReveal();
reveal.init();
```

**HTML**:
```html
<div class="reveal">Контент</div>
```

**CSS** (из EOFAnimations3.css):
```css
.reveal {
    opacity: 0;
    transform: translateY(40px);
    transition: all 0.8s ease;
}

.reveal.active {
    opacity: 1;
    transform: translateY(0);
}
```

**Доступность**: Уважает настройки prefers-reduced-motion для пользователей, предпочитающих минимизировать анимации.

#### 7. EOFParallax3.js
**Назначение**: Параллакс эффекты для глубины и интерактивности

**Класс**: `Parallax`

**Функционал**:
- Движение элементов при скролле
- Разная скорость для разных слоев
- Настройка коэффициентов параллакса
- Оптимизация производительности

**Использование**:
```javascript
const parallax = new Parallax();
parallax.init();
```

**Пример**:
```html
<div class="parallax-layer" data-speed="0.5">Фон</div>
<div class="parallax-layer" data-speed="1">Контент</div>
```

### Загрузка данных

#### 8. EOFServiceLoader3.js
**Назначение**: Загрузка проектов из JSON (сообщество и open source)

**Класс**: `ServiceLoader`

**Функционал**:
- Fetch запрос к `services.json`
- Рендеринг карточек проектов
- Обработка ошибок
- Кэширование
- Поддержка офлайн-режима

**Использование**:
```javascript
const serviceLoader = new ServiceLoader();
serviceLoader.load();
```

**HTML структура**:
```html
<div class="services-grid" id="servicesGrid"></div>
```

**JSON формат** (open source проекты):
```json
[
  {
    "id": "opensource",
    "title": "Open Source Проекты",
    "description": "Создаём и поддерживаем открытые проекты для сообщества",
    "image": "services/opensource.svg",
    "tags": ["GitHub", "Community", "Free"]
  }
]
```

**Сообщество**: Данные загружаются из открытого JSON файла, который может редактироваться сообществом.

#### 9. EOFPortfolioLoader3.js
**Назначение**: Загрузка портфолио из JSON (open source проекты)

**Класс**: `PortfolioLoader`

**Функционал**:
- Fetch запрос к `portfolio.json`
- Рендеринг элементов портфолио
- Оптимизация изображений
- Динамическая фильтрация
- Интеграция с GitHub API

**Использование**:
```javascript
const portfolioLoader = new PortfolioLoader();
portfolioLoader.load();
```

**HTML структура**:
```html
<div class="portfolio-grid" id="portfolioGrid"></div>
```

**JSON формат** (open source проекты):
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

**Сообщество**: Все проекты в портфолио являются open source и доступны для внесения вклада.

#### 10. EOFPortfolioFilterDynamic3.js
**Назначение**: Динамическая фильтрация портфолио

**Класс**: `PortfolioFilter`

**Функционал**:
- Фильтрация по категориям (opensource, web, education, collaboration)
- Анимации при фильтрации
- Управление кнопками фильтров
- Поддержка множественных фильтров

**Использование**:
```javascript
const filter = new PortfolioFilter();
filter.init();
```

**HTML**:
```html
<button class="filter-btn active" data-filter="opensource">Open Source</button>
<button class="filter-btn" data-filter="web">Веб</button>
<button class="filter-btn" data-filter="education">Образование</button>
```

**Сообщество**: Фильтры помогают сообществу находить проекты по интересам и направлениям.

### Утилиты

#### 11. EOFStatsCounter3.js
**Назначение**: Анимированные счетчики статистики сообщества

**Класс**: `StatsCounter`

**Функционал**:
- Поиск элементов с `data-target`
- Анимация от 0 до target значения
- Запуск при входе в viewport (IntersectionObserver)
- Форматирование чисел
- Поддержка префиксов и суффиксов

**HTML**:
```html
<div class="stat-number" data-target="500">0</div>
<span class="stat-label">участников</span>
```

**Использование**:
```javascript
const statsCounter = new StatsCounter();
statsCounter.init();
```

**Настройки**:
- Duration: 2000ms
- Easing: easeOutQuart

**Примеры метрик**:
- Участники сообщества
- Количество open source проектов
- Скачивания инструментов
- Количество контрибьюторов

#### 12. EOFContactForm3.js
**Назначение**: Обработка контактной формы для связи с сообществом

**Класс**: `ContactForm`

**Функционал**:
- Валидация полей
- Отправка данных (Fetch API)
- Показ уведомлений
- Сброс формы
- Защита от спама ( honeypot )

**Использование**:
```javascript
const contactForm = new ContactForm();
contactForm.init();
```

**Поля формы**:
- Имя
- Email
- Сообщение
- Тема (опционально)

**Сообщество**: Форма предназначена для связи с сообществом, предложений по сотрудничеству и вопросов об open source проектах.

#### 13. EOFPerformance3.js
**Назначение**: Оптимизация производительности для быстрой загрузки

**Класс**: `PerformanceOptimizer`

**Функционал**:
- Ленивая загрузка изображений
- Оптимизация анимаций
- Мониторинг FPS
- Управление качеством
- Кэширование ресурсов

**Использование**:
```javascript
const perf = new PerformanceOptimizer();
perf.optimize();
```

**Оптимизации**:
- Preload критических ресурсов
- Lazy load не критических изображений
- Сжатие и минификация (для production)
- Использование CDN для статических ресурсов

**Сообщество**: Производительность важна для доступности проекта всем участникам сообщества.

#### 14. EOFLazyLoad3.js
**Назначение**: Ленивая загрузка изображений

**Класс**: `LazyLoader`

**Функционал**:
- Наблюдение за изображениями с `data-src`
- Подгрузка при приближении к viewport
- Плейсхолдеры
- Кэширование

**HTML**:
```html
<img data-src="image.jpg" class="lazy" alt="Описание">
```

**Использование**:
```javascript
const lazyLoader = new LazyLoader();
lazyLoader.init();
```

**Сообщество**: Экономит трафик и ускоряет загрузку для пользователей с ограниченным интернетом.

#### 15. EOFNotification3.js
**Назначение**: Уведомления (toast, alerts) для обратной связи

**Класс**: `Notification`

**Функционал**:
- Показ временных уведомлений
- Типы: success, error, warning, info
- Автоматическое скрытие
- Очередь уведомлений
- Доступность (ARIA)

**Использование**:
```javascript
Notification.show('Сообщение отправлено!', 'success');
Notification.show('Ошибка отправки', 'error');
```

**Сообщество**: Уведомления помогают сообществу понимать статус операций (отправка формы, загрузка данных и т.д.).

#### 16. EOFTextSplit3.js
**Назначение**: Разделение текста для анимаций

**Класс**: `TextSplitter`

**Функционал**:
- Разделение текста на буквы/слова
- Анимация появления
- Сборка обратно

**Использование**:
```javascript
const splitter = new TextSplitter('.hero-title');
splitter.split();
```

**Сообщество**: Создает привлекательные анимации для вовлечения посетителей сообщества.

### Расширенные эффекты

#### 17. EOFMagnetic3.js
**Назначение**: Магнитные кнопки для улучшения UX

**Класс**: `MagneticButton`

**Функционал**:
- Притягивание кнопки к курсору
- Плавное возвращение в исходное положение
- Настройка радиуса притяжения

**Использование**:
```javascript
const magnetic = new MagneticButton('.btn-primary');
magnetic.init();
```

**Сообщество**: Улучшает интерактивность кнопок призыва к действию (CTA) для вовлечения сообщества.

#### 18. EOFMouseReactive3.js
**Назначение**: Реакции на движение мыши

**Класс**: `MouseReactive`

**Функционал**:
- Трекинг позиции мыши
- Эффекты свечения, искажения
- 3D трансформации элементов

**Использование**:
```javascript
const reactive = new MouseReactive('.hero-visual');
reactive.init();
```

**Сообщество**: Создает иммерсивный опыт для посетителей сайта сообщества.

#### 19. EOFReducedMotion3.js
**Назначение**: Учет предпочтений движения (доступность)

**Класс**: `ReducedMotion`

**Функционал**:
- Проверка `prefers-reduced-motion`
- Отключение анимаций при необходимости
- Замена на мгновенные переходы

**Использование**:
```javascript
const motion = new ReducedMotion();
if (motion.shouldReduce()) {
    // Отключить анимации
}
```

**Сообщество**: Обеспечивает доступность сайта для всех пользователей, включая тех, кто предпочитает минимизировать анимации.

### Canvas

#### 20. EOFCanvasAnimation3.js
**Назначение**: Canvas анимации (если используется отдельно от фона)

**Класс**: `CanvasAnimation`

**Функционал**:
- Рисование на canvas
- Анимация кадров
- Обработка resize
- Оптимизация рендеринга

**Использование**:
```javascript
const canvasAnim = new CanvasAnimation('canvas-id');
canvasAnim.start();
```

**Сообщество**: Canvas используется для создания интерактивных визуализаций, которые могут быть расширены сообществом.

### Дополнительные модули

#### 21. EOFCanvas3.js
Утилитарный модуль для работы с canvas элементами.

#### 22. EOFContactLink3.js
Обработка кликов по контактным ссылкам.

#### 23. EOFServiceImg3.js
Загрузка и оптимизация изображений для карточек проектов.

#### 24. EOFPortfolioImg3.js
Загрузка и оптимизация изображений для портфолио.

#### 25. EOFAboutImg3.js
Загрузка и оптимизация изображений для раздела "О сообществе".

#### 26. EOFServiceRect3.js
Рендеринг прямоугольников для карточек проектов.

**Примечание**: Эти модули могут быть утилитарными или неиспользуемыми. Сообщество может помочь в их рефакторинге и оптимизации.

## Общие паттерны

### Инициализация
```javascript
class ModuleName {
    constructor() {
        this.init();
    }

    init() {
        if (this.shouldInitialize()) {
            this.cacheElements();
            this.bindEvents();
            this.startAnimation();
        }
    }

    shouldInitialize() {
        // Проверка наличия необходимых элементов
        return document.querySelector('.required-element') !== null;
    }

    cacheElements() {
        this.elements = {
            container: document.querySelector('.container'),
            items: document.querySelectorAll('.item')
        };
    }

    bindEvents() {
        // Привязка обработчиков
    }

    startAnimation() {
        // Запуск анимаций (если нужно)
    }
}

// Автоматическая инициализация
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new ModuleName());
} else {
    new ModuleName();
}
```

### Fetch API
```javascript
loadData(url) {
    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error('Network error');
            return response.json();
        })
        .then(data => this.render(data))
        .catch(error => {
            console.error('Error:', error);
            this.showError();
        });
}
```

### RequestAnimationFrame
```javascript
animate() {
    this.update();

    // Проверка, нужно ли продолжать анимацию
    if (this.isActive) {
        this.animationFrame = requestAnimationFrame(() => this.animate());
    }
}

start() {
    this.isActive = true;
    this.animate();
}

stop() {
    this.isActive = false;
    if (this.animationFrame) {
        cancelAnimationFrame(this.animationFrame);
    }
}
```

### IntersectionObserver
```javascript
initObserver() {
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, options);

    document.querySelectorAll('.reveal').forEach(el => {
        this.observer.observe(el);
    });
}
```

## Безопасность

### XSS защита
- Экранирование пользовательского ввода при рендеринге
- Использование `textContent` вместо `innerHTML` где возможно
- Валидация данных перед использованием

### CORS
- Все fetch запросы к локальным файлам (same-origin)
- При необходимости настройка CORS на сервере

### LocalStorage
- Только для нечувствительных данных (история чата)
- Проверка на доступность (try-catch)
- Очистка при необходимости

## Производительность

### Оптимизации
1. **Кэширование DOM**: все элементы сохраняются в `this.elements`
2. **Делегирование событий**: обработчики на родителях
3. **Throttle/Debounce**: для частых событий (scroll, resize, mousemove)
4. **requestAnimationFrame**: для анимаций
5. **IntersectionObserver**: для ленивой загрузки и reveal

### Память
- Удаление обработчиков при уничтожении модуля
- Отмена animationFrame
- Очистка observer'ов

## Вклад в проект

Мы приветствуем вклад сообщества!

### Как внести вклад:
1. Fork репозитория
2. Создайте ветку для новой функциональности
3. Внесите изменения
4. Отправьте Pull Request
5. Пройдите code review

### Стандарты кода:
- Используйте ES6+ синтаксис
- Следуйте существующему стилю кода
- Добавляйте комментарии для сложной логики
- Пишите тесты для новых модулей
- Обновляйте документацию

### Лицензия:
MIT License - свободное использование, модификация и распространение.

## Отладка

### Console логи
```javascript
if (localStorage.getItem('debug') === 'true') {
    console.log('Module debug info:', this);
}
```

### Error handling
```javascript
try {
    // Код
} catch (error) {
    console.error('ModuleName error:', error);
    // Уведомление пользователю при необходимости
}
```

## Тестирование

### Unit тесты (рекомендуется)
```javascript
describe('GlobalBackground', () => {
    test('creates 5 orbs', () => {
        const bg = new GlobalBackground();
        expect(bg.orbs.length).toBe(5);
    });
});
```

### Ручное тестирование
- Проверка в разных браузерах
- Тестирование на мобильных устройствах
- Проверка производительности (Lighthouse)
- Проверка доступности (a11y)

---

*Версия: 1.0.0* | *Лицензия: MIT* | *Проект открыт для сообщества*