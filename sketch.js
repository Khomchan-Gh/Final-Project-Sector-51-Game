let currentScreen = "menu";
let isPlayerTurn;
let cecilia;
let playerHitEffect;
let ue;
let ueHp;
let eyePortal;
let novecentoBold, novecentoNormal, novecentoLight;
let actionDelay;
let screenDelay;

let damageDisplayText; 


let buttonCreated = false;
let AtkButton, SkillButton, SpButton;

let isAtkMouseOver = false;
let isSpAtkMouseOver = false;
let isSkillMouseOver = false;
let isOverDriveButtonMouseOver = false;

let defaultAlp = 255;
let alp = 255;
let alp2 = 255;

let eyeMinCount = 0;
let eyeCount = 0;
let eyeMaxCount = 7;

function preload() {

  //load empty image
  isHidden = loadImage('Assets/Image/Empty.png');
  
  //load fonts
  menuTitle = loadFont('Assets/Fonts/Novecento Bold.otf');
  novecentoBold = loadFont('Assets/Fonts/Novecento Bold.otf');
  novecentoNormal = loadFont('Assets/Fonts/Novecento Normal.otf');
  novecentoLight = loadFont('Assets/Fonts/Novecento Light.otf');

  //load button

  normalAttackButton = loadImage('Assets/Button/Attack-Button.png');
  normalAttackButtonOver = loadGif('Assets/Button/Attack-Button-Over-Animation.gif')
  overDriveAttackButton = loadImage('Assets/Button/Attack-Button-Overdrive.png');
  
  switchModeButton = loadImage('Assets/Button/Switch-Mode.png');
  switchModeButtonDisable = loadImage('Assets/Button/Switch-Mode-Disable.png');
  switchModeButtonOver = loadGif('Assets/Button/Switch-Mode-Over-Animation.gif');
  
  enhancedNormalAttackButton = loadImage('Assets/Button/Attack-Button-Burst.png');
  enhancedNormalAttackDisable = loadImage('Assets/Button/Attack-Button-Burst-Disable.png');
  enhancedNormalAttackOver = loadGif('Assets/Button/Attack-Button-Burst-Over-Animation.gif')
  
  overDriveButton = loadImage('Assets/Button/OverDrive-Button.png');
  overDriveButtonOver = loadGif('Assets/Button/OverDrive-Button-Over-Animation.gif');
  overDriveButtonDisable = loadImage('Assets/Button/OverDrive-Button-Disable.png');
  
  //load player's assets
  ceciliaStory = loadGif('Assets/Characters/ceciliaIdle_1.gif');
  ceciliaStandby = loadImage('Assets/Characters/Cecilia-Stance1.png');
  ceciliaAttack = loadImage('Assets/Characters/ceciliaAtk_1.png');
  ceciliaAssault = loadImage('Assets/Characters/Cecilia-Assault.png');
  ceciliaOverDrive = loadImage('Assets/Characters/Cecilia-OverDrive.png');
  ceciliaSkill = loadImage('Assets/Characters/Cecilia-Stance2.png');
  ceciliaProtrait = loadImage('Assets/Image/Cecilia.png');
  ceciliaProtraitOverDrive = loadImage('Assets/Image/Cecilia-Portrait-OverDrive.png');

  //load player's hit effect
  ceciliaNormalHit1 = loadImage('Assets/Hit-Effect/Normal-Attack-1.png');
  ceciliaNormalHit2 = loadImage('Assets/Hit-Effect/Normal-Attack-2.png');
  ceciliaSpecialHit1 = loadImage('Assets/Hit-Effect/Special-Attack-1.png');
  ceciliaSpecialHit2 = loadImage('Assets/Hit-Effect/Special-Attack-2.png');
  ceciliaSpecialHit3 = loadImage('Assets/Hit-Effect/Special-Attack-3.png');
  
  //load background
  mainmenuBg = loadImage('Assets/Background/mainmenu.png');
  stageBg = loadImage('Assets/Background/Stage-Bg.png');
  stageBgPhase2 = loadImage('Assets/Background/Stage-Bg-Phase-2.png');
  stageBgPhase2Ex = loadImage('Assets/Background/Stage-Bg-Phase-2-ex.png');
  
  //load enemy's asset
  uE = loadImage('Assets/Enemy/Unknown_Entity_NO8.png');
  eyePortal = loadGif('Assets/Enemy/Eye-Portal.gif');

  //load enemy's hit effect
  uEHit1 = loadImage('Assets/Hit-Effect/UE-Attack-1.png');
  uEHit2 = loadImage('Assets/Hit-Effect/UE-Attack-2.png');
  uESpecialHit = loadImage('Assets/Hit-Effect/UE-Special-Attack.png');
  
  //load ending
  cgEnding2 = loadImage('Assets/Ending/Ending_2_CG.png');
  cgGameOver = loadImage('Assets/Ending/GameOver_CG.png')

}

