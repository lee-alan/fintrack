const fetch = require("node-fetch");
const fs = require('fs');
const path = require('path');
const config_param = fs.readFileSync(path.resolve(__dirname, "../config.json"), 'utf-8');
const configJson = JSON.parse(config_param);
const url = `https://newsapi.org/v2/top-headlines?country=ca&category=business&apiKey=${configJson.api_key}`;
exports.get_news = async () => {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        return error;
    }
};