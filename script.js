
// --------------- New Game Button ---------------------
let newGame = document.createElement('button');
newGame.classList.add('newGame');
newGame.textContent = 'New game';
newGame.addEventListener('click', () => {
   window.location.reload();
});

// --------------- Reset Result Button-------------------
let firstNum = Number(randomFunc(0, 100));
let secondNum = Number(randomFunc(0, 100));

let resetResult = document.createElement('button');
resetResult.classList.add('resetResult');
resetResult.textContent = 'Reset the best score';
resetResult.addEventListener('click', () => {

   let answer = prompt(`Answer the question to erase the best score: ${firstNum} + ${secondNum} ?`);

   let resultAnswer = firstNum + secondNum;

   if (answer == resultAnswer) {
      localStorage.removeItem('key');
      window.location.reload();
   } else {
      alert('Not the correct answer !');
      window.location.reload();
   }
});

// -------------- Main Function ------------------------
let strNumClick = document.createElement('p');
strNumClick.classList.add('strNumClick');

function user() {

   let letters = 'ABCDEFGHIJ';

   let userMap__table = document.querySelector('.userMap__table');
   let userMap = document.querySelector('.userMap');
   let positionShipObj = {};

   let radioButton = document.querySelector('.radioButton');

   let showShips = document.createElement('input');
   let hideShips = document.createElement('input');
   let radioButtonsShips = document.createElement('div');
   let showName = document.createElement('p');
   let hideName = document.createElement('p');

   let shipsPaste = document.createElement('p');
   shipsPaste.classList.add('shipsEnd');
   let shipsCrashed = document.createElement('p');
   shipsCrashed.classList.add('shipsEnd');

   let summRecordClick = 0,

      recordClick = document.createElement('p');
   recordClick.classList.add('recordClick');

   let numPasteShips = 0;
   let numCrashedShips = 20;

   let tbody = document.createElement('tbody');

   function disabledHideShips() {
      if (numPasteShips < 20) {
         hideShips.disabled = true;
      } else {
         hideShips.disabled = false;
      }
   }

   for (let i = 0; i <= 10; i++) {
      let tableRow = document.createElement('tr');
      tableRow.textContent = i;
      tableRow.style.textAlign = 'center';

      for (let j = 0; j <= letters.length - 1; j++) {
         let tableData = document.createElement('td');
         let positionShip = String(letters[j] + i);
         positionShipObj[positionShip] = false;


         // -------------- Show Ships -----------------------

         showName.innerHTML = 'Show ships';
         showShips.classList.add('showShips');
         showShips.type = 'radio';
         showShips.name = 'viewShips';

         showShips.addEventListener('click', event => {

            tableData.addEventListener('dblclick', () => {
               if (showShips.checked == true && numCrashedShips > 0) {
                  tableData.classList.remove('addColorTableData');
                  positionShipObj[positionShip] = false;
                  numPasteShips--;
                  shipsPaste.textContent = `You have ${numPasteShips} ships!`;
                  disabledHideShips();
               }
            });
            tableData.classList.remove('hideSpaceShip');
            tableData.addEventListener('click', () => {

               if (i !== 0 && numPasteShips < 20 && positionShipObj[positionShip] == false) {
                  numPasteShips++;
                  tableData.classList.remove('shipWasFound');
                  tableData.textContent = '';
                  if (showShips.checked == true) {
                     tableData.classList.add('addColorTableData');
                     positionShipObj[positionShip] = true;
                     let paste = document.createElement('audio');
                     paste.src = './sound/paste.mp3';
                     paste.autoplay = true;
                     tableData.append(paste);
                  }
               }
               shipsPaste.textContent = `You have ${numPasteShips} ships!`;
               disabledHideShips();

            });
            if (event.type == 'click') {

               tbody.append(shipsPaste);
            }
         });

         // -------------- Hide Ships -----------------------

         hideName.innerHTML = 'Hide ships';
         hideShips.classList.add('hideShips');
         hideShips.type = 'radio';
         hideShips.disabled = true;
         hideShips.name = 'viewShips';

         hideShips.addEventListener('click', event => {
            let objClick = {};
            showShips.disabled = true;

            tableData.classList.add('hideSpaceShip');


            tableData.addEventListener('click', function fireShip() {

               if (i !== 0) {
                  if (objClick[null] !== positionShip) {
                     objClick[null] = positionShip;
                     summRecordClick++;
                  }

                  recordClick.textContent = `You have ${summRecordClick} clicks!`;

                  if (positionShipObj[positionShip] == true) {

                     tableData.classList.add('shipWasFound');
                     let fire = document.createElement('audio');
                     fire.src = './sound/fire.mp3';
                     fire.autoplay = true;
                     tableData.append(fire);
                     numCrashedShips--;

                     tableData.removeEventListener('click', fireShip);

                     if (numCrashedShips != 0) {

                        shipsCrashed.textContent = `You have ${numCrashedShips} ships!`;
                     } else {
                        shipsCrashed.classList.add('shipsCrashed');
                        shipsCrashed.textContent = `You LOST!`;

                        if (Number(localStorage.getItem('key')) == 0) {
                           localStorage.setItem('key', summRecordClick);
                        } else if (summRecordClick < Number(localStorage.getItem('key'))) {
                           alert('Great result. You set a new record!');
                           localStorage.removeItem('key');

                           localStorage.setItem('key', summRecordClick);
                           console.log(Number(localStorage.getItem('key')));
                        }
                        victoryGame();
                     }
                  } else {
                     tableData.classList.add('shipWasNotFound');
                     let miss = document.createElement('audio');
                     miss.src = './sound/miss.mp3';
                     miss.autoplay = true;
                     tableData.append(miss);
                  }
               }
               tbody.append(recordClick);
            });

            shipsCrashed.textContent = `You have ${numCrashedShips} ships!`;

            if (event.type == 'click') {
               shipsPaste.classList.add('hideElement')
               tbody.append(shipsCrashed);
            }
            // ------ event contextMenu in Hide mode ------------------
            tableData.addEventListener('contextmenu', event => {
               event.preventDefault();
               tableData.classList.toggle('flag');
            });
         });
         // --------------------------------------------------------

         radioButtonsShips.className = 'radioButtonsShips';

         radioButtonsShips.prepend(showName);
         radioButtonsShips.append(showShips);

         radioButtonsShips.append(hideName);
         radioButtonsShips.append(hideShips);

         if (tableRow.textContent[0] == 0) {
            tableRow.textContent = ':';
         }
         if (i == 0) {
            tableData.textContent = letters[j];
            tableRow.append(tableData);
            tbody.append(tableRow);
            continue;
         }
         tableData.classList.add('tdata');
         tableRow.append(tableData);
         tbody.append(tableRow);
      }
   }


   //-------------------- strNumClick-------- 
   strNumClick.textContent = `The best winning result is - ${Number(localStorage.getItem('key'))} clicks!`;
   //-------------------- strNumClick-------- 


   userMap__table.append(tbody);
   radioButton.append(radioButtonsShips);
   userMap.prepend(resetResult);
   userMap.prepend(newGame);

   userMap.prepend(strNumClick);
}

