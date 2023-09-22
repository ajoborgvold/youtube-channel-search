import React, { useEffect, useState } from 'react'
import channelData from '../data/channelData'

const Context = React.createContext()

function ContextProvider({ children }) {
    const [channelId, setChannelId] = useState(channelData[0].id)
    const [searchValue, setSearchValue] = useState('frontend')
    const [videosData, setVideosData] = useState([])
    const [errorMessage, setErrorMessage] = useState('')
    const [hasData, setHasData] = useState(false)
    const [videosHeading, setVideosHeading] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        searchForVideos()
    }, [])

    const buttonClass = searchValue ? 'enabled' : 'disabled'

    function handleSelectChange(e) {
        setChannelId(e.target.value)
    }

    function handleSearchFieldChange(e) {
        setSearchValue(e.target.value)
    }

    function getVideosHeading() {
        const selectedChannel = channelData.filter(item => item.id === channelId && item)[0].title
        const selectedSearch = searchValue
        
        setVideosHeading({
            channel: selectedChannel,
            search: selectedSearch
        })

        setSearchValue('')
    }
    
    function searchForVideos(e) {
        e && e.preventDefault()
        setIsLoading(true)
        getVideosHeading()

        const URL = "https://tangerine-torte-2fd1e5.netlify.app/.netlify/functions/fetch-videos";

        fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ channelId, searchValue }),
        })
            .then((res) => {
                if (!res.ok) {
                    setHasData(false);
                    setIsLoading(false);
                    console.log("res.ok === false");
                    setErrorMessage(
                        "The search engine is currently unavailable. Please try again later."
                    );
                } else {
                    return res.json();
                }
            })
            .then((data) => {
                if (!data) {
                    setHasData(false);
                    setIsLoading(false);
                    console.log("No data found");
                    setErrorMessage(
                        "The search engine is currently unavailable. Please try again later."
                    );
                    return;
                } else if (!data.items.length) {
                    setHasData(false);
                    setIsLoading(false);
                    console.log("No data found");
                    setErrorMessage(
                        "Sorry, there are no videos matching your search. Please try another search."
                    );
                } else {
                    setHasData(true);
                    setVideosData(data.items);
                    setIsLoading(false)
                }
            });
    }

    return (
        <Context.Provider
            value={{
                searchValue,
                handleSearchFieldChange,
                handleSelectChange,
                videosData,
                searchForVideos,
                buttonClass,
                errorMessage,
                hasData,
                channelId,
                videosHeading,
                isLoading
            }}
        >
            {children}
        </Context.Provider>
    )
}

export { ContextProvider, Context }
