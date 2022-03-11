import styled from '@emotion/styled'
import { variables } from '../../constants/theme'

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
export const ButtonsContainer = styled.div`
    & button {
        margin-left: ${variables.indentation};
    }
`
