async function userData() {
  let res = await fetch("http://localhost:3000/data");
  try {
    if (!res.ok) {
      throw new Error("Something went wrong");
    }
    let data = await res.json();
    showData(data);
  } catch (error) {
    console.log(error.message);
  }
}

function showData(data) {
  let container = document.getElementById("container");
  data.forEach((obj) => {
    let items = document.createElement("div");
    items.innerHTML = `
       

<div class="container">
  <div class="card">
    <h3 class="name">${obj.name}</h3>
    <img class="profile-img" src="${obj.image}">
  </div>
</div>



        
        
        `;
    container.append(items);
  });
}

userData();
