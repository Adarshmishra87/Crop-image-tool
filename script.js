let cropper;

document.getElementById("upload").addEventListener("change", function (e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const image = new Image();
      image.src = event.target.result;

      image.onload = function () {
        // Create a canvas to display the image
        const canvas = document.getElementById("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0);

        // Initialize Cropper.js
        if (cropper) {
          cropper.destroy();
        }

        cropper = new Cropper(canvas, {
          aspectRatio: 1, // Set to any ratio you like, 1 for square
          viewMode: 2, // Enables dragging to move the crop area
          responsive: true,
          zoomable: true,
          scalable: true,
          ready: function () {
            console.log("Cropper is ready!");
          },
        });
      };
    };
    reader.readAsDataURL(file);
  }
});

document.getElementById("download").addEventListener("click", function () {
  if (cropper) {
    const croppedCanvas = cropper.getCroppedCanvas();
    const dataUrl = croppedCanvas.toDataURL("image/png");

    // Create a download link and simulate a click to download the image
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "cropped-image.png";
    link.click();
  }
});
