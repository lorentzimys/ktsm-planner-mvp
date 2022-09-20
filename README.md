# Коротко  о приложении:
- Приложение сделано на основе create-react-app (https://reactdev.ru/libs/cra/)
- Стек: React+Redux+TypeScript


## Макет приложения:
 - Заголовок
 - Кнопки выбора экрана | Кнопки действий ("Импорт JSON","Запусить планирование", "Посмотреть логи")
 - Блок с содержимым экрана (таблица или расписание)
 - Внизу - строка состояния (стилизована под терминал)


## Описание функциональности (что надо сделать)
- Приложение состоит из двух экранов:
	- Выбор партий (/)
	- План производства (/plan)
- На экране "Выбор партий" отображается таблица с номенклатурой оборудования 
- На экране "План производства" - диаграмма Гантта (или скорее всего Шедулер)

- При нажатии на кнопку "Импорт JSON" - в таблицу загружаются данные из файла ( eg.: ./src/mocks/import.json). Если файл невалиден - вывести в строку состояния логи импорта. Строку состояния можно стилизовать под вывод термила.

- В таблице есть возможность сортировки по колонкам (достаточно по основным), а так же возможность выбора строк с помощью колонки с checkbox, возможно выбрать все строки.

- После того, как данные загружены, кнопка "Запустить планирование" становится активной (до этого она неактивна)

- Экран "План производства" тоже не активен до тех пор, пока не было загружено данных в систему

- При нажатии на кнопку "Запустить планирование" - на бэкэнд отправляется запрос (api пока нет) на запуск планирования. В тело запроса передаются данные (формат пока неизвестен) по выбранным строкам. Возможно эту часть лучше реализовать черзе веб сокеты. Eсть смысл держать открытое соединение, так как планирование - продолжительный процесс и могут приходить какие то апдейты по статусу планирования, который было бы клево отображать в интерфейсе

- Все ответы от планирования и импорта пишутся в логи, которые выводятся в различных табах строки состояния (наподобие терминала VSCODE). 

- Строка состояния имеет возможность схлопывания и расхлопывания


## App start

# YAML test

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
