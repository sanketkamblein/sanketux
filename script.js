// listing vars here so they're in the global scope
var cards, nCards, cover, openContent, openContentText, pageIsOpen = false,
    openContentImage, closeContent, windowWidth, windowHeight, currentCard,navigation,next,prev;
    var navcheck=false;
    var comeback=false;
    var pronum;
// initiate the process
init();

function init() {
  resize();
  selectElements();
  attachListeners();

}

// select all the elements in the DOM that are going to be used
function selectElements() {
  cards = document.getElementsByClassName('card'),
  nCards = cards.length,
  cover = document.getElementById('cover'),
  openContent = document.getElementById('open-content'),
  openContentText = document.getElementById('open-content-text'),
  openContentImage = document.getElementById('open-content-image')
  closeContent = document.getElementById('close-content');
   
    navigation=document.getElementById('navbar');
    next=document.getElementById('next-content');
    prev=document.getElementById('prev-content');
}

/* Attaching three event listeners here:
  - a click event listener for each card
  - a click event listener to the close button
  - a resize event listener on the window
*/
function attachListeners() {
  for (var i = 0; i < nCards; i++) {
    attachListenerToCard(i);
    
  
  }
  closeContent.addEventListener('click', onCloseClick);

  



  window.addEventListener('resize', resize);
}

function attachListenerToCard(i) {
  cards[i].addEventListener('click', function(e) {
    var card = getCardElement(e.target);
    onCardClick(card, i);
  })
}

/* When a card is clicked */
function onCardClick(card, i) {

     navcheck =true;
     comeback=true;
  // set the current card
  currentCard = card;
  // add the 'clicked' class to the card, so it animates out
  currentCard.className += 'clicked';
  // animate the card 'cover' after a 500ms delay
  setTimeout(function() {animateCoverUp(currentCard)}, 500);
  // animate out the other cards
  animateOtherCards(currentCard, true);
  // add the open class to the page content
  openContent.className += ' open';

  pronum=i;

  next.addEventListener('click',function(e){
    if(i>=nCards-1)
    i=0;
  else
    i=i+1;

    onNextClick(i);});

  prev.addEventListener('click',function(e){
    if(i<=0)
    i=nCards-1;
  else
    i=i-1;

    onNextClick(i);});

}


function onNextClick(i) {

  pronum=i;
   onCloseClick();
   currentCard = cards[i];
  
    onCardClick(currentCard,i);

}

/*
* This effect is created by taking a separate 'cover' div, placing
* it in the same position as the clicked card, and animating it to
* become the background of the opened 'page'.
* It looks like the card itself is animating in to the background,
* but doing it this way is more performant (because the cover div is
* absolutely positioned and has no children), and there's just less
* having to deal with z-index and other elements in the card
*/
function animateCoverUp(card) {
  // get the position of the clicked card
  var cardPosition = card.getBoundingClientRect();
  // get the style of the clicked card
  var cardStyle = getComputedStyle(card);
  setCoverPosition(cardPosition);
  setCoverColor(cardStyle);
  scaleCoverToFillWindow(cardPosition);
  // update the content of the opened page

  if(pronum==0)
  openContentText.innerHTML = '<h1>'+card.children[2].textContent+'</h1>'+paragraphText1;
 if(pronum==1)
   openContentText.innerHTML = '<h1>'+card.children[2].textContent+'</h1>'+paragraphText2;
 if(pronum==2)
    openContentText.innerHTML = '<h1>'+card.children[2].textContent+'</h1>'+paragraphText3;
 if(pronum==3)
  openContentText.innerHTML = '<h1>'+card.children[2].textContent+'</h1>'+paragraphText4;
 if(pronum==4)
   openContentText.innerHTML = '<h1>'+card.children[2].textContent+'</h1>'+paragraphText5;
 if(pronum==5)
   openContentText.innerHTML = '<h1>'+card.children[2].textContent+'</h1>'+paragraphText6;

  openContentImage.src = card.children[1].src;
  setTimeout(function() {
    // update the scroll position to 0 (so it is at the top of the 'opened' page)
    window.scroll(0, 0);
    // set page to open
    pageIsOpen = true;
  }, 300);
}

function animateCoverBack(card) {
  var cardPosition = card.getBoundingClientRect();
  // the original card may be in a different position, because of scrolling, so the cover position needs to be reset before scaling back down
  setCoverPosition(cardPosition);
  scaleCoverToFillWindow(cardPosition);
  // animate scale back to the card size and position
  cover.style.transform = 'scaleX('+1+') scaleY('+1+') translate3d('+(0)+'px, '+(0)+'px, 0px)';
  setTimeout(function() {
    // set content back to empty
    openContentText.innerHTML = '';
    openContentImage.src = '';
    // style the cover to 0x0 so it is hidden
    cover.style.width = '0px';
    cover.style.height = '0px';
    pageIsOpen = false;
    // remove the clicked class so the card animates back in
    currentCard.className = currentCard.className.replace(' clicked', '');
  }, 301);
}

function setCoverPosition(cardPosition) {
  // style the cover so it is in exactly the same position as the card
  cover.style.left = cardPosition.left + 'px';
  cover.style.top = cardPosition.top + 'px';
  cover.style.width = cardPosition.width + 'px';
  cover.style.height = cardPosition.height + 'px';
}

