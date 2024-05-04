document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('gameBoard');
    const status = document.getElementById('status');
    const resetButton = document.getElementById('resetButton');

    let currentPlayer = 'X';
    const squares = Array.from({ length: 9 }, (_, index) => ({
        index,
        player: null,
    }));

    const renderBoard = () => {
        gameBoard.innerHTML = '';
        squares.forEach((square, index) => {
            const squareElement = document.createElement('div');
            squareElement.className = 'cell';
            squareElement.textContent = square.player;
            squareElement.addEventListener('click', () => {
                if (!square.player) {
                    square.player = currentPlayer;
                    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                    renderBoard();
                    checkWinner();
                }
            });
            gameBoard.appendChild(squareElement);
        });
    };

    const checkWinner = () => {
        const winningCombos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        winningCombos.forEach((combo) => {
            const [a, b, c] = combo;
            if (
                squares[a].player &&
                squares[a].player === squares[b].player &&
                squares[a].player === squares[c].player
            ) {
                status.textContent = `${squares[a].player} wins!`;
                gameBoard.style.pointerEvents = 'none';
            }
        });
    };

    resetButton.addEventListener('click', () => {
        currentPlayer = 'X';
        squares.forEach((square) => {
            square.player = null;
        });
        renderBoard();
        status.textContent = '';
        gameBoard.style.pointerEvents = 'auto';
    });

    renderBoard();
});
