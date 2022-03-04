import { useState } from "react";
import { takeMonth, oldMonth, nextMonth } from "./calendar";
import { format } from "date-fns";
import { ptBR, enUS } from "date-fns/locale";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import languages from "./languages.json";
import * as S from "./styles";

interface CalendarProps {
  language?: "pt-BR" | "en-US";

  bgColor?: string;
  padding?: string;
  borderRadius?: string;
  colorArrows?: string;
  colorTextHeader?: string;
  colorTextDaysOfTheWeek?: string;
  colorDays?: string;
  bgMonth?: string;
  wDay?: string;
  hDay?: string;
  sizeArrow?: string;
  colorSelectDay?: string;
  circleSelectDayColor?: string;
  fontWeightMonthAndYear?:
    | "bold"
    | "normal"
    | "bolder"
    | "lighter"
    | "initial"
    | "inherit";

  isContinuous?: boolean;
}

function Calendar({
  language,
  bgColor,
  padding,
  borderRadius,
  colorArrows,
  colorTextHeader,
  colorTextDaysOfTheWeek,
  bgMonth,
  colorDays,
  wDay,
  hDay,
  sizeArrow,
  fontWeightMonthAndYear,
  colorSelectDay,
  circleSelectDayColor,
}: CalendarProps) {
  const daysWeek =
    language === "pt-BR" ? languages["pt-BR"] : languages["en-US"];
  const [currentDate, setCurrentDate] = useState(new Date());
  const [multipleDates, setMultipleDates] = useState<Date[]>([]);

  const data = takeMonth(currentDate)();

  function getSelectedMultipleDates(date: Date) {
    const dateExists = multipleDates.find(
      (d) => format(d, "dd/MM/yyyy") === format(date, "dd/MM/yyyy")
    );

    if (dateExists) {
      const newDates = multipleDates.filter(
        (d) => format(d, "dd/MM/yyyy") !== format(date, "dd/MM/yyyy")
      );
      setMultipleDates(newDates);
    } else {
      setMultipleDates([...multipleDates, date]);
    }
  }

  function backgroudColorDateMultiple(date: Date) {
    const dateExists = multipleDates.find(
      (d) => format(d, "dd/MM/yyyy") === format(date, "dd/MM/yyyy")
    );

    if (dateExists) {
      return "day-selected";
    }
  }

  function isFistOfMultipleDates(day: Date) {
    const firstDate = format(multipleDates[0], "dd/MM/yyyy");

    if (firstDate === format(day, "dd/MM/yyyy")) return "day-selected-first";
  }

  return (
    <>
      <S.Container>
        <S.CalendarSection
          backgroudColor={bgColor}
          padding={padding}
          borderRadius={borderRadius}
        >
          <S.HeaderSection>
            <S.MonthAndYearSection
              fontWeightMonthAndYear={fontWeightMonthAndYear}
              color={colorTextHeader}
            >
              <h1>
                {format(currentDate, "MMMM", {
                  locale: language === "pt-BR" ? ptBR : enUS,
                })}
              </h1>
              <h1>{format(currentDate, "yyyy")}</h1>
            </S.MonthAndYearSection>
            <S.ButtonsSection>
              <button
                onClick={() => {
                  const old = oldMonth(currentDate);
                  setCurrentDate(old);
                }}
              >
                <AiOutlineArrowLeft
                  size={sizeArrow || "15"}
                  color={`${colorArrows}` || "#000"}
                  className={"text-2xl"}
                />
              </button>
              <button
                onClick={() => {
                  const next = nextMonth(currentDate);
                  setCurrentDate(next);
                }}
              >
                <AiOutlineArrowRight
                  size={sizeArrow || "15"}
                  color={`${colorArrows}` || "#000"}
                />
              </button>
            </S.ButtonsSection>
          </S.HeaderSection>
          <S.DayWeeksSection>
            {daysWeek.map((dayName, i) => (
              <S.DayWeek color={colorTextDaysOfTheWeek}>{dayName}</S.DayWeek>
            ))}
          </S.DayWeeksSection>
          <S.Month BgColor={bgMonth}>
            {data.map((week: any) => (
              <S.WeeksSection>
                {week.map((day: Date) => (
                  <S.Day
                    onClick={() => getSelectedMultipleDates(day)}
                    color={`${
                      backgroudColorDateMultiple(day) === "day-selected"
                        ? colorSelectDay
                        : colorDays
                    }`}
                    fontWeight={`${
                      backgroudColorDateMultiple(day) === "day-selected"
                        ? "bold"
                        : ""
                    }`}
                    fontSize={`${
                      backgroudColorDateMultiple(day) === "day-selected"
                        ? "1.3rem"
                        : ""
                    }`}
                    width={wDay}
                    height={hDay}
                  >
                    <S.TextDay
                      onClick={() => getSelectedMultipleDates(day)}
                      color={`${
                        backgroudColorDateMultiple(day) === "day-selected"
                          ? colorSelectDay
                          : colorDays
                      }`}
                      fontWeight={`${
                        backgroudColorDateMultiple(day) === "day-selected"
                          ? "bold"
                          : ""
                      }`}
                    >
                      {format(day, "dd")}
                    </S.TextDay>
                    <S.Circle
                      bgColor={circleSelectDayColor}
                      display={`${
                        backgroudColorDateMultiple(day) === "day-selected"
                          ? ""
                          : "none"
                      }`}
                    >
                      {" "}
                    </S.Circle>
                  </S.Day>
                ))}
              </S.WeeksSection>
            ))}
          </S.Month>
        </S.CalendarSection>
      </S.Container>
    </>
  );
}

export { Calendar };
