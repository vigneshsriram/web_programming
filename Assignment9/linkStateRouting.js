
const readline = require('readline-sync')
const fs = require('fs');
var inputArr = []
var countofRouter = 0;
var ListOfRouters = [];
var serialCount = 0;
var arrOfid = [];


class linkStatePacket{
    constructor(id){
        this.packetInformation = {
            connectedRouters:[],
            connectedNetwork:[],
            cost:[]
        }
        this.ttl = 10;
        this.origin = id;
    }
    
}

class Router{

        constructor(routerNumber, arr){
            this.alive = true;
            this.id = routerNumber[0];
            this.networkName = routerNumber[1];

            this.serialNumber = serialCount; // used for working with adjancy matrix
            

            this.packet = [];
            this.adjGraph = [];

            this.neighbourObject = [];

            this.neighbourList = arr;

            this.routerTable = [];
            arrOfid[serialCount] = routerNumber[0];

            serialCount++;

            
        }

        checkAlive(){
            if(this.alive == false){
                return false;
            }
            else return true;
        }

        originatePacket(){
            if(this.checkAlive() == false){
                return;
            }
            console.log("originate " + this.networkName )

            this.packet.push(this.lsp());

            //console.log(this.neighbourObject)
            for(let a of this.neighbourObject){
                a.router.getPacket(this.lsp(), this.id)
            }
        }

        removePacket(){

        }

        getPacket(a, b){
            if(this.checkAlive() == false || a.ttl < 1){
                return;
            }
            console.log(b, " to " , this.networkName);
            a.ttl = a.ttl - 1;
            this.packet.push(a);

            let cost = [] , node = [] ;

         this.dijk(this.adjGraph, this.serialNumber);

            for(let neighbour of this.neighbourObject){
                if(neighbour.router.id != b){
                    neighbour.router.getPacket(a,this.id)
                }
            }

        }

        dijk(a,b){
            //console.log("running dijikstras...");
            var min = 99999;
            var minIndex = -1;
           
            let initialDistance = new Array(countofRouter);
            let visited = new Array(countofRouter)

            for(var i = 0; i< countofRouter ; i++) {
                initialDistance[i] = 99999;
                visited[i] = false
            }

            initialDistance[b] = 0;

            for(var c = 0; c < countofRouter - 1 ; c++){

                for(let p = 0; p < countofRouter; p++){
                    if(visited[p] == false && initialDistance[p] <= min){
                        min = initialDistance[p];
                        minIndex = p;
                    } 
                }
                    visited[minIndex] = true;
                

                    for(let k = 0; k < countofRouter ; k++) {
                        if(visited[k] == false && a[minIndex][k]  && initialDistance[minIndex] != 99999 && initialDistance[minIndex] + a[minIndex][k] < initialDistance[k]){
                            initialDistance[k] = initialDistance[minIndex]+a[minIndex][k]
                        }
                    }

            }

           // console.log("vertex\t " + " dist" )
            for(var kd = 0 ; kd < countofRouter; kd++) {
               // console.log(kd +"\t" + initialDistance[kd])
            }

            //return []
            
           // console.log("shortest path found")
        }

        lsp(){
            var packetInfo = new linkStatePacket(this.id);


            for(let neighbour of this.neighbourObject){
                let router = neighbour.router;
                let networkName = neighbour.router.networkName;
                let serialNumber = neighbour.router.serialNumber;
                packetInfo.packetInformation.connectedRouters.push(router);
                packetInfo.packetInformation.connectedNetwork.push(networkName);

                packetInfo.packetInformation.cost.push(this.adjGraph[this.serialNumber][serialNumber])

            }
            return packetInfo;
        }

        createGraph(){
            //console.log(this.id)
            //console.log("this is in createGraph")
           // console.log(countofRouter)
            let AdjMatrix = new Array(countofRouter);

            for(var i = 0; i< countofRouter ; i++){
                AdjMatrix[i] = new Array(countofRouter).fill(99999);
            }

            //console.log(AdjMatrix)
            //return;

            // for( var i = 0; i < countofRouter; i++){
            //     AdjMatrix[i] = [countofRouter].fill(999);
            // }
            
            //   for( var i = 0; i < countofRouter; i++){
            //       for(var j = 0; j < countofRouter; j++){
            //           AdjMatrix[i][j] = 99999;
            //       }
                
            //   }

            //console.log(AdjMatrix)
            
            AdjMatrix[this.serialNumber][this.serialNumber] = 0;

            for( let neighbour of this.neighbourList){
                //filling the cost for each node
                let cost = parseInt(neighbour[1]);
                let neighbouringRouter = parseInt(neighbour[0])
                AdjMatrix[this.serialNumber][neighbouringRouter] = cost;
                AdjMatrix[neighbouringRouter][this.serialNumber] = cost;
                
            }
            this.adjGraph = AdjMatrix;
            //console.log(this.adjGraph)
        }

