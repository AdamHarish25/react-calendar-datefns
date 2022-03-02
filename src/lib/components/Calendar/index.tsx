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
    colorSelectDay?: string,
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
colorSelectDay
}: CalendarProps) {
const daysWeek = language === 'pt-BR' ? languages['pt-BR'] : languages['en-US']
const [currentDate, setCurrentDate] = useState(new Date())
const [multipleDates, setMultipleDates] = useState<Date[]>([])

const data = takeMonth(currentDate)();

function getSelectedMultipleDates(date: Date) {
    const dateExists = multipleDates.find(d => format(d, 'dd/MM/yyyy') === format(date, 'dd/MM/yyyy'))

    if (dateExists) {
        const newDates = multipleDates.filter(d => format(d, 'dd/MM/yyyy') !== format(date, 'dd/MM/yyyy'))
        setMultipleDates(newDates)
    } else {
    setMultipleDates([...multipleDates, date])
    }
}

function backgroudColorDateMultiple(date: Date) {
    const dateExists = multipleDates.find(d => format(d, 'dd/MM/yyyy') === format(date, 'dd/MM/yyyy'))

    if (dateExists) {
        return 'day-selected'
    }
}

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
                        data.map((week: any) => <WeeksSection>{
                            week.map((day: any) =>
                                <Day
                                    onClick={() => getSelectedMultipleDates(day)}
                                    color={`${backgroudColorDateMultiple(day) === 'day-selected' ? colorSelectDay : colorDays}`}
                                    fontWeight={`${backgroudColorDateMultiple(day) === 'day-selected' ? 'bold' : ''}`}
                                    fontSize={`${backgroudColorDateMultiple(day) === 'day-selected' ? '1.3rem' : ''}`}
                                    width={wDay}
                                    height={hDay}
                                >
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