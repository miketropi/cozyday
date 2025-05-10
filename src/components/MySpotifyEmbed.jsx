import { useEffect } from 'react'

export default function MySpotifyEmbed({ uri }) {

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://open.spotify.com/embed/iframe-api/v1'
    script.async = true
    document.body.appendChild(script)

    window.onSpotifyIframeApiReady = (IFrameAPI) => {
      const element = document.getElementById('spotify-player');
      const options = {
        uri: uri,
        width: '100%',
        height: 80,
        autoplay: true
      };
      
      const callback = (EmbedController) => {
   
      };
      
      IFrameAPI.createController(element, options, callback);
    };
    
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <iframe id="spotify-player" style={{ borderRadius: '12px' }} src={uri} width="100%" height="80" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
  )
}