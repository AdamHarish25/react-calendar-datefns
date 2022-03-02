import React from "react";
import { Calendar } from "./lib/components/Calendar";

const App: React.FC = () => {
    const [language, setLanguage] = React.useState("pt-BR" as "pt-BR" | "en-US");

  return (
    <>
      <select onChange={
        (e) => {
            setLanguage(e.target.value as "pt-BR" | "en-US");
            }
        }>
        <option value="pt-BR">Português</option>
        <option value="en-US">English</option>
      </select>
      <Calendar
        language={language}
        padding="15px"
        bgColor="#FFF"
        borderRadius="20px"
        colorArrows="#333"
        colorTextHeader="#333"
        colorTextdaysOfTheWeek="gray"
        bgMonth="#FFF"
        colorDays="#000"
        wDay="60px"
        hDay="50px"
        sizeArrow="25"
        colorSelectDay="#001e3c"
        fontWeightMonthAndYear="bold"
      />
    </>
  );
};

export default App;
