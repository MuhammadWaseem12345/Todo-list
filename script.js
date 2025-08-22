
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
  import { getFirestore,collection, addDoc,getDocs,deleteDoc, updateDoc, deleteField,doc   } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


  const firebaseConfig = {
    apiKey: "AIzaSyD1Kx4VmAQ1gV-WD8BpD7fo3HuxpQkcvjQ",
    authDomain: "todo-list-ada76.firebaseapp.com",
    projectId: "todo-list-ada76",
    storageBucket: "todo-list-ada76.firebasestorage.app",
    messagingSenderId: "605192897375",
    appId: "1:605192897375:web:80a0c45565d14ef488ecea",
    measurementId: "G-0C595L0F6E"
  };

  
  const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let btn = document.getElementById("addbtn");


btn.addEventListener("click", async ()=> {
    
    let getinput = document.getElementById("todo-input");
   try {
  const docRef = await addDoc(collection(db, "users"), {
   items: getinput.value,
  });
  console.log("Document written with ID: ", docRef.id);
  getinput.value="";
  readData();

} catch (e) {
  console.error("Error adding document: ", e);
}
})




let readData=async()=>{
    let list = document.getElementById("todo-list");
     list.innerHTML = ""; 
const querySnapshot = await getDocs(collection(db, "users"));
querySnapshot.forEach((doc) => {


list.innerHTML+=`<li>${doc.data().items}

   <div class="actions">
    <button onclick="editbtn('${doc.id}','${doc.data().items}')"  style=" border:none; cursor:pointer; font-size:22px;padding:5px; color:green;">✏️</button>
<button onclick="deletebtn('${doc.id}')"  style=" border:none; cursor:pointer; font-size:22px; color:red;"> 🗑️</button>           

  </div>
 </li> `;

    
});
}
readData();


async function deletebtn(e){
await deleteDoc(doc(db, "users", e));

readData();
}
window.deletebtn=deletebtn;




async function editbtn(e,b){
const cityRef = doc(db, 'users', e);

let getvalue=prompt("Enter your task",b);
await updateDoc(cityRef, {
     items:getvalue
});
readData();
}
window.editbtn=editbtn;