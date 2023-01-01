let uploadImage = document.querySelector(".upload-image");
let previewImg = uploadImage.querySelector("img");
let fileInput = uploadImage.querySelector("input");
let widthInput = document.querySelector(".width input");
let heightInput = document.querySelector(".height input");
let ratioInput = document.querySelector(".ratio input");
let downloadBtn = document.querySelector("#download-btn");
let resizeBtn = document.querySelector("#resize-btn");
let ImageRatio;
let url;
const loadFile = (e) => {
    const file = e.target.files[0]; // Getting First User Selected File.
    if (!file) return; // Return If User Has Not Selected Any File.       
    previewImg.src = URL.createObjectURL(file); // Passing Selected File Url To Preview Img src
    previewImg.addEventListener("load", () => { // Once Img Loaded
        widthInput.value = previewImg.naturalWidth;
        heightInput.value = previewImg.naturalHeight;
        ImageRatio = previewImg.naturalWidth / previewImg.naturalHeight;
        document.querySelector(".wrapper").classList.add("active");
    });
}
widthInput.addEventListener("keyup", () => {
    // Getting Height According To The Ratio Checkbox Status
    const height = ratioInput.checked ? widthInput.value / ImageRatio : heightInput.value;
    heightInput.value = Math.floor(height);
});
heightInput.addEventListener("keyup", () => {
    // Getting Width According to The Ratio Checkbox Status
    const width = ratioInput.checked ? heightInput.value * ImageRatio : widthInput.value;
    widthInput.value = Math.floor(width);
});

const resize = () => {
    const canvas = document.createElement("canvas");
    const cdraw = canvas.getContext("2d");

    // Setting Canvas Height & Width According to the Input Values
    canvas.width = widthInput.value;
    canvas.height = heightInput.value;

    // Drawing User Selected Image Onto the Canvas
    cdraw.drawImage(previewImg, 0, 0, canvas.width, canvas.height);
    url = canvas.toDataURL();
    let HTMLTEMPLATE = `
            <img src="${url}"/>
        `;
    let show = document.querySelector(".show");
    show.innerHTML = HTMLTEMPLATE;
}
const download = () => {
    const a = document.createElement("a");
    a.href = url;
    a.download = "resize.jpg";
    a.click();
}
downloadBtn.addEventListener("click", download);
resizeBtn.addEventListener("click", resize);
fileInput.addEventListener("change", loadFile);
uploadImage.addEventListener("click", () => fileInput.click());
