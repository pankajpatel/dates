import "@ungap/custom-elements";
import moment from "moment";
import config from "../config";
import monthWeeks from "../utils/getWeeks";
import template from "./month.t";

import "../d-day/d-day";
import "./d-month.css";

const monthTitleFormat = "MMMM YYYY";

const monthHtml = (day) => {
  const month = moment(day);
  const weeks = monthWeeks(month, true);
  const monthTitle = month.format(monthTitleFormat);
  return template({ moment, month, weeks, monthTitle });
};

class Month extends HTMLElement {
  connectedCallback() {
    const date = this.getAttribute("for-month") || moment();
    this.innerHTML = monthHtml(date);
  }
}

customElements.define(config.monthComponent, Month);
