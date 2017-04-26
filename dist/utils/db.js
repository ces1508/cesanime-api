'use strict';

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
var r = require('rethinkdbdash')(connection);

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
  }]);

  return Db;
}();

exports.default = Db;