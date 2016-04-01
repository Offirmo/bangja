#!/bin/sh

':'; //# http://sambal.org/?p=1014 ; exec `dirname $0`/node_modules/.bin/babel-node "$0" "$@"
'use strict';

var _core = require('./core');

var _core2 = _interopRequireDefault(_core);

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander2.default.version('0.0.1').option('-n, --non-interactive', 'Run in non-interactive mode').parse(process.argv);

const options = {
	interactive: !_commander2.default.nonInteractive
};

_core2.default.run(options);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0E7QUFDQTs7QUFFQTs7OztBQUVBOzs7Ozs7QUFFQSxvQkFDRSxPQURGLENBQ1UsT0FEVixFQUVFLE1BRkYsQ0FFUyx1QkFGVCxFQUVrQyw2QkFGbEMsRUFHRSxLQUhGLENBR1EsUUFBUSxJQUFSLENBSFI7O0FBS0EsTUFBTSxVQUFVO0FBQ2YsY0FBYSxDQUFDLG9CQUFRLGNBQVI7Q0FEVDs7QUFJTixlQUFPLEdBQVAsQ0FBVyxPQUFYIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4nOicgLy8jIGh0dHA6Ly9zYW1iYWwub3JnLz9wPTEwMTQgOyBleGVjIGBkaXJuYW1lICQwYC9ub2RlX21vZHVsZXMvLmJpbi9iYWJlbC1ub2RlIFwiJDBcIiBcIiRAXCJcbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IGJhbmdqYSBmcm9tICcuL2NvcmUnO1xuXG5pbXBvcnQgcHJvZ3JhbSBmcm9tICdjb21tYW5kZXInO1xuXG5wcm9ncmFtXG5cdC52ZXJzaW9uKCcwLjAuMScpXG5cdC5vcHRpb24oJy1uLCAtLW5vbi1pbnRlcmFjdGl2ZScsICdSdW4gaW4gbm9uLWludGVyYWN0aXZlIG1vZGUnKVxuXHQucGFyc2UocHJvY2Vzcy5hcmd2KTtcblxuY29uc3Qgb3B0aW9ucyA9IHtcblx0aW50ZXJhY3RpdmU6ICFwcm9ncmFtLm5vbkludGVyYWN0aXZlXG59O1xuXG5iYW5namEucnVuKG9wdGlvbnMpO1xuIl19