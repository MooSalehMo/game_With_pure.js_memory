/*global let*/
// select the start Game button 
document.querySelector('.control-buttons span').onclick = function () {
    // prompt window to ask for name
 let yourName = prompt("your name ?");
    document.getElementById('start').play();

    // if name is empty
    if (yourName == null || yourName == "") {
        // set name Know
        document.querySelector('.info span').textContent = "unKnown";
        // name is not empty 
    } else{
        // set name to your name
         document.querySelector('.info span').textContent = yourName;
    }
    
    // remove control-buttons
    document.querySelector('.control-buttons').remove();

}

setInterval(function (){
    document.querySelector('.end-time').style.display = 'block';
}, 60000);

 document.querySelector('.end-time').onclick = function () {
         this.style.display = 'none';
 };

    setTimeout(function (){
    document.querySelector('.show-face').style.display = 'none';
},1000);

//Efect durationf
let duration = 1000,
// select blocks container
    blocksContainer = document.querySelector('.memory-game-blocks'),
// create arry from game blocks
    blocks = Array.from(blocksContainer.children),
// create rang of kese
    orderRang = [...Array(blocks.length).keys()];
    shufel(orderRang);
//add order css to blocks
blocks.forEach((block, index) => {
    //console.log(index);
    block.style.order = orderRang[index];
    //add click event 
    block.addEventListener('click', function () {
        //triger the flip block function
        flipBlock(block);
    })
});


// function flipBlock
function flipBlock(selesctedBlock) {
   // add class is-flipped
    selesctedBlock.classList.add('is-flipped');
    //collact all flipped cardes
    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));
    
    // if theres selected blocks
    if (allFlippedBlocks.length === 2) {
        // stop clicking function
        stopClicking();
        // check matched block function
        chechMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
    }
}


// stop clicking function 
function stopClicking() {
    // add class clicking
    blocksContainer.classList.add('no-clicking');
    setTimeout(() => {
        // remove class no-clicking
         blocksContainer.classList.remove('no-clicking');
        // wait duration
    }, duration);
}


// function chek matched block
function chechMatchedBlocks(firstBlock, secondBlock) {
    let triesElement = document.querySelector('.tries span');
    
    if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
        
        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');
        
        firstBlock.classList.add('has-match');
        secondBlock.classList.add('has-match');
        document.getElementById('success').play();
    } else {
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
        
        setTimeout(() => {
                     firstBlock.classList.remove('is-flipped');
                     secondBlock.classList.remove('is-flipped');
                   }, duration);
         document.getElementById('fill').play();
      
    }
           
}

// shufel function
function shufel(array) {
    let current = array.length,
        temp,
        random;
    
    while (current > 0) {
        // get random number
        random = Math.floor(Math.random() * current);
        //degease length by one
        current--;
        // save current element in stash
        temp = array[current];
        //current element = random element
        array[current] = array[random];
        // random element = get element from stash
        array[random] = temp;
    }
    return array;
}


