import express from "express";
import cors from "cors";


const app = express();
//Указываем порт
const port = 3010;
// Middleware
app.use(cors({
    origin: 'http://localhost:5173', // или ваш фронтенд URL
    methods: ['GET', 'POST', 'PUT'],
    allowedHeaders: ['Content-Type']
  }));// Разрешаем запросы с фронтенда
app.use(express.json()); // Для обработки JSON-тела запросов

(async () => {
    //В дальнейшем тут будут прописаны контроллеры запросов

    const {default: UserController} = await import('./controller/UserController.js');
    app.use('/api/users', UserController);

    const {default: RegistrationController} = await import('./controller/RegistrationController.js');
    app.use('/api/registrations', RegistrationController);


    app.listen(3000, () => { //Подключение сервера
        console.log('Server is running on port 3000');
    });
})();