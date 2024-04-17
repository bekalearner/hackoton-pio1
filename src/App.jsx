import AudioRecorder from "./components/AudioRecorder/AudioRecorder.jsx";
import Info from "./components/Info/Info.jsx";
import SiriWaveform from "./components/SiriWaveform/SiriWaveform.jsx";
import {useState} from "react";
import cl from 'classnames'

function App() {
    const [recording, setRecording] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    return (
        <>

            <div
                className="w-8/12 h-full flex flex-col justify-between items-center m-auto text-3xl font-bold underline px-6 py-6 relative">

                <Info isActive={recording} isLoading={isLoading}/>

                {/*<Animate/>*/}
                <SiriWaveform isActive={recording} isLoading={isLoading}/>
                <AudioRecorder recording={recording} setRecording={setRecording} isLoading={isLoading} setIsLoading={setIsLoading}/>
            </div>
            <div className={cl(
                'gradient',
                'pallete3',
                {'pallete5': recording},
                {'pallete1': isLoading}
            )}></div>
            <div className={cl(
                'gradient-2',
                'pallete4',
                {'pallete6': recording},
                {'pallete2': isLoading}
            )}></div>
        </>

    )
}

export default App;
