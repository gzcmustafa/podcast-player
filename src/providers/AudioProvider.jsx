import React, { createContext, useMemo, useReducer, useRef } from 'react'


const ACTIONS = {
  SET_META:"SET_META",
  PLAY:"PLAY",
  PAUSE:"PAUSE",
  TOGGLE_MUTE:"TOGGLE_MUTE",
  SET_CURRENT_TIME:"SET_CURRENT_TIME",
  SET_DURATION:"SET_DURATION",
}


const intialState = {
  episode:null,
  playing:false,
  muted:false,
  currentTime:0,
  duration:0,

}

const audioReducer = (state,action) => {
  switch (action.type) {
    case ACTIONS.SET_META:
      return {...state, episode:action.payload};
    case ACTIONS.PLAY:
      return {...state, playing:true};
    case ACTIONS.PAUSE:
      return {...state, playing:false};
    case ACTIONS.TOGGLE_MUTE:
      return {...state, muted: !state.muted};
    case ACTIONS.SET_CURRENT_TIME:
      return {...state, currentTime:action.payload};
    case ACTIONS.SET_DURATION:
      return {...state, duration:action.payload};
    default:
      return state;

  }
}

export const AudioPlayerContext = createContext();


export default function AudioProvider({children}) {
    const [state,dispatch] = useReducer(audioReducer,intialState);

    const playerRef = useRef();

    const actions = useMemo(
      () => ({
        play(episode) {
            if(episode) {
              console.log("Playing episode:", episode);
              dispatch({type: ACTIONS.SET_META, payload: episode});
              if(playerRef.current && playerRef.currentSrc !== episode.audioUrl) {
                let playbackRate = playerRef.current.playbackRate;
                playerRef.current.src = episode.audioUrl;
                playerRef.current.load();
                playerRef.current.pause();

                playerRef.current.playbackRate = playbackRate;
                playerRef.current.currentTime = 0;
              }
              playerRef.current.play()
            }
        },
        pause() {
          playerRef.current.pause()
        },
        toggle(episode){
          this.isPlaying(episode) ? actions.pause() : actions.play(episode)
        },
        toggleMute() {
          dispatch({type: ACTIONS.TOGGLE_MUTE})
        },
        seekBy(amount) {
          if(playerRef.current) {
            playerRef.current.currentTime += amount;
          }
        },
        seekTo(time) {
          if(playerRef.current) {
            playerRef.current.currentTime = time;
          }
        },
        playbackRate(rate) {
          if(playerRef.current) {
              playerRef.current.playbackRate = rate;
          }
        },
        isPlaying(epsiode) {
          return epsiode
          ? state.playing && playerRef.current?.currentSrc === epsiode.audioUrl
          : state.playing;
        }
      }),
      [state.playing]
    )

    let api = useMemo(() => ({...state, ...actions}), [state,actions])

  return (
  <>
    <AudioPlayerContext.Provider value={{...api}}>
        {children} 
    </AudioPlayerContext.Provider>
    <audio 
      id='custom-audio-player'
      ref={playerRef}
      muted={state.muted}
      onPlay={()=>dispatch({type:ACTIONS.PLAY})}
      onPause={()=>dispatch({type:ACTIONS.PAUSE})}
      onTimeUpdate={(event) => dispatch({
        type:ACTIONS.SET_CURRENT_TIME,
        payload:event.currentTarget.currentTime
      })}
      onDurationChange={(event) =>  {
        dispatch({
          type:ACTIONS.SET_DURATION,
          payload:event.currentTarget.duration,
        })
      }}
    />
  </>
   
  )
} 
