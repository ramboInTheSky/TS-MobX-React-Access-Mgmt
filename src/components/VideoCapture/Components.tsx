import styled from '@emotion/styled'
import IconButton from '@material-ui/core/IconButton'
import ShutterIcon from '@material-ui/icons/Camera'

export const CameraContainer: React.ComponentType<any> = styled.div`
    display: flex;
		flex-direction: row;
		height: 45px;
`

export const Action: React.ComponentType<any> = styled(IconButton)`
    padding: 10;
`

export const Mask = styled.div`
    &::before {
        border: 5px dashed #b4dec6;
        opacity: 0.8;
        padding: 12px;
        content: no-close-quote;
        position: absolute;
        bottom: -100%;
        left: 25%;
        right: 25%;
    }
    &.--solid::before{
        border: 5px solid #36e815;
    }
`

export const VideoContainer = styled.div`
    cursor: pointer;
    position: relative;
`

export const ShutterIconComp: React.ComponentType<any> = styled(ShutterIcon)`
    position: absolute;
    bottom: 6%;
    color: #fff;
    left: 38%;
    font-size: 38px ;
    opacity: 0.5;
`
export const Video = styled.video`
    box-shadow: 0px 0px 20px -5px rgba(0, 0, 0, 0.75);
`
