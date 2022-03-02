import { useState } from 'react'
import { takeMonth, oldMonth, nextMonth } from './calendar'
import { format } from 'date-fns'
import { ptBR, enUS } from 'date-fns/locale';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import languages from './languages.json'
import { ButtonsSection, CalendarSection, Container, Day, DayWeek, DayWeeksSection, HeaderSection, Month, MonthAndYearSection, WeeksSection } from './styles';

interface CalendarProps {
    language?: 'pt-BR' | 'en-US',
    bgColor?: string,
    padding?: string,
    borderRadius?: string,
    colorArrows?: string,
    colorTextHeader?: string,
    colorTextdaysOfTheWeek?: string,
    colorDays?: string,
    bgMonth?: string,
    wDay?: string,
    hDay?: string,
    sizeArrow?: string,
    fontWeightMonthAndYear?: 'bold' | 'normal' | 'bolder' | 'lighter' | 'initial' | 'inherit',
}


function Calendar({
    language,
    bgColor,
    padding,
    borderRadius,
    colorArrows,
    colorTextHeader,
    colorTextdaysOfTheWeek,
    bgMonth,
    colorDays,
    wDay,
    hDay,
    sizeArrow,
    fontWeightMonthAndYear,
}: CalendarProps) {
    const daysWeek = language === 'pt-BR' ? languages['pt-BR'] : languages['en-US']
    const [selectedDate, setSelectedDate] = useState(new Date())
    const currentDay = new Date()
    const data = takeMonth(selectedDate)();

    return (
        <>
            <Container>
                <CalendarSection backgroudColor={bgColor} padding={padding} borderRadius={borderRadius}>
                    <HeaderSection >
                        <MonthAndYearSection fontWeightMonthAndYear={fontWeightMonthAndYear} color={colorTextHeader}>
                            <h1>{format(selectedDate, 'MMMM', { locale: language === 'pt-BR' ? ptBR : enUS })}</h1>
                            <h1>{format(selectedDate, 'yyyy')}</h1>
                        </MonthAndYearSection>
                        <ButtonsSection>
                            <button onClick={() => {
                                const old = oldMonth(selectedDate)
                                setSelectedDate(old)
                            }}>
                                <AiOutlineArrowLeft size={sizeArrow || '15'} color={`${colorArrows}` || '#000'} className={'text-2xl'} />
                            </button>
                            <button onClick={() => {
                                const next = nextMonth(selectedDate)
                                setSelectedDate(next)
                            }}>
                                <AiOutlineArrowRight size={sizeArrow || '15'} color={`${colorArrows}` || '#000'} />
                            </button>
                        </ButtonsSection>
                    </HeaderSection>
                    <DayWeeksSection>
                        {
                            daysWeek.map((dayName, i) =>
                                <DayWeek color={colorTextdaysOfTheWeek}>{dayName}</DayWeek>
                            )
                        }
                    </DayWeeksSection>
                    <Month BgColor={bgMonth}>
                        {
                            data.map((week: any, wi: number) => <WeeksSection>{
                                week.map((day: any, di: number) =>
                                    <Day color={colorDays} width={wDay} height={hDay} onClick={() => setSelectedDate(day)}>
                                        {format(day, "dd")}
                                    </Day>)
                            }</WeeksSection>)
                        }
                    </Month>
                </CalendarSection>
            </Container>
        </>
    )
}

export { Calendar }