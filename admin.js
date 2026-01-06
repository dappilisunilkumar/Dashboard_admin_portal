async function getData() {
  try {
    let res = await fetch("http://localhost:3000/data");
    if (!res.ok) {
      throw new Error("somthin went wrong");
    }
    let data = await res.json();
    showData(data);
  } catch (error) {
    console.log(error.message);
  }
}

function showData(data) {
  let container = document.getElementById("container");
  container.innerHTML = ""; 

  let item = document.createElement("div");
  item.innerHTML = data
  .map((student) => {
    return `
      <div class="card">
        <h3 class="sid">Id: ${student.id}</h3>
        <h3 class="sname">Name: ${student.name}</h3>

        <div class="btn-group">
          <button class="btn delete" id="delbtn${student.id}">Delete</button>
          <button class="btn edit" id="editbtn${student.id}">Edit</button>
        </div>
      </div>
    `;
  })
  .join("");

  container.append(item);

  data.forEach((student) => {
    let delbtn = document.getElementById(`delbtn${student.id}`);
    delbtn.onclick = () => {
      deleteData(student.id);
    };

    let editbtn = document.getElementById(`editbtn${student.id}`);
    editbtn.onclick = () => {
      dataEdit(student.id);
    };
  });
}

// delete process
async function deleteData(id) {
  try {
    let res = await fetch(`http://localhost:3000/data/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error("Api is not working");
    }
    alert("Delete complete successfully");
    getData();
  } catch (error) {
    console.log(error.message);
  }
}

// modify and post
async function saveData() {
  let studentId = document.getElementById("studentId").value;
  let name = document.getElementById("name").value;
  let image = document.getElementById("image").value; 

  let obj = {
    name: name,
    image: image,
  };

  let stm = studentId ? "PUT" : "POST"; 
  let url = studentId
    ? `http://localhost:3000/data/${studentId}` 
    : "http://localhost:3000/data";

  try {
    let res = await fetch(url, {
      method: stm,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj), 
    });

    if (!res.ok) {
      throw new Error("API NOT WORKING");
    }

    alert("Data added successfully");
    document.getElementById("studentId").value = "";
    document.getElementById("name").value = "";
    document.getElementById("image").value = "";
    getData(); 
  } catch (error) {
    console.log(error.message);
  }
}

// edit Data
async function dataEdit(id) {
  let studentId = document.getElementById("studentId");
  let name = document.getElementById("name");
  let image = document.getElementById("image");

  let res = await fetch(`http://localhost:3000/data/${id}`); 
  let data = await res.json();

  studentId.value = data.id;
  name.value = data.name;
  image.value = data.image;
}

getData();
