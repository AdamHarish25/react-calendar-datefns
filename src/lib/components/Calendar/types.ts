export interface CalendarProps {
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
