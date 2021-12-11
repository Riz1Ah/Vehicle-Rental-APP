
function handleRentalOutput(res) {

    if(res.data){
    
        var divContainer = document.getElementById("resultRent");
        divContainer.innerHTML = "Rented Succesfully";
        
    }
    else {
    
         var divContainer = document.getElementById("resultRent");
        divContainer.innerHTML = "Vehicle Not Available";
    }
}


function handleAddCust(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const formProps = Object.fromEntries(formData);
  console.log(formProps)
  
   axios.post('http://localhost:8000/addcust',{
            name : formProps.name,
            phone : formProps.phone,
            email : formProps.email,
        }
    )
    .then(res => showOutput(res))
    .catch(err => console.error(err));
    
}



function handleAddRental(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const formProps = Object.fromEntries(formData);
  console.log(formProps)
  
  axios.post('http://localhost:8000/addrental',{
            name : formProps.name,
            rent_date : formProps.rent_date,
            return_date : formProps.return_date,
            vehicle : formProps.vehicle,
            owner_id : formProps.owner_id,
        }
    )
    .then(res => handleRentalOutput(res))
    .catch(err => console.error(err));

}


const add_customer = document.getElementById("add_customer"); 
add_customer.addEventListener("submit", handleAddCust);



const add_rental = document.getElementById("add_rental"); 
add_rental.addEventListener("submit", handleAddRental);



function showOutput(res) {
    document.getElementById('res').innerHTML = `
    <div class="card card-body mb-4">
      <h5>Status: ${res.status}</h5>
    </div>
    <div class="card mt-3">
      <div class="card-header">
        Headers
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.headers, null, 2)}</pre>
      </div>
    </div>
    <div class="card mt-3">
      <div class="card-header">
        Data
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.data, null, 2)}</pre>
      </div>
    </div>
    <div class="card mt-3">
      <div class="card-header">
        Config
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.config, null, 2)}</pre>
      </div>
    </div>
  `;
  }
  
  
 
  
  function beautyShow(res) {
        
       
        res = res.data
        console.log(res);
        var col = [];
        for (var i = 0; i < res.length; i++) {
            for (var key in res[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
        }

        
        var table = document.createElement("table");

        

        var tr = table.insertRow(-1);                   // TABLE ROW.

        for (var i = 0; i < col.length; i++) {
            var th = document.createElement("th");      // TABLE HEADER.
            th.innerHTML = col[i];
            tr.appendChild(th);
        }

        
        for (var i = 0; i < res.length; i++) {

            tr = table.insertRow(-1);

            for (var j = 0; j < col.length; j++) {
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = res[i][col[j]];
            }
        }

        
        var divContainer = document.getElementById("showData");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);
    }
    
     function showCust() {
  
  axios.get('http://localhost:8000/showcustomers',{
        
        timeout : 5000
    }
        
    )
    .then(res => beautyShow(res))
    .catch(err => console.error(err));
  }
  
  function showRent() {
  
  axios.get('http://localhost:8000/showrentals',{
        
        timeout : 5000
    }
        
    )
    .then(res => beautyShow(res))
    .catch(err => console.error(err));
  }
  
  function showInv() {
  
  axios.get('http://localhost:8000/showinventory',{
        
        timeout : 5000
    }
        
    )
    .then(res => beautyShow(res))
    .catch(err => console.error(err));
  }
    //const show_customer = document.getElementById("show_customer"); 
    //show_customer.addEventListener("submit", handleAddCust);
   
   
    axios.get('http://localhost:8000/showcustomers',{
        
        timeout : 5000
    }
        
    )
    .then(res => nameFill(res))
    .catch(err => console.error(err));
    
    function nameFill(res){
    
        res = res.data
        var catOptions = "";
        for (var i=0; len=res.length, i<len; i++) {
            catOptions += "<option>" + res[i].name + "</option>";
        }
        document.getElementById("rent_name").innerHTML = catOptions;
    }