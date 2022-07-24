const cellElement = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const statusContainer = document.getElementById('status')
const statusMessage = document.getElementById('status-message')
const restartBtn = document.getElementById('restart-btn')
const playerTurn = document.getElementById('player-turn')
const xClass = 'x'
const oClass = 'o'
let turn

// winning combinations

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

// add hover effect to the cell

const hoverClass = (cell) => { 
    board.classList.remove(xClass)
    board.classList.remove(oClass)
    if (turn) {
        board.classList.add(xClass)
    } else { 
        board.classList.add(oClass)
    }
}

const handleClick = (e) => {

    // add class to the cell
    const cell = e.target
    const currentClass = turn ? xClass : oClass
    addClass(cell, currentClass)

    // change turn
    turn = !turn
    playerTurn.innerHTML = `Player turn: ${turn ? 'X' : 'O'}`

    // add hover class to the cell
    hoverClass(cell)

    // check for win

    if (checkWin(currentClass)) { 
        statusContainer.style.display = 'flex'
        statusMessage.innerText = `${currentClass}'s wins!`
    } else if (isDraw()) { 
        statusContainer.style.display = 'flex'
        statusMessage.innerText = 'Draw!'
    } else { 
        hoverClass()
    }

}

// to check for draw

function isDraw() {
    return [...cellElement].every(cell => { 
        return cell.classList.contains(xClass) || cell.classList.contains(oClass)
    })
}

// to start the game

const startGame = () => { 
    turn = false
    cellElement.forEach(cell => { 
        cell.addEventListener('click', handleClick, { once: true });
        
    })
    hoverClass()
}

startGame()

// to add class to the cell

const addClass = (cell, currentClass) => { 
    cell.classList.add(currentClass)
}

// to check for win

function checkWin(currentClass) { 
    return winningCombinations.some(combination => { 
        return combination.every(index => { 
            return cellElement[index].classList.contains(currentClass)
        })
    })
}


// restart game
restartBtn.addEventListener('click', () => { 
    statusContainer.style.display = 'none'
    cellElement.forEach(cell => { 
        cell.classList.remove(xClass)
        cell.classList.remove(oClass)
    })
    startGame()
})


