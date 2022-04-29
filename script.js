

const addbtn = document.getElementById("add");


const notes = JSON.parse(localStorage.getItem("notes"));

if(notes)
{
    notes.forEach(note => 
        {
            addNewNote(note);
        });
}

addbtn.addEventListener("click", () => {
    addNewNote();
});

function addNewNote( text = "") {
    const note = document.createElement("div");
    note.classList.add("note");

    note.innerHTML =
        `
    <div class="notes">
        <div class="tools">
            <button class="edit"><i class="fas fa-edit"></i></button>
            <button class="del"><i class="fas fa-trash-alt"></i></button>
        </div>
        <div class="main ${text ? "" : "hidden"}"></div>
        <textarea class="${text ? "hidden" : ""}"></textarea>
    </div>
    `;


    const editbtn = note.querySelector(".edit");
    const deletebtn = note.querySelector(".del");

    const Main = note.querySelector(".main");
    const textArea = note.querySelector("textarea");

    editbtn.addEventListener("click", () => {
        Main.classList.toggle("hidden");
        textArea.classList.toggle("hidden");
    });

    textArea.addEventListener("input", (e) => {
        const { value } = e.target;
        Main.innerHTML = marked(value);
        updateLS();
    });

    textArea.value=text;
    Main.innerHTML = marked(text);

    deletebtn.addEventListener("click",
        () => {
            note.remove();
            updateLS();
        })


    document.body.appendChild(note);
}

function updateLS()
{
    const notesText = document.querySelectorAll("textarea");
    const notes = [];

    notesText.forEach(note => {
        notes.push(note.value);
    });

    localStorage.setItem("notes" , JSON.stringify(notes));
}