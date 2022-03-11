import styled from '@emotion/styled'
import { variables } from '../../constants/theme'
import Paper from '@material-ui/core/Paper'

export const Wrapper: React.ComponentType<any> = styled(Paper)`
    height: ${variables.columnSize - 12}vh;
    width: ${variables.columnSize - 2}vw;
    margin: 2vh auto;
    padding: ${variables.gutter};
    padding-bottom: calc(${variables.gutter} * 2);
`

export const SmallWrapper: React.ComponentType<any> = styled(Paper)`
    height: ${variables.columnSize - 40}vh;
    width: ${variables.columnSize - 2}vw;
    margin: 2vh auto;
    padding: ${variables.gutter};
    padding-bottom: calc(${variables.gutter} * 3);
`
