let moment = require('moment');

const EventEmitter = require('events');

class Handler {
    static tick(duration) {
        console.log(`Осталось: лет: ${duration.years()}, месяцев: ${duration.months()}, дней: ${duration.days()}, часов: ${duration.hours()}, минут: ${duration.minutes()}, секунд: ${duration.seconds()}`);
    }
}

class MyEmitter extends EventEmitter { };

const emitterObject = new MyEmitter();

emitterObject.on('tick', Handler.tick);

const timers = (...dates) => {

    for (let i = 0; i < dates.length; i++) {

        let dateAsMoment = moment(dates[i], "hh-mm-DD-MM-YYYY");
        let timer = setInterval(() => {

            let duration = moment.duration(dateAsMoment.diff(moment()));
            emitterObject.emit('tick', duration);

            if (duration.as('seconds') <= 0) {
                console.log('Время и стекло');
                clearInterval(timer);
            }
        }, 1000);
    }
};

timers(...process.argv.slice(2));
//hh-mm-dd-mm-yyyy