import { AudioPlayerContext } from '@/providers/AudioProvider'
import React, { useContext, useMemo } from 'react'

export default function useAudioPlayer(episode) {
    let player = useContext(AudioPlayerContext)

    if(!player) {
        throw new Error ('useAudio hook must be used within an AudioProvider')
    }

    return useMemo(
        () => ({

            ...player,
            play() {
                player.play(episode);
            },
            toggle(){
                player.toggle(episode);
            },
            get playing(){
                return player.isPlaying(episode);
            },
        }),
        [player,episode]
    )
}
