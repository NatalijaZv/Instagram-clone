import React from "react";
import { compareAsc, format } from 'date-fns'
import firebase from "./lib/firebase";

function App() {
  const dates = [
    new Date(1995, 6, 2),
    new Date(1995, 6, 2),
    new Date(1987, 1, 11),
    new Date(1989, 6, 10),
  ]
  dates.sort(compareAsc)
  console.log(format(new Date(2014, 1, 11), 'yyyy-MM-dd'))
  console.log(dates)
  return (

   <h1 className="text-red-500">Hello World</h1>
  );
}

export default App;
