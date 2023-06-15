import React,{ useState } from 'react';
import '../assets/navbar.css';
import SAFLogo from '../assets/SAFLOGO.png';
// import { FaUser } from 'react-icons/fa';
import { FiMinus, FiChevronDown,FiX  } from 'react-icons/fi';

enum View {
  CHATBOT = "Chatbot",
  FAQ_BANK = "FAQ Bank",
  RAW_PDF = "RAW PDF",
}
interface NavbarProps {
  activeOption: string;
  handleNavOptionClick: (option: View) => void;
}



const Navbar: React.FC<NavbarProps> = ({ activeOption, handleNavOptionClick }) => {

  const [showContent, setShowContent] = useState(true);

  const toggleContent = () => {
    setShowContent(!showContent);
  };

  return (
    <div>
      {/* <div className="bg-gradient-to-r from-gray-200 via-gray-150 to-gray-200 mt-1 mb-1 font-bold pl-4 pr-4" style={{textAlign:"center"}}>
      <h4 className="" style={{color:"#808080"}}>You can utilize this chatbot as an additional resource to find answers for your business. Our chatbot relies on the knowledge sourced from both current and past issues of Floral Management Magazine, ensuring comprehensive and up-to-date information.</h4>
       </div> */}


<div className="bg-gradient-to-r from-gray-200 via-gray-150 to-gray-200 mt-1 mb-1 font-bold pl-4 pr-4" style={{ textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
        {showContent ? (
          <div style={{ textAlign: 'center'}}>
          <FiChevronDown size={20} onClick={toggleContent} style={{ cursor: 'pointer',marginBottom:"-46px", marginLeft:"-10px"}} />
          </div>
        ) : (
          <div>
          <FiMinus size={20} onClick={toggleContent} style={{ cursor: 'pointer'}} />
          </div>
        )}
      </div>
      {showContent && (
        <h4 className="pl-4 pr-4" style={{ color: '#808080' }}>
          You can utilize this chatbot as an additional resource to find answers for your business. Our chatbot relies on the knowledge sourced from both current and past issues of Floral Management Magazine, ensuring comprehensive and up-to-date information.
        </h4>
      )}
    </div>


    <nav className="navbar bg-gradient-to-r from-gray-200 via-gray-150 to-gray-200">


      <div className="navbar-logo">
        {/* Add your logo or icon here */}
        {/* <FaUser /> */}
        <img src={SAFLogo} alt="SAF Logo" style={{ height: '40px', width: '40px' }}/>
      </div>
      <ul className="navbar-options">
        <li
          className={`navbar-option ${activeOption === 'Chatbot' ? 'active' : ''}`}
          onClick={() => handleNavOptionClick(View.CHATBOT)}
        >
          <i className="fas fa-comment"></i>
          <span>FM Chatbot</span>
        </li>
        <li
          className={`navbar-option ${activeOption === 'FAQ Bank' ? 'active' : ''}`}
          onClick={() => handleNavOptionClick(View.FAQ_BANK)}
        >
          <i className="fas fa-book"></i>
          <span>Refrence Source</span>
        </li>
        {/* <li
          className={`navbar-option ${activeOption === 'RAW PDF' ? 'active' : ''}`}
          onClick={() => handleNavOptionClick(View.RAW_PDF)}
        >
          <i className="fas fa-book"></i>
          <span>RAW PDF</span>
        </li> */}
      </ul>

        </nav>
        </div>
  );
};

export default Navbar;
