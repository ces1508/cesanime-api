'use strict';
require('babel-polyfill');
var setup = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var tableList;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return r.tableList();

          case 2:
            tableList = _context.sent;

            if (!(tableList.indexOf('animes') === -1)) {
              _context.next = 13;
              break;
            }

            _context.prev = 4;
            _context.next = 7;
            return r.tableCreate('animes');

          case 7:
            console.log('table animes created');
            _context.next = 13;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context['catch'](4);

            console.log('error creating table animes: ' + err.message);

          case 13:
            if (!(tableList.indexOf('categories') === -1)) {
              _context.next = 23;
              break;
            }

            _context.prev = 14;
            _context.next = 17;
            return r.tableCreate('categories');

          case 17:
            console.log('table categories created');
            _context.next = 23;
            break;

          case 20:
            _context.prev = 20;
            _context.t1 = _context['catch'](14);

            console.log('error creating table categories: ' + err.message);

          case 23:
            if (!(tableList.indexOf('episodes') === -1)) {
              _context.next = 33;
              break;
            }

            _context.prev = 24;
            _context.next = 27;
            return r.ta('episodes');

          case 27:
            console.log('table episodes created');
            _context.next = 33;
            break;

          case 30:
            _context.prev = 30;
            _context.t2 = _context['catch'](24);

            console.log('error creating table episodes: ' + err.message);

          case 33:
            console.log('creating index ...');
            _context.prev = 34;
            _context.next = 37;
            return r.table('episodes').indexCreate('animeId');

          case 37:
            _context.next = 39;
            return r.table('episodes').indexCreate('name');

          case 39:
            _context.next = 41;
            return r.table('animes').indexWait();

          case 41:
            _context.next = 43;
            return r.table('episodes').indexWait();

          case 43:
            _context.next = 45;
            return r.table('categories').indexWait();

          case 45:
            _context.next = 50;
            break;

          case 47:
            _context.prev = 47;
            _context.t3 = _context['catch'](34);

            console.log('error ' + _context.t3.message);

          case 50:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[4, 10], [14, 20], [24, 30], [34, 47]]);
  }));

  return function setup() {
    return _ref.apply(this, arguments);
  };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

require("babel-polyfill");
var connection = {
  host: process.env.HOST_DATABASE || 'localhost',
  port: process.env.HOST_DATABASE || 28015,
  db: 'cesanime'
};
var r = require('rethinkdbdash')(connection);

setup().then(function (data) {
  console.log(data);
}).catch(function (err) {
  console.log(err.message);
});