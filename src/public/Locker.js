
const CryptoJS = require("crypto-js");

class Locker {

    SECRET = 'secret';
    dataToLock = null;

    constructor() { }

    setSecret(_secret) {
        this.SECRET = _secret; return this;
    }

    setString(data) {
        this.dataToLock = data; return this;
    }

    setJSON(data) {
        this.dataToLock = JSON.stringify(data); return this;
    }

    lock() {
        if (this.dataToLock != null) {
            return CryptoJS.AES.encrypt(this.dataToLock, this.SECRET).toString();
        } else {
            return "Set input data first";
        }
    }

    unlock(data) {
        var bytes  = CryptoJS.AES.decrypt(data, 'secret');
        return bytes.toString(CryptoJS.enc.Utf8);
    }

    unlockJSON(data) {
        var bytes  = CryptoJS.AES.decrypt(data, 'secret');
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }
}

module.exports = new Locker();

// const locker = new Locker();

// let plaintext = {"page":2,"per_page":6,"total":12,"total_pages":2,"data":[{"id":7,"email":"michael.lawson@reqres.in","first_name":"Michael","last_name":"Lawson","avatar":"https://reqres.in/img/faces/7-image.jpg"},{"id":8,"email":"lindsay.ferguson@reqres.in","first_name":"Lindsay","last_name":"Ferguson","avatar":"https://reqres.in/img/faces/8-image.jpg"},{"id":9,"email":"tobias.funke@reqres.in","first_name":"Tobias","last_name":"Funke","avatar":"https://reqres.in/img/faces/9-image.jpg"},{"id":10,"email":"byron.fields@reqres.in","first_name":"Byron","last_name":"Fields","avatar":"https://reqres.in/img/faces/10-image.jpg"},{"id":11,"email":"george.edwards@reqres.in","first_name":"George","last_name":"Edwards","avatar":"https://reqres.in/img/faces/11-image.jpg"},{"id":12,"email":"rachel.howell@reqres.in","first_name":"Rachel","last_name":"Howell","avatar":"https://reqres.in/img/faces/12-image.jpg"}],"support":{"url":"https://reqres.in/#support-heading","text":"To keep ReqRes free, contributions towards server costs are appreciated!"}}
//     plaintext = JSON.stringify(plaintext);

//     locker.setJSON(plaintext);

//     console.log(locker.lock());

//     // console.log(locker.unlock('U2FsdGVkX1/sTIis/bcoV0eyE/HSubFkkWQq1y7HauA='));

//     console.dir(JSON.parse(locker.unlockJSON('U2FsdGVkX19bZGiCJVz6OTO15DlpfzR9WjIibwUfBVfaDIi8YW+LXBDOvv+o5KbTI9sGLmnesrILtMnjyfXSvUQjAcegvBBsxD1EUiE/4vFwfgbr2GrjKzlFFm8ZxOwtmlG/ZQqpseje4XL5e3ZOmOmNoMeaMplIIm3BaXzdVyu5Iddesm1OR3K/DHaUkmFgdL5mPpyEoYuK9HdKnzCHBUg6omyjPEVIa6fwh9vgrdFl7NsVSj/LnloTZ/TX46X9vmLh2BG9E3qfYumL2g60vK2sfNWaY8Fq0/OVZD+paezveEyz3byLJzwfrdTf/6mNCKAKsHEZQxPJ7uFQMgb5CUnoZtk0aiPzYckXv5ZWWAlQ0tFDYrBkoXncPRRTWRYS55QAVSHiQFaCKGmgxQwo0puASyMut5UDougleUTF5oajUlXgoAzACA1wjcspOPDQ6EWKJVcSyR0hCTkjQGURCny6F+5IzZp1+QBxD/MrxMCvxc2qfd57rMa6MjbRAvHhyt8H84HLKIhtT/WyWacAL2ifQBEdPv5YB4fPPeXUhPgYtAOCsX4tdX9BTF/Me8iWKkZ+k1PnIF8Dg1Oyi+WJzdzoIVgLTe+PVoH5HxYnqy+dBbDrJJzvoDkVHIG/ezO2lEkIyKgOCMUo24PpqjL7SP9+r57v8CDY3v0KSDylvpozK/F1eTZ8hhJE/f1HczbOB7m/9ulJ6JOnXlSKTVBCHLLS2CHNWMG7kqqPKifUBJWfi0twhF4MMFfdJqCKm01TkNa6euGlibTYYXfYlXSibfidaj8lG1W8t87W9RVEBQhsz1XNxaVdbC6IDB9fa4J2Lc81gpaIUwfeDILb9mqscq9T7CCIKihDaXUv+bXwa7ClUSMkXmYXNzldSer4GARiNbecrcBgcHWM95KcLSax7LJEp5xyp8cJm9Ix3cjkn7vSpxNhPz4644j2dbvS0XWaLKIJifEmejfu7IZXLSPLvHUsMc3Tny7dMpUpR4AHbEvji42qwT2RbSBmn3TEVp4EbJ5eq3dOJN2XONW0zcuEnVtxS/9dABGZ4kZXHoC+U53+M0YLLxiqvJ5pttmWvGnrt9gzZdCBy01uW64XvHPbs5iNAKumJ/mKSjDnqvOLyuB3GlPl7XNW9UYAdU7cdZ1zvnIOdHnoDcTXT/lGxzm7cM0SC87QmYaET1tqMQK2yQ+pofBxXNofJ/yCq0bdwRhhvhJBGK6PQw53W5yWJABtE/LWCoqPs0vg+weVm0s0RdCutN9OesAe7I6CTeek/FsV6yMAuQRzxVRbkIX8Bb4MVbbuoePUvTnl4uyc+ED/nf1ToX22EVr1ZfXvtMhhHnq7G3/1PYiZTLLMxySZGQCDxU3v2WlCjT3kvSRnY3M6V0wlv3e8X/ub+bpLvekQV1vbePQkYMc529tO3spqFKWE0Jg+WS/X+AY5L7rXr9rP6Hsilji4/xWNH+d9+xdfr8ZLLACvys4Fmi6nIw0bpPt4aCR9kdoFiLqjTUVTtVZ6zrvXKjCjjcZYnNkpK0yHRpCFjUqU2fQ7ewWtTI7pFJcxjR+BHlRAqpalGVKWnQNpcn8=')));