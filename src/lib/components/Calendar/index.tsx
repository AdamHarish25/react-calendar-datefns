import { useState } from "react";
import { takeMonth, oldMonth, nextMonth } from "./calendar";
import { format, addDays } from "date-fns";
import { ptBR, enUS } from "date-fns/locale";
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineClear,
} from "react-icons/ai";
import languages from "./languages.json";
import * as S from "./styles";
import { CalendarProps } from "./types";

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
  isContinuous,
}: CalendarProps) {
  const daysWeek =
    language === "pt-BR" ? languages["pt-BR"] : languages["en-US"];
  const [currentDate, setCurrentDate] = useState(new Date());
  const [multipleDates, setMultipleDates] = useState<Date[]>([]);
  console.log(multipleDates);

  const data = takeMonth(currentDate)();

  function getSelectedMultipleDates(date: Date, multipleDates: Date[]) {
    const dateExists = multipleDates.find(
      (d) => format(d, "dd/MM/yyyy") === format(date, "dd/MM/yyyy")
    );

    if(isContinuous) {
      if(multipleDates.length >= 2) {
        return
      } else {
        if (dateExists) {
          const newDates = multipleDates.filter(
            (d) => format(d, "dd/MM/yyyy") !== format(date, "dd/MM/yyyy")
          );
          setMultipleDates(newDates);
        } else {
          setMultipleDates([...multipleDates, date]);
        }
      }
    } else {
      if (dateExists) {
        const newDates = multipleDates.filter(
          (d) => format(d, "dd/MM/yyyy") !== format(date, "dd/MM/yyyy")
        );
        setMultipleDates(newDates);
      } else {
        setMultipleDates([...multipleDates, date]);
      }
    }
  }

  function clearSelection() {
    setMultipleDates([]);
  }

  function getDates(initialDate: Date, stopDate: Date) {
    const dateArray = [];
    let initial = initialDate;
    while (initial <= stopDate) {
      dateArray.push(initial);
      initial = addDays(initial, 1);
    }

    return dateArray;
  }

  function backgroundColorDateMultiple(date: Date) {
    if (isContinuous) {
      const arr = getDates(multipleDates[0], multipleDates[multipleDates.length - 1]);
      const dateExists = arr.find(
        (d) => format(d, "dd/MM/yyyy") === format(date, "dd/MM/yyyy")
      );

      if (dateExists) {
        return "day-selected";
      }
    }
    const dateExists = multipleDates.find(
      (d) => format(d, "dd/MM/yyyy") === format(date, "dd/MM/yyyy")
    );

    if (dateExists) {
      return "day-selected";
    }
  }

  function isFistOfMultipleDates(day: Date) {
    if (multipleDates.length === 1) {
      return "one-item";
    }

    if (String(day) === String(multipleDates[0])) {
      return true;
    }
  }

  function isLastOfMultipleDates(day: Date) {
    if (String(day) === String(multipleDates[multipleDates.length - 1])) {
      return true;
    }
  }

  function blockCursor() {
    if (multipleDates.length >= 2) {
      return 'not-allowed'
    }
    return 'pointer'
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
              <AiOutlineClear
                size={sizeArrow || "15"}
                onClick={clearSelection}
                title={language === "pt-BR" ? "Limpar" : "Clear"}
                style={{
                  cursor: "pointer",
                  color: `${colorArrows}` || "#FFF",
                }}
              />
            </S.ButtonsSection>
          </S.HeaderSection>
          <S.DayWeeksSection>
            {daysWeek.map((dayName, i) => (
              <S.DayWeek key={dayName} color={colorTextDaysOfTheWeek}>
                {dayName}
              </S.DayWeek>
            ))}
          </S.DayWeeksSection>
          <S.Month BgColor={bgMonth}>
            {data.map((week: any) => (
              <S.WeeksSection key={week}>
                {week.map((day: Date) => (
                  <S.Day
                    key={String(day)}
                    onClick={async () => {
                        getSelectedMultipleDates(day, multipleDates);
                    }}
                    cursor={blockCursor()}
                    color={`${
                      backgroundColorDateMultiple(day) === "day-selected"
                        ? colorSelectDay
                        : colorDays
                    }`}
                    fontWeight={`${
                      backgroundColorDateMultiple(day) === "day-selected"
                        ? "bold"
                        : ""
                    }`}
                    fontSize={`${
                      backgroundColorDateMultiple(day) === "day-selected"
                        ? "1.3rem"
                        : ""
                    }`}
                    width={wDay}
                    height={hDay}
                  >
                    <S.TextDay
                      onClick={() => getSelectedMultipleDates(day, multipleDates)}
                      color={`${
                        backgroundColorDateMultiple(day) === "day-selected"
                          ? colorSelectDay
                          : colorDays
                      }`}
                      fontWeight={`${
                        backgroundColorDateMultiple(day) === "day-selected"
                          ? "bold"
                          : ""
                      }`}
                    >
                      {format(day, "dd")}
                    </S.TextDay>
                    {!isContinuous && (
                      <S.Circle
                        bgColor={circleSelectDayColor}
                        display={`${
                          backgroundColorDateMultiple(day) === "day-selected"
                            ? ""
                            : "none"
                        }`}
                      >
                        {" "}
                      </S.Circle>
                    )}
                    {isContinuous && (
                      <S.ContinuosBackground
                        bgColor={circleSelectDayColor}
                        display={`${
                          backgroundColorDateMultiple(day) === "day-selected"
                            ? ""
                            : "none"
                        }`}
                        borderRadius={
                          isFistOfMultipleDates(day)
                            ? "10px 0px 0 10px"
                            : "0" && isLastOfMultipleDates(day)
                            ? "0 10px 10px 0"
                            : "0"
                        }
                        style={{
                          borderRadius: `${
                            isFistOfMultipleDates(day) === "one-item"
                              ? "10px"
                              : ""
                          }`,
                        }}
                      >
                        {" "}
                      </S.ContinuosBackground>
                    )}
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
