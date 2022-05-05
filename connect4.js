function different_type_of_input() {
    document.querySelector("input").oninput = function() {
        if (document.getElementById("modeInput").value === "Freeplay") {
            document.getElementById("play").style.top = "450px"
            document.getElementById("play").style.visibility = "visible"
            document.getElementById("play").href = "./con4Freeplay.html"
        } else if (document.getElementById("modeInput").value === "Compete") {
            document.getElementById("playerSelection").style.visibility = "visible"
            document.getElementById("play").style.top = "600px"
            document.getElementById("play").style.visibility = "visible"
            document.getElementById("play").href = "./con4Compete.html"
        } else {
            document.getElementById("play").style.visibility = "hidden"
            document.getElementById("play").href = ""
            document.getElementById("playerSelection").style.visibility = "hidden"
        }
    }
}

function start() {

    document.getElementById("player_1_leftside_display").style.backgroundColor = localStorage.getItem("player_1_color")
    document.getElementById("player_2_leftside_display").style.backgroundColor = localStorage.getItem("player_2_color")

    localStorage.setItem("active", "11, 12, 13, 14, 15, 16, 17")
    localStorage.setItem("winner", "false")
    localStorage.setItem("worked_arr_str", "")
    
    if (localStorage.getItem("prev_starter") === "p1") {
        localStorage.setItem("prev_starter", "p2")
        localStorage.setItem("current_color", localStorage.getItem("player_2_color"))
        document.getElementById("player_2_black_button").style.visibility = "visible"
    } else {
        localStorage.setItem("prev_starter", "p1")
        localStorage.setItem("current_color", localStorage.getItem("player_1_color"))
        document.getElementById("player_1_black_button").style.visibility = "visible"
    }

    // P1 and P2 in gear 
    // document.getElementById(localStorage.getItem("player_1_color")).appendChild(document.getElementById("gear_p1"))
    // document.getElementById(localStorage.getItem("player_2_color")).appendChild(document.getElementById("gear_p2"))
    // document.getElementById("gear_p1").style.textAlign = "center"
    // document.getElementById("gear_p1").style.lineHeight = "35px"

    document.getElementById(localStorage.getItem("player_1_color")).innerText = "P1"
    document.getElementById(localStorage.getItem("player_2_color")).innerText = "P2"


    to_be_clicked()

    var buttons = document.querySelectorAll("button")
    for (let button of buttons) {
        button.onclick = function() {
            clicked(button.id)

            if (localStorage.getItem("winner") === "true") {
                // alert(document.getElementById(localStorage.getItem("worked_arr_str").slice(0, 2)).style.animation)
                // document.getElementById(localStorage.getItem("worked_arr_str").slice(0, 2)).style.animation = ""

                // do the animation using worked_arr local storage item
                alert(localStorage.getItem("current_color").toUpperCase() + " WINS!!")
                location.reload()
                return
                // break
            } else if (localStorage.getItem("winner") === "nobody") {
                // do the animation using worked_arr local storage item
                alert("NO ONE WINS")
                location.reload()
                return
                // break
            }
            // alert('hi')
            to_be_clicked()
        }
    }
}

function to_be_clicked() {

    var active = localStorage.getItem("active")
    active = active.split(", ")

    // var buttons_local = document.querySelectorAll("button")
    // for (let button of buttons_local) {
    //     button.onmouseenter = function() {
    //         var index = parseInt((button.id).split("")[1]) - 1
    //         var value = active[index]
    //         console.log(value)
    //         console.log(typeof(value))
    //         document.getElementById(value).style.backgroundColor = localStorage.getItem("current_color")
    //     }
    //     button.onmouseleave = function() {
    //         var index = parseInt((button.id).split("")[1]) - 1
    //         var value = active[index]
    //         console.log((button.id).split())
    //         document.getElementById(value).style.backgroundColor = "white"

    //     }

    //     // button.onclick = clicked(button.id)
    // }

    // This one below
    // for (let each_id of active) {

    //     document.getElementById(each_id).onmouseenter = function() {
    //         document.getElementById(each_id).style.backgroundColor = localStorage.getItem("current_color")
    //     } 

    //     document.getElementById(each_id).onmouseleave = function() {
    //         document.getElementById(each_id).style.backgroundColor = "white"
    //     }
    // }

    var all_buttons = document.querySelectorAll("button")
    for (let each_button of all_buttons) {
        each_button.onmouseenter = function() {
            for (let x = 0; x < active.length; x++) {
                if (active[x][1] === each_button.id[1]) {
                    document.getElementById(active[x]).style.backgroundColor = localStorage.getItem("current_color")

                    document.getElementById(active[x]).style.animation = "blinker 1s linear infinite"
                }
            }
        }
        each_button.onmouseleave = function() {
            for (let x = 0; x < active.length; x++) {
                if (active[x][1] === each_button.id[1]) {
                    document.getElementById(active[x]).style.backgroundColor = "white"

                    document.getElementById(active[x]).style.animation = ""
                }
            }
        }
    }
}

