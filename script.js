let inpCardNumber = document.querySelector('.cardNumber');
let numsOnCard = document.querySelector('.numsOnCard');
let banks = document.querySelector('#banks');
let cardBg = document.querySelector('.card');
let inpCardHolder = document.querySelector('.inpCardHolder');
let cardHolder = document.querySelector('.cardHolder');
let inpCardData = document.querySelector('.inpCardData');
let cardData = document.querySelector('.cardData');
let inpPaymentSys = document.querySelector('#bank');
let paymentSys = document.querySelector('.paymentSys');
let form = document.querySelector('form');
let cards = document.querySelector('.cards');

inpPaymentSys.value = '';
banks.value = '';


function paymentSelect(img) {
    switch (img) {
        case 'visa':
            img = './images/visa.png';
        break;
        case 'mastercard':
            img = './images/mastercard.png';
        break;
        case 'mir':
            img = './images/mir.png';
        break;
        default:
            img = '';
        break;
    }

    return img
}

function bankSelect(img) {
    switch (img) {
        case 'sber':
            img = './images/sber.png';
            bgColor = 'yellowgreen';
        break;
        case 'tinkoff':
            img = './images/tinkoff.png';
            bgColor = 'yellow';
        break;
        case 'vtb':
            img = './images/vtb.png';
            bgColor = 'skyblue';
        break;
        case 'alfa-bank':
            img = './images/alfa.png';
            bgColor = 'crimson';
        break;
        default:
            img = '';
            bgColor = '';
        break;
    }

    return {1: img, 2: bgColor}
}

function maskCC(event) {
    let vcc = this.value.replace(/\D/g, '');
    this.value = '';
    for(let i = 0; i < vcc.length; i++) {
        this.value += (i%4==0 && i != 0 ? ' ' : '') + vcc[i];
    }
}

function bar(evt) {
    let v = this.value;
    if (v.match(/^\d{2}$/) !== null) {
        this.value = v + '/';
    } else if (v.match(/^\d{2}\/\d{2}$/) !== null) {
        this.value = v
    }
}

inpCardNumber.addEventListener('input', maskCC, false);
inpCardData.addEventListener('input', bar, false);

inpCardNumber.addEventListener('input', (e) => {
    numsOnCard.textContent = e.target.value
});

inpCardHolder.addEventListener('input', (e) => {
    cardHolder.textContent = e.target.value;
});

inpCardData.addEventListener('input', (e) => {
    cardData.textContent = e.target.value;
});

inpPaymentSys.addEventListener("change", (e) => {
    img = e.target.value;
    paymentSys.style.backgroundImage = `url(${paymentSelect(img)})`;
});

banks.addEventListener("change", (e) => {
    img = e.target.value;
    cardBg.style.backgroundImage = `url(${bankSelect(img)[1]})`;
    cardBg.style.backgroundColor = bankSelect(img)[2];
    
});

form.addEventListener('submit', e => {
    e.preventDefault()
    let arr = [];
    for(let i = 0; i < form.elements.length; i++){
        let el = form.elements[i].value;
        arr.push(el);
    }

    cards.innerHTML += `
    <div class="card" style="background-image: url('${bankSelect(arr[0])[1]}'); background-color: ${bankSelect(arr[0])[2]};">
        <h3 class="numsOnCard">${arr[2]}</h3>
        <p class="cardHolder">${arr[1]}</p>
        <span class="cardData">${arr[3]}</span>
        <span class="paymentSys" style="background-image: url('${paymentSelect(arr[4])}');"></span>
    </div>
    `

    inpCardData.value = '';
    inpCardHolder.value = '';
    inpCardNumber.value = '';
    inpPaymentSys.value = '';
    banks.value = '';
});
