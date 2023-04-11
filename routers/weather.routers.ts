import { Request, Router } from 'express';
import fetch from 'node-fetch';

type RequestWeather = Request & { lat: string; lon: string };

export const weatherRouters = Router().get('/:lat/:lon', async (req: RequestWeather, res) => {
  const { lat, lon } = req.params;

  const latitude = lat || 52.2298;
  const longitude = lon || 21.0118;

  const api_link = process.env.API_WEATHER_LINK;
  const API_KEY = process.env.API_WEATHER_KEY;
  const api_units = '&units=metric';

  const URL = `${api_link}lat=${latitude}&lon=${longitude}&appid=${API_KEY}&lang=pl${api_units}`;

  const resposne = await fetch(URL);
  const data = await resposne.json();

  res.json(data);
});
