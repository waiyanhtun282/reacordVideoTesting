window.addEventListener("load", async() =>{
  let parts =[];

    await navigator.mediaDevices.getUserMedia({audio:true,video:true})
    .then(stream =>{
        document.getElementById("video").srcObject =stream;

        // start record
        document.getElementById('start').addEventListener('click' ,() =>{
            mediaRecoder = new MediaRecorder(stream);


            mediaRecoder.start(3000);

            mediaRecoder.ondataavailable = function (e){
              parts.push(e.data)
            }
        });

        // stop reacord

        document.getElementById('stop').addEventListener('click',()  =>{
              mediaRecoder.stop();

              const blob = new Blob(parts,{
                type:"video/webm"
              });

              const url =URL.createObjectURL(blob);

              let a = document.createElement('a');
              a.style.display="none"
              a.href =url;
              a.download ="record.webm";

              document.body.appendChild(a);

              a.click();
              

         })
        
    })

})