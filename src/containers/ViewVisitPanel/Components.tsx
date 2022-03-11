import styled from '@emotion/styled'
import { variables } from '../../constants/theme'
import { Paper, Select, IconButton } from '@material-ui/core'

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
    flex-direction: row-reverse;
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

export const DatesContainer: React.ComponentType<any> = styled.span`
    width: 70%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding-top: 1rem;
    padding-bottom: 2rem;
    font-size: 2rem;
    margin: auto;
`

export const DateContainer = styled.div`
    width: 45%;
    display: flex;
    flex-direction: column;
    text-align: center;
    color: ${variables.visitDateFromColor};
    & div {
        margin-top: ${variables.gutter};
    }
`

export const Dropdown: React.ComponentType<any> = styled(Select)`
    vertical-align: top;
    width: 250px;
    margin: ${variables.indentation};
`

export const RoomsContainer = styled.div`
    margin-top: ${variables.gutter};
`
export const TagsContainer = styled.div`
    margin-top: ${variables.gutter};
`
export const ArchetypesContainer = styled.div`
    margin-top: ${variables.gutter};
`

export const ActionsBar = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	padding: ${variables.gutter};
	/* border-bottom: ${variables.spacer}; */
	padding-bottom: calc(${variables.gutter} * 2);
	padding-top: calc(${variables.gutter} * 2);
    margin-top: calc(${variables.gutter} * 2);
	background-color: ${variables.componentBackgroundClear};
    border-top: 1px solid ${variables.componentBackground};
`
export const Action: React.ComponentType<any> = styled(IconButton)`
    padding: 0 ;
    margin-top: -17px ;
    margin-right: -10px ;
    background-color: transparent ;
`

export const ButtonsContainer = styled.div`
    & button {
        margin-left: ${variables.indentation};
    }
`
