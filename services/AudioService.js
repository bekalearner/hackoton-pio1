'use strict';

class AudioService {
    static async sendAudio(audio) {
        const response = await fetch('http://91.213.233.190:8088/audio/upload',
            {
                method: 'POST',
                "Content-Type": "multipart/form-data",
                body: audio
            })
        const data = await response.blob()
        const fileURL = URL.createObjectURL(data)
        console.log(fileURL)
        return fileURL
    }
}

export default AudioService