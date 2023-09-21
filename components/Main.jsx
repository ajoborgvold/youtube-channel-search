import React, { useContext } from 'react'
import SearchResults from './SearchResults'
import Error from './Error'
import { Context } from '../contextProvider/Context'

function Main() {
    const { hasData, videosHeading, isLoading } = useContext(Context)

    return (
        <main>
            <h2 className="main__subheading">{`${videosHeading.channel}: ${videosHeading.search}`}</h2>
            <div className="video-container">
                {isLoading ?
                    <p>Loading...</p> :
                    hasData ? <SearchResults /> : <Error />
                }
            </div>
        </main>
    )
}

export default Main