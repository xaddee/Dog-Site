// declarations
var score, scoreDisplay, infoContainer;
var player;
var playerWidth = 200, playerHeight = 200;
var xPlayer, yPlayer;
var mouseX;
var lives, livesDisplay;
var pauseGame = false;
var hotDogs = [];
var hotDogWidth = 50, hotDogHeight = 50;
var hotDogsPerUpdate, hotDogsMovement = 3;
var delay = 65;
var whenToAdd = 65;
var playerInterval, foodInterval;
var pageWidth, pageHeight;
var hotDogOrPizza = './img/hotDog.jpg'; //default hotdog

function finishGame()
{
    window.clearInterval(playerInterval);
    window.clearInterval(foodInterval);

    var finishGameContainer = document.createElement('div');
    finishGameContainer.style.width = '400px';
    finishGameContainer.style.height = '400px';
    finishGameContainer.style.position = 'relative';
    finishGameContainer.style.backgroundColor = 'white';
    finishGameContainer.style.margin = 'auto';
    finishGameContainer.style.border = '1px solid black';

    var submitButton = document.createElement('button');
    submitButton.innerHTML = 'Submit!';

    var finishInfo = document.createElement('p');
    finishInfo.style.padding = '10px';

    if (score >= 10000)
    {   
        finishInfo.innerHTML = 'Felicitari, ai castigat voucher-ul, in continuare vom avea nevoie de cateva informatii pentru a va trimite codul.';
        finishGameContainer.appendChild(finishInfo);
        // email + nume input
        // mai trebuie select +  textarea
        var formInputs = document.createElement('form');

        var emailInput = document.createElement('input'); // input email
        var nameInput = document.createElement('input'); // input text
        var maleCheckbox = document.createElement('input'); // input checkbox
        var femaleCheckbox = document.createElement('input');
        var townSelect = document.createElement('select'); // input select
        var options = [document.createElement('option'), document.createElement('option'), document.createElement('option')];
        var feedbackArea = document.createElement('textarea'); // input select
        var tmpText;

        formInputs.action = 'none';

        emailInput.type = 'email';
        emailInput.name = 'email';

        nameInput.type = 'text';
        nameInput.name = 'name';

        maleCheckbox.type = 'checkbox';
        maleCheckbox.checked = false;
        maleCheckbox.onChange = function ()
        {
            femaleCheckbox.checked = !maleCheckbox.checked;
        };
        femaleCheckbox.type = 'checkbox';
        femaleCheckbox.checked = false;
        femaleCheckbox.onchange = function ()
        {
            maleCheckbox.checked = !femaleCheckbox.checked;
        };

        townSelect.name = 'cities';
        options[0].value = 'Bucuresti';
        options[0].innerHTML = 'Bucuresti';
        options[1].value = 'Iasi';
        options[1].innerHTML = 'Iasi';
        options[2].value = 'Cluj';
        options[2].innerHTML = 'Cluj';
        townSelect.appendChild(options[0]);
        townSelect.appendChild(options[1]);
        townSelect.appendChild(options[2]);

        feedbackArea.rows = '4';
        feedbackArea.cols = '20';

        tmpText = document.createTextNode('Email: ');
        formInputs.appendChild(tmpText);
        formInputs.appendChild(emailInput);
        formInputs.appendChild(document.createElement('br'));

        tmpText = document.createTextNode('Nume: ');
        formInputs.appendChild(tmpText);
        formInputs.appendChild(nameInput);
        formInputs.appendChild(document.createElement('br'));

        tmpText = document.createTextNode('Male');
        formInputs.appendChild(tmpText);
        formInputs.appendChild(maleCheckbox);
        formInputs.appendChild(document.createElement('br'));

        tmpText = document.createTextNode('Female');
        formInputs.appendChild(tmpText);
        formInputs.appendChild(femaleCheckbox);
        formInputs.appendChild(document.createElement('br'));

        tmpText = document.createTextNode('Oras: ');
        formInputs.appendChild(tmpText);
        formInputs.appendChild(townSelect);
        formInputs.appendChild(document.createElement('br'));

        tmpText = document.createTextNode('Feedback: ');
        formInputs.appendChild(tmpText);
        formInputs.appendChild(document.createElement('br'));
        formInputs.appendChild(feedbackArea);

        formInputs.style.padding = '10px';
        finishGameContainer.appendChild(formInputs);

        submitButton.onclick = function ()
        {
            alert('Formularul a fost completat cu succes! Veti primi pe email codul voucher-ului');
            window.close();
        }

    }
    else 
    {
        submitButton.innerHTML = 'Back to main page';
        finishInfo.innerHTML = 'Ne pare rau, mai mult noroc data viitoare!';
        finishGameContainer.appendChild(finishInfo);

        submitButton.onclick = function ()
        {
            window.close();
        }
    }
    submitButton.style.margin = 'auto';
    submitButton.style.display = 'block';
    finishGameContainer.appendChild(submitButton);
    document.body.appendChild(finishGameContainer);
}

