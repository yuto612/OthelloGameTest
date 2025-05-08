const board = document.getElementById('board');
const message = document.getElementById('message');
let currentPlayer = 1; // 1: 黒, 2: 白
let gameBoard = [];

// ゲームボードの初期化
function initializeBoard() {
    gameBoard = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 2, 0, 0, 0],
        [0, 0, 0, 2, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]
    ];
}

// ボードの描画
function renderBoard() {
    board.innerHTML = '';
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener('click', handleCellClick);

            if (gameBoard[row][col] === 1) {
                cell.classList.add('black');
            } else if (gameBoard[row][col] === 2) {
                cell.classList.add('white');
            }

            board.appendChild(cell);
        }
    }
    message.textContent = currentPlayer === 1 ? '黒の番です' : '白の番です';
}

// セルのクリックハンドラ
function handleCellClick(event) {
    const row = parseInt(event.target.dataset.row);
    const col = parseInt(event.target.dataset.col);

    if (isValidMove(row, col)) {
        placePiece(row, col);
        switchPlayer();
        renderBoard();
        checkGameOver();
    }
}

// 有効な手かどうかをチェック
function isValidMove(row, col) {
    if (gameBoard[row][col] !== 0) {
        return false;
    }
    // 周囲の石をチェックして、ひっくり返せる石があるか確認
    return checkFlips(row, col).length > 0;
}

// 石を置く
function placePiece(row, col) {
    gameBoard[row][col] = currentPlayer;
    const flips = checkFlips(row, col);
    flips.forEach(flip => {
        gameBoard[flip[0]][flip[1]] = currentPlayer;
    });
}

// ひっくり返せる石をチェック
function checkFlips(row, col) {
    const flips = [];
    const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],           [0, 1],
        [1, -1], [1, 0], [1, 1]
    ];

    for (const dir of directions) {
        const tempFlips = [];
        let r = row + dir[0];
        let c = col + dir[1];

        while (r >= 0 && r < 8 && c >= 0 && c < 8 && gameBoard[r][c] !== 0 && gameBoard[r][c] !== currentPlayer) {
            tempFlips.push([r, c]);
            r += dir[0];
            c += dir[1];
        }

        if (r >= 0 && r < 8 && c >= 0 && c < 8 && gameBoard[r][c] === currentPlayer) {
            flips.push(...tempFlips);
        }
    }
    return flips;
}

// プレイヤーの交代
function switchPlayer() {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
}

// ゲームオーバーのチェック
function checkGameOver() {
    if (isBoardFull() || !canMove(1) && !canMove(2)) {
        const winner = calculateWinner();
        if (winner === 0) {
            message.textContent = '引き分け！';
        } else {
            message.textContent = (winner === 1 ? '黒' : '白') + 'の勝ち！';
        }
    } else if (!canMove(currentPlayer)) {
        switchPlayer();
        renderBoard();
        message.textContent = currentPlayer === 1 ? '黒の番です (パス)' : '白の番です (パス)';
    }
}

// ボードが埋まっているか
function isBoardFull() {
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            if (gameBoard[row][col] === 0) {
                return false;
            }
        }
    }
    return true;
}

// プレイヤーが打てる場所があるか
function canMove(player) {
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            if (gameBoard[row][col] === 0 && checkFlips(row, col, player).length > 0) {
                return true;
            }
        }
    }
    return false;
}

// 勝者の計算
function calculateWinner() {
    let blackCount = 0;
    let whiteCount = 0;
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            if (gameBoard[row][col] === 1) {
                blackCount++;
            } else if (gameBoard[row][col] === 2) {
                whiteCount++;
            }
        }
    }
    if (blackCount > whiteCount) {
        return 1;
    } else if (whiteCount > blackCount) {
        return 2;
    } else {
        return 0;
    }
}

// ゲームの初期化
initializeBoard();
renderBoard();