function setup() {
  
  createCanvas(1280, 720);
  cecilia = new Cecilia();
  ue = new UE();
  eyePortal = new EyePortal();
  playerHitEffect = new CeciliaHit();
  isPlayerTurn = true;

  
}

function draw() {
  
  clear();

  if (currentScreen === "menu") {
    drawMenuScreen();
    if (!buttonCreated){
  playButton();
  galleryButton();
  creditsButton();
  buttonCreated = true;
    }
  }
  
  if (currentScreen === "intro") {
    drawIntroScreen();
    if (buttonCreated){
      buttonCreated = false;
        }
  }
  
  if (currentScreen === "gameplay") {
    drawGamePlayScreen();
    damageDone();
    
  }
  
  if (currentScreen === "ending_1") {
    drawEnding1();
    if (buttonCreated){
      buttonCreated = false;
        }

  }

  if (currentScreen === "ending_2") {
    drawEnding2();
    if (buttonCreated){
      buttonCreated = false;
        }
    
  }

  if (currentScreen === "ending_3") {
    drawEnding3();
    if (buttonCreated){
      buttonCreated = false;
        }
    
  }
  
  if (currentScreen === "game_over") {
    gameOver();
    if (buttonCreated){
      buttonCreated = false;
        }
  }
  


  
}

function drawMenuScreen() {
  background(30);
  title();

  //remove button in previous screen
  var elements = document.getElementsByClassName("hidden3");

  for (let i = 0; i < elements.length; i++) {
    elements[i].style.display = "none";
  }
}

function drawIntroScreen() {
  
  background(10);
  intro();

  //remove button in previous screen
  var elements = document.getElementsByClassName("hidden1");

  for (let i = 0; i < elements.length; i++) {
    elements[i].style.display = "none";
  }
  
}

