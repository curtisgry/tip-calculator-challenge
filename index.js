// Tried storing all input related elements in an object instead of declaring multiple global variables
const inputs = {
    bill: document.querySelector('#bill'),
    people: document.querySelector('#people'),
    btns: document.querySelectorAll('input[name=percent]'),
    reset: document.querySelector('.reset'),
    custom: document.querySelector('#custom')
}
// Same as above with some HTML that would need to be updated 
const htmlElements = {
    tipTotal: document.querySelector('.tip h2'),
    fullTotal: document.querySelector('.full-total h2')
}

// All of the functionality to proccess the inputs and return an object with calculated values
function calculateTip() {
    let bill = parseFloat(inputs.bill.value);
    let people = parseInt(inputs.people.value);
    let customInput = parseInt(inputs.custom.value)
    let tip = 0;
    let splitBill = 0;
    let splitTip = 0;
    let percent;

// Update percent value when a custom input is used
    if (customInput) {
        percent = customInput
    }
// Get value from pre-defined percent radios
    if (document.querySelector('input[type=radio]:checked')) {
        percent = parseInt(document.querySelector('input[type=radio]:checked').value);
    }
// Calculate the tip and bill
    if (bill && people) {
        tip = bill * (percent / 100);
        bill += tip;
        splitBill = bill / people;
        splitTip = tip / people;
    }
// Object with calculated values. Not all values used later but added them for flexebility.
    return {
        tip: tip.toFixed(2),
        total: bill.toFixed(2),
        splitBill: splitBill.toFixed(2),
        splitTip: splitTip.toFixed(2),
        bill: bill,
        people: people
    }
}

// Updates HTML with calculated data
function renderData() {
    const calculatedData = calculateTip();
    if (calculatedData.bill && calculatedData.people) {
        htmlElements.tipTotal.innerText = `$${calculatedData.splitTip}`;
        htmlElements.fullTotal.innerText = `$${calculatedData.splitBill}`;
    } else {
        htmlElements.tipTotal.innerText = `$0.00`;
        htmlElements.fullTotal.innerText = `$0.00`;
    }
}
// A function to call to force reset of all HTML values
function resetDisplayValues() {
    inputs.bill.value = '';
    inputs.people.value = '';
    inputs.custom.value = '';
    htmlElements.tipTotal.innerText = `$0.00`;
    htmlElements.fullTotal.innerText = `$0.00`;
}


// Event Listeners
inputs.bill.addEventListener('input', () => {
    renderData();
})
inputs.people.addEventListener('input', () => {
    renderData();
})

inputs.btns.forEach(button => {
    button.addEventListener('click', () => {
        renderData();
    })
})
inputs.reset.addEventListener('click', () => {
    resetDisplayValues();
})

inputs.custom.addEventListener('click', () => {

    if (document.querySelector('input[type=radio]:checked').checked) {
        document.querySelector('input[type=radio]:checked').checked = false;
    }

    renderData();
    inputs.custom.addEventListener('input', () => {
        renderData();
    })
})