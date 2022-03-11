import styled from '@emotion/styled'
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { variables } from '../../constants/theme'

export const Alert: React.ComponentType<any> = styled(SnackbarContent)`
    background-color: ${props => variables[props.type]};
    margin-top: 3rem;
`

export const Message: React.ComponentType<any> = styled.span`
    display: flex;
    align-items: center;
`