function drawGamePlayScreen() {
  
  background(0);


  //remove button in previous screen
  var elements = document.getElementsByClassName("hiddenI");

  for (let i = 0; i < elements.length; i++) {
    elements[i].style.display = "none";
  }
  
  if (ue && ue.hp >= ue.maxhp/2){
  stageBg.resize(1403,992);
  image(stageBg,-123,-450);
  } else { 
    alp -= 5;
    stageBgPhase2.resize(1403,992);
    image(stageBgPhase2,-83,-450);

    fill(0,0,0,alp);
    noStroke();
    rect(-123,-450,1403,992);
  }

  if (eyeCount >= 6) { 
    alp2 -= 5;
    stageBgPhase2Ex.resize(1403,992);
    image(stageBgPhase2Ex,-83,-450);
    fill(0,0,0,alp2);
    noStroke();
    rect(-123,-450,1403,992);
  }

  const eyeStartX = -50; // Starting x-coordinate
  const eyeSpacing = 250; // Spacing between eye portals

  for (let i = 0; i < eyeCount && i < 5; i++) {
  const xPos = eyeStartX + (i * eyeSpacing);
  eyePortal.show(xPos, -50);
  }

  cecilia.show();
  ue.show();
  
  // noStroke();
  // rectMode(CENTER);
  // fill(0);
  // rect(width/2,650,windowWidth,230)
 
  if (!cecilia.isOverDrive){
  ceciliaDefaultPortrait();
  }

  if (cecilia.isOverDrive){
    ceciliaOverDrivePortrait();
    }
  
  //Call Status
  statusSpAttackGauge()
  statusHp();
  statusMp();
  statusSp();
  ceciliaName();

  if(!buttonCreated) {
    skillButton();
    spButton();
    attackButton();
    spAttackButton();
    buttonCreated = true;
  }

  attackText();
  switchText();
  enhancedAttackText();
  overDriveText();

  //function to remove button in previous screen
  var elements = document.getElementsByClassName("hidden3");

  for (let i = 0; i < elements.length; i++) {
    elements[i].style.display = "none";
  }

  if (cecilia.hp <= 0 || ue.hp <= 0) {

      if (cecilia.hp <= 0) {
          currentScreen = "game_over";
        
      } else {
        fadeOutScreen(() => {
          currentScreen = "ending_1";
          fadeInScreen();
        });
         
      }

      

  }
  
  if (eyeCount > eyeMaxCount) {
      currentScreen = "ending_2";

    //reset character values for a new game 
    isPlayerTurn = true;
    cecilia.startOver();
    ue.hp = ue.maxhp;
    eyeCount = eyeMinCount
   
  }
    
    if (isPlayerTurn) {

    actionDelay = 0;

    textAlign(CENTER);
    text("Player's Turn", width/2, height * 0.13)
    
    
    // Attack Command
    
    AtkButton.removeAttribute('disabled');
    AtkButton.style('background-image', 'url(Assets/Button/Attack-Button.png');

    AtkButton.mousePressed(() => { ue, damageDisplayText = cecilia.attack1(ue); isPlayerTurn = false; cecilia.overDriveCheckReset(); playerHitEffect.show(width/2,0); isAtkMouseOver = false;});
    cecilia.update();

    AtkButton.mouseOver(()=> {isAtkMouseOver = true; });
    AtkButton.mouseOut(()=> {isAtkMouseOver = false;  });
    
    if (isAtkMouseOver) {
      showAttackDescription(); // Display the attack description
    } else {
      hideAttackDescription(); // Hide the attack description
    }

    // Switch Command
    
    SkillButton.mousePressed(() => {cecilia.isAssaultMode = !cecilia.isAssaultMode; cecilia.assaultMode(); isSkillMouseOver = false;});
    cecilia.update();
    
    if (cecilia.isAssaultMode && cecilia.mp < cecilia.assaultModeAttackMpCost) {
      cecilia.isAssaultMode = false;
    }

    if (cecilia.isAssaultMode && cecilia.mp < cecilia.assaultModeAttackMpCost || cecilia.assaultActiveTurn > cecilia.assaultModeMaximumTurn) {
      cecilia.isAssaultMode = false;
    }

    if (cecilia.isAssaultMode || cecilia.isOverDrive || cecilia.mp < cecilia.assaultModeActivateMpCost || cecilia.assaultActiveTurn > cecilia.assaultModeMaximumTurn) {
      SkillButton.attribute('disabled', 'true');
      SkillButton.style('background-image', 'url(Assets/Button/Switch-Mode-Disable.png');
    } else {
      SkillButton.removeAttribute('disabled');
      SkillButton.style('background-image', 'url(Assets/Button/Switch-Mode.png');
    }

    SkillButton.mouseOver(()=> {isSkillMouseOver = true; });
    SkillButton.mouseOut(()=> {isSkillMouseOver = false; });
    
    if (isSkillMouseOver) {
      showSkillDescription();
    } else {
      hideSkillDescription();
    }


    //Overdrive Command
    
    if (!cecilia.isOverDrive) {
      SpButton.mousePressed(() => {cecilia.isOverDrive = true; cecilia.overDrive(); cecilia.overDriveCheckActivate(); cecilia.isAssaultMode = false; isOverDriveButtonMouseOver = false;});
      cecilia.update();
    }
    
    if (cecilia.isOverDrive) {
      SpButton.mousePressed(() => {cecilia.isOverDrive = false; cecilia.overDriveCheckActivate(); isOverDriveButtonMouseOver = false; this.overDriveAttackCost = this.overDriveAttackMinCost; });
      cecilia.update();
    }

    if (cecilia.isOverDrive && cecilia.sp < cecilia.overDriveActivateCost) {
      cecilia.isOverDrive = false;
      cecilia.overLoaded();
    }

    if (cecilia.isAssaultMode || cecilia.sp < cecilia.overDriveActivateCost || cecilia.isChangedToOverDrive === true || cecilia.isOverLoaded) {
      SpButton.attribute('disabled', 'true');
      SpButton.style('background-image', 'url(Assets/Button/Overdrive-Button-Disable.png');
    } else {
      SpButton.removeAttribute('disabled');
      SpButton.style('background-image', 'url(Assets/Button/Overdrive-Button.png');
    }

    SpButton.mouseOver(()=> {isOverDriveButtonMouseOver = true; });
    SpButton.mouseOut(()=> {isOverDriveButtonMouseOver = false; });

    if (isOverDriveButtonMouseOver) {
      showOverDriveDescription(); 
    } else {
      hideOverDriveDescription(); 
    }

    //Sp Attack Command
    SpAttackButton.mousePressed(() => { ue = cecilia.attack2(ue); isPlayerTurn = false; if(cecilia.isOverDrive) {cecilia.overDriveCheckReset();}; isSpAtkMouseOver = false; });
    cecilia.update();

    
    if(cecilia.isOverLoaded || cecilia.gauge !== cecilia.maxgauge){
      SpAttackButton.attribute('disabled', 'true');
      SpAttackButton.style('background-image', 'url(Assets/Button/Attack-Button-Burst-Disable.png');
    }else{
      SpAttackButton.removeAttribute('disabled');
      SpAttackButton.style('background-image', 'url(Assets/Button/Attack-Button-Burst.png');
    }

    SpAttackButton.mouseOver(()=> {isSpAtkMouseOver = true; });
    SpAttackButton.mouseOut(()=> {isSpAtkMouseOver = false; });
    
    if (isSpAtkMouseOver) {
      showSpecialAttackDescription();
    } else {
      hideSpecialAttackDescription(); 
    }


    console.log(playerHitEffect);
  }


  if (!isPlayerTurn) {

    actionDelay ++;

    textAlign(CENTER);
    text("Enemy's Turn", width/2, height * 0.13)

    //disable buttom in enemy's turn
    AtkButton.attribute("disabled", true);
    SkillButton.attribute("disabled", true);
    SpButton.attribute("disabled", true);
    SpAttackButton.attribute("disabled", true);

    if (actionDelay == 50) {
      ue.attack1(cecilia);}
  
      if (actionDelay == 50 && ue.hp <= ue.maxhp/2 ) {
        ue.attack2(cecilia);}
      
    if (actionDelay == 100) {
        isPlayerTurn = true;}
      }

}



