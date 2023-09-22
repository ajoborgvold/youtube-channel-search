import { useContext } from 'react'
import Video from './Video'
import Error from './Error'
import { Context } from '../contextProvider/Context'
import { ImSpinner3 } from 'react-icons/im'

function Main() {
    const { hasData, videosHeading, isLoading } = useContext(Context)

    return (
        <main>
            <h2 className="main__subheading">{hasData ? `${videosHeading.channel}: ${videosHeading.search}` : null}</h2>
            <div className="video-container">
                {isLoading ?
                    <ImSpinner3 className='loading-icon'/> :
                    hasData ? <Video /> : <Error />
                }
            </div>
        </main>
    )
}

export default Main
