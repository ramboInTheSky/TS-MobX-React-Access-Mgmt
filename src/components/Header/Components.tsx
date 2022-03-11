import styled from '@emotion/styled'
import IconButton from '@material-ui/core/IconButton'

import { variables } from '../../constants/theme'

export const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: ${variables.headerBackgroundColor};
    padding: 0.3rem;
`
export const Logo = styled.img`
    height: 50px;
`

export const Title = styled.div`
    font-size: 2rem;
    font-weight: bold;
    margin: auto;
`

export const MenuButton: React.ComponentType<any> = styled(IconButton)`
    margin-left: 110px;
`
