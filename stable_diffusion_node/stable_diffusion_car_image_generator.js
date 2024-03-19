/**
 * This script uses the Stability AI API to generate an image from text descriptions.
 * It sends a POST request to the API with a set of parameters and text prompts.
 * The text prompts describe the image to be generated.
 * The API response is expected to contain an array of 'artifacts', each representing an image.
 * Each image is saved as a PNG file in the './out' directory.
 * The filename is based on the 'seed' value of the image.
 * If the API request fails, the error is logged to the console.
 */
const fs = require("fs");
const fetch = require("node-fetch");

const textToImage = async () => {
  try {
    const path = "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image";

    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${process.env.STABILITY_API_KEY}`
    };

    const body = {
      steps: 40,
      width: 1024,
      height: 1024,
      seed: 0,
      cfg_scale: 5,
      samples: 1,
      style_preset: "photographic",
      text_prompts: [
        {
          "text": "Ultra-realistic image capturing a Beige 2008 blue Honda Pilot cruising down a modern highway. The car is in pristine condition, reflecting the setting sun off its sleek, polished surface. The highway stretches out ahead, framed by lush trees and a vibrant sky tinged with hues of orange and pink. The motion blur suggests speed and lends a dynamic, energetic feel to the composition.",
          "weight": 1
        },
        {
          "text": "pedestrians, billboards, no other cars",
          "weight": -1
        }
      ],
    };

    const response = await fetch(path, {
      headers,
      method: "POST",
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      console.log(`Non-200 response: ${await response.text()}`);
      return;
    }
    
    const responseJSON = await response.json();
    console.log("Response JSON:", responseJSON);
    
    if (Array.isArray(responseJSON.artifacts)) {
      responseJSON.artifacts.forEach((image, index) => {
        fs.writeFileSync(
          `./out/txt2img_${image.seed}.png`,
          Buffer.from(image.base64, 'base64')
        );
      });
    } else {
      console.log("'artifacts' is not an array or does not exist.");
    }

    responseJSON.artifacts.forEach((image, index) => {
      fs.writeFileSync(
        `./out/txt2img_${image.seed}.png`,
        Buffer.from(image.base64, 'base64')
      );
    });

  } catch (error) {
    console.error("An error occurred:", error);
  }
};

textToImage();
