import styled from '@emotion/styled'
import { variables } from '../../constants/theme'

export const Wrapper = styled.div`
    margin: auto;
    border: 5px solid #d43333;
    padding: 2rem;
    background-color: ${variables.componentBackgroundClear};
    margin-bottom: 2.5rem;
    color: #333;
    & h3 {
        margin-top: 0;
        color: #d43333;
    }
`
