**Репозиторий тестов Cypress GB**

Установка и запуск cypress с помощью npm


Для установки необходим Node.js 16

1. npm install
2. Для запуска UI Cypress - npm run cypress:open
3. Для запуска всех тестов в CLI с репортером - npm run cypress:run


## Структура проекта

```
├── cypress
|   └── e2e                      
|       └──                         // e2e тесты           
├── fixtures                   
|   └── basePaths.json              // Базовые url
|   ├── users.json                  // Данные учетных записей 
├── support
|   └── commands.js                 // Дополнительные команды 
|   ├── e2e.js                      // Конфигурация e2e тестов
├── .gitignore
├── README.md
├── cypress.config.js
├── package-lock.json
└── package.json
```