function gamePaused()
{
    

    let pauseLives = document.createElement('p');
    let pauseScore = document.createElement('p');
    pauseScore.innerHTML = 'Scor: ' + score;
    pauseLives.innerHTML = 'Vieti: ' + lives;
    pauseScore.style.textAlign = 'center';
    pauseLives.style.textAlign = 'center';

    var pauseInfoContainer = document.createElement('div');
    
    pauseInfoContainer.style.width = '400px';
    pauseInfoContainer.style.height = '400px';
    pauseInfoContainer.style.zIndex = '10';
    pauseInfoContainer.style.backgroundColor = 'red';
    pauseInfoContainer.style.opacity = '0.5';
    pauseInfoContainer.style.margin = 'auto';

    var resumeButton = document.createElement('button');
    resumeButton.innerHTML = 'Resume';
    resumeButton.style.display = 'block';
    resumeButton.style.margin = 'auto';
    resumeButton.onclick = function ()
    {   
        document.body.removeChild(pauseInfoContainer);
        setTimeout(function () {
            pauseGame = false;
        }, 1000);
    };

    pauseInfoContainer.appendChild(pauseScore);
    pauseInfoContainer.appendChild(pauseLives);
    pauseInfoContainer.appendChild(resumeButton);
    document.body.appendChild(pauseInfoContainer);
}

function setPosition(who, x, y)
{
    if (x >= window.innerWidth - playerWidth) 
    {
        x = window.innerWidth - playerWidth;
    }
    who.style.left = x + 'px';
    who.style.top = y + 'px';
}

function updatePlayer()
{
    if(!pauseGame)
    {
        setPosition(player, mouseX, yPlayer);

    }
    
}

function updateFood()
{
    if(!pauseGame)
    {
        if (lives == -10)
        {
            finishGame();
        }
        if (score == 1000)
        {
            hotDogsMovement = 4;
        }
        if (score == 2000)
        {
            hotDogsMovement = 5;
        }
        if (score == 3000)
        {
            hotDogsMovement = 6;
        }
        if (score == 4000)
        {
            hotDogsMovement = 7;
        }
        if ( score > 5000)
        {
            hotDogsMovement = 10;
        }
        if(delay == whenToAdd)
        {
            delay = 0;
            hotDogsPerUpdate = Math.floor(Math.random() * 2) + 1;
            let tmpHotDogs = [];
            for (let index = 0; index < hotDogsPerUpdate; index++)
            {
                let hotDog = document.createElement('img');
                hotDog.src = hotDogOrPizza;
                hotDog.style.width = hotDogWidth + 'px';
                hotDog.style.height = hotDogHeight + 'px';

                let randomX, randomY;
                randomX = Math.floor(Math.random() * (window.innerWidth - hotDogWidth));
                randomY = Math.floor(Math.random() * hotDogHeight) - 5 * hotDogHeight;
                hotDog.style.left = randomX + 'px';
                hotDog.style.top = randomY + 'px';
                hotDog.style.position = 'absolute';
                tmpHotDogs.push(hotDog);
            }

            for (let index = 0; index < tmpHotDogs.length; index++)
            {
                document.body.appendChild(tmpHotDogs[index]);
                hotDogs.push(tmpHotDogs[index]);
            }
        }
        
        // move hotdogs
        for (let index = 0; index < hotDogs.length; index++)
        {
            let currentTop;
            currentTop = parseInt(hotDogs[index].style.top);
            currentTop += hotDogsMovement;

            hotDogs[index].style.top = currentTop + 'px';

            //check if in range of colision
            if (currentTop >= window.innerHeight - playerHeight && currentTop < window.innerHeight - playerHeight / 2)
            {
                let leftHotDog, leftPlayer;
                leftHotDog = parseInt(hotDogs[index].style.left);
                leftPlayer = parseInt(player.style.left);
                //check colision
                if (leftHotDog >= leftPlayer - hotDogWidth/2 && leftHotDog <= leftPlayer + playerWidth + hotDogWidth / 2)
                {
                    score += 100;
                    scoreDisplay.innerHTML = 'Scor: ' + score;
                    hotDogs[index].parentElement.removeChild(hotDogs[index]);
                    hotDogs.splice(index, 1);
                }
            }
            // if it went too down delete it
            else if (currentTop >= window.innerHeight - playerHeight / 2)
            {
                lives --;
                livesDisplay.innerHTML = 'Vieti: ' + lives;
                hotDogs[index].parentElement.removeChild(hotDogs[index]);
                hotDogs.splice(index, 1);
            }
        }
        delay++;
    }
    
}

