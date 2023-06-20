import React,{ useState } from "react";
import Title from "./Title";
import axios from "axios";
import Chatwidget from "./chatwidget";
import MessageComp from "./Message";
import '../assets/SwirlPopup.css';

interface ControllerProps {
  radio: number | null;
  anotherVariable: string;
  setAnotherVariable: React.Dispatch<React.SetStateAction<string>>;
}

const Controller: React.FC<ControllerProps> = ({ radio,setAnotherVariable}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);



  const onSendMessage = async (msgtext: string) => {
    setIsLoading(true);

    // Append recorded message to messages
    const myMessage = { sender: "me", msgtext };
    const messagesArr = [...messages, myMessage];
    console.log(myMessage,messagesArr)
  setMessages(messagesArr);
  let url=""
  console.log('radio', radio)
  if(radio == 1)
  {
    url="https://aichatbot.herokuapp.com/post-msg/"

  }else{
    url="https://aichatbot.herokuapp.com/post-msg-pdf/"

  }
  

    try {
    await axios.post(url, null, {
      params: {
        msg: msgtext
      }
    }).then(response => {
      console.log(response.data);
      const msgtext=response.data.msg
      const rachelMessage = { sender: "FM Chatbot", msgtext };
      messagesArr.push(rachelMessage);
      // console.log(messagesArr)
      setMessages(messagesArr);
      setAnotherVariable('new')
      handleClick();

      // Play audio
      setIsLoading(false);
    })
    .catch(error => {
      console.error(error);
    });
  } catch (error) {
    console.error(error);
  }
  };
  

  
  const [clickCount, setClickCount] = useState(0);
  

  const handleClick = () => {
    setClickCount(clickCount + 1);

    if (clickCount + 1 === 2) {
      openPopup()
      // window.location.href='https://staging.safnow.org/membership/'
      // window.location.href = 'https://profile.safnow.org/account/login.aspx?RedirectURL=https%3A%2F%2Fsafnow.org&_gl=1*1l43es0*_ga*NDI3MjYyMTYxLjE2ODY5MDM0OTk.*_ga_HCZ8NPPN6Y*MTY4NjkwMzQ5OS4xLjAuMTY4NjkwMzQ5OS4wLjAuMA..&_ga=2.164900028.2067406789.1686903499-427262161.1686903499&reload=timezone'; // Replace '/new-link' with the desired URL
    }
  };
  
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => {
    setIsOpen(true);

  };

  const closePopup = () => {
    setIsOpen(false);
    window.location.href='https://staging.safnow.org/membership/'
  };


  return (
    <div className="h-screen overflow-y-hidden">
      {/* Title */}
      <div className="swirl-popup-container">
      {/* <button onClick={openPopup}>Open Popup</button> */}
      {isOpen && (
        <div className="swirl-overlay" onClick={closePopup}>
        <div className="swirl-popup">
          <h1 className="font-bold m-1" style={{color:"#1568B3", fontSize:"20px"}}>Join SAF</h1>
          <p className="p-5" style={{color:'#80809C'}}>Thank you for choosing our Floral Management Magazine ChatBot. If you find this resource valuable, we wholeheartedly encourage you to join as an SAF member. By becoming a member, you will gain unlimited access to query the chatbot, allowing you to explore all articles, past and present, covering a wide range of topics from the industry's top floral magazine.</p>
          <button style={{backgroundColor:"#1568B3"}} onClick={closePopup}>Become Member</button>
        </div>
        </div>
      )}
    </div>
      <Title setMessages={setMessages} />

      <div className="flex flex-col justify-between h-full overflow-y-scroll pb-96 "style={{width:'100%'}}>
        {/* Conversation */}
        <div className="mt-5 px-5" >
          {messages?.map((msg, index) => {
            return (
              <div
                key={index + msg.sender}
                
              >
                {/* Sender */}
                <div className="mt-4 ">
                  <p
                    className={
                      msg.sender == "me"
                        ? "text-right mr-2 italic text-green-500"
                        : "ml-2 italic text-blue-500"
                    }
                  >
                    {msg.sender}
                   
                  </p>

                  {/* Message */}
                  <MessageComp text={msg.msgtext} time={new Date().toLocaleString()} sender={msg.sender}/>
                </div>
              </div>
            );
          })}

          {messages.length == 0 && !isLoading && (
            <div className="text-center font-light italic mt-10">
              Please ask me a question...
            </div>
          )}

          {isLoading && (
            <div className="text-center font-light italic mt-10 animate-pulse">
              Gimme a few seconds...
            </div>
          )}
        </div>

        {/* Recorder */}
        <div className="fixed bottom-0 w-1/2.5 py-6 border-t text-center bg-gradient-to-r from-gray-200 via-gray-150 to-gray-200" style={{width:'48.75%'}}>
          <div className="flex justify-center items-center w-1/2">
            <div>
              {/* <RecordMessage handleStop={handleStop} /> */}
              <Chatwidget onSendMessage={onSendMessage}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Controller;
