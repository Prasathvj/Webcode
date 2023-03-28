var search=document.createElement("div");
search.style.textAlign="center"

var label=document.createElement("label");
label.setAttribute("for","searchInput")

var input=document.createElement("input");
input.setAttribute("type","text");
input.setAttribute("id","searchInput");

var button=document.createElement("button");
button.style.marginLeft="10px"
button.setAttribute("type","button");
button.setAttribute("id","searchButton")
button.classList.add("btn","btn-warning");
button.innerHTML="Search";
button.addEventListener("click",getBreweries)

var list=document.createElement("ul");
list.setAttribute("id","breweryList");

var container=document.createElement("div");
container.className="container";
var row =document.createElement("div");
row.className="row"
container.append(row);




search.append(label,input,button);
document.body.append(search,list);


async function getBreweries(searchTerm) {
    try {
      const response = await fetch(`https://api.openbrewerydb.org/breweries?by_name=${searchTerm}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  
  const searchInput = document.querySelector('#searchInput');
  const searchButton = document.querySelector('#searchButton');
  const breweryList = document.querySelector('#breweryList');
  
  searchButton.addEventListener('click', async () => {
    const searchTerm = searchInput.value;
    const breweries = await getBreweries(searchTerm);
    breweryList.innerHTML = '';
    breweries.forEach((brewery) => {
      const breweryItem = document.createElement('li');
      breweryItem.innerHTML = `
        <p> <strong>Name : ${brewery.name}</strong></p>
        <p><strong>Type :</strong> ${brewery.brewery_type}</p>
        <p><strong>Address :</strong> ${brewery.street}, ${brewery.city}, ${brewery.state} ${brewery.postal_code}</p>
        <p><strong>Website :</strong> <a href="${brewery.website_url}">${brewery.website_url}</a></p>
        <p><strong>Phone :</strong> ${brewery.phone}</p> <br><br>
      `;
      breweryList.appendChild(breweryItem);
    });
  });
  