function clicked(the_id) {

    // This part needs to be changed

    var active = localStorage.getItem("active") 
    var active = active.split(", ") // ["11", "12", "13", "14", "15", "16", "17"]

    new_id = NaN

    var set_color = false

    // for (let i = 10 + parseInt(the_id[1]); i < 70; i+=10) {
    //     try {

    //         if (document.getElementById(String(i)).style.backgroundColor === "white") {
    //             document.getElementById(String(i)).style.backgroundColor = localStorage.getItem("current_color")
    //             set_color = true
    //             new_id = String(i)
    //             break
    //         }
    //     } catch {
    //         break
    //     }
    // }

    for (let i = 0; i < active.length; i++) {
        try {
            if (active[i][1] === the_id[1]) {

                // Change color, turn off animation, set new_id, modify active[i] to the upper circle, set set_color to true, break
                document.getElementById(active[i]).style.backgroundColor = localStorage.getItem("current_color")
                document.getElementById(active[i]).style.animation = ""
                new_id = active[i]
                active[i] = String(parseInt(active[i]) + 10)
                set_color = true
                break
            }
        } catch {
            break
        }
    }

    if (set_color === false) {
        return
    }

    document.getElementById("switchTurn").style.visibility = "hidden"

    var worked_arr_str = ""

    // Vertical Match
    try {

        if (document.getElementById(new_id).style.backgroundColor === document.getElementById(String(parseInt(new_id) - 10)).style.backgroundColor) {
            if (document.getElementById(String(parseInt(new_id) - 10)).style.backgroundColor === document.getElementById(String(parseInt(new_id) - 20)).style.backgroundColor) {
                if (document.getElementById(String(parseInt(new_id) - 20)).style.backgroundColor === document.getElementById(String(parseInt(new_id) - 30)).style.backgroundColor) {
                    worked_arr_str += String(new_id) + ", " + String(parseInt(new_id) - 10) + ", " + String(parseInt(new_id) - 20) + ", " + String(parseInt(new_id) - 30)
                    localStorage.setItem("winner", "true")
                    localStorage.setItem("worked_arr_str", worked_arr_str)
                    document.getElementById(new_id).style.animation = ""
                    return
                }
            }
        }

    } catch {
        worked_arr_str = worked_arr_str
    }
    
    // Below Horizontal Match Needs work

    // Horizontal Match
    for (let x = parseInt(new_id) - 3; x < parseInt(new_id) + 1; x++) {
        try {

            if (document.getElementById(String(x)).style.backgroundColor === document.getElementById(String(x + 1)).style.backgroundColor) {
                if (document.getElementById(String(x + 1)).style.backgroundColor === document.getElementById(String(x + 2)).style.backgroundColor) {
                    if (document.getElementById(String(x + 2)).style.backgroundColor === document.getElementById(String(x + 3)).style.backgroundColor) {
                        worked_arr_str += String(x) + ", " + String(x + 1) + ", " + String(x + 2) + ", " + String(x + 3)
                        localStorage.setItem("winner", "true")
                        localStorage.setItem("worked_arr_str", worked_arr_str)
                        document.getElementById(new_id).style.animation = ""
                        return
                    }
                }
            }
        } catch {
            continue
        }
    }

    // Diagonal Match  (top on left, bottom on right) (45)

    var pointer_1 = parseInt(new_id) + 27 // 62
    var pointer_2 = parseInt(new_id) - 27 // 17

    while (true) {
        try {
            document.getElementById(String(pointer_1)).style.backgroundColor = document.getElementById(String(pointer_1)).style.backgroundColor
            break
        } catch {
            pointer_1 -= 9
        }
    }

    while (true) {
        try {
            // The .style.backgroundColor part is only there to create 
            document.getElementById(String(pointer_2)).style.backgroundColor = document.getElementById(String(pointer_2)).style.backgroundColor
            break
        } catch {
            pointer_2 += 9
        }
    }

    var divisional = (Math.ceil((pointer_1 / 9)) - Math.ceil((pointer_2 / 9))) + 1 // 6

    if (divisional >= 4) {

        if (divisional % 4 === 0) {
            var range_val = 1
        } else {
            var range_val = divisional % 4 // 2
        }

        for (let x = 0; x < range_val; x++) {
            
            if (document.getElementById(String(pointer_1)).style.backgroundColor === document.getElementById(String(pointer_1 - 9)).style.backgroundColor) {
                if (document.getElementById(String(pointer_1 - 9)).style.backgroundColor === document.getElementById(String(pointer_1 - 18)).style.backgroundColor) {
                    if (document.getElementById(String(pointer_1 - 18)).style.backgroundColor === document.getElementById(String(pointer_1 - 27)).style.backgroundColor) {
                        worked_arr_str = ""
                        worked_arr_str += String(pointer_1) + ", " + String(pointer_1 - 9) + ", " + String(pointer_1 - 18) + ", " + String(pointer_1 - 27)
                        localStorage.setItem("winner", "true")
                        localStorage.setItem("worked_arr_str", worked_arr_str)
                        return
                    }
                }
            }

            pointer_1 -= 9
        }
    }
    

    // Diagonal Match (top on right, bottom on left)

    var pointer_3 = parseInt(new_id) + 33
    var pointer_4 = parseInt(new_id) - 33

    while (true) {
        try {
            document.getElementById(String(pointer_3)).style.backgroundColor = document.getElementById(String(pointer_3)).style.backgroundColor
            break
        } catch {
            pointer_3 -= 11
        }
    }

    while (true) {
        try {
            document.getElementById(String(pointer_4)).style.backgroundColor = document.getElementById(String(pointer_4)).style.backgroundColor
            break
        } catch {
            pointer_4 += 11
        }
    }

    var divisional_2 = ((pointer_3 / 11) - (pointer_4 / 11)) + 1

    if (divisional_2 >= 4) {
        if (divisional_2 % 4 === 0) {
            var range_val_2 = 1
        } else {
            var range_val_2 = divisional_2 % 4
        }
    
        for (let x = 0; x < range_val_2; x++) {
            // if () {
            //     worked_arr_str = ""
            //     worked_arr_str += String(pointer_3) + ", " + String(pointer_3 - 11) + ", " + String(pointer_3 - 22) + ", " + String(pointer_3 - 33)
            //     localStorage.setItem("winner", "true")
            //     return
            // } else {
            //     pointer_3 -= 11
            // }

            if (document.getElementById(String(pointer_3)).style.backgroundColor === document.getElementById(String(pointer_3 - 11)).style.backgroundColor) {
                // alert(1)
                if (document.getElementById(String(pointer_3 - 11)).style.backgroundColor === document.getElementById(String(pointer_3 - 22)).style.backgroundColor) {
                    // alert(2)
                    if (document.getElementById(String(pointer_3 - 22)).style.backgroundColor === document.getElementById(String(pointer_3 - 33)).style.backgroundColor) {
                        // alert(3)
                        worked_arr_str = ""
                        worked_arr_str += String(pointer_3) + ", " + String(pointer_3 - 11) + ", " + String(pointer_3 - 22) + ", " + String(pointer_3 - 33)
                        localStorage.setItem("winner", "true")
                        localStorage.setItem("worked_arr_str", worked_arr_str)
                        return
                    }
                }
            } 

            pointer_3 -= 11

        }
    }

    

    var empty = false

    for (let i = 61; i < 68; i++) {
        if (document.getElementById(String(i)).style.backgroundColor === "white") {
            empty = true
        }
    }

    if (empty === true) {
        // Change Color for next player

        if (localStorage.getItem("current_color") === localStorage.getItem("player_1_color")) {
            localStorage.setItem("current_color", localStorage.getItem("player_2_color"))
            document.getElementById("player_1_black_button").style.visibility = "hidden"
            document.getElementById("player_2_black_button").style.visibility = "visible"
        } else {
            localStorage.setItem("current_color", localStorage.getItem("player_1_color"))
            document.getElementById("player_1_black_button").style.visibility = "visible"
            document.getElementById("player_2_black_button").style.visibility = "hidden"
        }

        // Modify Active
        var to_be_active = ""
        for (let i = 0; i < active.length; i++) {
            to_be_active += active[i]
            if (i !== active.length - 1) {
                to_be_active += ", "
            }
        }

        localStorage.setItem("active", to_be_active)
    } else {
        localStorage.setItem("winner", "nobody")
    }

}

