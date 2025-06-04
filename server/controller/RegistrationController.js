// Данные подключения к БД
import {auth_key, base_name} from "../ServerData.js";
// Сервер
import express from "express";

import Airtable from "airtable-node";
import {reformaterBodyData, reFormaterResponseData} from "../ServerDataFunction.js";

/*
* Работа с роутом (уникальным путем контроллера)
* RegistrationController: работа с заявками на регистрацию
*/
const router = express.Router();

// Инициализация Airtable для таблицы registrations
const airtable = new Airtable({apiKey: auth_key})
    .base(base_name)
    .table("registrations");


/*
    description: Маршрут для создания новой заявки
    router: http://localhost:3010/api/registrations/
    type: post
    body: {
        FullName: string (required),
        Phone: string (required),
        Group: string
    }
*/
router.post("/", (req, res) => {
    const registrationData = reformaterBodyData([req.body])[0];
    
    // Валидация обязательных полей
    if (!registrationData.FullName) {
        return res.status(400).json({message: "ФИО обязательно для заполнения"});
    }
    if (!registrationData.Phone) {
        return res.status(400).json({message: "Телефон обязателен для заполнения"});
    }

    airtable.create({
        fields: registrationData
    }).then(resp => {
        // Проверяем наличие ошибок в ответе
        if (resp.error) {
            return res.status(500).json({message: "Произошла ошибка сервера", error: resp.error});
        }

        // Если запись успешно добавлена, возвращаем её
        const registration = reFormaterResponseData([resp])[0];
        return res.status(200).json(registration);
    })
    .catch(err => {
        console.error(err);
        return res.status(500).json({message: "Произошла ошибка при добавлении записи", error: err});
    });
});

export default router;