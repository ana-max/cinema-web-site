var cc = myform.cardcode;
var ccd = myform.cardcodedata;
var ccc = myform.cardcodecvc;

for (var i in ['input', 'change', 'blur', 'keyup']) {
    cc.addEventListener('input', formatCardCode, false);
    ccd.addEventListener('input', formatCardCodeData, false);
    ccc.addEventListener('input', formatCardCodeCVC, false);
}

function formatCardCode() {
    var cardCode = this.value.replace(/[^\d]/g, '').substring(0,16);
    cardCode = cardCode != '' ? cardCode.match(/.{1,4}/g).join(' ') : '';
    this.value = cardCode;
}

function formatCardCodeData() {
    var cardcodedata = this.value.replace(/[^\d]/g, '').substring(0,4);
    cardcodedata = cardcodedata != '' ? cardcodedata.match(/.{1,2}/g).join(' / ') : '';
    this.value = cardcodedata;
}

function formatCardCodeCVC() {
    var cardcodecvc = this.value.replace(/[^\d]/g, '').substring(0,3);
    this.value = cardcodecvc;
}
