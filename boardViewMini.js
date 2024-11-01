var SLAGZET = SLAGZET || {};

SLAGZET.boardViewMini = (function () {
    var board = new SLAGZET.Board();
    var moveList = [];
    var futureMoves = [];

    function render(elm) {
        var fields = board.getFields();
        for (var i = 0; i < 50; i++) {
            if (i % 10 < 5) {
                elm.append(jQuery("<img src='" + SLAGZET.pluginPath + "lf18.png' alt=''/>"));
                elm.append(jQuery("<img id='field" + i + "'src='" + SLAGZET.pluginPath + fields[i] + "18.png' alt=''/>"));
            }
            else {
                elm.append(jQuery("<img id='field" + i + "'src='" + SLAGZET.pluginPath + fields[i] + "18.png' alt=''/>"));
                elm.append(jQuery("<img src='" + SLAGZET.pluginPath + "lf18.png'alt=''/>"));
            }
        }
    }

    function rerender() {
        var fields = board.getFields();
        for (var i = 0; i < 50; i++) {
            jQuery("#field" + i).attr('src', SLAGZET.pluginPath + fields[i] + "18.png");
        }
    }

    function loadPosition(arr) {
        board.loadPosition(arr);
    }

    function redoMove() {
        var move = futureMoves.pop();
        moveList.push(move);
        board.move(move);
        rerender();
        jQuery("#SVDimgPrev").attr('src', SLAGZET.pluginPath + 'btnback.png');
        jQuery("#SVDimgPrev").toggleClass('SVDclickable', true);
        if (futureMoves.length == 0) {
            jQuery("#SVDimgNext").attr('src', SLAGZET.pluginPath + 'btnforwarddis.png');
            jQuery("#SVDimgNext").toggleClass('SVDclickable', false);
        }
    }

    function undoMove() {
        var move = moveList.pop();
        futureMoves.push(move);
        board.undoMove(move);
        rerender();
        jQuery("#SVDimgNext").attr('src', SLAGZET.pluginPath + 'btnforward.png');
        jQuery("#SVDimgNext").toggleClass('SVDclickable', true);
        if (moveList.length == 0) {
            jQuery("#SVDimgPrev").attr('src', SLAGZET.pluginPath + 'btnbackdis.png');
            jQuery("#SVDimgPrev").toggleClass('SVDclickable', false);
        }
    }

    function loadSolution(parSolution) {
        var move;
        while (move = parSolution.pop()) {
            futureMoves.push(move);
        }
    }

    return {
        render: render,
        loadPosition: loadPosition,
        loadSolution: loadSolution,
        undoMove: undoMove,
        redoMove: redoMove
    };
})();

//load data
SLAGZET.jsonData = JSON.parse(jQuery('#SVDjson').text());
SLAGZET.boardViewMini.loadPosition(SLAGZET.jsonData.diagram.position);
SLAGZET.boardViewMini.loadSolution(SLAGZET.jsonData.diagram.solution);
SLAGZET.pluginPath = jQuery('#SVDurl').text();

jQuery('#SVDname').text('');
if (SLAGZET.jsonData.game) {
    if ((SLAGZET.jsonData.game.playerWhiteName + SLAGZET.jsonData.game.playerBlackName).length) {
        jQuery('#SVDname').text(SLAGZET.jsonData.game.playerWhiteName + ' - ' + SLAGZET.jsonData.game.playerBlackName);
    }
} else {
    if (SLAGZET.jsonData.composition && SLAGZET.jsonData.composition.compositionAuthor) {
        jQuery('#SVDname').text(SLAGZET.jsonData.composition.compositionAuthor);
    }
}
jQuery('#SVDass').text(SLAGZET.jsonData.assignment);
jQuery('#SVDoriginal').attr('href', SLAGZET.jsonData.url);

//bind events
jQuery('#SVDimgPrev').click(function () {
    if (jQuery('#SVDimgPrev').attr('src') == SLAGZET.pluginPath + 'btnback.png') {
        SLAGZET.boardViewMini.undoMove();
    }
});

jQuery('#SVDimgNext').click(function () {
    if (jQuery('#SVDimgNext').attr('src') == SLAGZET.pluginPath + 'btnforward.png') {
        SLAGZET.boardViewMini.redoMove();
    }
});

//render
SLAGZET.boardViewMini.render(jQuery('#SVDboard'));