import styled from '@emotion/styled'
import { IconButton, Paper, TextField } from '@material-ui/core'
import { variables } from '../../constants/theme'

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
export const RoomsContainer = styled.div`
    margin-top: ${variables.gutter};
`

export const ActionIcon: React.ComponentType<any> = styled.div`
    display: flex;
    cursor: pointer;
    & .spinner{
        left: 40% !important;
    }
`

export const VisitDateFrom = styled.span`
    color: ${variables.visitDateFromColor};
    font-style: italic;
`

export const VisitDateTo = styled.span`
    color: ${variables.visitDateToColor};
    font-style: italic;
`
