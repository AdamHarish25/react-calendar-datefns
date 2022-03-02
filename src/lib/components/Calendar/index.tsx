import { useEffect, useState } from 'react'
import { takeMonth, oldMonth, nextMonth } from './calendar'
import { add, addDays, format } from 'date-fns'
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
    const [currentDate, setCurrentDate] = useState(new Date())
    const [selectedDay, setSelectedDay] = useState(new Date())
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())

    const data = takeMonth(currentDate)();

    function startDateSelected(day: Date) {
        const _start = format(day, 'dd/MM/yyyy')
        const _end = format(startDate, 'dd/MM/yyyy')
        if (_start === _end) {
            return 'selected'
        } else {
            return false
        }
    }

    function endDateSelected(day: Date) {
        const _start = format(day, 'dd/MM/yyyy')
        const _end = format(endDate, 'dd/MM/yyyy')
        if (_start === _end) {
            return 'selected'
        } else {
            return false
        }
    }

    useEffect(() => {
        if (startDate > endDate) {
            setEndDate(startDate)
            alert('Data final não pode ser menor que a data inicial')
        }
    }, [startDate, endDate])

    return (
        <>
            <Container>
                <CalendarSection backgroudColor={bgColor} padding={padding} borderRadius={borderRadius}>
                    <HeaderSection >
                        <MonthAndYearSection fontWeightMonthAndYear={fontWeightMonthAndYear} color={colorTextHeader}>
                            <h1>{format(currentDate, 'MMMM', { locale: language === 'pt-BR' ? ptBR : enUS })}</h1>
                            <h1>{format(currentDate, 'yyyy')}</h1>
                        </MonthAndYearSection>
                        <ButtonsSection>
                            <button onClick={() => {
                                const old = oldMonth(currentDate)
                                setCurrentDate(old)
                            }}>
                                <AiOutlineArrowLeft size={sizeArrow || '15'} color={`${colorArrows}` || '#000'} className={'text-2xl'} />
                            </button>
                            <button onClick={() => {
                                const next = nextMonth(currentDate)
                                setCurrentDate(next)
                            }}>
                                <AiOutlineArrowRight size={sizeArrow || '15'} color={`${colorArrows}` || '#000'} />
                            </button>
                        </ButtonsSection>
                    </HeaderSection>
                    <DayWeeksSection>
                        {
                            daysWeek.map((dayName, i) =>
                                <DayWeek
                                    color={colorTextdaysOfTheWeek}>{dayName}</DayWeek>
                            )
                        }
                    </DayWeeksSection>
                    <Month BgColor={bgMonth}>
                        {
                            data.map((week: any, wi: number) => <WeeksSection>{
                                week.map((day: any, di: number) =>
                                    <Day
                                        onClick={() => setSelectedDay(day)}
                                        color={colorDays} width={wDay} height={hDay}
                                        style={{
                                            color: `${startDateSelected(day) === 'selected' ? 'blue' : '' || endDateSelected(day) === 'selected' ? 'blue' : ''}`,
                                        }}>
                                        {format(day, "dd")}
                                    </Day>)
                            }</WeeksSection>)
                        }
                    </Month>
                    <input type="date" placeholder='Data inicial' onChange={e => {
                        const date = addDays(new Date(e.target.value), 1)
                        setStartDate(date)
                    }} />
                    <input type="date" placeholder='Data final' onChange={e => {
                        const date = addDays(new Date(e.target.value), 1)
                        setEndDate(date)
                    }} />
                </CalendarSection>
            </Container>
        </>
    )
}

export { Calendar }