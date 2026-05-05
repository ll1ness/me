# CSS Модули проекта КВАНТОРА

## Полный список CSS модулей

### Базовые модули

#### 1. EOFCSSVariables3.css
**Назначение**: CSS переменные и дизайн-система

**Ключевые переменные**:
```css
--color-bg: #0a0a0a
--color-text: #ffffff
--color-primary: #ffffff
--color-accent: #000000
--gradient-primary: linear-gradient(135deg, #ffffff, #e0e0e0, #000000)
--glass-bg: rgba(0, 0, 0, 0.3)
--glass-border: rgba(255, 255, 255, 0.1)
--shadow-sm, --shadow-md, --shadow-lg
--radius-sm (8px), --radius-md (12px), --radius-lg (20px), --radius-xl (32px)
--transition-fast (0.2s), --transition-normal (0.3s), --transition-slow (0.5s)
--font-family: 'Inter', sans-serif
```

**Использование**:
```css
.element {
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-md);
    transition: all var(--transition-normal);
}
```

#### 2. EOFCSSReset3.css
**Назначение**: Сброс стилей и глобальные базовые стили

**Что включает**:
- Box-sizing: border-box
- Удаление margin/padding по умолчанию
- Глобальные стили ссылок
- Глобальные стили кнопок
- Кастомный скроллбар
- Скрытие системного курсора

**Глобальные стили**:
```css
a {
    color: var(--color-primary);
    text-decoration: none;
    transition: color var(--transition-fast);
    cursor: none;
}

a:hover {
    color: var(--color-accent);
}

button {
    cursor: none;
    font-family: inherit;
    border: none;
    background: none;
    color: inherit;
}
```

#### 3. EOFcursor3.css
**Назначение**: Кастомный курсор

**Классы**:
- `.cursor` - основной курсор (кружок 12px)
- `.cursor-follower` - следящий кружок (40px)
- `.cursor.hover` - состояние наведения
- `.cursor-follower.hover` - состояние наведения для фолловера

**Особенности**:
```css
* {
    cursor: none !important; /* Скрываем системный курсор */
}

.cursor {
    mix-blend-mode: difference; /* Инверсия цвета */
    pointer-events: none; /* Клики проходят сквозь */
    z-index: 10000;
}
```

### Компоненты навигации

#### 4. EOFNavigation3.css
**Назначение**: Стили навигационного меню

**Классы**:
- `.nav` - контейнер навигации
- `.nav-container` - ограничивающий контейнер
- `.nav-logo` - логотип
- `.nav-menu` - список меню
- `.nav-link` - ссылка меню
- `.nav-toggle` - гамбургер (мобильное меню)

**Состояния**:
- `.nav.scrolled` - стили при прокрутке
- `.nav-toggle.active` - открытое меню
- `.nav-menu.active` - видимое меню

### Компоненты контента

#### 5. EOFContainer3.css
**Назначение**: Базовые контейнеры

**Классы**:
- `.container` - центрированный контейнер с max-width: 1280px и padding: 0 24px

#### 6. EOFSectionStyles3.css
**Назначение**: Базовые стили секций

**Классы**:
- `section` - базовые стили для всех секций
- `.section-header` - заголовок секции
- `.section-label` - метка (маленький текст)
- `.section-title` - основной заголовок

#### 7. EOFButtons3.css
**Назначение**: Стили кнопок

**Классы**:
- `.btn` - базовая кнопка
- `.btn-primary` - основная (градиент)
- `.btn-secondary` - вторичная (прозрачная)
- `.btn-full` - на всю ширину

**Особенности**:
```css
.btn {
    cursor: none; /* Для кастомного курсора */
    position: relative;
    overflow: hidden; /* Для эффектов при наведении */
}
```

### Анимации

#### 8. EOFAnimations3.css
**Назначение**: Анимации появления

**Классы**:
- `.reveal` - элемент скрыт
- `.reveal.active` - элемент виден (добавляется через JS)

**Эффекты**:
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

#### 9. EOFGlobalBackground3.css
**Назначение**: Интерактивный фон с орбами

**Классы**:
- `.global-background` - контейнер фона (fixed, z-index: -1)
- `.bg-orb` - базовая стилизация орбов
- `.bg-orb-1` ... `.bg-orb-5` - конкретные орбы с разными размерами/цветами

