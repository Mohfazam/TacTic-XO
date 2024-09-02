let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let newgamebtn = document.querySelector("#new-btn");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;
let movesCount = 0;

const winpatterns = {
    0: [[0, 1, 2], [0, 3, 6], [0, 4, 8]],
    1: [[0, 1, 2], [1, 4, 7]],
    2: [[0, 1, 2], [2, 5, 8], [2, 4, 6]],
    3: [[0, 3, 6], [3, 4, 5]],
    4: [[1, 4, 7], [3, 4, 5], [0, 4, 8], [2, 4, 6]],
    5: [[2, 5, 8], [3, 4, 5]],
    6: [[0, 3, 6], [6, 7, 8], [2, 4, 6]],
    7: [[1, 4, 7], [6, 7, 8]],
    8: [[0, 4, 8], [2, 5, 8], [6, 7, 8]]
};

const resetgame = () => {
    turnO = true;
    movesCount = 0;
    enableboxes();
    msgcontainer.classList.add("hide");
};

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            box.style.color = "#2563eb";  
        } else {
            box.innerText = "X";
            box.style.color = "#f97316";  
        }

        box.disabled = true;
        movesCount++;
        checkWinner(index);
        turnO = !turnO;
    });
});

const disableboxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableboxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const showwinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgcontainer.classList.remove("hide");
    disableboxes();
};

const showdraw = () => {
    msg.innerText = "It's a Draw!";
    msgcontainer.classList.remove("hide");
};

const checkWinner = (lastMoveIndex) => {
    const relevantPatterns = winpatterns[lastMoveIndex];

    for (let pattern of relevantPatterns) {
        const [a, b, c] = pattern;
        if (boxes[a].innerText !== "" && boxes[a].innerText === boxes[b].innerText && boxes[a].innerText === boxes[c].innerText) {
            showwinner(boxes[a].innerText);
            return;
        }
    }

    if (movesCount === 9) {
        showdraw();
    }
};

newgamebtn.addEventListener("click", resetgame);
resetbtn.addEventListener("click", resetgame);
