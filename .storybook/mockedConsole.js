const LogTypes = {
  log: 'LOG',
  info: 'INFO',
  warn: 'WARN',
  error: 'ERROR',
};

function createMockedConsole(logCallback) {
  const history = [];
  let groupDepth = 0;

  function prefix(str) {
    const underscores = Array(groupDepth).fill('_').join('');
    return underscores + str;
  }

  function log(logType, ...msgs) {
    let data = { [prefix(logType)]: msgs };
    history.push(data);
    logCallback(data);
  }

  function group(...title) {
    history.push({ [prefix('GROUP')]: title });
    groupDepth += 1;
  }

  function groupEnd() {
    groupDepth = Math.max(0, groupDepth - 1);
  }

  function printHistory() {
    return history.reduce((printedHistory, line) =>
      [printedHistory, printLine(line)].join('\n'), '');
  }

  return {
    group,
    groupEnd,
    printHistory,
    history: () => history,
    log: log.bind(null, LogTypes.log),
    info: log.bind(null, LogTypes.info),
    warn: log.bind(null, LogTypes.warn),
    error: log.bind(null, LogTypes.error),
  };
}

const inspectorStyles = `
  .inspector-json {
    padding: 0px 9px;
    font: 13px/18px Consolas, monospace;
    color: rgb( 75, 75, 75 );
  }
  .inspector-json * {
    white-space: pre-wrap;
    word-wrap: break-word;
  }
  .inspector-json ol,
  .inspector-json ul {
    list-style-type: none;
    margin: 0 0 9px 0;
    padding: 0 0 0 25px;
    border-left: rgba( 0, 0, 0, 0.1 ) 1px solid;
  }
  .inspector-json > ol,
  .inspector-json > ul {
    padding: 0;
    border-left: none;
  }
  .inspector-json var {
    font-style: normal;
  }
  .inspector-json li > strong,
  .inspector-json li > a {
    margin-right: 8px;
  }
  .inspector-json li > a {
    text-decoration: none;
    color: rgb( 0, 136, 204 );
  }
  .inspector-json li > strong {

    color: rgb( 0, 136, 204 );

  }
  .inspector-json li > a:hover {
    color: rgb( 0, 85, 128 );
  }
  .inspector-json li.object > a:before,
  .inspector-json li.array > a:before {
    content: '\\25BC';
    display: inline-block;
    width: 10px;
    margin-right: 5px;
    font-size: 75%;
  }
  .inspector-json li.collapsed > a:before {
    content: '\\25B6';
  }
  .inspector-json li.collapsed > ol,
  .inspector-json li.collapsed > ul {
    display: none;
  }
  .inspector-json li > span {
    color: rgb( 50, 150, 80 );
  }
  .inspector-json li > em {
    color: rgb( 190, 40, 40 );
  }
  .inspector-json li > var {
    color: rgb( 150, 0, 150 );
  }
  .inspector-json li > i {
    color: rgb( 150, 150, 150 );
  }`

module.exports = {
  createMockedConsole,
  inspectorStyles
}
