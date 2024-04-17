import { useEffect, useRef } from 'react';
import './SiriWaveform.css'
import cl from 'classnames';
import Icon from "../Icon/Icon.jsx";

const SiriWaveform = ({isActive, isLoading}) => {
    const canvasRef = useRef(null);
    const requestRef = useRef(null);
    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const dataArrayRef = useRef(null);

    const setupAudioContext = async () => {
        if (!navigator.mediaDevices) return;

        const audioContext = new AudioContext();
        audioContextRef.current = audioContext;
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 128;
        analyserRef.current = analyser;
        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        dataArrayRef.current = dataArray;

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const source = audioContext.createMediaStreamSource(stream);
            source.connect(analyser);
        } catch (err) {
            console.error('Error accessing audio stream:', err);
        }
    };

    const draw = () => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const { width, height } = canvas;
        const centerX = width / 2;
        const centerY = height / 2;

        const bufferLength = analyserRef.current.frequencyBinCount;
        analyserRef.current.getByteFrequencyData(dataArrayRef.current);

        ctx.fillStyle = 'rgba(255, 255, 255, 1)'; // Slight fade effect for the background
        ctx.fillRect(0, 0, width, height);

        const baseRadius = 50; // Base size of the central bloom
        const petals = dataArrayRef.current.length;
        const amplitude = 100; // Max size of the bloom change
        ctx.save();
        ctx.translate(centerX, centerY);
        for (let i = 0; i < petals; i++) {
            const petalAngle = (Math.PI * 2 / petals) * i;
            const petalRadius = baseRadius + dataArrayRef.current[i] / 255 * amplitude;

            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(petalRadius, 0);
            ctx.arc(0, 0, petalRadius, petalAngle - 0.05, petalAngle + 0.05);
            ctx.closePath();

            // Color gradient: transition between purple, light blue, and white
            const gradient = ctx.createRadialGradient(0, 0, baseRadius, 0, 0, petalRadius);
            gradient.addColorStop(0, 'rgba(158,119,255,0.1)'); // White at the center
            gradient.addColorStop(0.5, 'rgba(136,96,253,0.8)'); // Light blue
            gradient.addColorStop(1, 'rgba(223,202,253,0.75)'); // Purple

            ctx.fillStyle = gradient;
            ctx.rotate(petalAngle);
            ctx.fill();
        }
        ctx.restore();

        requestRef.current = requestAnimationFrame(draw);
    };

    useEffect(() => {
        setupAudioContext().then(() => {
            requestRef.current = requestAnimationFrame(draw);
        });

        return () => {
            cancelAnimationFrame(requestRef.current);
            audioContextRef.current.close();
        };
    }, [draw]);



    return (
        <div className={cl('siri-waveform', {'circleTransform': isLoading})}>
            <div className={cl('circle', {'circleAnimation': isActive, 'circleAnimation2': isLoading})}>
                <Icon isLoading={isLoading} isActive={isActive}/>
            </div>
            {isActive ?
            <canvas className={'siri'} ref={canvasRef} width="300" height="300" style={{ display: 'block', margin: 'auto' }} />
            : <></>
            }
        </div>
        )
};

export default SiriWaveform;
