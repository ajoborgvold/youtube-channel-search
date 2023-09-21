import { useContext } from 'react'
import Video from './Video'
import Error from './Error'
import { Context } from '../contextProvider/Context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

function Main() {
    const { hasData, videosHeading, isLoading } = useContext(Context)

    return (
        <main>
            <h2 className="main__subheading">{`${videosHeading.channel}: ${videosHeading.search}`}</h2>
            <div className="video-container">
                {isLoading ?
                    <FontAwesomeIcon icon={faSpinner} className='loading-icon'/> :
                    hasData ? <Video /> : <Error />
                }
            </div>
        </main>
    )
}

export default Main
