import styled from '@emotion/styled'
import IconButton from '@material-ui/core/IconButton'
import { variables } from '../../constants/theme'

export const ActionBar = styled.div`
    display: flex;
    flex-direction: row;
    padding-top: ${variables.gutter};
    justify-content: space-between;
`
export const SearchWrapper = styled.div`
    width: 84%;
    padding-left: ${variables.gutter};
`
export const Action: React.ComponentType<any> = styled.div`
    margin: auto ;
    padding-top: 2px ;
`

export const ActionIcon: React.ComponentType<any> = styled(IconButton)`
    margin: auto ;
    padding-top: 2px ;
`

export const Title = styled.div`
    padding-left: ${variables.gutter};
    font-size: ${variables.headerFontSize};
    font-weight: bold;
    margin-top: ${variables.gutter};
`
