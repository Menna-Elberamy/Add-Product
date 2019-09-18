var productNameInp = document.getElementById("ProductName");
var productPriceInp = document.getElementById("ProductPrice");
var productCompanyInp = document.getElementById("ProductCompany");
var productDescInp = document.getElementById("ProductDesc");
var btnInp = document.getElementById("btnInp");
var searchInp = document.getElementById("searchInp");
// var imageSrc=document.getElementById("imageFile1");
var currentIndex=0;
// addImage();
var priceRegex=/^[0-9]+$/;
var productRegex=/^[a-z]+$/;
var productContainer;
if(localStorage.getItem("productContainer") == null)
{
    productContainer= [];
}
else{
    productContainer = JSON.parse(localStorage.getItem("productContainer"));
     displayProducts();
}

searchInp.onkeyup = function(){
    searchproduct(searchInp.value)
}
btnInp.onclick = function ()
{       
    if(productNameInp.value.length==0 && productPriceInp.value.length==0){
        document.getElementById("showName").style.display="block";
        document.getElementById("showPrice").style.display="block";
    }
    else if(productNameInp.value.length==0  || productPriceInp.value.length==0)
    {
        if(productNameInp.value.length==0)
        {
        document.getElementById("showName").style.display="block";
        document.getElementById("showPrice").style.display="none";
        }
        else if(productPriceInp.value.length==0)
        {
            document.getElementById("showPrice").style.display="block";
            document.getElementById("showName").style.display="none";
        }
    }

    else if(productRegex.test(productNameInp.value)==false)
        {
            document.getElementById("nameErorr").style.display="block";
            document.getElementById("showName").style.display="none";
            document.getElementById("priceErorr").style.display="none";


        }
    else if(priceRegex.test(productPriceInp.value)==false)
        {
            document.getElementById("priceErorr").style.display="block";
            document.getElementById("nameErorr").style.display="none";
            document.getElementById("showPrice").style.display="none";
        }

    else
    {               
            document.getElementById("showPrice").style.display="none";
            document.getElementById("showName").style.display="none";
            document.getElementById("nameErorr").style.display="none";
            document.getElementById("priceErorr").style.display="none";


        if(btnInp.innerHTML=="AddProduct")
        {
        
            addProducts();
            displayProducts();
            clearProduct();

        }
        else
        {
            update();
            displayProducts();

            
        }

    }
  }  

// function addImage(){
//         $('#i_file').change( function(event) {
//         var tmppath = URL.createObjectURL(event.target.files[0]);
//         var x= $("#imgCon").fadeIn("fast").attr('src',URL.createObjectURL(event.target.files[0]));
//         console.log(tmppath)
//             });}
    
function addProducts(){
    var product={
        name:productNameInp.value,
        price:productPriceInp.value,
        company:productCompanyInp.value,
        desc:productDescInp.value,
        // image:function(){
        //         $('#i_file').change( function(event) 
        //          {var tmppath = URL.createObjectURL(event.target.files[0]); } )
        //         }   
        // ,

    };
   
        productContainer.push(product);
        localStorage.setItem("productContainer",JSON.stringify(productContainer));

}
function displayProducts(){
    var rows="";
    for(var i=0; i<productContainer.length; i++){
        rows+=` <div class="col-lg-3 text-center">
                    <img src="images/Surface-Go.png" class="img-fluid"/>
                    <h1 class="text-dark">`+productContainer[i].name+`</h1>
                    <p class="text-danger">`+productContainer[i].price+`</p>
                    <p class="text-info">`+productContainer[i].company+`</p>
                    <p class="text-muted">`+productContainer[i].desc    +`</p>
                    <button class="btn btn-danger" onclick="deleteProduct(`+i+`)">Delete</button>
                    <button class="btn btn-warning ml-2 text-white" onclick="updateProduct(`+i+`)">Update</button>
                </div>`
    }
    document.getElementById("rows").innerHTML=rows;
    
}
function clearProduct(){
  productNameInp.value="";
  productPriceInp.value="";
  productCompanyInp.value="";
  productDescInp.value="";
}
function deleteProduct(item){
    productContainer.splice(item,1)
    localStorage.setItem("productContainer",JSON.stringify(productContainer));
    displayProducts();
}
function searchproduct(searchName){
    var searchCols="";
    if(searchInp.value.length==0)
    {
        searchCols="";
        searchInp.classList.remove("border-danger");
        searchInp.classList.remove("border-success");
    }
   else{
        for(var i=0; i<productContainer.length; i++)
        {
            if(productContainer[i].name.includes(searchName))
            {
                searchInp.classList.add("border-success");
                searchCols+=`<div class="col-lg-3 text-center mt-5">
                        <img src="images/team-bw-1.jpg" class="img-fluid">
                        <h1 class="text-dark">`+productContainer[i].name+`</h1>
                        <p class="text-danger">`+productContainer[i].price+`</p>
                        <p class="text-info">`+productContainer[i].company+`</p>
                        <p class="text-muted">`+productContainer[i].desc    +`</p>
                    </div>`
            }
            else{
                searchInp.classList.toggle("border-danger");
            }
        }
     }
    document.getElementById("searchRows").innerHTML=searchCols;
}
function updateProduct(updateItem){
    productNameInp.value=productContainer[updateItem].name;
    productPriceInp.value=productContainer[updateItem].price;
    productCompanyInp.value=productContainer[updateItem].company;
    productDescInp.value=productContainer[updateItem].desc;
    btnInp.innerHTML="Update product"
    currentIndex=updateItem;
}
function update(){
    productContainer[currentIndex].name=productNameInp.value;
    productContainer[currentIndex].price=productPriceInp.value;
    productContainer[currentIndex].company=productCompanyInp.value;
    productContainer[currentIndex].desc=productDescInp.value;
    btnInp.innerHTML="AddProduct";
    localStorage.setItem("productContainer",JSON.stringify(productContainer));




    
}