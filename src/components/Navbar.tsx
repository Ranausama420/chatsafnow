import React from 'react';
import '../assets/navbar.css';
import { FaUser } from 'react-icons/fa';


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
  return (
    <nav className="navbar bg-gradient-to-r from-gray-200 via-gray-150 to-gray-200">
      <div className="navbar-logo">
        {/* Add your logo or icon here */}
        <FaUser />
      </div>
      <ul className="navbar-options">
        <li
          className={`navbar-option ${activeOption === 'Chatbot' ? 'active' : ''}`}
          onClick={() => handleNavOptionClick(View.CHATBOT)}
        >
          <i className="fas fa-comment"></i>
          <span>Chatbot</span>
        </li>
        <li
          className={`navbar-option ${activeOption === 'FAQ Bank' ? 'active' : ''}`}
          onClick={() => handleNavOptionClick(View.FAQ_BANK)}
        >
          <i className="fas fa-book"></i>
          <span>FAQ Bank</span>
        </li>
        <li
          className={`navbar-option ${activeOption === 'RAW PDF' ? 'active' : ''}`}
          onClick={() => handleNavOptionClick(View.RAW_PDF)}
        >
          <i className="fas fa-book"></i>
          <span>RAW PDF</span>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
