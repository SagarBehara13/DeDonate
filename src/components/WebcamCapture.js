import React from 'react';
import Webcam from "react-webcam";

const videoConstraints = {
    width: 500,
    height: 500,
    facingMode: "user"
};

export const WebcamCapture = (props) => {
    const {sendImage} = props;
    const webcamRef = React.useRef(null);

    const capture = React.useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot();
            console.log('image', imageSrc)
            sendImage(imageSrc);
        },
        [webcamRef]
    );

    return (
        <div style={{width: '100%', height: '100vh', position: 'absolute', display: 'flex', justifyContent: "center", alignContent: 'center', alignItems:'center', marginTop:-100}}>
            <div>
                <div style={{backgroundColor:'white', height: 500, width:500}}>
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/png"
                        videoConstraints={videoConstraints}
                    />
                </div>
                <button onClick={capture}>Capture photo</button>
            </div>
        </div>
    );
};
