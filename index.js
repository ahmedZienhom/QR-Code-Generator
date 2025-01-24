'use struct'

const light = document.querySelector(".light");
const dark = document.querySelector(".dark");
const sizes = document.querySelector(".sizes");
const QRText = document.querySelector(".QR-text");
const QRcode = document.querySelector("#qr-code");
const Download = document.querySelector(".download");
const share = document.querySelector(".share");

const DefaultURL = "https://github.com/ahmedZienhom";

let ColorLight = "#fff",
    ColorDark = "#000",
    text = DefaultURL,
    size = 400;


generateQRCode();

dark.addEventListener("input", (e) => {
    ColorDark = e.target.value;
    generateQRCode();
});
light.addEventListener("input", (e) => {

    ColorLight = e.target.value;
    generateQRCode();
});
QRText.addEventListener("input", (e) => {

    value = e.target.value;
    text = value;

    if(!value)
        text = DefaultURL;
    generateQRCode();
});
sizes.addEventListener("change", (e) => {

    size = e.target.value;
    generateQRCode();
});
share.addEventListener("click", async () => {
    setTimeout(async () => {
        try {
            const base64url = await resolveDataUrl();
            const blob = await((await fetch(base64url))).blob();
            const file = new file([blob], "QRCode.png",{
                type: blob.type
            });
             await navigator.share({
                files: [file],
                title: text
             });
        } catch (error) {
            alert("your browser dosenot support sharing")
        }   
    }, 100);
});

function resolveDataUrl() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const img = document.querySelector("#qr-code img");

            if(img.currentSrc){
                resolve(img.currentSrc);
                return;
            }
            const canvas = document.querySelector("canvas");
            resolve(canvas.toDataURL());
        }, 50);
    } );
}

 async function generateQRCode() {
    QRcode.innerHTML = "";
    new QRCode("qr-code", {
        text,
        height:size,
        width:size,
        ColorLight,
        ColorDark
    });
    Download.href = await resolveDataUrl();
 }