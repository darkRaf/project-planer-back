<a name="readme-top"></a>
# Project Planer - Backend

Jest to część backendowa, która służy jako serwer REST API dla aplikacji "Project Planer", którą znajdziesz <a href="https://github.com/darkRaf/project-planer-front" target="_blank">tutaj</a>. W tym projekcie wykorzystano framework Express, bazy MySQL oraz API pogodowe: <a href="https://openweathermap.org/api" target="_blank">openweathermap.org/api</a>


### Użyte technologie

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) 
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

### Baza danych
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)

### Użyte biblioteki

![express-async-errors](https://img.shields.io/badge/express--async--errors-brightgreen)
![cookie-parser](https://img.shields.io/badge/cookie--parser-brightgreen)
![express-rate-limit](https://img.shields.io/badge/express--rate--limit-brightgreen)
![cors](https://img.shields.io/badge/cors-brightgreen)
![bcryptjs](https://img.shields.io/badge/bcryptjs-brightgreen)
![dotenv](https://img.shields.io/badge/dotenv-brightgreen)
![jsonwebtoken](https://img.shields.io/badge/jsonwebtoken-brightgreen)
![mysql2](https://img.shields.io/badge/mysql2-brightgreen)
![node-fetch](https://img.shields.io/badge/node--fetch-brightgreen)
![uuid](https://img.shields.io/badge/uuid-brightgreen)

<p align="right"><<a href="#readme-top">⬆do góry</a>></p>

## Funkcjonalności

- [x] Rejestracja nowego użytkownika.
- [ ] Potwierdzenie rejestracji emailem.
- [x] Logowanie JWT.
- [x] Token sesji.
- [ ] Zmiana ustawień użytkownika (hasło/avatar).
- [x] Dodawanie nowego projektu.
- [ ] Edycja projektu.
- [x] Usunięcie projektu.
- [x] Dodanie nowej karty dla zadań.
- [x] Edycja karty.
- [ ] Usuwanie karty.
- [x] Dodanie nowego zadania.
- [x] Edycja zadania.
- [x] Usuwanie zadania.

<p align="right"><<a href="#readme-top">⬆do góry</a>></p>

## Link do strony

<a href="https://project-planer.rafal-13.smallhost.pl" target="_blank">www.project-planer</a>

<p align="right"><<a href="#readme-top">⬆do góry</a>></p>

## Zmienne środowiskowe
<!-- ## Environment Variables -->

Przed uruchomieniem, musisz dodać następujące zmienne środowiskowe do pliku `.env`
Serwer również wykorzystuje API pogodowe, które wymaga podania klucza. Taki klucz można uzyskać rejestrując się na stronie: <a href="https://openweathermap.org/api" target="_blank">openweathermap.org/api</a>.

Przykładowy plik znajdziesz pod nazwą `.env.example`. 

`PORT`

`ACCESS_TOKEN`

`REFRESH_TOKEN`

`DB_USER`

`DB_PASS`

`DB_NAME`

`DB_HOST`

`API_WEATHER_LINK`

`API_WEATHER_KEY`

<p align="right"><<a href="#readme-top">⬆do góry</a>></p>


## Uruchom lokalnie

Plik `db.sql` zawiera instrukcje do utworzenia bazy danaych.

Sklonuj repozytroium

```bash
  git clone https://github.com/darkRaf/project-planer-back.git
```
Przejdź do folderu

```bash
  cd project-planer-back
```

Zainstaluj zależności

```bash
  npm install
```

Uruchom

```bash
  npm run start
```

## Kontakt

E-mail: [rafał n.](mailto:rafal.nalewajek@gmail.com)

<p align="right"><<a href="#readme-top">⬆do góry</a>></p>

<a name="PL"></a>