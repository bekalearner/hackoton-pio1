import { useState, useEffect, useRef } from 'react';
import AudioService from "../../../services/AudioService.js";
import SendButton from "../SendButton/SendButton.jsx";

// eslint-disable-next-line react/prop-types
const AudioRecorder = ({recording, setRecording, isLoading, setIsLoading}) => {
    const [answer, setAnswer] = useState(null);
    const [audioUrl, setAudioUrl] = useState(null);
    const [mediaRecorder, setMediaRecorder] = useState(null);

    useEffect(() => {
        // Request permissions and set up the MediaRecorder
        const setupRecorder = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                const recorder = new MediaRecorder(stream, {
                    mimeType: 'audio/webm',
                });
                let audioChunks = [];

                recorder.ondataavailable = (e) => {
                    audioChunks.push(e.data);
                };

                recorder.onstop = () => {
                    const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
                    const audioUrl = URL.createObjectURL(audioBlob);
                    setAudioUrl(audioUrl);
                    audioChunks = [];
                };

                setMediaRecorder(recorder);
            } catch (err) {
                console.error('Error accessing microphone', err);
            }
        };

        setupRecorder();
    }, []);

    const startRecording = () => {
        if (mediaRecorder) {
            mediaRecorder.start();
            setRecording(true);
        }
    };

    const stopRecording = () => {
        if (mediaRecorder) {
            mediaRecorder.stop();
            setRecording(false);
        }
    };
    const audioRef = useRef();
    const audioTag = useRef()
    const handleStop = () => {
        setTimeout(async () => {
            console.log(audioTag.current);
            const audioBlob = await fetch(audioRef.current.innerText).then((r) => r.blob());
            const audioFile = new File([audioBlob], 'voice.webm', { type: 'audio/webm' });
            const formData = new FormData(); // preparing to send to the server

            formData.append('audio', audioFile)
            setIsLoading(true)
            const newAudio = await AudioService.sendAudio(formData)
            setAnswer(newAudio)
            setIsLoading(false)
            audioTag.current.autoplay = true;
            console.log('audioTag stopped');
        },200)
    };

    return (
        <div>
            <p ref={audioRef} style={{display: 'none'}}>{audioUrl}</p>
            <audio ref={audioTag} src={answer}/>
            {!recording
                ? <SendButton isActive={recording} isLoading={isLoading} onClick={startRecording}/> : <SendButton isActive={recording} isLoading={isLoading} onClick={() =>{
                    stopRecording();
                    handleStop()
            }}/>}
        </div>
    );
};

export default AudioRecorder;
