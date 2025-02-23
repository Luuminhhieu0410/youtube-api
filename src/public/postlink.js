const form_submit = document.getElementById('form-post');
const inputLink = document.getElementById('input-link');
form_submit.addEventListener('submit',async (e) =>{
    e.preventDefault();
   const data = await post();
   alert(JSON.stringify(data))
})

async function post(){
    const response = await fetch("/video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ linkYoutube: inputLink.value}),
      });
    const data = await response.json();
    return data;
}