function end() {
    localStorage.setItem("prev_starter", "p2")
    localStorage.setItem("current_color", localStorage.getItem("player_2_color"))
    location.href = "con4Home.html"
}

function switch_turn() {
    location.reload()
}

// ["11", "22", "13", "14", "15", "16", "17"]
// the_id = 12
// new_id = 22

// to_be_active = "11, "

// Comment out the while loop below and save, and it will run properly




// // Comment Starts here

// // Algorithm for Horizontal match 

// var worked_arr = []

// for (let i = 10; i < 70; i+10) {
//     var worked = false
//     for (let j = 1; j < 5; j++) {
//         if (document.getElementById(String(i+j)).style.backgroundColor === document.getElementById(String(i+j+1)).style.backgroundColor === document.getElementById(String(i+j+2)).style.backgroundColor === document.getElementById(String(i+j+3)).style.backgroundColor) {
//             worked = true
//             worked_arr.push(String(i+j), String(i+j+1), String(i+j+2), String(i+j+3))
//             break
//         }
//     }

//     if (worked === true) {
//         break
//     }
// }

// if (worked_arr.length === 0) {
//     // Algorithm for Vertical match

//     var max_val = 61

//     for (let i = 0; i < 3; i++) {
//         var worked = false
//         for (let j = max_val; j < max_val + 7; j++) {
//             if (document.getElementById(String(j)).style.backgroundColor === document.getElementById(String(j-10)).style.backgroundColor === document.getElementById(String(j-20)).style.backgroundColor === document.getElementById(String(j-30)).style.backgroundColor) {
//                 worked = true
//                 worked_arr.push(String(j), String(j-10), String(j-20), String(j-30))
//                 break
//             }
//         }

