import styled from '@emotion/styled'
import { variables } from '../../constants/theme'
import { Paper, Select } from '@material-ui/core'

export const Wrapper = styled.div``

export const Container: React.ComponentType<any> = styled(Paper)`
    width: 100%;
    display: flex;
    flex-direction: column;
    /* justify-content: space-evenly;
    padding-top: 3rem;
    padding-bottom: 4rem; */
`

export const TitleField = styled.span`
    min-width: 200px;
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    flex-wrap: wrap;
`

export const Title = styled.div`
    font-size: ${variables.headerFontSize};
    font-weight: bold;
    padding: ${variables.gutter};
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;
`
export const ProfileName = styled.span`
    color: ${variables.primaryColor};
    font-weight: bold;
    padding-right: ${variables.indentation};
    /* font-size: 1.5rem; */
    & svg {
        vertical-align: sub;
    }
`

export const PickersContainer: React.ComponentType<any> = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    padding-top: 2rem;
    padding-bottom: 4rem;
`

export const DateContainer = styled.div`
    width: 45%;
    display: flex;
    flex-direction: column;
    & div {
        margin-top: ${variables.gutter};
    }
`

export const ArchetypesContainer: React.ComponentType<any> = styled.div`
    padding-top: ${variables.gutter};
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    & button {
        min-width: 150px;
        margin: ${variables.indentation};
    }
`

// export const ArchetypesContainer: React.ComponentType<any> = styled.div`
//     padding-top: ${variables.gutter};
//     display: grid;
//     grid-template-columns: 16% 16% 16% 16% 16% 16%;
//     flex-direction: row;
//     justify-content: center;
//     flex-wrap: wrap;
//     & button{
//         width: 95%;
//         min-width: 150px;
//         margin: ${variables.indentation};
//     }
// `

export const Dropdown: React.ComponentType<any> = styled(Select)`
    vertical-align: top;
    width: 250px;
    margin: ${variables.indentation};
`

export const SelectedArchetypesContainer = styled.div`
    margin-top: ${variables.gutter};
`
