import styled from '@emotion/styled'

import { variables } from '../../constants/theme'
import Paper from '@material-ui/core/Paper'

export const Wrapper = styled.div`
	margin-top: ${variables.gutter};
	padding-top: ${variables.gutter};
	display: grid;
	grid-template-columns: 99.4%;
	grid-column-gap: ${variables.gutter};
	grid-row-gap: ${variables.gutter};
`

export const Entry: React.ComponentType<any> = styled(Paper)`
	display: grid;
	grid-template-columns: 80% 18%;
	grid-column-gap: ${variables.gutter};
	grid-row-gap: ${variables.gutter};
    cursor: pointer;
`

export const AccessContainer = styled.div`
    background-color: ${variables.componentBackground};
    padding: ${variables.gutter};
`
export const DatesContainer = styled.div``

export const Dates = styled.span`
    font-weight: bold;
`

export const Divider = styled.span`
    padding-left: ${variables.gutter};
    padding-right: ${variables.gutter};
    vertical-align: middle;
    opacity: 0.8;
`

export const Access = styled.div`
    padding-top: ${variables.indentation};
`
export const Status = styled.div`
    background-color: ${variables.componentBackgroundClear};
    margin: auto;
    font-weight: bold;
    color: #666;
    font-size: 1.3rem;
`
