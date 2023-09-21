import { useContext } from 'react'
import Videos from './Videos'
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
                    hasData ? <Videos /> : <Error />
                }
            </div>
        </main>
    )
}

export default Main
