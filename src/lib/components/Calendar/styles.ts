import styled from 'styled-components';

interface CalendarSectionProps {
    backgroudColor?: string;
    padding?: string;
    borderRadius?: string;
}

interface MonthAndYearSectionProps {
    color?: string;
    fontWeightMonthAndYear?: 'bold' | 'normal' | 'bolder' | 'lighter' | 'initial' | 'inherit';
}

export const Container = styled.div`
    display: flex;
    `

export const CalendarSection = styled.div<CalendarSectionProps>`
    background: ${props => props.backgroudColor || '#FFF'};
    padding: ${props => props.padding || '10px'};
    border-radius: ${props => props.borderRadius || '5px'};
`

export const HeaderSection = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

`

export const MonthAndYearSection = styled.div<MonthAndYearSectionProps>`
    display: flex;
    align-items: center;

    h1 {
        font-size: 1.2rem;
        margin-bottom: 10px;
        margin-right: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: ${props => props.color || '#000'};
        font-weight: ${props => props.fontWeightMonthAndYear || 'bold'};
    }
`

export const ButtonsSection = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    button {
        background: transparent;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`

export const DayWeeksSection = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
`

export const WeeksSection = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
`

interface DayWeekProps {
    color?: string;
}

export const DayWeek = styled.div<DayWeekProps>`
    height: 16px;
    display: flex;
    align-items: center;
    font-size: 1rem;
    justify-content: center;
    padding-top: 6px;
    padding-right: 10px;
    color: ${props => props.color || '#000'};
`

interface MonthProps {
    BgColor?: string;
}

export const Month = styled.div<MonthProps>`
    margin-top: 10px;
    border-radius: 4px;
    background-color: ${props => props.BgColor || '#FFF'};
`;

interface DayProps {
    color?: string;
    BgColor?: string;
    borderColor?: string;
    borderRadius?: string;
    height?: string;
    width?: string;
    bgColor?: string;
    fontWeight?: string;
    fontSize?: string;
}

export const Day = styled.div<DayProps>`
    height: ${props => props.height || '50px'};
    width: ${props => props.width || '60px'};
    display: flex;
    align-items: center;
    font-size: ${props => props.fontSize || '1rem'};
    justify-content: center;
    padding-top: 6px;
    padding: 10px;
    padding-right: 10px;
    background-color: ${props => props.BgColor || '#FFF'};
    font-weight: ${props => props.fontWeight || 'normal'};
    color: ${props => props.color || '#FFF'};
    cursor: pointer;

    .selectedDay {
        background-color: ${props => props.BgColor || '#FFF'};
        color: ${props => props.color || '#000'};
    }
    `