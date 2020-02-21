import React from "react";
import Loop from "./Loop";
import Metronome from "./Metronome";
import Sheet from "./Sheet";
import Scales from "./Scales";
import Exercise from "./Exercise";
import Increase from "./Increase";
import Decrease from "./Decrease";
import Logo from "./Logo";

const Icon = ({ name }) => {
  switch (name) {
    case "loop":
      return <Loop />;
    case "metronome":
      return <Metronome />;
    case "sheet":
      return <Sheet />;
    case "scales":
      return <Scales />;
    case "exercise":
      return <Exercise />;
    case "increase":
      return <Increase />;
    case "decrease":
      return <Decrease />;
    case "logo":
      return <Logo />;
    default:
      return null;
  }
};

export default Icon;
