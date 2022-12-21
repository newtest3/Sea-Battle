

// --------------- Map of the user ships ---------------------
let newGame = document.createElement('button');
newGame.classList.add('newGame');
newGame.textContent = 'New Game';
newGame.addEventListener('click', () => {
   window.location.reload();
});

let salute = document.createElement('button');
salute.classList.add('salute');

salute.textContent = 'salute';
salute.addEventListener('click', ()=> {

});




function user() {

   let letters = 'ABCDEFGHIJ';
   let computerMode = document.querySelector('.computerMode');
   let modeDevelopment = document.querySelector('.modeDevelopment');

   let twoPlayersMode = document.querySelector('.twoPlayersMode');
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
            showShips.disabled = true;
           
            tableData.classList.add('hideSpaceShip');
            

            tableData.addEventListener('click', function fireShip() {
               if (i !== 0) {
                  if (positionShipObj[positionShip] == true) {

                     tableData.classList.add('shipWasFound');
                     let fire = document.createElement('audio');
                     fire.src = './sound/fire.mp3';
                     fire.autoplay = true;
                     tableData.append(fire);
                     numCrashedShips--;
                     
                    
                     console.log(numCrashedShips)
                     tableData.removeEventListener('click', fireShip);

                     if (numCrashedShips != 0) {
                        shipsCrashed.textContent = `You have ${numCrashedShips} ships!`;
                     } else {
                        shipsCrashed.classList.add('shipsCrashed');
                        shipsCrashed.textContent = `You LOST!`;
                     }
                  } else {
                     tableData.classList.add('shipWasNotFound');
                     let miss = document.createElement('audio');
                     miss.src = './sound/miss.mp3';
                     miss.autoplay = true;
                     tableData.append(miss);
                  }
               }
               
               // disabledShowShips();
            });
            
            shipsCrashed.textContent = `You have ${numCrashedShips} ships!`;
            
            if (event.type == 'click') {
               shipsPaste.classList.add('hideElement')
               tbody.append(shipsCrashed);
            }
           
         });


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

   userMap__table.append(tbody);
   radioButton.append(radioButtonsShips);
   userMap.append(salute);
   userMap.prepend(newGame);

}


+function userFirst() {
   user();
}();
+function userSecond() {
   user();
}();




// -------------- Show Two Players Mode ---------------

// twoPlayersMode.addEventListener('click', function twoPlayers() {
//    userFirst();
//    userSecond();
//    this.removeEventListener('click', twoPlayers);
// });

// -----------------------------------------------


// -------------- Show Computer Mode ---------------

// computerMode.addEventListener('click', () => {

// });

// -------------------------------------------------