function setCoverColor(cardStyle) {
  // style the cover to be the same color as the card
  cover.style.backgroundColor = cardStyle.backgroundColor;
}

function scaleCoverToFillWindow(cardPosition) {
  // calculate the scale and position for the card to fill the page,
  var scaleX = windowWidth / cardPosition.width;
  var scaleY = windowHeight / cardPosition.height;
  var offsetX = (windowWidth / 2 - cardPosition.width / 2 - cardPosition.left) / scaleX;
  var offsetY = (windowHeight / 2 - cardPosition.height / 2 - cardPosition.top) / scaleY;
  // set the transform on the cover - it will animate because of the transition set on it in the CSS
  cover.style.transform = 'scaleX('+scaleX+') scaleY('+scaleY+') translate3d('+(offsetX)+'px, '+(offsetY)+'px, 0px)';
}

/* When the close is clicked */
function onCloseClick() {
  // remove the open class so the page content animates out
  openContent.className = openContent.className.replace(' open', '');
  // animate the cover back to the original position card and size
  animateCoverBack(currentCard);
  // animate in other cards
  animateOtherCards(currentCard, false);

  navcheck =false;
  comeback=false;
}

function animateOtherCards(card, out) {
  var delay = 100;
  for (var i = 0; i < nCards; i++) {
    // animate cards on a stagger, 1 each 100ms
    if (cards[i] === card) continue;
    if (out) animateOutCard(cards[i], delay);
    else animateInCard(cards[i], delay);
    delay += 100;
  }
}

// animations on individual cards (by adding/removing card names)
function animateOutCard(card, delay) {
  setTimeout(function() {
    card.className += ' out';
   }, delay);
}

function animateInCard(card, delay) {
  setTimeout(function() {
    card.className = card.className.replace(' out', '');
  }, delay);
}

// this function searches up the DOM tree until it reaches the card element that has been clicked
function getCardElement(el) {
  if (el.className.indexOf('card ') > -1) return el;
  else return getCardElement(el.parentElement);
}

// resize function - records the window width and height
function resize() {
  if (pageIsOpen) {
    // update position of cover
    var cardPosition = currentCard.getBoundingClientRect();
    setCoverPosition(cardPosition);
    scaleCoverToFillWindow(cardPosition);
  }
  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;
}

 var paragraphText1 = '<p>LEARNING:  Mymic is unique problem that I came across. It was more like designing a game and service at the same time. Since it is a Project where technical Intellectual Property cannot be disclosed. But I learned how to prioritize design process itself. It is not easy to follow design process thoroughly as stated in books or even as given in my presentation. One must manage the team and the flow of work at the same time. Planning a vision for the product that deals only with doctors which is minimum amount of population was a new learning. The advantageous for me within this project was the platform. I went through the design language for the first time. Overall it helped me to understand service design and the psychological understanding exist in video games or simulations.</p>';
 var paragraphText2 = '<p>LEARNING:  LegalPad is my bachelor’s project. Due to a longer period to solve this problem I could use Design Process. This project shows how I transformed from an Engineer to Designer. I remade the project and realized without the process it was very difficult to assume priorities of requirements. Since it was first time and a longest duration I had spent this project I could understand and walkthrough the UX process.</p>';
var paragraphText3 = '<p>LEARNING:  nApp holds completely different motive from what a usual application do. I learned marketing strategy and how to also make user learn something new. This project was easy for me to get into research because I was one of the target users already. Also, nApp doesn’t have a particular user but mostly everyone. Making visuals acceptable to everyone was learnt here. Interaction Design is a major part in nApp than information architecture.</p>';
 var paragraphText4 = '<p>LEARNING:  Since car app wasn’t a project but an entry in design competition at TopCoder. I managed to make into finals. But something called ‘accessibility’ was unheard for me before this project. I designed the app following the Ben Shneidermans "Eight Golden Rules" taught in HCI course when I was in Bachelors. One thing I realised sometimes ‘History’ and ‘Reality Match’ differs with each other. I made everything which follows golden rules but according to ‘history’ task bar in phone always comes at the Top, where I made was at bottom. Also, the sliding menu at the right side. But a suggestion from the examiner gave a call on the side of history over heuristic principles which I learned after the Master’s degree.</p>';
 var paragraphText5 = '<p>LEARNING:  It is a thesis project of mine in my master’s studies. It does have Intellectual Property associated to my alma mater. Since, I have joined in IISc as a Product Design student UX plays subset here. Ergocheck is a posture and heart rate monitoring device for factory workers. My learning in this project is decision making, project scheduling, Prioritizing the problem definition. It sounds more than just a design but that’s what IISc teaches. I could also learn electronics and now can work in IOT as a designer who can analyse prototype by developing it. The project got all my skills from User Empathy to programming. Hence overall it gave me satisfaction of understanding project development.</p>';
 var paragraphText6 = '<p>LEARNING:  I do lack in visuals. I wanted to improve my UI designing skills. And somebody wanted me to have learn and get paid at the same time. DailyGate was a treat to make myself comfortable in designing UI. I was not a UX designer for the first time. This project made me realise doing together is a bit difficult and a same mind, not a brain, but the same mind cannot do the User Experience (Information Architecture, Wireframes) and UI design at the same time. Both the things need completely empty mind to start. Hence the process is rightly made and never mixes these two things where usually it is very natural that one mixes it and gets into trouble.</p>';