function drawEnding1() {
  
  background(10);
  ending1();

  //remove button in previous screen
  var elements = document.getElementsByClassName("hidden2");

  for (let i = 0; i < elements.length; i++) {
    elements[i].style.display = "none";
  }
  
  returnToTitle();
  
}

function drawEnding2() {
  
  background(10);
  ending2();
  
  returnToTitle();
  retry();

  //remove button in previous screen
  var elements = document.getElementsByClassName("hidden2");

  for (let i = 0; i < elements.length; i++) {
    elements[i].style.display = "none";
  }
  
}

function drawEnding3() {
  
  background(10);
  
}

function gameOver() {
  
  gameoverscreen();
  
  returnToTitle();
  retry();

  //remove button in previous screen
  var elements = document.getElementsByClassName("hidden2");

  for (let i = 0; i < elements.length; i++) {
    elements[i].style.display = "none";
  }

}

function returnToTitle () {
  
  returnButton = createButton('Back To Title');
  returnButton.addClass ('hidden3');
  returnButton.position(0, 0);
  returnButton.size(200,50);
  returnButton.style('background-color', 'transparent');
  returnButton.style('border', 'none');
  returnButton.style('font-size', '24px');
  returnButton.style('color', 'white');
  returnButton.style('font-family', 'Novecento light');
  returnButton.style('position', 'absolute');
  returnButton.style('left', '50%');
  returnButton.style('top', '80%');
  returnButton.style('transform', 'translate(-50%, -50%)');
  
  returnButton.mousePressed(() => {
    currentScreen = "menu";
    
  });
    
}

function retry () {
  
  retryButton = createButton('Retry');
  retryButton.addClass ('hidden3');
  retryButton.position(0, 0);
  retryButton.size(200,50);
  retryButton.style('background-color', 'transparent');
  retryButton.style('border', 'none');
  retryButton.style('font-size', '24px');
  retryButton.style('color', 'white');
  retryButton.style('font-family', 'Novecento light');
  retryButton.style('position', 'absolute');
  retryButton.style('left', '50%');
  retryButton.style('top', '70%');
  retryButton.style('transform', 'translate(-50%, -50%)');
  
  retryButton.mousePressed(() => {
    currentScreen = "gameplay";
   
  });

}