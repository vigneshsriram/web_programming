(function()
{
    let palindrome =
        {
            isPalindrome: function(str)
            {
                str = str.replace(/\s\s+/g, "")
                if (typeof str !== "string" || str == null || str == undefined || str.length == 0){
                    throw "Enter proper input";
                }
               
                else{
                    //trim
                     str = str.toLowerCase().replace(/ /g,"").replace(/\n/g,"").replace(/[^a-zA-Z0-9\ ]/g,"").replace(/\s\s+/g, "").trim(); 
                     //alert(str)
                     var last = str.length - 1;
                     for (let i = 0; i < str.length; i++){
                        if (str[i] != str[last])
                            return false;
                        last--;
                     }
                    return true;
                }
            }
        };
    var errorContainer = document.getElementById("error-container");
    var errorTextElement = errorContainer.getElementsByClassName("text-goes-here")[0];
    var resultContainer = document.getElementById("result-container");
    var resultTextElement = resultContainer.getElementsByClassName("text-goes-here")[0];
    var static=document.getElementById('form_static');
    var	list=document.getElementById('p_checker');
    
    // We can take advantage of functional scoping; our event listener has access to its outer functional scope
    // This means that these variables are accessible in our callback
    
    static.addEventListener('submit', function(event)
    {
        event.preventDefault();
        try{
            //hide the error containers
            errorContainer.classList.add("hidden");
            resultContainer.classList.add("hidden");
            var isPalindrome=palindrome['isPalindrome'];

            var text = document.getElementById("palindrome").value;

            if(text.trim().length === 0)
            {
                document.getElementById("error-container").style.display = "block";
                throw "This is an invalid string";
            }
            else {
                document.getElementById("error-container").style.display = "none";
            }
            var li = document.createElement("li");
            
            var result = isPalindrome(text);
            //alert("oustidee")
            if(result == true){
                //alert(result)
                li.appendChild(document.createTextNode(text + " is a palindrome******************"));
                list.appendChild(li);
                //li.classList.add(text , " is-palindrome");
            }
            else{
                //li.classList.add('not-palindrome')
                li.appendChild(document.createTextNode(text + " is not a palindrome"));
                list.appendChild(li);
            }
            
            // li.appendChild(document.createTextNode(text));
            // list.appendChild(li);
            resultContainer.classList.remove("hidden");
        }
        catch(e){
            var message = typeof e === "string" ? e : e.message;
            errorTextElement.textContent = e;
            errorContainer.classList.remove("hidden");
        }
    });
})();