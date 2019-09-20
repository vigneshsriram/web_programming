let exportedMethods = {
    isPalindrome(str) {
        if(arguments.length != 1){
            return "multiple"
        }
        str = str.replace(/\s\s+/g, "")
                if (typeof str !== "string" || str == null || str == undefined || str.length == 0){
                    
                }

                else{
                    //trim
                     str = str.toLowerCase().replace(/ /g,"").replace(/\n/g,"").replace(/[^a-zA-Z0-9\ ]/g,"").replace(/\s\s+/g, "").trim(); 
                     //alert(str.length)
                     if(str.length == 0) {
                         return "blank"
                     }   

                     var last = str.length - 1;
                     for (let i = 0; i < str.length; i++){
                        if (str[i] != str[last])
                            return false;
                        last--;
                     }
                    return true;
                }

    }
}

module.exports = exportedMethods;