function startGame()
{
    //initial setup

    //container for informations 
    infoContainer = document.createElement('div');
    infoContainer.style.width = '200px';
    infoContainer.style.height = '50px';
    infoContainer.zIndex = '5';
    infoContainer.style.backgroundColor = 'white;'

    // score
    score = 0;
    scoreDisplay = document.createElement('p');
    scoreDisplay.innerHTML = 'Scor: ' + score;
    infoContainer.appendChild(scoreDisplay);

    // lives left
    lives = 3;
    livesDisplay = document.createElement('p');
    livesDisplay.innerHTML = 'Vieti: ' + lives;
    infoContainer.appendChild(livesDisplay);

    //press p to pause div
    let pauseText = document.createElement('p');
    pauseText.innerHTML = 'Press "P" to pause';
    infoContainer.appendChild(pauseText);

    document.body.appendChild(infoContainer);
    // player
    player = document.createElement('img');
    xPlayer = window.innerWidth / 2 - playerWidth/2;
    yPlayer = window.innerHeight - playerHeight;
    player.id = 'player';
    player.src = './img/gamePlayer.jpg';
    player.style.width = playerWidth + 'px';
    player.style.height = playerHeight + 'px';
    player.style.position = 'absolute';
    setPosition(player, xPlayer, yPlayer);
    document.body.appendChild(player);
    

    // update
    playerInterval = setInterval(updatePlayer, 10);
    foodInterval = setInterval(updateFood,10);
}
window.onload = function ()
{
    let instructions =  document.createElement('p');
    let textInstructions = document.createTextNode('Ca sa castigati trebuie sa aveti un scor de peste 5.000. Jocul este simplu, catelusul urmareste mouse-ul, un hot-dog valoreaza 100 puncte, la 3 scapati, ati pierdut! BAFTA!');
    instructions.style.fontSize = '25px';
    instructions.appendChild(textInstructions);
    document.body.appendChild(instructions);

    let startButton = document.createElement('button');
    startButton.innerHTML = 'Start Game';
    startButton.onclick = function ()
    {

        let toDelete = document.querySelectorAll('body>*');

        for (let i = 0; i < toDelete.length; i++)
        {
            toDelete[i].parentNode.removeChild(toDelete[i]);
        }
        document.body.removeChild(widthText);
        document.body.removeChild(heightText);
        
        window.onmousemove = function (ev)
        {
            mouseX = ev.clientX;
        }
        window.onkeypress = function (ev)
        {
            if(ev.key == 'p')
            {
                pauseGame = true;
                gamePaused();
            }
        }
        startGame();
    }

    var inputRangeWidth = document.createElement('input');
    var inputRangeHeight = document.createElement('input');
    var widthText = document.createTextNode('Width: ');
    var heightText = document.createTextNode('Height: ');
    var submitPageSize = document.createElement('button');
    var hotDogRadio = document.createElement('input');
    var pizzaRadio = document.createElement('input');
    var labelForHotDog = document.createElement('label');
    var labelForPizza = document.createElement('label');

    inputRangeWidth.type = 'range';
    inputRangeWidth.name = 'pageWidth';
    inputRangeWidth.id = 'rangeW';
    inputRangeWidth.min = '600';
    inputRangeWidth.max = window.innerWidth;
    inputRangeWidth.defaultValue = (parseInt(inputRangeWidth.min) + parseInt(inputRangeWidth.max)) / 2;
    pageWidth = inputRangeWidth.defaultValue;
    inputRangeWidth.onchange = function ()
    {   
        pageWidth = document.getElementById('rangeW').value;
    };

    inputRangeHeight.type = 'range';
    inputRangeHeight.name = 'pageHeight';
    inputRangeHeight.min = '600';
    inputRangeHeight.id = 'rangeH';
    inputRangeHeight.max = window.innerHeight;
    inputRangeHeight.defaultValue = (parseInt(inputRangeHeight.min) + parseInt(inputRangeHeight.max)) / 2;
    pageHeight = inputRangeHeight.defaultValue;
    inputRangeHeight.onchange = function ()
    {
        pageHeight = document.getElementById('rangeH').value;
    };

    submitPageSize.innerHTML = 'Submit size';
    submitPageSize.onclick = function ()
    {
        window.resizeTo(pageWidth, pageHeight);
    };

    labelForHotDog.innerHTML = 'Hot-Dog';
    hotDogRadio.type = 'radio';
    hotDogRadio.name = 'hotDog';
    hotDogRadio.checked = true;
    hotDogRadio.onchange = function ()
    {
        pizzaRadio.checked = !hotDogRadio.checked;
        hotDogOrPizza = './img/hotDog.jpg';
    };

    labelForPizza.innerHTML = 'Pizza';
    pizzaRadio.type = 'radio';
    pizzaRadio.name = 'pizza';
    pizzaRadio.checked = false;
    pizzaRadio.onchange = function ()
    {
        hotDogRadio.checked = !pizzaRadio.checked;
        hotDogOrPizza = './img/pizza.jpg';
    };

    document.body.appendChild(widthText);
    document.body.appendChild(inputRangeWidth);
    document.body.appendChild(heightText);
    document.body.appendChild(inputRangeHeight);
    document.body.appendChild(submitPageSize);
    document.body.appendChild(pizzaRadio);
    document.body.appendChild(labelForPizza);
    document.body.appendChild(hotDogRadio);
    document.body.appendChild(labelForHotDog);
    document.body.appendChild(startButton);

}
