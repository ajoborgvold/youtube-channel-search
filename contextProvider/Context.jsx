import React, { useState } from 'react'
import channelData from '../data/channelData'

const Context = React.createContext()

function ContextProvider({children}) {
    const [channelId, setChannelId] = useState(channelData[0].id)
    const [searchValue, setSearchValue] = useState('')
    const [videosData, setVideosData] = useState([])
    const [errorMessage, setErrorMessage] = useState('')
    const [hasData, setHasData] = useState(false)
        
    const buttonClass = searchValue ? 'enabled' : 'disabled'
        
    function handleSelectChange(e) {
        setChannelId(e.target.value)
    }
        
    function handleSearchFieldChange(e) {
        setSearchValue(e.target.value)
    }
        
    async function searchForVideos(e) {
        console.log('serverless function called')

        e.preventDefault()

        const url = 'https://frolicking-alpaca-235d75.netlify.app/.netlify/functions/callApi'

        const response = await fetch(url, {
            method: 'POST',
            header: {
                'content-type': 'text/plain'
            },
            body: {
                channelId: channelId,
                searchValue: searchValue
            }
        })
        const data = await response.json()
        console.log(data)


        // const baseUrl = 'https://www.googleapis.com/youtube/v3/search?part=snippet'
        // const apiKey = process.env.API_KEY

        // fetch(`${baseUrl}&key=${apiKey}&maxResults=10&channelId=${channelId}&q=${searchValue}`)
        //     .then(res => {
        //         if (!res.ok) {
        //             setHasData(false)
        //             console.log('res.ok === false')
        //             setErrorMessage('The search engine is currently unavailable. Please try again later.')
        //         }
        //         else {
        //             return res.json()
        //         }
        //     })
        //     .then(data => {
        //         if (!data) {
        //             setHasData(false)
        //             console.log('No data found')
        //             setErrorMessage('The search engine is currently unavailable. Please try again later.')
        //             return
        //         }
        //         else if (!data.items.length) {
        //             setHasData(false)
        //             console.log('No data found')
        //             setErrorMessage('Sorry, there are no videos matching your search. Please try another search.')
        //         }
        //         else {
        //             setHasData(true)
        //             setVideosData(data.items)
        //         }
        //     })
    }
        
    return (
        <Context.Provider 
            value={{searchValue, handleSearchFieldChange, handleSelectChange, videosData, searchForVideos, buttonClass, errorMessage, hasData }}
        >
            {children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}