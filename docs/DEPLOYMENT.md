# Развертывание проекта КВАНТОРА

## Открытый проект для сообщества

Это руководство описывает, как развернуть проект КВАНТОРА - открытый проект для сообщества разработчиков. Все deployment инструкции доступны под лицензией MIT и предназначены для совместного использования.

## Быстрый старт

### 1. Клонирование и установка

```bash
# Клонировать репозиторий
git clone https://github.com/kvantora/poligon-ii.git
cd полигон-ИИ

# Установить зависимости (если есть package.json)
npm install
```

**Примечание**: Проект не требует коммерческих зависимостей. Все зависимости open source.

### 2. Локальный запуск

#### Вариант A: Простой HTTP сервер (Python)
```bash
# Python 3
python3 -m http.server 8080

# Или Python 2
python -m SimpleHTTPServer 8080
```

#### Вариант B: Node.js сервер
```bash
# Установить serve глобально
npm install -g serve

# Запустить
serve -p 8080
```

#### Вариант C: Live Server (VS Code)
1. Установить расширение "Live Server"
2. Правой кнопкой по `index.html` → "Open with Live Server"

### 3. Открытие в браузере

```
http://localhost:8080
```

## Сборка для продакшена

### Оптимизация CSS

#### Минификация
```bash
# Установить cssnano
npm install -g cssnano

# Минифицировать все CSS файлы
cssnano eofcss3/*.css dist/
```

#### Объединение (опционально)
Создать единый CSS файл для уменьшения HTTP запросов:

```bash
# Объединить в правильном порядке
cat eofcss3/EOFCSSVariables3.css \
    eofcss3/EOFCSSReset3.css \
    eofcss3/EOFcursor3.css \
    eofcss3/EOFNavigation3.css \
    eofcss3/EOFContainer3.css \
    eofcss3/EOFSectionStyles3.css \
    eofcss3/EOFButtons3.css \
    eofcss3/EOFAnimations3.css \
    eofcss3/EOFGlobalBackground3.css \
    eofcss3/EOFHero3.css \
    eofcss3/EOFHeroVisual3.css \
    eofcss3/EOFAboutSection3.css \
    eofcss3/EOFServiceSection3.css \
    eofcss3/EOFPortfolioSection3.css \
    eofcss3/EOFContactSection3.css \
    eofcss3/EOFASCII3.css \
    eofcss3/EOFFooter3.css \
    eofcss3/EOFFooterExtended3.css \
    eofcss3/EOFResponsive3.css \
    eofcss3/EOFResponsiveFooter3.css \
    eofcss3/EOFResponsiveChat3.css \
    eofcss3/EOFUtility3.css \
    eofcss3/EOFPerformance3.css \
    eofcss3/EOFCanvas3.css \
    eofcss3/EOFServiceImg3.css \
    eofcss3/EOFPortfolioImg3.css \
    eofcss3/EOFAboutImg3.css \
    eofcss3/EOFContactLink3.css \
    eofcss3/EOFServiceRect3.css \
    eofcss3/EOFMouseReactive3.css \
    eofcss3/EOFScrollIndicator3.css \
    > dist/css/styles.min.css
```

### Оптимизация JavaScript

#### Минификация
```bash
# Установить terser
npm install -g terser

# Минифицировать JS файлы
terser eofjs3/*.js -c -m -o dist/js/
```

#### Объединение
```bash
cat eofjs3/EOFcursor3.js \
    eofjs3/EOFNavigation3.js \
    eofjs3/EOFScrollReveal3.js \
    eofjs3/EOFGlobalBackground3.js \
    eofjs3/EOFInit3.js \
    eofjs3/EOFServiceLoader3.js \
    eofjs3/EOFPortfolioLoader3.js \
    eofjs3/EOFPortfolioFilterDynamic3.js \
    eofjs3/EOFStatsCounter3.js \
    eofjs3/EOFContactForm3.js \
    eofjs3/EOFChat3.js \
    eofjs3/EOFCanvasAnimation3.js \
    eofjs3/EOFParallax3.js \
    eofjs3/EOFMagnetic3.js \
    eofjs3/EOFMouseReactive3.js \
    eofjs3/EOFReducedMotion3.js \
    eofjs3/EOFPerformance3.js \
    eofjs3/EOFLazyLoad3.js \
    eofjs3/EOFNotification3.js \
    eofjs3/EOFTextSplit3.js \
    > dist/js/scripts.js
```

### Оптимизация изображений

