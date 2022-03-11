import React, { Component } from 'react'
import CameraIcon from '@material-ui/icons/CameraAlt'
import Tesseract from 'tesseract.js'
import { Boundary } from '../ErrorBoundary'
import {
    VideoContainer,
    Video,
    Mask,
    Action,
    CameraContainer,
} from './Components'

export interface VideoCaptureProps {
    setValue: any
}

export interface VideoCaptureState {
    takingSnapshot: boolean
    cameraOn: boolean
}

export class VideoCapture extends Component<
    VideoCaptureProps,
    VideoCaptureState
> {
    private videoRef: any = React.createRef()
    private canvasRef: any = React.createRef()
    private stream: any = null
    constructor(props: VideoCaptureProps) {
        super(props)
        this.state = {
            takingSnapshot: false,
            cameraOn: false,
        }
    }

    public componentDidMount() {
        if (navigator.getUserMedia) {
            navigator.getUserMedia(
                { video: true },
                this.handleVideo,
                this.videoError
            )
        }
    }

    public toggleCamera = () => {
        this.setState({ cameraOn: !this.state.cameraOn }, ()=> this.state.cameraOn? this.takeSnapshot() : null)
    }

    public handleVideo = (stream: any) => {
        if (this.videoRef.current) {
            this.videoRef.current.srcObject = stream
            this.stream = stream.getTracks()[0]
        }
    }

    public takeSnapshot = () => {
        if (this.state.cameraOn) {
            this.props.setValue()
            const hidden_canvas = this.canvasRef.current
            const video = this.videoRef.current
            // Get the exact size of the video element.
            const width = video.videoWidth
            const height = video.videoHeight
            // Context object for working with the canvas.
            const context = hidden_canvas.getContext('2d')

            // Set the canvas to the same dimensions as the video.
            hidden_canvas.width = width
            hidden_canvas.height = height

            // Draw a copy of the current frame from the video on the canvas.
            context!.drawImage(video, 0, 0, width, height)

            // Get an image dataURL from the canvas.
            const imageDataURL = hidden_canvas.toDataURL('image/png')

            Tesseract.recognize(imageDataURL, {
                lang: 'eng',
                tessedit_char_blacklist:
                    'qwertyuiopasdfghjklzxcvbnm QWERTYUIOPASDFGHJKLZXCVBNM_|[]{}<>/.',
            })
                .progress((p: any) => {
                    // console.debug('progress', p)
                })
                .then((result: any) => {
                    // console.debug('result', result)
                    const currentTag = result.text
                        .trim()
                        .substring(result.text.indexOf('00'), 8)
                        .trim()
                    if (!isNaN(currentTag)) {
                        if (currentTag.length === 8) {
                            this.setState({ takingSnapshot: true }, () =>
                                setTimeout(() => {
                                    this.props.setValue(currentTag)
                                    this.setState({
                                        cameraOn: false,
                                        takingSnapshot: false,
                                    })
                                }, 500)
                            )
                        } else {
                            this.takeSnapshot()
                        }
                    } else {
                        this.takeSnapshot()
                    }
                })
                .catch((err: any) => {
                    // this.setState({ takingSnapshot: false })
                })
        }
    }

    public videoError = (err: any) => {
        console.debug(err)
        // TODO hide camera button
    }

    public componentWillUnmount() {
        if (this.stream) this.stream.stop()
    }

    public render() {
        const { cameraOn, takingSnapshot } = this.state
        return (
            <Boundary>
                <CameraContainer>
                    <Action
                        id="toggle-camera-button"
                        aria-label="Search"
                        onClick={this.toggleCamera}
                        title="Search"
                    >
                        <CameraIcon />
                    </Action>
                    <VideoContainer>
                        <Video
                            style={{
                                display: cameraOn ? 'block' : 'none',
                            }}
                            width="200"
                            autoPlay={true}
                            ref={this.videoRef}
                        />
                        {cameraOn && (
                            <Mask className={takingSnapshot ? '--solid' : ''} />
                        )}
                        <canvas
                            style={{ display: 'none' }}
                            ref={this.canvasRef}
                        />
                    </VideoContainer>
                </CameraContainer>
            </Boundary>
        )
    }
}
