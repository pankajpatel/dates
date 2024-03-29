import "@ungap/custom-elements";
import config from "../config";
import template from "./rangepicker.t";
import { $find } from "../utils/dom";

import onEachDateInRange from "../utils/dateSet";
import DatePicker from "../d-datepicker/d-datepicker";
import "./d-rangepicker.css";

const MODES = {
  individual: "individual", // shows and hides calender for
  continuous: "continuous",
  eventOnly: "event-only",
};

class RangePicker extends DatePicker {
  connectedCallback() {
    this.mode = this.getAttribute("mode") || MODES.eventOnly;

    super.connectedCallback();
    this.value = [];
    // if (this.hasAttribute('step')) {
    //   attrs.push({ name: 'step', value: this.getAttribute('step') });
    // }
    this.arrow = this.querySelector(".arrow");
  }

  removeFocus() {
    // Hide calendar and remove focus ring
    this._component.classList.add("hidden");
    const focused = $find(`${this.input}.d-focused`, this);
    if (focused.length > 0) {
      focused.forEach((el) => {
        el.classList.remove("d-focused");
      });
    }
  }

  bindings() {
    this.calendar.addEventListener("change", (e) => {
      e.preventDefault();
      e.stopPropagation();
      // Populate the input with picked value
      this.querySelector(`${this.input}.d-focused`).value = this.calendar.value;
      if (this.value.length >= 2) {
        this.value = [];
      }
      this.value.push(this.calendar.value);
      this.value = this.value.sort((a, b) => a - b);
      this.removeFocus();
      const event = new Event("range");
      event.data = {
        value: this.value,
      };
      if (this.value.length === 2) {
        this.selectDuration(...this.value);
      }
      this.dispatchEvent(event);
    });

    $find(this.input, this).forEach((el) => {
      let timeout = null;
      el.addEventListener(this.openEvent, (e) => {
        if (timeout) {
          clearTimeout(timeout);
        }
        this.removeFocus();
        const input = e.target;
        input.classList.add("d-focused");
        this._component.classList.remove("hidden");
        const position = input.getBoundingClientRect();
        this.arrow.style.marginLeft = `${position.left + 10}px`;
        this.calendar.updateWidth();
      });
      el.addEventListener(this.closeEvent, (e) => {
        timeout = setTimeout(() => {
          if (!this.querySelectorAll(`${this.input}.d-focused`).length) {
            this.close(e, true);
          }
        }, 100);
      });
    });

    $find(`${config.dayComponent}:not([out-of-month])`, this).forEach((el) => {
      el.addEventListener("mouseenter", (e) => {
        if (this.value.length < 2) {
          this.hoveredDate = e.target.value;
          this.highlightDuration(
            this.querySelector(`${this.input}.from`).value,
            this.hoveredDate
          );
        }
      });
      el.addEventListener("mouseleave", () => {
        if (this.hoveredDate) {
          this.hoveredDate = null;
          this.unhighlightDuration();
        }
      });
    });
  }

  selectDuration(startDate, stopDate) {
    return onEachDateInRange(startDate, stopDate, (date) => {
      const dateEl = this.querySelector(
        `${config.dayComponent}[date='${date}']:not([out-of-month])`
      );
      if (dateEl) {
        dateEl.markSelected();
      }
    });
  }

  highlightDuration(startDate, stopDate) {
    return onEachDateInRange(startDate, stopDate, (date) => {
      const dateEl = this.querySelector(
        `${config.dayComponent}[date='${date}']:not([out-of-month])`
      );
      if (dateEl) {
        dateEl.markHighlighted();
      }
    });
  }
  unselectDuration() {
    $find(`${config.dayComponent}[selected]`, this).forEach((date) =>
      date.unmarkSelected()
    );
  }
  unhighlightDuration() {
    $find(`${config.dayComponent}[highlighted]`, this).forEach((date) =>
      date.unmarkHighlighted()
    );
  }
}

customElements.define(config.rangePickerComponent, RangePicker);
