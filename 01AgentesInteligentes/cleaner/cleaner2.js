// MIT License
// Copyright (c) 2025 Luis

function reflex_agent(location, state) {
    if (state=="DIRTY") return "CLEAN";
    else if (location=="A") return "RIGHT";
    else if (location=="B") return "LEFT";
}

function test(states) {

    var location = states[0]
    var state = states[0] == "A" ? states[1] : states[2];
    var action_result = reflex_agent(location, state);
    
    document.getElementById("log").innerHTML+="<br>Location: "
                                .concat(location)
                                .concat(" | Action: ")
                                .concat(action_result)
                                .concat(" | states: ")
                                .concat(states[1])
                                .concat(", ")
                                .concat(states[2]);
                                if (states[1] == "CLEAN" && states[2] == "CLEAN") {
                                    states[1] = getRandomInt(initial_state)
                                    states[2] = getRandomInt(initial_state)
                                }

    if (action_result == "CLEAN"){
        if (location == "A") states[1] = "CLEAN";
        else if (location == "B") states[2] = "CLEAN";
    }
    else if(action_result == "RIGHT") states[0] = "B";
    else if(action_result == "LEFT") states[0] = "A";
    setTimeout(function(){
        if (Math.random() < 0.3) { // 30% de probabilidad de que A se ensucie
            states[1] = "DIRTY";
        }
        if (Math.random() < 0.3) { // 30% de probabilidad de que B se ensucie
            states[2] = "DIRTY";
        }
        test(states);
    }, 2000)
}

function vacuum_cleaner() {
    let site = ["A", "B"];
    //let initial_state = ["DIRTY", "CLEAN"];

    for (let i = 0; i < 8; i++) {
        let states = [
            site[i % 2], // 0 o 1 para A o B
            (i & 2) ? "DIRTY" : "CLEAN",  // Estado de A
            (i & 4) ? "DIRTY" : "CLEAN"   // Estado de B
        ];
        // Ensuciando cada cierto tiempo
        setTimeout(() => test(states), i * 6000);
    }
}

vacuum_cleaner()