```bash
# Установить imagemin
npm install -g imagemin-cli imagemin-mozjpeg imagemin-pngquant imagemin-svgo

# Оптимизировать все изображения
imagemin images/* --out-dir=dist/images
```

### Создание структуры продакшена

```
dist/
├── index.html
├── about.html
├── services.html
├── portfolio.html
├── contact.html
├── blog.html
├── careers.html
├── privacy.html
├── terms.html
├── logo.png
├── services.json
├── portfolio.json
├── css/
│   └── styles.min.css
├── js/
│   └── scripts.min.js
└── images/
    └── (оптимизированные изображения)
```

## Развертывание на хостинге

### 1. Статические хостинги (рекомендуется для open source)

#### GitHub Pages
```bash
# Собрать проект
npm run build

# Отправить в gh-pages ветку
git add dist
git commit -m "Build for production"
git subtree push --prefix dist origin gh-pages
```

**Настройка GitHub Pages**:
1. Перейдите в настройки репозитория (Settings)
2. Выберите "Pages" в боковом меню
3. В "Source" выберите "Deploy from a branch"
4. Выберите ветку `gh-pages` и папку `/root`
5. Сохраните

#### Netlify
```bash
# Установить Netlify CLI
npm install -g netlify-cli

# Развернуть
netlify deploy --prod --dir=dist
```

**Настройка Netlify**:
1. Import project из GitHub
2. Настройте build command: `npm run build`
3. Publish directory: `dist`
4. Environment variables (если нужны)

#### Vercel
```bash
# Установить Vercel CLI
npm install -g vercel

# Развернуть
vercel --prod
```

**Настройка Vercel**:
1. Import project из GitHub
2. Framework preset: "Other"
3. Output directory: `dist`
4. Build command: `npm run build`

### 2. VPS / Dedicated Server

#### Настройка Nginx
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/kvantora/dist;
    index index.html;

    # Кэширование статики
    location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # HTML файлы - без кэширования
    location ~* \.html$ {
        expires 1h;
        add_header Cache-Control "public, must-revalidate";
    }

    # Gzip сжатие
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

    # Безопасность
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # HTTPS (если есть SSL)
    # listen 443 ssl http2;
    # ssl_certificate /path/to/cert.pem;
    # ssl_certificate_key /path/to/key.pem;
}
```

#### Настройка Apache
```apache
<VirtualHost *:80>
    ServerName yourdomain.com
    DocumentRoot /var/www/kvantora/dist

    <IfModule mod_expires.c>
        ExpiresActive On
        ExpiresByType text/css "access plus 1 year"
        ExpiresByType application/javascript "access plus 1 year"
        ExpiresByType image/png "access plus 1 year"
        ExpiresByType image/jpg "access plus 1 year"
        ExpiresByType image/svg+xml "access plus 1 year"
        ExpiresByType text/html "access plus 1 hour"
    </IfModule>

    <IfModule mod_headers.c>
        Header set X-Frame-Options "SAMEORIGIN"
        Header set X-Content-Type-Options "nosniff"
        Header set X-XSS-Protection "1; mode=block"
    </IfModule>
</VirtualHost>
```

### 3. Docker развертывание

#### Dockerfile
```dockerfile
FROM nginx:alpine

# Копировать собранные файлы
COPY dist/ /usr/share/nginx/html/

# Копировать конфиг nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
```

#### nginx.conf
```nginx
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Кэширование
    location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Gzip
    gzip on;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/json;
}
```

#### Сборка и запуск
```bash
# Собрать образ
docker build -t kvantora .

# Запустить контейнер
docker run -d -p 8080:80 kvantora
```

## CI/CD пайплайн

### GitHub Actions

#### .github/workflows/deploy.yml
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3

    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'

    - name: Install dependencies
      run: npm ci

    - name: Build
      run: |
        mkdir -p dist
        # Объединение и минификация CSS
        cat eofcss3/*.css > dist/styles.css
        npx cssnano dist/styles.css dist/styles.min.css
        # Объединение и минификация JS
        cat eofjs3/*.js > dist/scripts.js
        npx terser dist/scripts.js -c -m -o dist/scripts.min.js
        # Копирование остальных файлов
        cp *.html dist/
        cp *.json dist/
        cp logo.png dist/

    - name: Deploy to Netlify
      uses: nwtgck/actions-netlify@v1.2
      with:
        publish-dir: './dist'
        production-branch: main
        github-token: ${{ secrets.GITHUB_TOKEN }}
        netlify-auth-token: ${{ secrets.NETLIFY_AUTH_TOKEN }}
        netlify-site-id: ${{ secrets.NETLIFY_SITE_ID }}
```

