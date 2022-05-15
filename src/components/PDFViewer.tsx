import { createElement, useRef, useEffect, useState } from "react";
import viewer, { WebViewerInstance } from "@pdftron/webviewer";
import { ActionValue } from "mendix";
import "mx-global";

export interface InputProps {
    value: string;
    buttons?: ActionValue;
}


// export async function sayHello() {
//   console.log('heloo abd ');
  
// };

const PDFViewer: React.FC<InputProps> = props => {
    const viewerRef = useRef<HTMLDivElement>(null);
    const [instance, setInstance] = useState<null | WebViewerInstance>(null);

    const handleClick = () => {
     instance?.downloadPdf();
    // props.buttons?.execute();
    
    }    
    

    async function arrayBufferToBase64(buffer : ArrayBuffer) {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };

    // function blobToBase64(blob:Blob){
    //     return new Promise((resolve, _) => {
    //       const reader = new FileReader();
    //       reader.onloadend = () => resolve(reader.result);
    //       reader.readAsDataURL(blob);
    //     });
    //   } 



    function base64ToBlob(base64:string) {
        const binaryString = window.atob(base64);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; ++i) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        return new Blob([bytes], { type: 'application/pdf' });
      };



    useEffect(() => {
        viewer(
            {
                path: "/resources/lib",
                // initialDoc: "/resources/lib/ui/maaa.pdf"
            
            },
            viewerRef.current as HTMLDivElement
        ).then(instance => {
            setInstance(instance);
            //    instance.loadDocument("http://www.almal.com.kw/media/d0fa0421-7ebf-4f72-8866-c212f8813545/4bI1UA/Disclosures/%D9%82%D8%B1%D8%A7%D8%B1%20%D8%B1%D9%82%D9%85%20CMA-030200-03017-2020_Page_1001.jpg?mw=700");
            // instance.loadDocument(base64ToBlob(props.value), { filename: 'myfile.pdf' });
            const { docViewer } = instance;

            // const {  annotManager, CoreControls } = instance;

            // Add header button that will get file data on click
            instance.setHeaderItems(header => {
              header.push({
                  type: 'actionButton',
                  img: '...',
                  onClick: async () => {
                    const doc = docViewer.getDocument();
                    // const xfdfString = await annotManager.exportAnnotations();
                    // const saveOptions = CoreControls.SaveOptions;
                    // const options = {
                    //   xfdfString,
                    //   flags: saveOptions.LINEARIZED,
                    //   downloadType: 'pdf'
                    // };
                    const data = await doc.getFileData(); // parameter options
                    // const arr = new Uint8Array(data);
                    // const blob = new Blob([arr], { type: 'application/pdf' });

                    console.log(arrayBufferToBase64(data));
                    

    
                   var  base64 =await arrayBufferToBase64(data);
                    console.log(base64);
                    sessionStorage.setItem('base64', base64);
                   
                        // const pagebutton= document.getElementsByClassName("btn mx-button mx-name-actionButton1 button1 btn-default");
                        // pagebutton.item(0)?.id
                        // if (pagebutton.item(0)) {
                         
                        //     pagebutton.click();
                        // }
                  
                //     const button = document.getElementsByClassName("btn mx-button mx-name-actionButton1 btn-default");
                
                //     button[0]?.addEventListener('click', function handleClick() {
                //     console.log('button clicked');
                //   });
                    // props.buttons?.execute();
                    
                  }
                });
            });
            
            docViewer.on('documentLoaded', () => {
                debugger;
                // instance.downloadPdf();
              // create field and widget annotations here
            });

            docViewer.on('dblClick', () => {
                instance.openElements(['signatureModal']);
              });

        });
    }, []);


    useEffect(() => {
        if (instance && props.value !== "") {
            instance.loadDocument(base64ToBlob(props.value), { filename: 'myfile.pdf' });
            instance.setTheme('dark');

        } else {
            instance?.loadDocument("http://www.almal.com.kw/media/d0fa0421-7ebf-4f72-8866-c212f8813545/4bI1UA/Disclosures/%D9%82%D8%B1%D8%A7%D8%B1%20%D8%B1%D9%82%D9%85%20CMA-030200-03017-2020_Page_1001.jpg?mw=700");
        }
    }, [base64ToBlob(props.value)]);


    return (<div>
        <a style={{
            borderRadius: 12, backgroundColor: '#6495ED', color: 'white', textAlign: 'center', padding: 10, margin: 20, position: 'relative',
            left: '75%',
            top: '27px',
            height: '35px', borderWidth: 2
        }}   onClick={handleClick} >Save & Download</a>
        <div className="webviewer" ref={viewerRef}></div>
    </div>);
};

export default PDFViewer;
