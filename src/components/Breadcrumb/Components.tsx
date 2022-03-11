import styled from '@emotion/styled'
import { variables } from '../../constants/theme'

export const Wrapper = styled.div`
    margin-top: ${variables.indentation};
    font-size: 12px;
    /* font-weight: bold; */
    & svg {
        vertical-align: sub;
    }
`
