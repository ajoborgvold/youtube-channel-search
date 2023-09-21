import { useState, useContext } from 'react'
import { Context } from '../contextProvider/Context'

function Videos() {
    const { videosData } = useContext(Context)
    const [hovered, setHovered] = useState(false)
    
    //--- Filter out channels from the videosData, keep only videos and playlists ---//
    const videosToDisplay = videosData.filter(item => !item.id.channelId)

    const videoElements = videosToDisplay.map(item => {
        //--- Check if item is a video or a playlist and define id, url and description accordingly ---//
        const itemId = item.id.videoId ? (item.id.videoId) : (item.id.playlistId)

        const url = item.id.videoId ?
            `https://www.youtube.com/watch?v=${item.id.videoId}` :
            `https://www.youtube.com/playlist?list=${item.id.playlistId}`
        
        const description = item.id.videoId ?
            (item.snippet.description) :
            `A playlist by ${item.snippet.channelTitle}`

        return (
            <div
                key={itemId}
                className="video-item"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <div className="image-wrapper">
                    <a
                        href={url}
                        target="_blank">
                        <img
                            src={item.snippet.thumbnails.medium.url}
                            className="thumbnail"
                            alt={description}
                        />
                        {hovered && <i className="fa-solid fa-play play-movie"></i>}
                    </a>
                </div>
                <h3 
                    className="video__title" 
                    dangerouslySetInnerHTML={{ __html: `${item.snippet.title} (${item.snippet.publishedAt.substring(0, 4)})` }}
                />
            </div>
        )

    })
    return <>{videoElements}</>
}

export default Videos