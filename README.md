# Dates

> Basic Datepicker WebComponent inspired by AirBnB's react-dates

## Demo

[Check it live!](http://pankajpatel.github.io/git@github.com:pankajpatel/dates.git)

## Install

Install the component using [Bower](http://bower.io/):

```sh
$ bower install git@github.com:pankajpatel/dates.git --save
```

Or [download as ZIP](https://github.com/pankajpatel/git@github.com:pankajpatel/dates.git/archive/master.zip).

## Usage

1. Import polyfill:

    ```html
    <script src="bower_components/webcomponentsjs/webcomponents.min.js"></script>
    ```

2. Import custom element script:

    ```html
    <script src="./dist/dates-component.js"></script>
    ```

3. Start using it!

    ```html
    <d-calendar on=".datepicker" open-event="focus" close-event="blur" months="3" step="1" range>
      <input type="text" class="datepicker" placeholder="Pick the date">
    </d-calendar>
    ```

## Options

Attribute     | Options     | Default      | Description
---           | ---         | ---          | ---
`on`         | *string*    | `.datepicker`        | The Input selector on which DatePicker is to be bound
`open-event`         | *string*    | `focus`        | Event name on the Input selector to trigger DatePicker's open
`close-event`         | *string*    | `blur`        | Event name on the Input selector to trigger DatePicker's close
`months`         | *number*    | `1`        | Number of months to be shown by Datepicker
`step`         | *number*    | `1`        | Number of months to Step through on month navigation
`range`         | *boolean*    | `true`        | Enables the rangepicker

## Methods

Method        | Parameters   | Returns     | Description
---           | ---          | ---         | ---
`unicorn()`   | None.        | Nothing.    | Magic stuff appears.

## Events

Event         | Description
---           | ---
`onsomething` | Triggers when something happens.

## Development

In order to run it locally you'll need to fetch some dependencies and a basic server setup.

1. Install [bower](http://bower.io/) & [polyserve](https://npmjs.com/polyserve):

    ```sh
    $ npm install -g bower polyserve
    ```

2. Install local dependencies:

    ```sh
    $ bower install
    ```

3. Start development server and open `http://localhost:8080/components/my-repo/`.

    ```sh
    $ polyserve
    ```

## History

For detailed changelog, check [Releases](https://github.com/pankajpatel/git@github.com:pankajpatel/dates.git/releases).

## License

[MIT License](http://opensource.org/licenses/MIT)
