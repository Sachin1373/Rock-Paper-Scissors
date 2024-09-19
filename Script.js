// <---------------------------------MODAL---------------------------------------------------->
const modal = document.querySelector('.Modal');
    
function handleclose() {
    modal.style.display = 'none';
}
function handleopen() {
    modal.style.display = 'flex';
}

// <----------------------------------------------------------------------------------------------->



let UserScore = parseInt(localStorage.getItem('UserScore')) || 0;
let CompScore = parseInt(localStorage.getItem('CompScore')) || 0;


const User = document.querySelector('.Y_Score');
const Computer = document.querySelector('.C_Score');


User.innerHTML = UserScore;
Computer.innerHTML = CompScore;

const result = document.querySelector('.Result-Board');
const score = document.querySelector('.Score_Board');
const playboard = document.querySelector('.PlayGround');
const Choices = document.querySelectorAll('.Choice');
const btn = document.querySelector('.bottom-buttons');
const hurray = document.querySelector('.hurray');

function resetCircles() {
    document.querySelector('.User-Circle-1').classList.remove('user-won-1');
    document.querySelector('.User-Circle-2').classList.remove('user-won-2');
    document.querySelector('.User-Circle-3').classList.remove('user-won-3');

    document.querySelector('.Comp-Circle-1').classList.remove('pc-won-1');
    document.querySelector('.Comp-Circle-2').classList.remove('pc-won-2');
    document.querySelector('.Comp-Circle-3').classList.remove('pc-won-3');
}

const borderStyles = {
    Rock: '16px solid #0074B6', 
    Paper: '16px solid #FFA943', 
    Scissor: '16px solid #BD00FF'
};

const updateImageAndBorder = (UserChoice, PCChoice) => {
    document.querySelector('.User-Result img').src = `./Images/${UserChoice}.png`;
    document.querySelector('.Comp-Result img').src = `./Images/${PCChoice}.png`;

    document.querySelector('.User-Result').style.border = borderStyles[UserChoice];
    document.querySelector('.Comp-Result').style.border = borderStyles[PCChoice];
};

const determineWinner = (UserChoice, PCChoice) => {
    const outcomes = {
        Rock: { Scissor: 'User', Paper: 'Computer' },
        Paper: { Rock: 'User', Scissor: 'Computer' },
        Scissor: { Paper: 'User', Rock: 'Computer' }
    };
    
    const resultMessage = document.querySelector('.result h3');
    const userResult = document.querySelector('.User-Result');
    const compResult = document.querySelector('.Comp-Result');

    userResult.style.boxShadow = '';
    compResult.style.boxShadow = '';

    if (UserChoice === PCChoice) {
        resultMessage.textContent = 'TIE UP';
    } else if (outcomes[UserChoice][PCChoice] === 'User') {
        UserScore++;
        localStorage.setItem('UserScore', UserScore);
        User.innerHTML = UserScore;
        resultMessage.textContent = 'YOU WIN AGAINST PC';
        document.querySelector('.User-Circle-1').classList.add('user-won-1');
        document.querySelector('.User-Circle-2').classList.add('user-won-2');
        document.querySelector('.User-Circle-3').classList.add('user-won-3');
        if(UserScore>CompScore){
            btn.style.display = 'flex';
        }
      
    } else {
        CompScore++;
        localStorage.setItem('CompScore', CompScore);
        Computer.innerHTML = CompScore;
        resultMessage.textContent = 'YOU LOST AGAINST PC';
        document.querySelector('.Comp-Circle-1').classList.add('pc-won-1');
        document.querySelector('.Comp-Circle-2').classList.add('pc-won-2');
        document.querySelector('.Comp-Circle-3').classList.add('pc-won-3');
    }
};

const updateResult = (UserChoice, PCChoice) => {
    updateImageAndBorder(UserChoice, PCChoice);
    determineWinner(UserChoice, PCChoice);
}

const CompChoice = () => {
    const options = ["Rock", "Paper", "Scissor"];
    const randomId = Math.floor(Math.random() * 3);
    return options[randomId];
}

Choices.forEach((choice) => {
    choice.addEventListener('click', () => {
        playboard.style.display = 'none';
        result.style.display = 'flex';
        const UserChoice = choice.getAttribute('id');
        const PcChoice = CompChoice();
        updateResult(UserChoice, PcChoice);  
    });
});

function playground() {
    resetCircles();
    score.style.display = 'flex';
    hurray.style.display = 'none';
    playboard.style.display = 'grid';
    result.style.display = 'none';
    btn.style.display = 'none';
}


    function next() {
        hurray.style.display = 'flex';
        result.style.display = 'none';
        score.style.display = 'none';
    }
    


