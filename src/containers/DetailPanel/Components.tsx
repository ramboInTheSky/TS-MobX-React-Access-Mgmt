import styled from '@emotion/styled'
import { Paper, TextField, IconButton } from '@material-ui/core'

import { variables } from '../../constants/theme'

export const Wrapper: React.ComponentType<any> = styled(Paper)`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: ${variables.componentBackgroundClear};
    padding: ${variables.gutter};
`

export const Title = styled.div`
	font-size: ${variables.headerFontSize};
	font-weight: bold;
    display: flex;
    justify-content: space-between;
	/* border-bottom: ${variables.spacer};
	line-height: ${variables.lineHeightComponentTitle}; */
`

export const Name = styled.div`
    font-size: 2.2rem;
    font-weight: bold;
`

export const Field = styled.div`
    font-size: ${variables.headerFontSize};
    font-weight: bold;
`

export const FieldsContainer = styled.div`
    color: ${variables.primaryColor};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: ${variables.indentation};
    margin-top: ${variables.gutter};
    padding-top: ${variables.gutter};
    padding-bottom: ${variables.gutter};
`

export const ActionsBar = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	padding: ${variables.gutter};
	/* border-bottom: ${variables.spacer}; */
	padding-bottom: ${variables.gutter};
	padding-top: calc(${variables.gutter} * 2);
	background-color: ${variables.componentBackgroundClear};
`
export const Action: React.ComponentType<any> = styled(IconButton)`padding: 10;`

export const ButtonsContainer = styled.div`
    & button {
        margin-left: ${variables.indentation};
    }
`

export const InputContainer: React.ComponentType<any> = styled.div`
    display: flex;
    height: 3rem;
    flex-direction: row;
`
export const NotesInputContainer: React.ComponentType<any> = styled.div`
    display: flex;
    height: 8rem;
    flex-direction: row;
`

export const Input: React.ComponentType<any> = styled(TextField)`
    margin-left: 8;
    padding-left: 1rem;
    flex: 1;
`

export const SingleColumnFieldSet = styled.div`
    display: grid;
    grid-template-columns: 100%;
    grid-row-gap: ${variables.gutter};
    padding-top: ${variables.gutter};
`

export const TwoColumnsFieldset = styled.div`
    display: grid;
    grid-template-columns: 49.4% 49.4%;
    grid-column-gap: ${variables.gutter};
    grid-row-gap: ${variables.gutter};
    padding-top: calc(${variables.gutter}*2);
`
