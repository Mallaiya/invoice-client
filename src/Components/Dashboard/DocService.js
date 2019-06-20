import { savePDF } from '@progress/kendo-react-pdf';
// import { encodeBase64, saveAs } from '@progress/kendo-file-saver';
// import FileSaver from 'file-saver'
// import Axios from 'axios';
class DocService {
 

  createPdf = (html) => {
// let file = "";
// let src = ""
     savePDF(html, { 
      paperSize: 'A4',
      fileName: 'form.pdf',
      margin: 0,
      scale : 0.78,
    });
    //console.log(savePDF.fileName);
    // const pdfBlob = new Blob([savePDF(html, { 
    //   paperSize: 'A4',
    //   fileName: 'form.pdf',
    //   margin: 0,
    //   scale : 0.78,
    // })], {type : 'application/pdf'})
    // // console.log(data);
    // let reader = new FileReader();
    //         console.log(pdfBlob);
    //         reader.onloadend = () => {
 
    //                file= pdfBlob;
    //                src = reader.result;
    //                console.log(src);
    //             };
    //             reader.readAsDataURL(pdfBlob);  
                
      

    // const dataURI = "data:application.pdf;base64," + encodeBase64(html);
    // console.log(dataURI);
  //   saveAs(dataURI, 'test.pdf', {
  //   forceProxy: true,
  //   proxyURL: '/save-handler',
  //   proxyData: {
  //       '__RequestVerificationToken': 'xyz'
  //   }
  // });
    // let blob = new Blob([html],{type: 'application/pdf'});
    // const fileURL = URL.createObjectURL(blob);
    // console.log("------------------",fileURL);
    // FileSaver.saveAs(blob, "hello world.pdf");
  }
}

const Doc = new DocService();
export default Doc;