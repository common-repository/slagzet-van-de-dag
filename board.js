var SLAGZET = SLAGZET||{};

/* Logic for generating and playing moves*/
SLAGZET.Board = function () {
    var fields = [];
    var startFields = [];
    var posMoves = undefined;
    var empty = 0;  //0000
    var wm = 2;     //0010
    var wk = 3;     //0011
    var bm = 4;     //0100
    var bk = 5;     //0101
    var taken = 8;  //1000
    var white = 2;  //0010
    var black = 4;  //0100

    for (var i = 0; i < 50; i++) fields.push(empty);

    function fieldMapper(parField) {
        switch (parField) {
            case wm:
                return 'wm';
            case bm:
                return 'bm';
            case wk:
                return 'wk'
            case bk:
                return 'bk'
            default:
                return 'df'
        }
    }

    this.move = function (parMove) {
        parMove[0].pieceType = fields[parMove[0].start];
        fields[parMove[0].start] = empty;
        fields[parMove[parMove.length - 1].land] = parMove[0].pieceType;
        for (var i = 0; i < parMove.length; i++) {
            if (parMove[i].take) {
                parMove[i].pieceType = fields[parMove[i].take];
                fields[parMove[i].take] = empty;
            }
        }
        //add the move to the movelist
        promote();
        return parMove;
    };

    this.undoMove = function (parMove) {
        fields[parMove[parMove.length - 1].land] = empty;
        fields[parMove[0].start] = parMove[0].pieceType;
        for (var i = 0; i < parMove.length; i++) {
            if (parMove[i].take) {
                fields[parMove[i].take] = parMove[i].pieceType;
            }
        }
    }

    function promote() {
        for (var i = 0; i < 5; i++) {
            if (fields[49 - i] == bm) {
                fields[49 - i] = bk;
            }
            if (fields[i] == wm) {
                fields[i] = wk;
            }
        }
    }

    this.setField = function (parId, value) {
        switch (value) {
            case 'wm':
                var translatedValue = wm;
                break;
            case 'bm':
                translatedValue = bm;
                break;
            case 'wk':
                translatedValue = wk;
                break;
            case 'bk':
                translatedValue = bk;
                break;
            default:
                translatedValue = empty;
        }
        fields[parId] = translatedValue;
    }

    this.getFields = function () {
        return fields.map(fieldMapper);
    }

    this.getBoard = function () {
        return JSON.stringify(fields);
    }

    this.getField = function (parId) {
        return fieldMapper(fields[parId]);
    }

    this.loadPosition = function (arr) {
        fields = arr.slice(0);
    };
};