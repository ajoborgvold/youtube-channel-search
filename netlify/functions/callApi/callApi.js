const apiKey = process.env.API_KEY
const baseUrl = 'https://www.googleapis.com/youtube/v3/search?part=snippet'

const handler = async (event) => {
  const channelId = event.body.channelId
  const searchValue = event.body.searchValue

  try {
    const response = await fetch(`${baseUrl}&key=${apiKey}&maxResults=10&channelId=${channelId}&q=${searchValue}`)

    return {
      statusCode: 200,
      body: JSON.stringify({
        reply: response.data
      }),
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
