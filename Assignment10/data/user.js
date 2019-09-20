// const bcrypt = require("bcrypt");
const bcrypt = require("bcrypt")

var users = [
    {
        "username":"masterdetective123",
        "FirstName":"Sherlock",
        "LastName":"Holmes",
        "Profession":"Detective",
        "Bio":'Sherlock Holmes (/ˈʃɜːrlɒk ˈhoʊmz/) is a fictional private detective created by British author Sir Arthur Conan Doyle. Known as a "consulting detective" in the stories, Holmes is known for a proficiency with observation, forensic science, and logical reasoning that borders on the fantastic, which he employs when investigating cases for a wide variety of clients, including Scotland Yard.',
        "Password": "$2a$16$7JKSiEmoP3GNDSalogqgPu0sUbwder7CAN/5wnvCWe6xCKAKwlTD."
        
    },
    {
        "username":"lemon",
        "FirstName":"Elizabeth",
        "LastName":"Lemon",
        "Profession":"Writer",
        "Bio":'Elizabeth Miervaldis "Liz" Lemon is the main character of the American television series 30 Rock. She created and writes for the fictional comedy-sketch show The Girlie Show or TGS with Tracy Jordan.',
        "Password": "$2a$16$SsR2TGPD24nfBpyRlBzINeGU61AH0Yo/CbgfOlU1ajpjnPuiQaiDm"
    },
    {
        "username":"theboywholived",
        "FirstName":"Harry",
        "LastName":"Potter",
        "Profession":"Student",
        "Bio":"Harry Potter is a series of fantasy novels written by British author J. K. Rowling. The novels chronicle the life of a young wizard, Harry Potter, and his friends Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and Wizardry . The main story arc concerns Harry's struggle against Lord Voldemort, a dark wizard who intends to become immortal, overthrow the wizard governing body known as the Ministry of Magic, and subjugate all wizards and Muggles.",
        "Password": "$2a$16$4o0WWtrq.ZefEmEbijNCGukCezqWTqz1VWlPm/xnaLM8d3WlS5pnK"
    }
];


async function checkLogin(username , password) {
    for(var i = 0; i < users.length ; i++){
        var element = users[i];
        if(element.username == username){
            try{
                var checker = await bcrypt.compare(password, element.Password);
            }
            catch(e){
                console.log("Cannot hash")
                return "cannot hash"
            }
            
            if(checker){
                return element;
            }
           
            
        }
    }
    return false;
}

module.exports = {checkLogin};