//         if (worked === true) {
//             break
//         }

//         max_val -= 10
//     }



//     if (worked_arr.length === 0) {
//         // Algorithm for Diagonal match 




//     }
// }

// if (worked_arr.length === 0) {
//     // Declare No Winner
// }

// // Comment Ends Here










// var worked_arr_str = ""

// // Vertical Match
// try {
//     if (document.getElementById(new_id).style.backgroundColor === document.getElementById(new_id - 10).style.backgroundColor === document.getElementById(new_id - 20).style.backgroundColor === document.getElementById(new_id - 30).style.backgroundColor) {
//         worked_arr_str += String(new_id) + ", " + String(new_id - 10) + ", " + String(new_id - 20) + ", " + String(new_id - 30)
//         localStorage.setItem("worked_arr", worked_arr_str)
//         localStorage.setItem("winner", "true")
//         return
//     }
// } catch {
//     worked_arr = worked_arr
// }

// // Horizontal Match
// for (let x = parseInt(the_id) - 3; x < parseInt(the_id) + 1; x++) {
//     try {
//         if (document.getElementById(String(x)).style.backgroundColor === document.getElementById(String(x + 1)).style.backgroundColor === document.getElementById(String(x + 2)).style.backgroundColor === document.getElementById(String(x + 3)).style.backgroundColor) {
//             worked_arr_str += String(x) + ", " + String(x + 1) + ", " + String(x + 2) + ", " + String(x + 3)
//             localStorage.setItem("winner", "true")
//             return
//         }
//     } catch {
//         continue
//     }
// }

