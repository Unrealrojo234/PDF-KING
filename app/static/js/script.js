let sendBtn = document.querySelector("button");
let promptTextarea = document.querySelector("textarea");
let responseDiv = document.getElementById("response");
let loader = document.querySelector(".loader");

responseDiv.style.display = "none";

loader.style.display = "none";

const postPrompt = (prompt) => {
  try {
    fetch("http://127.0.0.1:5000/api/ai", {
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
  loader.style.display = "block";

  event.preventDefault(); // Prevent form submission if the button is inside a form
  const prompt = promptTextarea.value;
  postPrompt(prompt);
};
