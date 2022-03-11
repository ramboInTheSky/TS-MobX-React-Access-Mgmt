import styled from '@emotion/styled'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'

export const Container: React.ComponentType<any> = styled(Paper)`
    display: flex;
    align-items: center;
`

export const Input: React.ComponentType<any> = styled(InputBase)`
    margin-left: 8;
    padding-left: 1rem;
    flex: 1;
`

export const Action: React.ComponentType<any> = styled(IconButton)`
    padding: 10;
`
