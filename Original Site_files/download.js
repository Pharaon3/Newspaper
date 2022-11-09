document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");
    const headerInput = document.getElementById("header-input");
    const subheaderInput = document.getElementById("subheader-input");
    const fileInput = document.getElementById("file-input");
    const userImage = document.getElementById("user-img");
    const imageOutput = document.getElementById("image-output");
    const downloadBtn = document.getElementById("download-button");
    const MONTHS = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"];
    const date = new Date();
    const dateDisplayer = document.getElementById("date-displayer");

    let config = {
        w: 1530,
        h: 1854,
        maskX: 108,
        maskY: 378,
        maskW: 1314,
        maskH: 1206,
        headSize: 180,
        subheadSize: 48,
        dateX: 972,
        dateY: 288,
        design: document.getElementById("structure"),
        filter: false
    }

    let data = {
        header: "Lorem ipsum dolor sit",
        subheader: `Lorem Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod`,
        image: document.getElementById("default-img"),
        date: ['Montevideo', 'Uruguay', `${date.getDate()} de ${MONTHS[date.getMonth()]} de ${date.getFullYear()}`]
    }
    
    dateDisplayer.textContent = "Del " + data.date[2];

    headerInput.addEventListener("change", setHeader);
    subheaderInput.addEventListener("change", setSubheader);
    fileInput.addEventListener("change", manageImg);
    downloadBtn.addEventListener("click", downloadResult);

    function drawResult() {
        canvas.width = config.w;
        canvas.height = config.h;

        ctx.clearRect(0, 0, config.w, config.h);
        ctx.drawImage(config.design, 0, 0);
        paintDate();

        ctx.save();
        ctx.translate(config.maskX, config.maskY);
        let crop = { sx: 0, sy: 0, sw: data.image.width, sh: data.image.height };
        if (crop.sw > crop.sh) {
            crop.sw = crop.sh * (config.maskW / config.maskH);
            crop.sx = (data.image.width - crop.sw) / 2;
        } else {
            crop.sh = crop.sw * (config.maskH / config.maskW);
            crop.sy = (data.image.height - crop.sh) / 2;
        }
        ctx.drawImage(data.image, crop.sx, crop.sy, crop.sw, crop.sh, 0, 0, config.maskW, config.maskH);
        console.log(crop);
        ctx.restore();

        ctx.save();
        ctx.fillStyle = "#fff";
        ctx.font = `bold ${config.headSize}px 'Titillium Web'`;
        ctx.shadowColor = "rgba(0,0,0,.5)";
        ctx.shadowOffsetX = 3;
        ctx.shadowOffsetY = 5;
        ctx.shadowBlur = 24;
        wrapText(ctx, data.header.toLocaleUpperCase(), 160, 1260, 1300, 180);
        ctx.restore();

        ctx.save();
        ctx.fillStyle = "#fff";
        ctx.font = `bold ${config.subheadSize}px 'Titillium Web'`;
        ctx.shadowColor = "rgba(0,0,0,.5)";
        ctx.shadowOffsetX = 3;
        ctx.shadowOffsetY = 5;
        ctx.shadowBlur = 24;
        wrapText(ctx, data.subheader, 160, 936, 800, 55);
        ctx.restore();

        imageOutput.style.backgroundImage = `url(${canvas.toDataURL()})`;
    }

    function wrapText(context, text, x, y, maxWidth, lineHeight) {
        let words = text.split(' ');
        let line = '';

        for (let i = 0; i < words.length; i++) {
            let testLine = line + words[i] + ' ';
            let metrics = context.measureText(testLine);
            let testWidth = metrics.width;
            if (testWidth > maxWidth && i > 0) {
                context.fillText(line, x, y);
                line = words[i] + ' ';
                y += lineHeight;
            } else {
                line = testLine;
            }
        }
        context.fillText(line, x, y);
    }

    function paintDate() {
        ctx.save();
        ctx.translate(972, 288);
        ctx.fillStyle = "#fff";
        ctx.font = "16px Bitter";
        let gap = 0;
        data.date.forEach(line => {
            ctx.fillText(line, 0, gap);
            gap += 24;
        });
        ctx.restore();
    }

    function setHeader() {
        let newHeader = headerInput.value;
        data.header = newHeader;
        drawResult();
    }

    function setSubheader() {
        let newSubheader = subheaderInput.value;
        data.subheader = newSubheader;
        drawResult();
    }

    function manageImg() {
        let reader = new FileReader();
        reader.addEventListener("load", () => {
            userImage.src = reader.result;
            setTimeout(() => {
                data.image = userImage;
                drawResult();
            }, 0);
        });
        reader.readAsDataURL(fileInput.files[0]);
    }

    function downloadResult() {
        if (window.navigator.msSaveBlob) {
            window.navigator.msSaveBlob(canvas.msToBlob(), "portada-ovacion.png");
        } else {
            let a = document.createElement("a");

            a.href = canvas.toDataURL();
            a.download = "portada-ovacion.png";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    }

    setTimeout(drawResult, 1000);
});;
