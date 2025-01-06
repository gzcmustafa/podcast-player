import useAudioPlayer from '@/hooks/useAudioPlayer'
import React from 'react'
import PlayPauseButton from './PlayPauseButton';
import RewindButton from './RewindButton';
import ForwardButton from './ForwardButton';
import MuteButton from './MuteButton';
import PlaybackRateButton from './PlaybackRateButton';
import { formatTime } from '@/lib/utils';

const SEEK_AMOUNT = 10;

export default function AudioPlayer() {
    const player = useAudioPlayer();

    if (!player.episode) return null;

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

    const handleSliderChange = (value) => {
        player.seekTo(value);
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-blue-950 text-white p-4 flex flex-col shadow-lg rounded-t-lg">
            <div className="flex items-center justify-between">
                <div className='flex items-center w-1/4'>
                    <img 
                        src={player.episode.imageUrl} 
                        alt="Episode Cover" 
                        className='w-16 h-16 rounded-lg mr-4' 
                    />
                    <div className='flex flex-col'>
                        <h2 className='text-white font-bold text-lg'>
                            {player.episode.name}
                        </h2>
                    </div>
                </div>

                <div className='flex flex-col items-center justify-center flex-1'>
                    <div className='flex items-center gap-2'>
                        <RewindButton onRewind={onRewind}/>
                        <PlayPauseButton
                            isPlaying={player.playing}
                            onPlayPauseToggle={playPauseToggle}
                        />
                        <ForwardButton onForward={onForward} />
                    </div>
                    <div className='flex items-center gap-2 mt-2'>
                        <MuteButton isMute={player.muted} onMute={onMute} />
                        <PlaybackRateButton onPlaybackRateChange={player.playbackRate} />
                    </div>
                </div>

                <div className='w-1/4'></div>
            </div>

            <div className="w-full flex items-center gap-2 mb-2">
                <span className="text-sm">{formatTime(player.currentTime)}</span>
                <div className="flex-grow relative h-1 bg-gray-700 rounded cursor-pointer">
                    <input
                        type="range"
                        min={0}
                        max={player.duration || 0}
                        value={player.currentTime}
                        onChange={(e) => handleSliderChange(parseFloat(e.target.value))}
                        className="absolute w-full h-full opacity-0 cursor-pointer"
                    />
                    <div 
                        className="absolute h-full bg-white rounded"
                        style={{ width: `${(player.currentTime / (player.duration || 1)) * 100}%` }}
                    />
                </div>
                <span className="text-sm">{formatTime(player.duration)}</span>
            </div>
        </div>
    )
}
