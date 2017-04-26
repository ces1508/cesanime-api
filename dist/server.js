'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

require('babel-polyfill');

var _db = require('./utils/db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var port = process.env.PORT || 3000;
var app = (0, _express2.default)();
var db = new _db2.default();

app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_bodyParser2.default.json());

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
            dataChange = {};

            if (data.name) {
              dataChange.name = data.name;
            }
            if (data.thumbnail) {
              dataChange.thumbnail = data.thumbnail;
            }
            if (data.categoryId) {
              dataChange.categoryId = data.categoryId;
            }

            _context4.next = 8;
            return db.updatedAnime(id, dataChange);

          case 8:
            updated = _context4.sent;

            if (!updated.error) {
              _context4.next = 13;
              break;
            }

            if (!updated.message.match(/anime not found/g)) {
              _context4.next = 12;
              break;
            }

            return _context4.abrupt('return', res.status(404).jsonp(updated));

          case 12:
            return _context4.abrupt('return', res.status(500).jsonp(updated));

          case 13:
            res.status(200).jsonp(updated);

          case 14:
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
app.listen(port, function (err) {
  if (err) {
    console.log(err.message);
    exit(1);
  }
});