**Интерактивные состояния**:
- `.mouse-active .bg-orb` - реакция на мышь (ярче, больше blur)
- `.keyboard-press .bg-orb` - реакция на клавиши (еще ярче, насыщеннее)

**Цвета орбов**:
- bg-orb-1: Индиго (rgba(99, 102, 241, 0.6))
- bg-orb-2: Циан (rgba(6, 182, 212, 0.5))
- bg-orb-3: Розовый (rgba(236, 72, 153, 0.5))
- bg-orb-4: Желтый (rgba(255, 206, 84, 0.4))
- bg-orb-5: Циан (rgba(6, 182, 212, 0.3))

### Секции страниц

#### 10. EOFHero3.css
**Назначение**: Главная hero-секция

**Структура**:
```css
.hero {
    position: relative;
    min-height: 100vh;
    background: transparent; /* Прозрачный фон */
}

.hero::before {
    /* Легкий градиент для глубины */
    background: radial-gradient(ellipse at center, rgba(0,0,0,0.4) 0%, transparent 60%);
}

.hero-canvas {
    position: absolute;
    z-index: 0; /* Фон */
}

.hero-content {
    position: relative;
    z-index: 2; /* Контент поверх фона */
}
```

**Анимации**:
- `slideUp` - для строк заголовка
- `fadeIn` - для подзаголовка и CTA

#### 11. EOFHeroVisual3.css
**Назначение**: Визуальные элементы hero (плавающие карточки)

**Классы**:
- `.hero-visual` - контейнер
- `.floating-card` - карточка
- `.card-1`, `.card-2`, `.card-3` - позиционирование

**Анимация**:
```css
@keyframes floatCard {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
}
```

#### 12. EOFAboutSection3.css
**Назначение**: Секция "О сообществе"

**Классы**:
- `.about` - секция (transparent)
- `.about-content` - grid layout (1fr 1fr)
- `.about-text`, `.about-visual` - колонки
- `.stats-grid` - grid 2x2 для статистики
- `.stat-item` - карточка статистики

#### 13. EOFServiceSection3.css
**Назначение**: Секция "Проекты" (загружается из JSON)

**Классы**:
- `.services` - секция (transparent)
- `.services-grid` - grid с auto-fit
- `.service-card` - карточка проекта

**Эффекты**:
```css
.service-card::before {
    /* Верхняя полоска при наведении */
    transform: scaleX(0);
    transition: transform var(--transition-normal);
}

.service-card:hover::before {
    transform: scaleX(1);
}
```

#### 14. EOFPortfolioSection3.css
**Назначение**: Секция "Портфолио" (open source проекты)

**Классы**:
- `.portfolio` - секция (transparent)
- `.portfolio-filters` - кнопки фильтров
- `.portfolio-grid` - grid для работ
- `.portfolio-item` - элемент портфолио
- `.portfolio-overlay` - оверлей при наведении

#### 15. EOFContactSection3.css
**Назначение**: Секция "Контакты"

**Классы**:
- `.contact` - секция (transparent)
- `.contact-wrapper` - grid 1fr 1fr
- `.contact-info`, `.contact-form` - колонки
- `.social-links`, `.social-link` - соцсети

#### 16. EOFASCII3.css
**Назначение**: ASCII арт секция

**Классы**:
- `.ascii-section` - секция (transparent)
- `.ascii-container` - контейнер
- `.ascii-title` - преформатированный текст
- `.ascii-subtitle` - подзаголовок

**Особенности**:
```css
.ascii-title {
    background: transparent; /* Убран фон */
    border-top/bottom: 1px solid var(--glass-border);
    border-radius: var(--radius-md);
}
```

### Вспомогательные модули

#### 17. EOFFooter3.css
**Назначение**: Базовый футер

**Классы**:
- `.footer` - контейнер футера
- `.footer-content` - верхняя часть
- `.footer-logo` - лого
- `.footer-links` - быстрые ссылки
- `.footer-bottom` - нижняя часть
- `.footer-legal` - юридическая информация

**Текущий стиль**: `background: #1a1a1a` (темно-серый)