+function userFirst() {
   user();
}();

+function userSecond() {
   user();
}();



// ------------------- Salute ---------------------------

function victoryGame() {
   let mainContainer = document.querySelector('.mainContainer');
   victorySalute();
   function victorySalute() {

      let num = 0;
      let victory = setInterval(() => {
         num++;
         if (num == 7) {
            clearInterval(victory);
         }
         confirmSalute('20px', '70px', 900);
         confirmSalute('100px', '140px', 1300);
         confirmSalute('60px', '450px', 1600);
         confirmSalute('120px', '550px', 1900);
         confirmSalute('10px', '300px', 2200);
      }, 1500);
      setTimeout(() => {
         let song = document.createElement('audio');
         song.src = './sound/ovacii.mp3';
         song.autoplay = true;
      }, 2000);

   };

   function confirmSalute(left, right, time) {
      let saluteContainer = document.createElement('div');
      saluteContainer.className = 'saluteContainer';
      saluteContainer.style.margin = `${left} ${right}`;

      let circle = document.createElement('div'),
         circleTwo = document.createElement('div'),
         circleThree = document.createElement('div'),
         circleFour = document.createElement('div'),
         circleFive = document.createElement('div'),
         circleSix = document.createElement('div'),
         circleSeven = document.createElement('div'),
         circleEight = document.createElement('div'),
         circleNine = document.createElement('div');

      addClass(circleTwo);
      addClass(circleThree);
      addClass(circleFour);
      addClass(circleFive);
      addClass(circleSix);
      addClass(circleSeven);
      addClass(circleEight);
      addClass(circleNine);

      setTimeout(() => {

         addStyle(circleTwo, '60px', '150px');
         addStyle(circleThree, '200px', '60px');
         addStyle(circleFour, '350px', '135px');
         addStyle(circleFive, '400px', '243px');
         addStyle(circleSix, '20px', '240px');
         addStyle(circleSeven, '60px', '340px');
         addStyle(circleEight, '200px', '400px');
         addStyle(circleNine, '350px', '350px');

      }, time);

      saluteContainer.append(circle);
      saluteContainer.append(circleTwo);
      saluteContainer.append(circleThree);
      saluteContainer.append(circleFour);
      saluteContainer.append(circleFive);
      saluteContainer.append(circleSix);
      saluteContainer.append(circleSeven);
      saluteContainer.append(circleEight);
      saluteContainer.append(circleNine);

      mainContainer.append(saluteContainer);
   }


   function addStyle(item, distanceRight, distanceDown) {
      item.style.transform = `translate(${distanceRight}, ${distanceDown})`;
      item.style.background = `rgb(${randomFunc(1, 255)}, ${randomFunc(1, 255)}, ${randomFunc(1, 255)})`;
      setTimeout(() => {
         item.style.opacity = '0';
      }, 1000);
   }



   function addClass(item) {
      item.classList.add('circleAll');
   }
}

function randomFunc(min, max) {
   return String(Math.round(Math.random() * ((max - min) + min)));

}