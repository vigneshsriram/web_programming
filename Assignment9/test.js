const readline = require('readline-sync');
const fs = require('fs');
let allrouters = [];
let idnumber = 0;
let routerCount = 0;
let mapping = new Map();
let s = '';
class lsp{
	constructor(id){
		this.info = { routers:[],
						networks:[],
							costs:[] 
						};
		this.ttl = 10;
		this.seq = 1;
		this.origin = id;
	}
}

class router{
	constructor(routerInfo,neighbourInfo){
		this.active = true;
		this.id = routerInfo.shift();
		this.workId = idnumber;
		idnumber++;
		this.network = routerInfo.shift();
		this.packets = [];
		//using an Adjacency Matrix
		this.graph = [];
		//array containing router objects of neighbours
		this.neighbourRouters = [];
		this.neighbours = neighbourInfo;
		this.routerTable = [];
		mapping.set(this.id.toString(),this.workId);
		//console.log(this.id,this.workid,this.neighbours);
	}
	createGraph(){
		let V = routerCount;
		let G = new Array(V);
		for(let i=0;i<routerCount;i++){
			G[i] = new Array(V).fill(Infinity);
		}
		G[this.workId][this.workId] = 0;
		//console.log(G);
		for(let n of this.neighbours){
				G[Number(this.workId)][Number(mapping.get(n[0]))] = Number(n[1]);
				G[Number(mapping.get(n[0]))][Number(this.workId)] = Number(n[1]);
		}
		this.graph = G;
		//console.log(this.graph);
	}
	addNeighbours(){
		this.tick = new Array(routerCount).fill(100);
		for(let n of this.neighbours){
			this.tick[mapping.get(n[0])] = 0;
			this.neighbourRouters.push(
				{
					router: allrouters[mapping.get(n[0])], 
					cost: this.graph[Number(this.workId)][Number(n[0])]
				});
				
			}	
		//console.log(this.neighbourRouters);
		this.createRouterTable();	
		}

	createRouterTable(){
		for(let i=0;i<routerCount;i++){
			let temp = this.graph[this.workId][i];
			if(temp!=Infinity){
				if(temp == 0)
					continue;
				this.routerTable.push([allrouters[i].network, allrouters[i].id, temp]);
			}
		}
	}

	receivePacket(packet,origin){
		let cost = [], parent = [];
		if(!this.active)
			return;
		//if(packet.origin==this.id)
			//return;
		if(packet.ttl<1 || !this.isValid(packet,packet.origin)){
				//discard packet
				return;
		}
		console.log("packet from ",origin," received by ", this.network);
		packet.ttl--;
		//compare information, update graph
		this.packets.push(packet);
		this.compare(packet,origin);
		[cost, parent] = this.runDijkstra(this.graph,this.workId);
		this.updateRouterTable(cost, parent);
		for(let n of this.neighbourRouters){
			if(n['router'].id!=origin){
				n['router'].receivePacket(packet,this.id);
			}
		}
	}

	updateRouterTable(cost, parent){
		//this.routerTable = [];

		// for(let i=0;i<routerCount;i++){
		// 	if(this.routerTable[i] && this.routerTable[i][2]>=cost[i]){
		// 		this.routerTable[i][1] = parent[i];
		// 		this.routerTable[i][2] = cost[i];
		// 	}
		// 	else{
		// 		this.routerTable.push([allrouters[i].network,parent[i],cost[i]]);
		// 	}			
		// 	console.log(this.routerTable);
		// }
	}

	compare(pck,origin){
		//console.log(pck.info);
		for(let i=0;i<pck.info.routers.length;i++){
			let p = mapping.get(pck.origin);
			this.graph[p][pck.info.routers[i].workId] = pck.info.costs[i];
			this.graph[pck.info.routers[i].workId][p] = pck.info.costs[i];
		}
		//console.log(this.graph);
	}

	isValid(packet,src){
		let temp = this.packets.filter(val=>val.origin==packet.origin);
		for(let i of temp){
			if(i.seq>=packet.seq){
				return false;
			}
		}
		return true;
	}
	

	runDijkstra(graph,src){
		let dist = new Array(routerCount).fill(Infinity);
		let sptSet = new Array(routerCount).fill(false);
		let parent = new Array(routerCount).fill(-1);
		let prev = [];
		let path = {};
		dist[src]=0;
		//console.log(graph);
		for(let i=0;i<routerCount;i++){
			path[i] = [];
		}
		for(let count=0;count<routerCount;count++){
			let u = this.minimumdist(dist,sptSet);
			sptSet[u] = true;
			for(let v = 0;v<routerCount;v++){
				if(!sptSet[v] && graph[u][v] && dist[u]!=Infinity && dist[u] + graph[u][v]<dist[v]){
					parent[v] = u;
					dist[v] = dist[u] + graph[u][v];
				}
			}
		}
		//console.log(dist,parent);
		for (let v=0;v<routerCount;v++) 
		{
			let u = v;
			
			while (parent[u] != -1) {
				path[v].unshift(Number(u));
				u = parent[u];
			}
		}
		for(let i in path){
			let temp = path[i].shift();
			prev.push(temp);
        }
        console.log("this is dijk")
        console.log(dist,prev);
        console.log("this is dijk")
		return [dist, prev];	
	}
	
