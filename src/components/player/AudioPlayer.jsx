import useAudioPlayer from '@/hooks/useAudioPlayer'
import React from 'react'
import PlayPauseButton from './PlayPauseButton';
import RewindButton from './RewindButton';
import ForwardButton from './ForwardButton';
import MuteButton from './MuteButton';
import PlaybackRateButton from './PlaybackRateButton';

const SEEK_AMOUNT = 10;

export default function AudioPlayer() {
    const player = useAudioPlayer();

    const playPauseToggle = () => {
        player.toggle();
    }

    const onRewind = () => {
        player.seekBy(-SEEK_AMOUNT)
    }
    const onForward = () => {
        player.seekBy(SEEK_AMOUNT)
    }

    const onMute = () => {
        player.toggleMute()
    }

    const onPlaybackRateChange = (rate) => {
        player.playbackRate(rate);
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 flex items-center justify-between shadow-lg rounded-t-lg">
            <div className='flex items-center'>
                {player.episode ? (
                    <>
                        <img 
                            src={player.episode.imageUrl} 
                            alt="Episode Cover" 
                            className='w-16 h-16 rounded-lg mr-4' 
                        />
                        <div className='flex flex-col'>
                            <h2 className='text-white font-bold text-lg'>
                                {player.episode.name}
                            </h2>
                            <p className='text-gray-400 text-sm'>
                                {player.episode.artist}
                            </p>
                        </div>
                    </>
                ) : null}
            </div>
            <div className='flex flex-col gap-2'>
                <div className='flex items-center gap-2'>
                    <RewindButton onRewind={onRewind}/>
                    <PlayPauseButton
                        isPlaying={player.playing}
                        onPlayPauseToggle={playPauseToggle}
                    />
                    <ForwardButton onForward={onForward} />
                </div>
                <div className='flex items-center gap-2'>
                    <MuteButton isMute={player.muted} onMute={onMute} />
                    <PlaybackRateButton onPlaybackRateChange={onPlaybackRateChange} />
                </div>
               
            </div>
        </div>
    )
}
