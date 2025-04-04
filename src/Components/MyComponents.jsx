import React, { useRef, useState } from 'react'
import './Qrcode.css'
import ProgressBar from 'react-bootstrap/ProgressBar';
const App = () => {
    const [img, setimg] = useState("")
    const [loading, setloading] = useState(false)
    const [logo, setlogo] = useState("WhatsApp Image 2025-03-30 at 19.05.28_1e7d7c05.jpg")
    const [qrdata, setqrdata] = useState("")
    const [qrsize, setqrsize] = useState()
    const [errorsec, seterrorsec] = useState("");
    const [success, setsuccess] = useState("")
    const changed = useRef("")
    const changing = useRef("")
    const [connect, setconnect] = useState("")

    function onclicking() {
        if (!qrdata) {
            seterrorsec("Please provide data for the QR code !");
            let input = document.getElementById("dataInput")
            input.style.border = "solid red 2px"
            changing.current.placeholder = "Data Required!"
            changed.current.placeholder = "Size required!"
            setimg("")
            return;
        } else if (!qrsize) {
            seterrorsec("Please provide the size for the QR code !");
            let input = document.getElementById("sizeInput")
            input.style.border = "solid red 2px"
            setimg("")
            changed.current.placeholder = "Size required!"
            return;
        }


        seterrorsec("");
        setloading(true)
        try {
            const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrsize}x${qrsize}&data=${encodeURIComponent(qrdata)}`
            setsuccess("Take you QR CODE")

            let input = document.getElementById("dataInput")
            input.style.border = "solid rgb(58, 174, 0) 2px"
            let Sizeinput = document.getElementById("sizeInput")
            Sizeinput.style.border = "solid  rgb(58, 174, 0) 2px"
            setimg(url)
            setlogo("")
            setconnect("100")

        } catch (error) {
            console.log('error QR', error);

        } finally {
            setloading(false)
        }
    }
    let successs = "UPLODED"
    function clear() {
        setimg("")
        setqrdata("")
        setqrsize("")
        setsuccess("")
        setlogo("WhatsApp Image 2025-03-30 at 19.05.28_1e7d7c05.jpg")
        changed.current.placeholder = ""
        changing.current.placeholder = ""
        seterrorsec("")
        setconnect("")
        let input = document.getElementById("dataInput")
        input.style.border = "solid rgb(58, 174, 0) 2px"
        let Sizeinput = document.getElementById("sizeInput")
        Sizeinput.style.border = "solid  rgb(58, 174, 0) 2px"
    }
    function download() {
        if (!qrdata || !qrsize) {
            // Validation to ensure QR code data and size exist
            seterrorsec("Please generate the QR Code before downloading!");
            return;
        }

        if (!img) {
            seterrorsec("No QR Code to download! Please generate one first.");
            return;
        }

        seterrorsec(""); // Clear any error if validation passes
        fetch(img)
            .then((response) => response.blob())
            .then((blob) => {
                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = "QR.PNG";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                setlogo("")
            })
            .catch((error) => {
                console.log("Error in downloading QR Code", error);
            });
    }

    return (
        <>

            <div className="main-container">

                <div className='app-container'>
                    <img src={logo} className='logoimg' style={{ width: "160px" }} />
                    <h1>QR code Generater</h1>
                    {errorsec && <p className="error">{errorsec}</p>}
                    {success && <h1>Take Your QR CODE</h1>}
                    {loading && <p>Please Wait....</p>}
                    {img && <img src={img} className='Qrimage' />}
                    <div>
                        <label htmlFor="dataInput" className='input-lable'>Data for Qr code</label>
                        <input type="text" ref={changing} value={qrdata} id='dataInput' onChange={(event) => setqrdata(event.target.value)} />
                        <label htmlFor="sizeInput" className='input-lable'>Img Size(e.g.,150)</label>
                        <input type="number" value={qrsize} ref={changed} id='sizeInput' onChange={(event) => setqrsize(event.target.value)} />
                        <button className='generate-button' onClick={onclicking}>Generate QR Code</button>
                        <button className='download-button' onClick={download}>Download QR Code</button>
                        <button className='resetbtn' onClick={clear}>Reset</button>
                        <p style={{ textAlign: "right" }}>@By Vignesivam</p>
                        <div className="endload" style={{ padding: "10px" }}>
                            <ProgressBar now={connect} label={`${successs}%`} />;
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default App