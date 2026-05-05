# Простая адаптивность сайта КВАНТОРА

## Обзор

Сайт использует **простую адаптивность** - контент плавно подстраивается под ширину экрана без сложных медиа-запросов и множества breakpoints.

## Принципы

1. **Mobile-first базовые стили** - все элементы изначально адаптивны
2. **Единые адаптивные единицы** - `clamp()`, `%`, `vw`, `auto-fit`
3. **Минимум медиа-запросов** - только для критических изменений (мобильное меню, скрытие элементов)
4. **Плавные переходы** - без резких скачков между размерами

## Ключевые CSS техники

### 1. Адаптивная типографика

```css
h1 { font-size: clamp(1.5rem, 5vw, 3rem); }
h2 { font-size: clamp(1.25rem, 4vw, 2rem); }
p { font-size: clamp(0.875rem, 2.5vw, 1rem); }
```

**Как работает**:
- Минимум: 1.5rem (24px) - читабельно на телефонах
- Предпочтительный: 5vw - масштабируется с экраном
- Максимум: 3rem (48px) - не растёт слишком большим на широких экранах

### 2. Адаптивные отступы

```css
section {
    padding: clamp(60px, 10vh, 100px) 0;
}

.section-header {
    margin-bottom: clamp(30px, 5vh, 60px);
}
```

### 3. Гибкие гриды

```css
.services-grid,
.portfolio-grid {
    display: grid;
    gap: clamp(16px, 3vw, 32px);
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
}
```

**Объяснение**:
- `auto-fit` - автоматически заполняет доступное пространство
- `minmax(min(100%, 280px), 1fr)` - минимальная ширина 280px или 100% на очень узких экранах
- Плавное изменение количества колонок от 1 до N в зависимости от ширины

### 4. Адаптивные кнопки

```css
.btn {
    padding: clamp(10px, 2vw, 16px) clamp(20px, 4vw, 32px);
    font-size: clamp(0.875rem, 2vw, 1rem);
}
```

### 5. Контейнеры

```css
.container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 clamp(16px, 4vw, 64px);
}
```

## Медиа-запросы (только 2)

### 1. Мобильные устройства (≤768px)

```css
@media (max-width: 768px) {
    /* Гамбургер меню */
    .nav-menu {
        position: fixed;
        top: 60px;
        left: 0;
        right: 0;
        background: var(--color-bg-secondary);
        flex-direction: column;
        padding: 20px;
        transform: translateY(-100%);
        opacity: 0;
        transition: all 0.3s ease;
    }

    .nav-menu.active {
        transform: translateY(0);
        opacity: 1;
    }

    .nav-toggle {
        display: flex;
    }

    /* Скрываем визуальные элементы */
    .hero-visual,
    .about-visual {
        display: none;
    }

    /* Вертикальные футеры */
    .footer-content,
    .footer-bottom,
    .footer-extended {
        flex-direction: column;
        text-align: center;
    }

    .footer-links,
    .footer-legal-links {
        justify-content: center;
        flex-wrap: wrap;
    }

    /* Контактная форма */
    .contact-wrapper {
        grid-template-columns: 1fr;
    }

    .contact-info {
        text-align: center;
    }

    .contact-details {
        flex-direction: column;
        align-items: center;
    }

    .social-links {
        justify-content: center;
    }

    /* Чат */
    .chat-container {
        height: 400px;
    }

    /* Курсор */
    .cursor,
    .cursor-follower {
        display: none;
    }

    body {
        cursor: auto;
    }

    /* Кнопки на всю ширину */
    .btn {
        width: 100%;
    }

    /* Уменьшенные отступы */
    .container {
        padding: 0 16px;
    }

    section {
        padding: 40px 0;
    }
}
```

### 2. Десктоп (≥769px)

```css
@media (min-width: 769px) {
    /* Показываем визуальные элементы */
    .hero-visual,
    .about-visual {
        display: block;
    }

    /* Горизонтальное меню */
    .nav-toggle {
        display: none;
    }

    .nav-menu {
        display: flex;
        position: static;
        flex-direction: row;
        transform: none;
        opacity: 1;
        padding: 0;
        gap: 32px;
    }

    /* Увеличенные отступы */
    .container {
        padding: 0 48px;
    }

    section {
        padding: 80px 0;
    }

    .contact-form {
        padding: 32px;
    }

    /* Чат больше */
    .chat-container {
        height: 550px;
    }

    /* Плавающие карточки */
    .floating-card {
        display: block;
    }
}
```

## Что НЕ делается

❌ **Нет** сложных breakpoints (1024px, 1280px, 1920px)
❌ **Нет** отдельных стилей для планшетов/ноутбуков
❌ **Нет** landscape-specific стилей
❌ **Нет** ultra-wide специфики
❌ **Нет** DPI-specific стилей

✅ **Есть** плавная адаптация через `clamp()` и `auto-fit`
✅ **Есть** 2 простых медиа-запроса для мобильных/десктоп
✅ **Есть** минимальные необходимые изменения

## Преимущества простого подхода

1. **Поддерживаемость** - меньше кода, проще поддерживать
2. **Производительность** - меньше пересчётов стилей
3. **Предсказуемость** - контент плавно масштабируется
4. **Достаточно** - покрывает 95% случаев использования
5. **Безопасность** - меньше багов на разных устройствах

## Проверка

Просто измените ширину браузера - контент должен плавно:
- Увеличивать/уменьшать шрифты
- Перестраивать гриды (1→2→3→4 колонки)
- Увеличивать/уменьшать отступы
- Скрывать/показывать элементы (только 2 состояния)

## Примеры адаптации

### Навигация
- ≤768px: Гамбургер меню
- ≥769px: Горизонтальное меню

### Hero визуал
- ≤768px: Скрыт
- ≥769px: Показывается

### Кнопки
- На всех экранах: адаптивный padding и font-size через `clamp()`
- На мобильных: полная ширина (`width: 100%`)

### Grids
- Автоматически: 1 колонка на узких, 2-4 на широких
- Минимальная ширина карточки: 280px

### Footer
- Мобильные: вертикальный, центрированный
- Десктоп: горизонтальный, слева-справа

## Вклад в проект

При добавлении новых компонентов:
1. Используйте `clamp()` для размеров
2. Используйте `auto-fit` + `minmax()` для гридов
3. Добавляйте медиа-запросы только при необходимости
4. Тестируйте на ширине 320px - 1920px

---

*Версия: 1.0.0* | *Лицензия: MIT*