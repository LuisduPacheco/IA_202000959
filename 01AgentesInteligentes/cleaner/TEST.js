function getRandomInt(values){
    return values[Math.floor(Math.random() * (values.length + 1))];
}

var site = ["A", "B"];
var initial_state = ["DIRTY", "CLEAN"];

var states = [getRandomInt(site), getRandomInt(initial_state), getRandomInt(initial_state)];
console.log(states)