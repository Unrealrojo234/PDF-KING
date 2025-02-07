let sendBtn = document.querySelector("button");
let promptTextarea = document.querySelector("textarea");
let responseDiv = document.getElementById("response");
let loader = document.querySelector(".loader");

let fileInput = document.getElementById("fileInput");

responseDiv.style.display = "none";

loader.style.display = "none";

let pdfExtract = null;

const postFile = (formData) => {
  fetch("/api/upload", {
    method: "POST",
    body: formData, // Send FormData directly
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      return res.json();
    })
    .then((data) => {
      if (data.success == false) {
        Swal.fire({
          icon: "error",
          title: "An error ocurred",
          text: "Invalid file type",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "File uploaded and extracted!",
          showConfirmButton: false,
          timer: 1500,
        });

        console.log(data);

        pdfExtract = data.extract;
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "An error ocurred",
        text: error,
        showConfirmButton: false,
        timer: 1500,
      });
    });
};

fileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];

  if (file) {
    console.log("File selected successfully:", file.name);
    const formData = new FormData();
    formData.append("file", file); // Append the file to FormData
    postFile(formData); // Send the FormData
  } else {
    console.log("No file selected");
  }
});

const postPrompt = (prompt) => {
  try {
    fetch("/api/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: prompt,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        loader.style.display = "none";

        let res = data.output.choices[0].message.content;
        console.log(res);

        responseDiv.style.display = "block";
        responseDiv.innerHTML = res;
      })
      .catch((error) => {
        loader.style.display = "none";

        console.error("Error ", error);
        responseDiv.style.display = "block";
        responseDiv.innerText = error;
      });
  } catch (error) {
    loader.style.display = "none";

    responseDiv.style.display = "block";
    responseDiv.innerText = error;
    console.error("Error ", error);
  }
};

sendBtn.onclick = (event) => {
  event.preventDefault(); // Prevent form submission if the button is inside a form
  loader.style.display = "block";
  if (pdfExtract) {
    const prompt = promptTextarea.value + pdfExtract;
    postPrompt(prompt);
  } else {
    const prompt = promptTextarea.value;
    postPrompt(prompt);
  }
};
