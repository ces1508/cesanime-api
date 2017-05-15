/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _express = __webpack_require__(4);

var _express2 = _interopRequireDefault(_express);

var _bodyParser = __webpack_require__(3);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

__webpack_require__(0);

var _db = __webpack_require__(2);

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var port = process.env.PORT || 3000;
var app = (0, _express2.default)();
var db = new _db2.default();
app.set('views', './views');
app.set('view engine', 'pug');
app.use('/statics', _express2.default.static('./dist/'));
app.use('/images', _express2.default.static('./dist/assets/img/'));
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_bodyParser2.default.json());

app.get('/admin', function (req, res) {
  res.render('admin');
});

app.get('/admin/dashboard', function (req, res) {
  res.render('dashboard');
});
app.get('/admin/anime/:id/edit', function (req, res) {
  res.render('dashboard');
});

app.get('/animes', function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res) {
    var animes;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return db.getAnimes();

          case 2:
            animes = _context.sent;

            res.status(200).jsonp(animes);

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
// get an ainme by id
app.get('/anime/:id', function () {
  var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(req, res) {
    var anime;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return db.getAnime(req.params.id);

          case 2:
            anime = _context2.sent;

            if (!(anime === null)) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt('return', res.status(404).json({ error: 'anime not found' }));

          case 5:
            res.status(200).json(anime);

          case 6:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
//create anime in the database
app.post('/anime', function () {
  var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(req, res) {
    var anime;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return db.createAnime(req.body);

          case 2:
            anime = _context3.sent;

            res.status(201).jsonp(anime);

          case 4:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
// update anime by id

app.patch('/anime/:id', function () {
  var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(req, res) {
    var id, data, dataChange, updated;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id = req.params.id;
            data = req.body;

            console.log('body', data);
            dataChange = {};

            if (data.name) {
              dataChange.name = data.name;
            }
            if (data.thumbnail) {
              dataChange.thumbnail = data.thumbnail;
            }
            if (data.categories) {
              dataChange.categories = data.categories;
            }

            _context4.next = 9;
            return db.updatedAnime(id, dataChange);

          case 9:
            updated = _context4.sent;

            if (!updated.error) {
              _context4.next = 14;
              break;
            }

            if (!updated.message.match(/anime not found/g)) {
              _context4.next = 13;
              break;
            }

            return _context4.abrupt('return', res.status(404).jsonp(updated));

          case 13:
            return _context4.abrupt('return', res.status(500).jsonp(updated));

          case 14:
            res.status(200).jsonp(updated);

          case 15:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());

app.delete('/anime/:id', function () {
  var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(req, res) {
    var id, deleteAnime;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            id = req.params.id;
            _context5.next = 3;
            return db.destroyAnime(id);

          case 3:
            deleteAnime = _context5.sent;

            if (!deleteAnime.error) {
              _context5.next = 8;
              break;
            }

            if (!deleteAnime.message.match(/anime not found/g)) {
              _context5.next = 7;
              break;
            }

            return _context5.abrupt('return', res.status(404).jsonp(deleteAnime));

          case 7:
            return _context5.abrupt('return', res.status(500).jsonp(deleteAnime));

          case 8:
            res.status(200).jsonp(deleteAnime);

          case 9:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());

app.get('/anime/:id/capitulos', function () {
  var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(req, res) {
    var animeId, episodes;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            animeId = req.params.id;
            _context6.next = 3;
            return db.getEpisodes(animeId);

          case 3:
            episodes = _context6.sent;

            if (!episodes.error) {
              _context6.next = 8;
              break;
            }

            if (!episodes.message.match(/not found/g)) {
              _context6.next = 7;
              break;
            }

            return _context6.abrupt('return', res.status(404).jsonp(episodes));

          case 7:
            return _context6.abrupt('return', res.status(500).jsonp(episodes));

          case 8:
            res.status(200).jsonp(episodes.episodes);

          case 9:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  }));

  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}());

app.post('/anime/:id/capitulos', function () {
  var _ref7 = _asyncToGenerator(regeneratorRuntime.mark(function _callee7(req, res) {
    var animeId, data, episode;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            animeId = req.params.id;
            data = req.body;

            if (data.video) {
              _context7.next = 4;
              break;
            }

            return _context7.abrupt('return', res.status(400).json({ error: true, message: 'debes enviar un objecto con le uri del video' }));

          case 4:
            data.animeId = animeId;

            _context7.next = 7;
            return db.createEpisode(animeId, data);

          case 7:
            episode = _context7.sent;

            if (episode.error) {
              episode.message.match(/not found/g) ? res.status(404).jsonp(episode) : null;
              episode.message.match(/already/g) ? res.status(400).jsonp(episode) : '';
            }
            res.status(201).jsonp(episode);

          case 10:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined);
  }));

  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}());

app.patch('/anime/:id/capitulos/:episodeId', function () {
  var _ref8 = _asyncToGenerator(regeneratorRuntime.mark(function _callee8(req, res) {
    var episodeId, data, newData, updated;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            episodeId = req.params.episodeId;
            data = req.body;
            newData = {};

            data.name ? newData.name = data.name : null;
            data.number ? newData.number = parseInt(data.number) : null;
            data.video ? newData.video = data.video : null;
            _context8.next = 8;
            return db.updateEpisode(episodeId, newData);

          case 8:
            updated = _context8.sent;

            if (!updated.error) {
              _context8.next = 12;
              break;
            }

            updated.message.match(/not found/g) ? res.status(404).jsonp(episode) : null;
            return _context8.abrupt('return', res.status(500).jsonp(updated));

          case 12:
            res.status(204).jsonp(updated);

          case 13:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, undefined);
  }));

  return function (_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}());

app.delete('/anime/:id/capitulos/:episodeId', function () {
  var _ref9 = _asyncToGenerator(regeneratorRuntime.mark(function _callee9(req, res) {
    var episodeId, deleted;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            episodeId = req.params.episodeId;
            _context9.next = 3;
            return db.deleteEpisode(episodeId);

          case 3:
            deleted = _context9.sent;

            if (!deleted.error) {
              _context9.next = 7;
              break;
            }

            deleted.message.match(/not found/g) ? res.status(404).jsonp(deleted) : null;
            return _context9.abrupt('return', res.status(500).jsonp(deleted));

          case 7:
            res.status(204).jsonp(deleted);

          case 8:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, undefined);
  }));

  return function (_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}());
app.post('/anime/:id/vote', function () {
  var _ref10 = _asyncToGenerator(regeneratorRuntime.mark(function _callee10(req, res) {
    var animeId, voted;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            animeId = req.params.id;
            _context10.next = 3;
            return db.animeVote(animeId);

          case 3:
            voted = _context10.sent;

            if (!voted.error) {
              _context10.next = 7;
              break;
            }

            voted.message.match(/not found/g) ? res.status(404).jsonp(voted) : null;
            return _context10.abrupt('return', res.status(500).jsonp(voted));

          case 7:
            res.status(201).jsonp(voted);

          case 8:
          case 'end':
            return _context10.stop();
        }
      }
    }, _callee10, undefined);
  }));

  return function (_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}());

app.get('/animes-top', function () {
  var _ref11 = _asyncToGenerator(regeneratorRuntime.mark(function _callee11(req, res) {
    var animes;
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.next = 2;
            return db.animesPopulares();

          case 2:
            animes = _context11.sent;

            res.status(200).jsonp(animes);

          case 4:
          case 'end':
            return _context11.stop();
        }
      }
    }, _callee11, undefined);
  }));

  return function (_x21, _x22) {
    return _ref11.apply(this, arguments);
  };
}());
app.get('/filter-anime/:anime', function () {
  var _ref12 = _asyncToGenerator(regeneratorRuntime.mark(function _callee12(req, res) {
    var anime, animes;
    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            anime = req.params.anime;
            _context12.next = 3;
            return db.filterAnime(anime);

          case 3:
            animes = _context12.sent;

            if (!animes.error) {
              _context12.next = 6;
              break;
            }

            return _context12.abrupt('return', res.status(500).jsonp(animes));

          case 6:
            res.status(200).jsonp(animes);

          case 7:
          case 'end':
            return _context12.stop();
        }
      }
    }, _callee12, undefined);
  }));

  return function (_x23, _x24) {
    return _ref12.apply(this, arguments);
  };
}());
app.get('/category/:category', function () {
  var _ref13 = _asyncToGenerator(regeneratorRuntime.mark(function _callee13(req, res, next) {
    var category, animes;
    return regeneratorRuntime.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            category = req.params.category;

            category = category.toUpperCase();

            if (!category) {
              _context13.next = 11;
              break;
            }

            _context13.next = 5;
            return db.getAnimesByCategories(category);

          case 5:
            animes = _context13.sent;

            if (!animes.error) {
              _context13.next = 8;
              break;
            }

            return _context13.abrupt('return', res.status(500).jsonp(animes));

          case 8:
            res.status(200).jsonp(animes);
            _context13.next = 12;
            break;

          case 11:
            return _context13.abrupt('return', res.status(500).jsonp({ error: 'la categoria no puede ser nulo o vacia' }));

          case 12:
          case 'end':
            return _context13.stop();
        }
      }
    }, _callee13, undefined);
  }));

  return function (_x25, _x26, _x27) {
    return _ref13.apply(this, arguments);
  };
}());
app.listen(port, function (err) {
  if (err) {
    console.log(err.message);
    exit(1);
  }
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var connection = {
  host: process.env.HOST_DATABASE || 'localhost',
  port: process.env.HOST_DATABASE || 28015,
  db: 'cesanime'
};
var r = __webpack_require__(5)(connection);

var Db = function () {
  function Db() {
    _classCallCheck(this, Db);
  }

  _createClass(Db, [{
    key: 'createAnime',
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(data) {
        var getAnime, anime;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return r.table('animes').getAll(data.name, { index: 'name' }).count();

              case 3:
                getAnime = _context.sent;

                if (!(getAnime < 1)) {
                  _context.next = 12;
                  break;
                }

                _context.next = 7;
                return r.table('animes').insert(data);

              case 7:
                anime = _context.sent;
                _context.next = 10;
                return r.table('animes').get(anime.generated_keys[0]);

              case 10:
                anime = _context.sent;
                return _context.abrupt('return', { error: false, anime: anime });

              case 12:
                return _context.abrupt('return', { error: 'anime already exists' });

              case 15:
                _context.prev = 15;
                _context.t0 = _context['catch'](0);
                return _context.abrupt('return', { error: true, message: _context.t0.message });

              case 18:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 15]]);
      }));

      function createAnime(_x) {
        return _ref.apply(this, arguments);
      }

      return createAnime;
    }()
  }, {
    key: 'getAnimes',
    value: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
        var animes;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return r.table('animes').orderBy({ index: 'name' });

              case 3:
                animes = _context2.sent;
                return _context2.abrupt('return', animes);

              case 7:
                _context2.prev = 7;
                _context2.t0 = _context2['catch'](0);
                return _context2.abrupt('return', { error: true, message: _context2.t0.message });

              case 10:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 7]]);
      }));

      function getAnimes() {
        return _ref2.apply(this, arguments);
      }

      return getAnimes;
    }()
  }, {
    key: 'getAnime',
    value: function () {
      var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(id) {
        var anime;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return r.table('animes').get(id);

              case 3:
                anime = _context3.sent;
                return _context3.abrupt('return', anime);

              case 7:
                _context3.prev = 7;
                _context3.t0 = _context3['catch'](0);
                return _context3.abrupt('return', { error: true, message: _context3.t0.message });

              case 10:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 7]]);
      }));

      function getAnime(_x2) {
        return _ref3.apply(this, arguments);
      }

      return getAnime;
    }()
  }, {
    key: 'updatedAnime',
    value: function () {
      var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(id, data) {
        var anime;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return r.table('animes').get(id);

              case 3:
                anime = _context4.sent;

                if (!anime) {
                  _context4.next = 9;
                  break;
                }

                _context4.next = 7;
                return r.table('animes').get(id).update(data);

              case 7:
                anime = _context4.sent;
                return _context4.abrupt('return', { error: false, changed: true });

              case 9:
                return _context4.abrupt('return', { error: true, message: 'anime not found' });

              case 12:
                _context4.prev = 12;
                _context4.t0 = _context4['catch'](0);
                return _context4.abrupt('return', { error: true, message: _context4.t0.message });

              case 15:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 12]]);
      }));

      function updatedAnime(_x3, _x4) {
        return _ref4.apply(this, arguments);
      }

      return updatedAnime;
    }()
  }, {
    key: 'destroyAnime',
    value: function () {
      var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(id) {
        var anime;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                _context5.next = 3;
                return r.table('animes').get(id);

              case 3:
                anime = _context5.sent;

                if (!anime) {
                  _context5.next = 9;
                  break;
                }

                _context5.next = 7;
                return r.table('animes').get(id).delete();

              case 7:
                anime = _context5.sent;
                return _context5.abrupt('return', { error: false, delete: true });

              case 9:
                return _context5.abrupt('return', { error: true, message: 'anime not found' });

              case 12:
                _context5.prev = 12;
                _context5.t0 = _context5['catch'](0);
                return _context5.abrupt('return', { error: true, message: _context5.t0.message });

              case 15:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this, [[0, 12]]);
      }));

      function destroyAnime(_x5) {
        return _ref5.apply(this, arguments);
      }

      return destroyAnime;
    }()
  }, {
    key: 'createEpisode',
    value: function () {
      var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(animeId, data) {
        var anime, episode;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                _context6.next = 3;
                return this.getAnime(animeId);

              case 3:
                anime = _context6.sent;

                if (!anime) {
                  _context6.next = 13;
                  break;
                }

                _context6.next = 7;
                return r.table('episodes').getAll(data.name, { index: 'name' }).count();

              case 7:
                episode = _context6.sent;

                if (!(episode > 1)) {
                  _context6.next = 10;
                  break;
                }

                return _context6.abrupt('return', { error: true, message: 'episode already in database' });

              case 10:
                _context6.next = 12;
                return r.table('episodes').insert(data);

              case 12:
                return _context6.abrupt('return', { error: false, created: true });

              case 13:
                return _context6.abrupt('return', { error: true, message: 'anime not found' });

              case 16:
                _context6.prev = 16;
                _context6.t0 = _context6['catch'](0);
                return _context6.abrupt('return', { error: true, message: _context6.t0.message });

              case 19:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this, [[0, 16]]);
      }));

      function createEpisode(_x6, _x7) {
        return _ref6.apply(this, arguments);
      }

      return createEpisode;
    }()
  }, {
    key: 'getEpisodes',
    value: function () {
      var _ref7 = _asyncToGenerator(regeneratorRuntime.mark(function _callee7(animeId) {
        var anime, episodes;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;
                _context7.next = 3;
                return this.getAnime(animeId);

              case 3:
                anime = _context7.sent;

                if (!anime) {
                  _context7.next = 9;
                  break;
                }

                _context7.next = 7;
                return r.table('episodes').getAll(animeId, { index: 'animeId' }).orderBy(r.asc('number'));

              case 7:
                episodes = _context7.sent;
                return _context7.abrupt('return', { error: false, episodes: episodes });

              case 9:
                return _context7.abrupt('return', { error: true, message: 'anime not found' });

              case 12:
                _context7.prev = 12;
                _context7.t0 = _context7['catch'](0);
                return _context7.abrupt('return', { error: true, message: _context7.t0.message });

              case 15:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this, [[0, 12]]);
      }));

      function getEpisodes(_x8) {
        return _ref7.apply(this, arguments);
      }

      return getEpisodes;
    }()
  }, {
    key: 'getEpisode',
    value: function () {
      var _ref8 = _asyncToGenerator(regeneratorRuntime.mark(function _callee8(episodeId) {
        var episode;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.prev = 0;
                _context8.next = 3;
                return r.table('episodes').get(episodeId);

              case 3:
                episode = _context8.sent;
                return _context8.abrupt('return', episode);

              case 7:
                _context8.prev = 7;
                _context8.t0 = _context8['catch'](0);
                return _context8.abrupt('return', { error: true, message: _context8.t0.message });

              case 10:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this, [[0, 7]]);
      }));

      function getEpisode(_x9) {
        return _ref8.apply(this, arguments);
      }

      return getEpisode;
    }()
  }, {
    key: 'updateEpisode',
    value: function () {
      var _ref9 = _asyncToGenerator(regeneratorRuntime.mark(function _callee9(episodeId, data) {
        var episode, updated;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.prev = 0;
                _context9.next = 3;
                return this.getEpisode(episodeId);

              case 3:
                episode = _context9.sent;

                if (!episode) {
                  _context9.next = 9;
                  break;
                }

                _context9.next = 7;
                return r.table('episodes').get(episodeId).update(data);

              case 7:
                updated = _context9.sent;
                return _context9.abrupt('return', { error: false, upadted: true });

              case 9:
                return _context9.abrupt('return', { error: true, message: 'episode not found' });

              case 12:
                _context9.prev = 12;
                _context9.t0 = _context9['catch'](0);
                return _context9.abrupt('return', { error: true, message: _context9.t0.message });

              case 15:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, this, [[0, 12]]);
      }));

      function updateEpisode(_x10, _x11) {
        return _ref9.apply(this, arguments);
      }

      return updateEpisode;
    }()
  }, {
    key: 'deleteEpisode',
    value: function () {
      var _ref10 = _asyncToGenerator(regeneratorRuntime.mark(function _callee10(episodeId) {
        var episode;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.prev = 0;
                _context10.next = 3;
                return this.getEpisode(episodeId);

              case 3:
                episode = _context10.sent;

                if (!episode) {
                  _context10.next = 8;
                  break;
                }

                _context10.next = 7;
                return r.table('episodes').get(episode.id).delete();

              case 7:
                return _context10.abrupt('return', { error: false, deleted: true });

              case 8:
                return _context10.abrupt('return', { error: true, message: 'episode not found' });

              case 11:
                _context10.prev = 11;
                _context10.t0 = _context10['catch'](0);
                return _context10.abrupt('return', { error: true, message: _context10.t0.message });

              case 14:
              case 'end':
                return _context10.stop();
            }
          }
        }, _callee10, this, [[0, 11]]);
      }));

      function deleteEpisode(_x12) {
        return _ref10.apply(this, arguments);
      }

      return deleteEpisode;
    }()
  }, {
    key: 'animeVote',
    value: function () {
      var _ref11 = _asyncToGenerator(regeneratorRuntime.mark(function _callee11(animeId) {
        var anime;
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.prev = 0;
                _context11.next = 3;
                return this.getAnime(animeId);

              case 3:
                anime = _context11.sent;

                if (!anime) {
                  _context11.next = 8;
                  break;
                }

                _context11.next = 7;
                return r.table('animes').get(anime.id).update({
                  votes: r.row('votes').add(1)
                });

              case 7:
                return _context11.abrupt('return', { error: false, voted: true });

              case 8:
                return _context11.abrupt('return', { error: true, message: 'anime not found' });

              case 11:
                _context11.prev = 11;
                _context11.t0 = _context11['catch'](0);
                return _context11.abrupt('return', { error: true, message: _context11.t0.message });

              case 14:
              case 'end':
                return _context11.stop();
            }
          }
        }, _callee11, this, [[0, 11]]);
      }));

      function animeVote(_x13) {
        return _ref11.apply(this, arguments);
      }

      return animeVote;
    }()
  }, {
    key: 'animesPopulares',
    value: function () {
      var _ref12 = _asyncToGenerator(regeneratorRuntime.mark(function _callee12() {
        var animes;
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _context12.prev = 0;
                _context12.next = 3;
                return r.table('animes').orderBy(r.desc('votes')).limit(10);

              case 3:
                animes = _context12.sent;
                return _context12.abrupt('return', animes);

              case 7:
                _context12.prev = 7;
                _context12.t0 = _context12['catch'](0);
                return _context12.abrupt('return', { error: true, message: _context12.t0.message });

              case 10:
              case 'end':
                return _context12.stop();
            }
          }
        }, _callee12, this, [[0, 7]]);
      }));

      function animesPopulares() {
        return _ref12.apply(this, arguments);
      }

      return animesPopulares;
    }()
  }, {
    key: 'filterAnime',
    value: function () {
      var _ref13 = _asyncToGenerator(regeneratorRuntime.mark(function _callee13(name) {
        var animes;
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _context13.prev = 0;
                _context13.next = 3;
                return r.db('cesanime').table('animes').filter(r.row('name').match('(?i)' + name));

              case 3:
                animes = _context13.sent;
                return _context13.abrupt('return', animes);

              case 7:
                _context13.prev = 7;
                _context13.t0 = _context13['catch'](0);
                return _context13.abrupt('return', { error: true, message: _context13.t0.message });

              case 10:
              case 'end':
                return _context13.stop();
            }
          }
        }, _callee13, this, [[0, 7]]);
      }));

      function filterAnime(_x14) {
        return _ref13.apply(this, arguments);
      }

      return filterAnime;
    }()
  }, {
    key: 'getAnimesByCategories',
    value: function () {
      var _ref14 = _asyncToGenerator(regeneratorRuntime.mark(function _callee14(category) {
        var animes;
        return regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                _context14.prev = 0;
                _context14.next = 3;
                return r.db('cesanime').table('animes').filter(r.row("categories").contains(category));

              case 3:
                animes = _context14.sent;
                return _context14.abrupt('return', animes);

              case 7:
                _context14.prev = 7;
                _context14.t0 = _context14['catch'](0);
                return _context14.abrupt('return', { error: true, message: _context14.t0.message });

              case 10:
              case 'end':
                return _context14.stop();
            }
          }
        }, _callee14, this, [[0, 7]]);
      }));

      function getAnimesByCategories(_x15) {
        return _ref14.apply(this, arguments);
      }

      return getAnimesByCategories;
    }()
  }]);

  return Db;
}();

exports.default = Db;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("rethinkdbdash");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(0);
module.exports = __webpack_require__(1);


/***/ })
/******/ ]);