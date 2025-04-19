import './styles/main.css';
import './styles/options.css';
import './styles/actions.css';
import './styles/dice.css';

const $ = (selector: string): Element | null => document.querySelector(selector);
const $$ = (selector: string): NodeListOf<HTMLElement> => document.querySelectorAll(selector);

// INSERT DICES LOGIC
const $diceContainer = $('#dice-container') as HTMLDivElement;
const $diceTemplate = $('#dice-template') as HTMLTemplateElement;
const $bRestart = $('#btn-restart') as HTMLButtonElement;
let $$dices: NodeListOf<HTMLElement>;

function insertDices(n: number): void {
  $bRestart.style.opacity = '0';
  $diceContainer.innerHTML = '';
  for (let i = 1; i <= n; i++) {
    const clone = $diceTemplate.content.cloneNode(true);
    $diceContainer.appendChild(clone);
  }

  $$dices = $$('.dice');
}

const $$nDicesOptions = $$('.option-n-dices input[name="dices"]');
$$nDicesOptions.forEach(radio => radio.addEventListener('change', () => {
  insertDices(Number((radio as HTMLInputElement).value));
}));


// ROLL DICE LOGIC
let movements: string[] = [
  'rollDiceTo1',
  'rollDiceTo1i',
  'rollDiceTo2',
  'rollDiceTo2i',
  'rollDiceTo3',
  'rollDiceTo3i',
  'rollDiceTo4',
  'rollDiceTo4i',
  'rollDiceTo5',
  'rollDiceTo5i',
  'rollDiceTo6',
  'rollDiceTo6i'
];

function chooseRandomMovement(): string {
  return movements[Math.floor(Math.random() * movements.length)];
}

$bRestart.style.opacity = '0';
$bRestart.addEventListener('click', () => {
  $bRestart.style.opacity = '0';
  $$dices.forEach(dice => {
    (dice as HTMLDivElement).style.animation = '';
  });
});

const $bRoll = $('#btn-roll') as HTMLButtonElement;
$bRoll.addEventListener('click', () => {
  $bRestart.style.opacity = '1';
  const animationConfig = '1s linear forwards';
  $$dices.forEach(dice => {
    const el = dice as HTMLDivElement;
    el.style.animation = '';
    void dice.offsetWidth;  // Forces reflow
    el.style.animation = `${chooseRandomMovement()} ${animationConfig}`;;
  });
});

insertDices(1);