// // Diagonal Match 

























// while (localStorage.getItem("winner") === "false") {
//     to_be_clicked()

//     var all_buttons = document.querySelectorAll("button")
//     var it_was_clicked = false
//     // Not sure if it_was_clicked which is in a different scope than clicked() function will be modified by the clicked() function
//     // Not sure if while loop will become infinite loop, because it does not ask for a click, it simply states what to do if a click happens 
//     for (let each_button of all_buttons) {
//         each_button.onclick = clicked(each_button.id)
        
//         if (it_was_clicked === true) {
//             break
//         }
//     }

//     alert(it_was_clicked)

//     var white = false

//     if (localStorage.getItem("winner") === "true") {
//         // declare winner, with animation
//     } else {
//         if (localStorage.getItem("winner") === "nobody") {
//             return // Declare a Tie, maybe with animation
//         }
//     }

// }













// # Flatland Space Stations

// def flatlandSpaceStations(n, c):
    
//     c = sorted(c)
    
//     my_dict = {}
//     for i in range(len(c)):
//         my_dict[c[i]] = "Hi"
        
//     arr = []
//     counter_1 = 0
    
//     for i in range(n):
//         try:
//             my_dict[i]
//             counter_1 = 0
//         except KeyError:
//             counter_1 += 1
        
//         arr.append(counter_1)
        
//     counter_2 = 0
//     encountered = False
//     last_one = False
//     last_counter = 0
    
//     for i in range(n - 1, -1, -1):
//         if i == c[0]:
//             last_one = True
//             continue
        
//         if last_one == True:
//             last_counter += 1
//             arr[i] = last_counter
//             continue
        
//         try:
//             my_dict[i]
//             encountered = True
//         except:
//             if encountered == False:
//                 continue
        
//         if encountered == True:
//             try:
//                 my_dict[i]
//                 counter_2 = 0
//             except KeyError:
//                 counter_2 += 1
            
//             if counter_2 < arr[i]:
//                 arr[i] = counter_2
    
//     return max(arr)

// print(flatlandSpaceStations(5, [2]))


// [2]
// [0, 1, 2, 3, 4]











// gael.bernard@utoronto.ca




// white: 0
// red: 1
// yellow: 2

// [
//     [0, 0, 0, 0, 0, 0, 0],

//     [0, 0, 0, 0, 0, 0, 0],

//     [0, 0, 0, 0, 0, 0, 0],

//     [0, 0, 0, 0, 0, 0, 0],

//     [0, 0, 0, 0, 0, 1, 0],

//     [0, 0, 0, 0, 0, 2, 1]
// ]

function gear() {
    var all_buttons = document.querySelectorAll("button")
    
    if (document.getElementById("gear_feat").style.visibility === "hidden") {

        for (let button of all_buttons) {

            if (document.getElementById(button.id).style.backgroundColor !== button.id) {
                button.disabled = true
            }
        }
        document.getElementById("gear_feat").style.visibility = "visible"

    } else {
        document.getElementById("gear_feat").style.visibility = "hidden"

        for (let button of all_buttons) {
            button.disabled = false
        }

        return

    }

    var div_buttons = document.getElementById("gear_feat").querySelectorAll("button")

    for (let each_div_button of div_buttons) {
        each_div_button.onclick = function() {
            if (each_div_button.innerText !== "" && each_div_button.innerText !== "Apply") {
                var second_div_buttons = document.getElementById("gear_feat").querySelectorAll("button")

                for (let second_each_div_button of second_div_buttons) {

                    if (second_each_div_button.innerText === "P1") {
                        alert("hi") // For some reason, it alerts even when I click P2
                        document.getElementById("gear").disabled = true

                        // animation

                        second_each_div_button.onclick = function() {
                            second_each_div_button.innerText = each_div_button.innerText
                            each_div_button.innerText = ""
                            document.getElementById("gear").disabled = false
                        }
                        break // remove break, and it will run kind of properly, but not exactly either
                    }
                }   
            }
        }
    }

}

// function apply() {
//     
// }