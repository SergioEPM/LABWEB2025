import { middleOfUSA } from "./constants";

// `getLocation` function still works the same in JavaScript, just without the TypeScript interface
export async function getLocation() {
  try {
    // Fetch data from the API
    const response = await fetch("http://ip-api.com/json/");
    const json = await response.json(); // No type assertions in JS

    // Check if lat and lon are numbers (to ensure the response is valid)
    if (typeof json.lat === "number" && typeof json.lon === "number") {
      return [json.lon, json.lat];  // Return [longitude, latitude]
    }
  } catch (error) {
    console.error("Error fetching location:", error); // Log the error for debugging
  }
  return middleOfUSA;  // If there's an error or missing data, return the default coordinates
}