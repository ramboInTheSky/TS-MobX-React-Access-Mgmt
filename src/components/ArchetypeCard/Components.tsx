import styled from '@emotion/styled'
import { Paper, IconButton } from '@material-ui/core'

import { variables } from '../../constants/theme'

export const Wrapper: React.ComponentType<any> = styled(Paper)`
    margin-top: ${variables.gutter};
    background-color: ${variables.componentBackgroundClear};
`
export const Header = styled.div`
    background-color: ${variables.archetypeColor};
    color: #333;
    font-size: 1.3rem;
    height: 25px;
    padding: ${variables.indentation};
    display: flex;
    justify-content: space-between;
`

export const Content: React.ComponentType<any> = styled.div`
    background-color: ${variables.componentBackgroundClear};
    padding: ${variables.indentation};
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`

export const CloseButton: React.ComponentType<any> = styled(IconButton)`
    padding: 2px;
`

export const LockGroup: React.ComponentType<any> = styled(Paper)`
    background-color: ${variables.componentBackground};
    margin: ${variables.indentation};
    padding: ${variables.indentation};
    padding-right: calc(${variables.indentation} + 6px);
`