        createNeighbours(){
            //console.log("this is in crreateNeighbour")
            this.tick = new Array(countofRouter).fill(10);
           // console.log(this.tick)

            for(let neighbour of this.neighbourList){
                var directlyConnected =arrOfid[neighbour[0]] 
                this.tick[directlyConnected] = 0
                var costToReach = this.adjGraph[parseInt(this.serialNumber)][parseInt(neighbour[0])];
                var obj = new Object();
                obj.router = ListOfRouters[directlyConnected];
                obj.cost = costToReach;
                this.neighbourObject.push(obj);
            }
            this.createRouterTable();

            
        }

        createRouterTable(){
            //check for connection
            for(var i = 0; i < countofRouter; i++){
                var adjValue = this.adjGraph[this.serialNumber][i];
            
                if(adjValue != 99999 && adjValue != 0){

                    var tempTable = [ListOfRouters[i].networkName,adjValue,ListOfRouters[i].id]
                    this.routerTable.push(tempTable);
                }
            }

         //console.log(this.routerTable);

        }
}




function printRoutingTable(routerNum){
    //console.log("test");
}

function startRouter(routerNum){

}

function stopRouter(routerNum){

}

function continueRouting(){
    for(let router of ListOfRouters){
        router.originatePacket();
    }
}



function readFile(fileName){
    let filename = fs.readFileSync(fileName,'UTF-8');
    inputArr = filename.split(/\r\n/);
    

    for(var i = 0; i<inputArr.length; i++){
        var firstChar = inputArr[i].charAt(0);

        if(firstChar != ' '){
            var routerNumber = inputArr[i].split(' ');
            //0 > index
            //1 > network
            countofRouter = countofRouter + 1;
            i++;
            let arr = [];
            //var firstCharofRnumber = inputArr[i].charAt(0);
            while((inputArr.length > i) && (inputArr[i].charAt(0) == ' ')){
                inputArr[i] = inputArr[i].trim();
                var neighbour = inputArr[i].split(' ');

                if(neighbour.length == 1){
                    neighbour.push('1');
                }
                arr.push(neighbour);
                i++;
            }

            i--;
            var allNeighbour = [];
            allNeighbour.push(arr)
            var a = new Router(routerNumber, arr)
            ListOfRouters.push(a)
            //console.log(arr)
        }
        
    }

   
    for( j of ListOfRouters){
        j.createGraph();
        j.createNeighbours();
    }
    
}



function main(){
    var fileName = "C:\\_Study\\CS570\\FridayLab\\LinkState\\src\\infile.dat"
    readFile(fileName);

    while(true) {
        console.log("Enter C to continue");
        console.log("Enter Q to quit");
        console.log("To print routing table, enter P <space> router number");
        console.log("To shut a router, enter S <space> router number");
        console.log("To start a router, enter T <space> router number");

        
        var input = readline.question("Enter choice : ");
        var choice = input.split(' ');

        if(choice.length == 1) {
            if(choice[0] == "c" || choice[0] == "C" ){
                continueRouting();
            }

            else if(choice[0] == "q" || choice[0] == "Q" ){
                console.log("terminating program....")
                return;
                
            }

            else{
                console.log ("invalid input");
            }
        }
         
        
        else if(choice.length == 2) {
            if(choice[0] == "p" || choice[0] == "P" ){
                printRoutingTable(choice[1]);
            }

            else if(choice[0] == "s" || choice[0] == "S" ){
                stopRouter(choice[1])
            }

            else if(choice[0] == "t" || choice[0] == "T" ){
                startRouter(choice[1])
            }
            else{
                console.log ("invalid input");
            }
        }

        else{
            console.log("invalid input")
        }
}
}




main();
