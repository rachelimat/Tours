var i = 0;

// get and show all tours

//---------------------------------------------------------------
//             site validation!!!
//---------------------------------------------------------------

function siteValidation() {
    
  $("form[name='site_form']").validate({
        rules: {
          
          id_: {
                required: true,
                space: true,
                
            },
            sitename: {
                required: true,
                // site_exist: true,
                space: true,
            },
            index:{
                required: true,
                digits: true,
                
            },
            country:{
                required: true,
                letters: true,
                space: true,
            },

        },
        // Specify validation error messages
        messages: {
            //site_exist: "Please not  enter space!!"
            "index": {
                digits: "enter an integer positive number ",
                space: "enter country without space",
              },
              "sitename": {
                // site_exist: "this site already exist",
                space: "enter name of site without space",
              },
              "country": {
                letters: "enter correct country",
                space: "enter country without space",
              //  minlength: "enter correct country",
              }
        
        }
    });
}

//--------------------------------------------------------
// get all the fileds values (site details)
//--------------------------------------------------------
function getSiteVariables() {

   var deatils=[ 
        $("#id_Tour").val(),
        $("#id_Site").val(),
        $("#index").val(),
    ]
    return deatils;
}



function addSite() {

    var modal = document.getElementById("myModal2");
    var span = document.getElementsByClassName("close2")[0];

    // open the modal
    span.onclick = function() {
        modal.style.display = "none";
    }
    modal.style.display = "block";
    // client-side form validation of the inputes
    siteValidation();

     $("#site_form").submit(function(event) {
        var details = getSiteVariables();
        addSiteCall(details) // ajax request --> add site to tour

        // if (!$("#site_form").valid()) return;
        // get the variables from the form fileds
        modal.style.display = "none";
        event.preventDefault();
    });
  
}

function back(){
  location.href = "/";
}

$.validator.addMethod("site_exist", function (value, element) {//check if no trip name exist
    get_tours2();
    var i;
    var len = tripList[id_].sites.length ; 
    for (i = 0; i < len; i++) {
      if (tripList[id_].sites[i].name == value) {return false;}
    }
    return true;
  });

  $.validator.addMethod("space", function (value, element) {//check if space not exist in the input
    if (value.indexOf(' ') >= 0) {return false; }
    else { return true;}
  });

  jQuery.validator.addMethod("letters", function (value, element) {//  check if letter only
    return this.optional(element) || /^[a-z]+$/i.test(value);
  }, "Letters only please");
  

  //--------------------------------------------------------
// send GET request to get the tours list (sorted)
//--------------------------------------------------------


function addSiteCall(siteDeatilsArray){
    $.ajax({
        type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
        url: 'aS/', // the url where we want to POST
        contentType: 'application/json',
        data: JSON.stringify({
            "tour_id": siteDeatilsArray[0],
            "site_id": siteDeatilsArray[1],
            "index":siteDeatilsArray[2]
        }),
        
        processData: false,
        encode: true,
        success: function (resul) {
        console.log("yes");
        $.ajax({
          type: 'GET',
          url: '/tours/'+siteDeatilsArray[0],
          contentType: 'application/json',

          success: function(data) {
            if( i!= 0)
              document.getElementById("sites").innerHTML=" ";

            let str=''
            str=document.getElementById("sites").innerHTML;
            str+="<table><tr><th>Name</th><th>Country</th><th></th></tr>"
            ////////////////////////////////////////////////////////////////////איך לשמור 
            siteObj=data.site
            if(siteObj){
              for(var i=0;i<siteObj.length;i++) {
                    
                  str+="<tr>"
                  str += "<td>"+siteObj[i]+"</td>";
                  str += "<td>"+siteObj[i]+"</td>";           
                  str+="</tr>"
    
              }}
              str+="</table>"
              document.getElementById("sites").innerHTML=str;
              i++;
      
          },
          error: function (jqXhr, textStatus, errorThrown) {
              alert(data);
          }
      });
        
        },
        error: function (jqXhr, textStatus, errorThrown) {
          console.log(errorThrown);
        }
      })
}