**Сообщество**: CI/CD пайплайн открыт для улучшений. Вклад принимается через Pull Requests.

## Мониторинг и аналитика

### Google Analytics (опционально)
Добавить в `<head>` всех страниц:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Lighthouse CI
```bash
# Установить
npm install -g @lhci/cli

# Запустить аудит
lhci autorun
```

**Сообщество**: Мониторинг помогает поддерживать качество проекта. Сообщество может добавлять новые метрики.

## Безопасность

### HTTPS
Обязательно использовать HTTPS в продакшене:
- Let's Encrypt (бесплатно)
- Cloudflare SSL
- SSL от хостинг-провайдера

### Заголовки безопасности
```nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';" always;
```

### CORS
Для API запросов настроить CORS на сервере:
```nginx
add_header Access-Control-Allow-Origin "https://yourdomain.com" always;
add_header Access-Control-Allow-Methods "GET, POST, OPTIONS" always;
add_header Access-Control-Allow-Headers "Content-Type" always;
```

## Резервное копирование

### Автоматический бэкап
```bash
#!/bin/bash
# backup.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/kvantora"
SOURCE_DIR="/var/www/kvantora/dist"

tar -czf $BACKUP_DIR/backup_$DATE.tar.gz $SOURCE_DIR

# Удалить старые бэкапы (старше 30 дней)
find $BACKUP_DIR -name "*.tar.gz" -mtime +30 -delete
```

### Cron задание
```bash
# Ежедневный бэкап в 2:00
0 2 * * * /path/to/backup.sh
```

## Обновление проекта

### Процесс деплоя
1. Сделать pull изменений
2. Запустить сборку (`npm run build`)
3. Проверить в staging среде
4. Развернуть на продакшен
5. Очистить кэши (если нужно)
6. Проверить работоспособность

### Откат изменений
```bash
# Если используется Git
git revert <commit-hash>
npm run build
# Перезапустить сервер

# Или восстановить из бэкапа
tar -xzf backup_20240101_120000.tar.gz -C /var/www/kvantora/
```

## Вклад в deployment процесс

Мы приветствуем вклад сообщества в улучшение deployment процесса!

### Как внести вклад:
1. Fork репозитория
2. Создайте ветку для улучшений
3. Внесите изменения в deployment конфигурации
4. Отправьте Pull Request
5. Пройдите code review

### Что можно улучшить:
- Добавить новые хостинг-провайдеры
- Улучшить CI/CD пайплайн
- Добавить автоматические тесты
- Улучшить безопасность
- Оптимизировать производительность

### Deployment best practices для сообщества:
- Используйте версионирование для CSS/JS файлов
- Настройте автоматические бэкапы
- Мониторьте производительность
- Следуйте принципам безопасности
- Документируйте изменения

## Troubleshooting

### Проблема: CSS/JS не обновляются
**Решение**: Очистить кэш браузера или добавить версионирование:
```html
<link rel="stylesheet" href="css/styles.min.css?v=1.0.0">
<script src="js/scripts.min.js?v=1.0.0"></script>
```

### Проблема: 404 на страницах
**Решение**: Настроить fallback на index.html для SPA:
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

### Проблема: Медленная загрузка
**Решение**:
- Включить gzip сжатие
- Оптимизировать изображения
- Использовать CDN
- Минифицировать CSS/JS

### Проблема: Курсор не отображается
**Решение**: Проверить, что `EOFcursor3.css` загрузился и нет ошибок в консоли.

### Проблема: JSON файлы не загружаются
**Решение**: Убедиться, что сервер правильно обслуживает JSON файлы с правильным MIME типом (`application/json`).

## Поддержка

При проблемах с развертыванием:
1. Проверить логи сервера
2. Проверить консоль браузера (F12)
3. Проверить Network вкладку
4. Обратиться в Issues на GitHub
5. Обратиться в поддержку хостинга

## Сообщество

Проект КВАНТОРА - это open source проект для сообщества. Все deployment инструкции свободно доступны и могут быть улучшены сообществом.

- **GitHub**: https://github.com/kvantora
- **Issues**: https://github.com/kvantora/poligon-ii/issues
- **Discussions**: https://github.com/kvantora/poligon-ii/discussions

---

*Версия: 1.0.0* | *Лицензия: MIT* | *Проект открыт для сообщества*