	minimumdist(dist,sptSet){
		let min = Infinity;
		let minindex = 0;
		for(let i=0;i<routerCount;i++){
			if(sptSet[i]==false && dist[i] <= min)
				{
					min = dist[i];
					minindex = i;
				}
		}
		return minindex;
	}

	
	//So initially every router calls originatePacket which calls receivePacket
	//on all the neighbouring routers which again originate packets on the rest
	//of the routers until all the routers have received the packet 
	originatePacket(){
		if(!this.active)
			return;
		console.log("packet originated by ",this.network);
		this.checktick();
		let newlsp = this.generateLsp();
		this.packets.push(newlsp);
		for(let n of this.neighbourRouters){
			n['router'].receivePacket(newlsp,this.id);
		}
	}
	generateLsp(){
		let pck = new lsp(this.id);
		for(let n of this.neighbourRouters){
			pck.info.routers.push(n.router);
			pck.info.networks.push(n.router.network);
			pck.info.costs.push(this.graph[this.workId][n.router.workId]);
		}
		return pck;
	}
	checktick(){
		for(let t in this.tick){
			this.tick[t]++;
			if(this.tick[t]==2){
				this.tick[t] = 0;
				this.graph[this.workId][t] = Infinity;
			}
		}
	}

	printTable(){
		console.log("	NETWORK", "OUTGOING LINK", "COST");
		for(let row of this.routerTable){
			console.log(row[0],row[1],row[2]);
		}
	}

	shutdown(){
		this.active=false;
		console.log("router ", this.network," shutdown");
	}
	startRouter(){
		this.active = true;
		console.log("router ", this.network, " started");
	}
}
	

function readfile(){
	let input = fs.readFileSync('C:\\_Study\\CS570\\FridayLab\\LinkState\\src\\infile.dat','UTF-8');
    str = input.split(/\n|\r\n/);
    //str has each line
    //console.log(str)
	for(let i=0;i<str.length;i++){
        let temp=str[i].match(/\S+\s\S+/g);
        
		//console.log(temp);
		if(temp){
            let rout= temp.toString();
            //console.log(rout)
			rout = rout.split(" ");
			//console.log(rout);
			routerCount++;
			let array = [];
			i++;
			while(str[i] && str[i].match(/^\s+\S+[\s]+\S+|^\s+\S+/g)){
				//console.log("finding neighbours");
				temp = str[i].match(/^\s+\S+[\s]+\d*|^\s+\S+/g);
				temp = temp.toString();
				temp = temp.split(/\s/);
				temp = temp.filter(e => e!='');
				if(temp.length==1)
					temp.push('1');
                array.push(temp);
                console.log(array)
				i++;
			}
			i--;
			//console.log(array);
			let bigarray = [];
			bigarray.push(array);
			let tempRouter = new router(rout, array);
            allrouters.push(tempRouter);
            console.log("***************************************")
            console.log("***************************************")
            console.log("***************************************")
            console.log("***************************************")
            console.log(allrouters)
		}
	}
	for(let j=0;j<allrouters.length;j++){
		allrouters[j].createGraph();
		allrouters[j].addNeighbours();
	}
}

function main(){
	readfile();
	console.log("[*]File infile.dat has been read and routers have been initialized");
	while(true){
		 console.log("If you want to continue Enter: C");
		 console.log("If you want to quit Enter: Q");
		 console.log("If you want to print the routing table of a router, example for router 1 Enter: P 1");
		 console.log("If you want to shut down a router,example for router 1 Enter: S 1");
		 console.log("If you want to start up a router,example for router 1 Enter: T 1");
 
         //svar p=readline.question('Enter: ');
         var p="C"
         var p=p.toUpperCase().split(' ');
         
 
		 if(p.length==1)
			 {
				 if(p[0] =="C"){
					 continuefxn();
				 }
					 
				 
				 else if(p[0]=="Q")
					 break;
				 
				 else
					 console.log("please input the right format!\n");
			 }
 
		 else if (p.length==2){
			 
			if(p[0]=="P"){
					printRouterTable(p[1]);  
				 }
 
			 else if (p[0] == "S") {
				 	shutdownRouter(p[1]);                                    //To stop the router
				 }
 
			 else if (p[0] == "T") {
				 	start(p[0]);                                  //To start the router
				 }
				 
			 else
				 console.log("please input the right format!\n");    
		 }
			 
	 else
	 {
		 console.log("Please Input the right format!\n")
	 }
 }
 }

 function continuefxn(){
	 for(let r of allrouters){
		 r.originatePacket();
	 }
	 console.log("[*]Originate Packet called on all routers");
 }
 function printRouterTable(id){
	 allrouters[mapping.get(id)].printTable();
 }

 function shutdownRouter(id){
	 allrouters[mapping.get(id)].shutdown();
 }
 function start(id){
	 allrouters[mapping.get(id)].startRouter();
 }
main();