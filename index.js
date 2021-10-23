const colors = require("colors/safe");
// console.log(process.argv);
const numbers = num => {
    if (isNaN(num[0]) || isNaN(num[1])) {
        console.log(colors.red('Ошибка! Передано нечисловое выражение'));
        return;
    }
    let mas = [];

    for (let i = num[0]; i < num[1]; i++) {
        let flag = true;
        for (let p = 2; p < i; p++) {
            if (i % p == 0) {
                flag = false;
                break;
            }
        }
        flag == true ? mas.push(i) : mas;
    }
    if (mas.length == 0) {
        console.log(colors.red('Простых чисел нет'));
        return;
    }
    for (let m = 0; m < mas.length; m = m + 1) {        
        switch(m % 3) {
            case 1:
              console.log(colors.yellow(mas[m]));
              break;          
            case 2:
                console.log(colors.red(mas[m]));                
                break;          
            default:
                console.log(colors.green(mas[m]));
                break;
          }
    }
    return mas;
};
numbers([process.argv[2], process.argv[3]]);