import styled from '@emotion/styled'
import { variables } from '../../constants/theme'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import ShutterIcon from '@material-ui/icons/Camera'

export const Wrapper = styled.div``

export const Container: React.ComponentType<any> = styled(Paper)`
    width: 100%;
    display: flex;
    flex-direction: column;
    /* justify-content: space-evenly;
    padding-top: 3rem;
    padding-bottom: 4rem; */
`

export const TitleField = styled.span`
    min-width: 200px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
`

export const Title = styled.div`
    font-size: ${variables.headerFontSize};
    font-weight: bold;
    padding: ${variables.gutter};
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;
`
export const ProfileName = styled.span`
    color: ${variables.primaryColor};
    font-weight: bold;
    padding-right: ${variables.indentation};
    /* font-size: 1.5rem; */
    & svg {
        vertical-align: sub;
    }
`

export const AddTagContainer = styled.div`
    display: flex;
    justify-content: center;
    margin: calc(${variables.gutter} * 2);
`

export const InputContainer: React.ComponentType<any> = styled.div`
    display: flex;
    align-items: center;
    width: 60%;
    min-width: 300px;
`

export const Input: React.ComponentType<any> = styled(TextField)`
    margin-left: 8;
    padding-left: 1rem;
    flex: 1;
`

export const Action: React.ComponentType<any> = styled(IconButton)`
    padding: 10;
`

export const VisitDateFrom = styled.span`
    color: ${variables.visitDateFromColor};
    font-style: italic;
`

export const VisitDateTo = styled.span`
    color: ${variables.visitDateToColor};
    font-style: italic;
`
export const Mask = styled.div`
    &::before {
        border: 5px dashed #b4dec6;
        opacity: 0.8;
        padding: 12px;
        content: no-close-quote;
        position: absolute;
        top: 40%;
        left: 35px;
        right: 35px;
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
