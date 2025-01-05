import React, { useState } from 'react'
import { Button } from '../ui/button'

const playbackRates = [1, 1.5, 2];

export default function PlaybackRateButton({ onPlaybackRateChange }) {
    const [currentRateIndex, setCurrentRateIndex] = useState(0);

    const handleRateChange = () => {
        const newRateIndex = (currentRateIndex + 1) % playbackRates.length;
        setCurrentRateIndex(newRateIndex);
        onPlaybackRateChange(playbackRates[newRateIndex]);
    };

    return (
        <Button onClick={handleRateChange}>
            {playbackRates[currentRateIndex]}x
        </Button>
    );
}
