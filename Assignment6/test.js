var str = "4.5\"x8.5\"x0.5\""

var s = str.trim();

// s.replace('"','&quot;');

// s.replace('"','\\"');

// s.replace(/\"/g,'\\"');

var a = str.split("\"");
var newS=""
for(var i = 0; i<a.length; i++){
    if(a[1]!= ""){
        newS = newS + a[i];
    }
}
return newS;


console.log(newS);