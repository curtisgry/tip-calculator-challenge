const inputs = {
    bill: document.querySelector('#bill'),
    people: document.querySelector('#people'),
    btns: document.querySelectorAll('input[name=percent]'),
    reset: document.querySelector('.reset'),
    custom: document.querySelector('#custom')
}

const htmlElements = {
    tipTotal: document.querySelector('.tip h2'),
    fullTotal: document.querySelector('.full-total h2')
}

function calculateTip() {
    let bill = parseFloat(inputs.bill.value);
    let people = parseInt(inputs.people.value);
    let customInput = parseInt(inputs.custom.value)
    let tip = 0;
    let splitBill = 0;
    let splitTip = 0;
    let percent;


    if (customInput) {
        percent = customInput
    }
    if (document.querySelector('input[type=radio]:checked')) {
        percent = parseInt(document.querySelector('input[type=radio]:checked').value);
    }

    if (bill && people) {
        tip = bill * (percent / 100);
        bill += tip;
        splitBill = bill / people;
        splitTip = tip / people;
    }

    return {
        tip: tip.toFixed(2),
        total: bill.toFixed(2),
        splitBill: splitBill.toFixed(2),
        splitTip: splitTip.toFixed(2),
        bill: bill,
        people: people
    }
}

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
    inputs.bill.value = '';
    inputs.people.value = '';
    inputs.custom.value = '';
    htmlElements.tipTotal.innerText = `$0.00`;
    htmlElements.fullTotal.innerText = `$0.00`;
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