#### 18. EOFFooterExtended3.css
**Назначение**: Расширенный футер с колонками

**Классы**:
- `.footer-extended` - расширенная часть
- `.footer-section` - колонка
- `.footer-legal-links` - ссылки на документы

#### 19. EOFResponsive3.css
**Назначение**: Медиа-запросы для адаптивности

**Точки останова**:
- 768px (мобильные)
- 1024px (планшеты)
- 1280px (десктоп)

#### 20. EOFResponsiveFooter3.css
**Назначение**: Адаптивность футера

#### 21. EOFResponsiveChat3.css
**Назначение**: Адаптивность чата

#### 22. EOFUtility3.css
**Назначение**: Утилитарные классы

**Примеры**:
- `.text-center`, `.text-left`, `.text-right`
- `.mt-1`, `.mt-2`, `.mb-1`, `.mb-2` (margin)
- `.hidden` (display: none)
- `.sr-only` (для скринридеров)

#### 23. EOFPerformance3.css
**Назначение**: Оптимизации производительности

**Техники**:
- `content-visibility: auto` для тяжелых секций
- `contain: layout style` для изоляции
- `transform: translateZ(0)` для GPU ускорения

#### 24. EOFCanvas3.css
**Назначение**: Стили для canvas элементов

#### 25. EOFServiceImg3.css
**Назначение**: Стили изображений в карточках проектов

#### 26. EOFPortfolioImg3.css
**Назначение**: Стили изображений портфолио

**Классы**:
- `.portfolio-img` - объект-fit: cover
- `.portfolio-image` - контейнер

#### 27. EOFAboutImg3.css
**Назначение**: Стили изображений в about секции

#### 28. EOFContactLink3.css
**Назначение**: Стили ссылок в контактах

#### 29. EOFServiceRect3.css
**Назначение**: Прямоугольные элементы проектов

#### 30. EOFMouseReactive3.css
**Назначение**: Реакции на мышь

#### 31. EOFScrollIndicator3.css
**Назначение**: Индикатор прокрутки

**Классы**:
- `.scroll-indicator` - контейнер
- `.mouse` - мышка
- `.wheel` - колесико

**Анимация**:
```css
@keyframes scroll {
    0% { opacity: 1; transform: translateY(0); }
    100% { opacity: 0; transform: translateY(12px); }
}
```

## Порядок подключения

Важно! Порядок подключения CSS файлов влияет на каскад:

1. Переменные (должны быть первыми)
2. Reset (сбрасывает все)
3. Базовые компоненты (cursor, navigation, container)
4. Секции (hero, about, services, portfolio, contact)
5. Вспомогательные (buttons, animations, utilities)
6. Адаптивные (responsive)
7. Специфичные (chat, footer extended)

## Лучшие практики

### 1. Использование переменных
Всегда используйте CSS переменные вместо жестких значений:
```css
/* ❌ Плохо */
.element {
    color: #ffffff;
    border-radius: 12px;
}

/* ✅ Хорошо */
.element {
    color: var(--color-text);
    border-radius: var(--radius-md);
}
```

### 2. Специфичность
- Избегайте `!important` кроме случаев с курсором
- Используйте классы вместо вложенных селекторов
- БЕМ методология для именования

### 3. Анимации
- Используйте `transform` и `opacity` (GPU ускорение)
- Добавляйте `will-change` для сложных анимаций
- Учитывайте `prefers-reduced-motion`

### 4. Производительность
- Минимизируйте `box-shadow` и `filter: blur()`
- Используйте `contain` для изоляции компонентов
- Оптимизируйте медиа-запросы

## Типичные проблемы и решения

### Проблема: Курсор не меняется
**Решение**: Убедитесь, что `EOFcursor3.css` подключен и есть `* { cursor: none !important; }`

### Проблема: Анимации не работают
**Решение**: Проверьте порядок CSS (EOFAnimations3.css должен быть после основных стилей)

### Проблема: Фон перекрывает контент
**Решение**: Проверьте z-index:
- global-background: -1
- hero-canvas: 0
- hero-content: 2

### Проблема: Стили не применяются
**Решение**: Проверьте порядок загрузки CSS, очистите кэш браузера

---

*Версия: 1.0.0 | Последнее обновление: 2024*