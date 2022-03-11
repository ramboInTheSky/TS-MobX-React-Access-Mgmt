import styled from '@emotion/styled'
import { Paper, IconButton } from '@material-ui/core'

import { variables } from '../../constants/theme'

export const Wrapper: React.ComponentType<any> = styled(Paper)`
    margin-top: ${variables.gutter};
    background-color: ${variables.componentBackgroundClear} ;
`
export const Header = styled.div`
    background-color: ${variables.componentBackground};
    color: #333;
    font-size: 1.3rem;
    height: 25px;
    padding: ${variables.indentation};
    display: flex;
    justify-content: space-between;
`

export const Content: React.ComponentType<any> = styled.div`
    background-color: ${variables.componentBackgroundClear} ;
    padding: ${variables.indentation};
    min-height: 5rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`

export const Item: React.ComponentType<any> = styled(Paper)`
    background-color: ${variables.componentBackground} ;
    margin: ${variables.indentation};
    display: grid;
    grid-template-rows: 32% 50%;
    height: 5rem;
    padding: ${variables.indentation};
    min-width: 10rem;
    max-width: 14rem;
    & div:nth-child(1) {
        display: flex;
        flex-direction: row-reverse;
        cursor: pointer;
        font-size: 0.4rem;
        & svg {
            opacity: 0.5;
        }
    }
    & div:nth-child(2) {
        padding: 5px;
        position: relative;
        font-size: 1.2rem;
        text-align: right;
        & svg {
            opacity: 0.2;
            top: -36px;
            left: 0;
            position: absolute;
            font-size: 6rem;
            color: #999;
        }
    }
`
export const MenuHeader = styled.div`
    width: 100%;
    background-color: ${variables.dangerColor};
    height: 2rem;
    padding: 1rem;
    color: white;
    font-weight: 700;
    font-size: 1.2rem;
    outline: none;
    & span {
        font-weight: 400;
    }
`

export const HeaderButton: React.ComponentType<any> = styled(IconButton)`
    background-color: transparent;
    line-height: inherit ;
    color: ${variables.textColor} ;
    padding: 0 ;
`

export const NoItemsMessage = styled.div`
    margin: auto;
    color: ${variables.textColor};
`
