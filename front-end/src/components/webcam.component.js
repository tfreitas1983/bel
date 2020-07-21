class WebcamCapture extends React.Component {
  setRef = webcam => {
    this.webcam = webcam;
  };

  capture = () => {
    const imageSrc = this.webcam.getScreenshot();
  };

  render() {
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: { exact: "environment" }
    };

    return (
      <div >
        
        <Webcam          
          audio={false}         
          ref={this.setRef}
          screenshotWidth={150}
          screenshotFormat="image/jpeg"          
          videoConstraints={videoConstraints} />
        <button id="capturar" onClick={this.capture}>Capture photo</button>
      </div>
    )
  }
}