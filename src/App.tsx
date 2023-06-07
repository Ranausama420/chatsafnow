import { useState } from 'react';
import Controller from "./components/Controller";
import FAQs from "./components/FAQlist";
import Radio from "./components/Options";
import ExtractedPDF from "./components/PDFview";
import Navbar from "./components/Navbar";

enum View {
  CHATBOT = "Chatbot",
  FAQ_BANK = "FAQ Bank",
  RAW_PDF = "RAW PDF",
}

function App() {

  const [selectedRadioButton, setSelectedRadioButton] = useState<number | null>(null);
  const [view, setView] = useState<View>(View.CHATBOT);


  const handleNavOptionClick = (selectedView: View) => {
    setView(selectedView);
  };

  return (
    <div>
      <Navbar activeOption={view} handleNavOptionClick={handleNavOptionClick} />

      {/* Main Content */}
      {/* Main Content */}
      {view === View.CHATBOT && (
        <div style={{ display: 'flex' }}>
          <div style={{ flex: '1', padding: '10px' }}>
            <Controller radio={selectedRadioButton} />
          </div>
          <div style={{ flex: '1', padding: '10px' }}>
            <div style={{ display: 'flex' }}>
              <div className="sec1" style={{ flex: '1', paddingTop: '100px' }}>
                <Radio selectedRadioButton={selectedRadioButton} setSelectedRadioButton={setSelectedRadioButton} />
              </div>
              <div className="sec1" style={{ flex: '1' }}>
                <ExtractedPDF width={460} height={330} />
              </div>
            </div>
            <div style={{ display: 'flex' }}>
              <div className="sec2" style={{ height: '480px', width: '400px', overflowY: 'scroll', flex: '1',marginTop:'10px', scrollbarWidth: 'thin', scrollbarColor: '#ccc transparent' }}>
                <FAQs />
              </div>
            </div>
          </div>
        </div>
      )}

      {view === View.FAQ_BANK && (
        <div>
          {/* Add your FAQ Bank component here */}
          <div style={{ display: 'flex' }}>
              <div className="sec2" style={{ height: '100%', width: '400px', overflowY: 'scroll', flex: '1' }}>
                <FAQs />
              </div>
              {/* <div className="sec2" style={{ height: '700px', width: '400px', overflowY: 'scroll', flex: '1', border: '1px solid #ccc' }}>
              <ExtractedPDF text={loremIpsum} width={750} height={700} />
              </div> */}
            </div>
        </div>
      )}
      {view === View.RAW_PDF && (
        <div>
          {/* Add your FAQ Bank component here */}
          <div style={{ display: 'flex' }}>
              <div className="sec2" style={{ height: '120%', width: '100%', overflowY: 'scroll', flex: '1', border: '1px solid #ccc',padding:'1%' }}>
              <ExtractedPDF  width={1700} height={800} />
              </div>
            </div>
        </div> 
      )}
    </div>
  );
}

export default App;
