const Advice = require('../models/Advice');
const Farm = require('../models/Farm');
const axios = require('axios');
const { GoogleGenerativeAI } = require('@google/generative-ai'); // Import the SDK

// Initialize Gemini
// Ensure GEMINI_API_KEY is in your .env file
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Helper: Fetch weather data
const fetchWeatherData = async (latitude, longitude) => {
  try {
    const response = await axios.get(process.env.WEATHER_API_URL + '/weather', {
      params: {
        lat: latitude,
        lon: longitude,
        appid: process.env.WEATHER_API_KEY,
        units: 'metric',
      },
    });

    const data = response.data;
    return {
      temperature: Math.round(data.main.temp),
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed * 10) / 10,
      description: data.weather[0].description,
      feelsLike: Math.round(data.main.feels_like),
      pressure: data.main.pressure,
      cloudiness: data.clouds.all,
      rainfall: data.rain?.['1h'] || 0,
    };
  } catch (error) {
    console.error('Weather API error:', error.response?.data || error.message);
    throw new Error('Failed to fetch weather data');
  }
};

// Helper: Generate AI advice using Gemini SDK
const generateAIAdvice = async (farmData, weatherData) => {
  try {
    // Use the official SDK model getter - gemini-2.0-flash is the current recommended model
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
You are an expert agricultural advisor. Based on the following farm and weather data, provide clear, actionable farming advice in simple language suitable for Indian farmers.

FARM DATA:
- Farm Name: ${farmData.farmName}
- Crop: ${farmData.crop}
- Crop Stage: ${farmData.cropStage}
- Soil Type: ${farmData.soilType}
- Area: ${farmData.areaSqMeters} sq meters

CURRENT WEATHER:
- Temperature: ${weatherData.temperature}°C (Feels like: ${weatherData.feelsLike}°C)
- Humidity: ${weatherData.humidity}%
- Wind Speed: ${weatherData.windSpeed} m/s
- Condition: ${weatherData.description}
- Pressure: ${weatherData.pressure} hPa
- Cloud Coverage: ${weatherData.cloudiness}%
- Recent Rainfall: ${weatherData.rainfall} mm

Please provide:
1. Current Conditions Assessment
2. Immediate Actions (today/this week)
3. Pest & Disease Alert
4. Irrigation Advice
5. Fertilizer Timing
6. Market Information

Keep advice concise, practical, and in simple language.
`.trim();

    // Call the API using the SDK method
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const advice = response.text();

    return advice;

  } catch (error) {
    console.error(
      'Gemini API error:',
      error
    );
    // Fallback message if AI fails, so the app doesn't crash
    return "Advice generation is temporarily unavailable. Please rely on standard farming practices for now.";
  }
};

// Generate advice
exports.generateAdvice = async (req, res) => {
  try {
    const { farmId } = req.params;

    const farm = await Farm.findById(farmId);
    if (!farm) {
      return res.status(404).json({ message: 'Farm not found' });
    }

    if (farm.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const weatherData = await fetchWeatherData(
      farm.location.latitude,
      farm.location.longitude
    );

    const aiAdvice = await generateAIAdvice(
      {
        farmName: farm.farmName,
        crop: farm.crop,
        cropStage: farm.cropStage,
        soilType: farm.soilType,
        areaSqMeters: farm.areaSqMeters,
      },
      weatherData
    );

    const advice = new Advice({
      userId: req.user.userId,
      farmId,
      farmData: {
        farmName: farm.farmName,
        crop: farm.crop,
        soilType: farm.soilType,
        cropStage: farm.cropStage,
      },
      weatherData,
      aiAdvice,
    });

    await advice.save();

    res.status(201).json({
      message: 'Advice generated successfully',
      advice: {
        id: advice._id,
        farmName: farm.farmName,
        crop: farm.crop,
        weatherData,
        aiAdvice,
        createdAt: advice.createdAt,
      },
    });
  } catch (error) {
    console.error('Generate advice error:', error);
    res.status(500).json({
      message: 'Failed to generate advice',
      error: error.message,
    });
  }
};

// Get advice history
exports.getAdviceHistory = async (req, res) => {
  try {
    const { farmId } = req.params;

    const farm = await Farm.findById(farmId);
    if (!farm) {
      return res.status(404).json({ message: 'Farm not found' });
    }

    if (farm.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const advices = await Advice.find({ farmId }).sort({ createdAt: -1 });

    res.json(advices);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all user advice
exports.getAllUserAdvice = async (req, res) => {
  try {
    const advices = await Advice.find({ userId: req.user.userId })
      .sort({ createdAt: -1 })
      .limit(50);

    res.json(advices);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};