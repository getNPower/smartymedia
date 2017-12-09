var field_row = document.getElementById("field_row");
var btn_apply = document.getElementById("btn_apply");
var btn_clear = document.getElementById("btn_clear");
var btn_add = document.getElementById("btn_add");
var result_request = document.getElementById("result_request");
var error_flag;


function addFormRow (){
    var form = document.createElement("FORM");
    form.className += " form-inline";
    var select1 = document.createElement("SELECT");
    select1.className += " form-control";
    var option1 = new Option;
    option1.text = "Field";
    option1.value = "";
    option1.selected = "selected"; option1.disabled = "disabled"; option1.hidden = "hidden";
    var option2 = new Option;
    option2.text = "size";
    option2.value = "size";
    var option3 = new Option;
    option3.text = "forks";
    option3.value = "forks";
    var option4 = new Option;
    option4.text = "stars";
    option4.value = "stars";
    var option5 = new Option;
    option5.text = "followers";
    option5.value = "followers";
    select1.appendChild(option1);
    select1.appendChild(option2);
    select1.appendChild(option3);
    select1.appendChild(option4);
    select1.appendChild(option5);

    var select2 = document.createElement("SELECT");
    select2.className += " form-control";
    var option6 = new Option;
    option6.text = "Operator";
    option6.value = "";
    option6.selected = "selected"; option6.disabled = "disabled"; option6.hidden = "hidden";
    var option7 = new Option;
    option7.text = "=";
    option7.value = "=";
    var option8 = new Option;
    option8.text = "<";
    option8.value = "<";
    var option9 = new Option;
    option9.text = ">";
    option9.value = ">";
    select2.appendChild(option6);
    select2.appendChild(option7);
    select2.appendChild(option8);
    select2.appendChild(option9);

    var input = document.createElement("INPUT");
    input.type = "number"; input.placeholder = "Value..."; input.className += "form-control"; input.name = "Value";

    var button = document.createElement("BUTTON");
    button.type = "button"; button.className += "btn btn-danger"; button.innerHTML = "Delete";
    button.addEventListener("click", deleteFormRow);


    form.appendChild(select1);
    form.appendChild(select2);
    form.appendChild(input);
    form.appendChild(button);

    field_row.appendChild(form);

}

function clearForms() {
    while (field_row.firstChild) {
        field_row.removeChild(field_row.firstChild);
    }
    addFormRow();
}

function deleteFormRow(event) {

    if (event.target.classList.value.includes("btn-danger")){
        field_row.removeChild(event.target.parentNode);
    }

}

function applyRequest() {
    document.getElementById("error").classList.add("hide_text");
    error_flag = false;
    var data = [];

    var count = field_row.childElementCount+1;

    var fields = field_row.childNodes;
    for (var i = 1; i < count; i++){
        data[i-1] = fields[i].getElementsByClassName('form-control');
    }
    var value = [];
    for (var j =0; j<data.length; j++){
        if ((data[j][0].value != "") && (data[j][1].value != "") && ( data[j][2].value != "")){
        value[j] = data[j][0].value + ":" + data[j][1].value  + data[j][2].value;
        } else {document.getElementById("error").classList.remove("hide_text"); error_flag=true;}
    }

    if (error_flag == false){

        var sendedForm = {
            data : JSON.stringify(value)

        };
        //console.log(sendedForm);


        $.post("http://localhost/smartymedia/request.php", sendedForm, function(result){
            //Check the result set from email.php file.
            if(result == 'Failure'){
                result_request.innerText ="An error has occurred";


            }else{
                //console.log(result);

                result_request.innerHTML = result;
                console.log(typeof (result));

            }
        });
    }
}

addFormRow();
btn_add.addEventListener("click", addFormRow);
btn_clear.addEventListener("click", clearForms);
btn_apply.addEventListener("click", applyRequest);
