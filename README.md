# Dates

> Basic Datepicker WebComponent inspired by AirBnB's react-dates

## Demo

[Check it live!](http://pankajpatel.github.io/dates)

## Install

Install the component using 

1. [Bower](http://bower.io/):

    ```sh
    bower install git@github.com:pankajpatel/dates.git --save
    ```

2. [npm](http://npmjs.org/):

    ```sh
    npm install pankajpatel/dates --save
    ```

Or [download as ZIP](https://github.com/pankajpatel/git@github.com:pankajpatel/dates.git/archive/master.zip).

## Usage

### JS File

1. Import polyfill:

    ```html
    <script src="bower_components/webcomponentsjs/webcomponents.min.js"></script>
    ```

2. Import custom element script:

    ```html
    <script src="./dist/dates-component.js"></script>
    ```

3. Start using it!

    3.1 The standalone calendar:
    ```html
    <d-calendar months="3" step="1"></d-calendar>
    ```
    3.2 The Datepicker:
    ```html
    <d-datepicker on=".datepicker" open-event="focus" close-event="blur" months="3" step="1">
      <input type="text" class="datepicker" placeholder="Pick the date">
    </d-datepicker>
    ```
    3.3 The Rangepicker:
    ```html
    <d-rangepicker open-event="focus" close-event="blur" months="2" step="1">
      <input type="text" class="datepicker from" placeholder="Select Dates" />
      <input type="text" class="datepicker to" placeholder="Select Dates" />
    </d-rangepicker>
    ```

### Webpack

You can directly require the component in the main entry file and it should work as other dependencies in the project.

And after the bundle generation, you can use it as a normal customElement tag explained in Step 3 above.

## Options

Attribute     | Options     | Default      | Description
---           | ---         | ---          | ---
`on` | *string* | `.datepicker`| The Input selector on which DatePicker is to be bound
`open-event` | *string* | `focus` | Event name on the Input selector to trigger DatePicker's open
`close-event` | *string* | `blur` | Event name on the Input selector to trigger DatePicker's close
`months` | *number* | `1` | Number of months to be shown by Datepicker
`step` | *number* | `1` | Number of months to Step through on month navigation

## Events

Every component has different set of events. All of those events have the property `data` and `value` as subproperty of `data`.

Event| Compoenent | Description
--- | --- | ---
`range` | Rangepicker | When the dates for renge are selected
`change` | Datepicker, Calendar | When the date is selected


## History

For detailed changelog, check [Releases](https://github.com/pankajpatel/git@github.com:pankajpatel/dates.git/releases).

## License

[MIT License](http://opensource.org/licenses/MIT)
