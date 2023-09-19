// const apiKey = process.env.API_KEY
// const baseUrl = 'https://www.googleapis.com/youtube/v3/search?part=snippet'

// const handler = async (event) => {
//   console.log('api called from serverless function')

//   const channelId = event.body.channelId
//   const searchValue = event.body.searchValue

//   try {
//     const response = await fetch(`${baseUrl}&key=${apiKey}&maxResults=10&channelId=${channelId}&q=${searchValue}`)

//     return {
//       statusCode: 200,
//       body: JSON.stringify({
//         reply: response.data
//       }),
//     }
//   } catch (error) {
//     return { statusCode: 500, body: error.toString() }
//   }
// }

// module.exports = { handler }

exports.handler = async (event) => {
  try {
    // Handle CORS preflight request.
    if (event.httpMethod === "OPTIONS") {
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Origin": "*", // Allow from anywhere
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        },
        body: "",
      };
    }

    // Handle POST request.
    if (event.httpMethod === "POST") {
      const { channelId, searchValue } = JSON.parse(event.body);

      // const YOUTUBE_API_KEY = "AIzaSyC-0bMXoBYRfR1Gp5k1JCVNy38cgIX_IHk"
      const YOUTUBE_API_KEY = process.env.API_KEY


      const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${YOUTUBE_API_KEY}&maxResults=10&channelId=${channelId}&q=${searchValue}`;

      const response = await fetch(url);
      const data = await response.json();

      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Origin": "*", // Allow from anywhere
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        },
        body: JSON.stringify(data),
      };
    }

    // If the request HTTP method is neither OPTIONS nor POST, return a method not allowed message.
    return {
      statusCode: 405,
      headers: {
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Origin": "*", 
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      },
      body: JSON.stringify({ message: "Method not allowed" }),
    };

  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};
