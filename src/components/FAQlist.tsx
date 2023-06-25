import React, { useState,useEffect } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import styled, { keyframes } from "styled-components";
import repetitionLogo from '../assets/rot.png';

// import stored_data from "./stored_faq.json"
// import { FaLink } from 'react-icons/fa';
// import { Accordion, Card, Button } from 'react-bootstrap';
import axios from 'axios';
interface FAQItem {
  question: string;
  answer: string[];
  source: { page_content: string; pdf_numpages: number; source: string;}[][];
}

const FAQContainer = styled.div`
  width: 100%;
  max-width: 1250px;
  margin: 0 auto;
  
`;

const FAQQuestion = styled.div`
  background-color: #f8f8f8;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between; // Add this line
  
  
`;

const FAQAnswer = styled.div`
  // position: relative;
  background-color: #f1f1f1;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  /* Styling for the button */
  z-index: -1; 
  button {
    // position: absolute;
    // right: 1100px;
    margin-left: -10px;
    border: none;
    color: blue;
    padding: 5px 10px;
    cursor: pointer;
  }

`;
const FAQHeading = styled.h2`
font-size: 18px;
margin-bottom: 10px;
color: #756FF2;

`;
    
const DropdownIcon = styled(FaAngleDown)`
  margin-left: 20px;
`;
const DropupIcon = styled(FaAngleUp)`
  margin-left: 20px;
`;

const Logo = styled.img`
  width: 20px;
  height: 20px;
`;

const spinAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 20px;
  color: #999;

  /* Add animation styles */
  &:after {
    content: '';
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 2px solid #ccc;
    border-top-color: #999;
    animation: ${spinAnimation} 1s linear infinite;
  }
`;

interface QAProps {
  anotherVariable: string;
  setAnotherVariable: React.Dispatch<React.SetStateAction<string>>;
}

const FAQs: React.FC<QAProps> = ({ anotherVariable,setAnotherVariable}) =>  {
  const [expandedIndex, setExpandedIndex] = useState<number>(-1);
  const [faqData, setFaqData] = useState<FAQItem[]>([]);
  const [isResetting, setIsResetting] = useState(false);
  

  // const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // const handleAccordionToggle = (index: number) => {
  //   setActiveIndex(activeIndex === index ? null : index);
  // };
  

  const fetchData = async () => {
    console.log('fetchData')
    setIsResetting(true);
    
    try {
      if (anotherVariable !== 'new') {
        setIsLoading(true);
      }
      const response = await axios.post('https://aichatbot.herokuapp.com/readdb/', {}, {
        headers: {
          Accept: 'application/json',
        },
      });

      // Handle the response data
      const parsedData: FAQItem[] = [];
      // console.log(response.data);
      const data=response.data
      // setPdfData(response.data.msg);
      data.forEach((item: any) => {
        // console.log(item)
        // console.log(typeof item)
        const question=item.question
        const answers=[item.answer]
        const source=[item.source]

      const questionExists = parsedData.some((data) => data.question === question);
      if (questionExists) {
        // Find the existing data with the matching question
        const existingData = parsedData.find((data) => data.question === question);

        if (existingData) {
          // Append the new answer to the existing data's answer list
          existingData.answer.push(...answers as string[]);
          // existingData.source = item.source;
          existingData.source.push(...source as {
            page_content: string;
            pdf_numpages: number;
            source: string;
          }[][]);

          // console.log(item)
        }
      } else {
        // Add a new entry to the parsedData list
        parsedData.push({
          question,
          answer: answers as string[],
          source: source as {
            page_content: string;
            pdf_numpages: number;
            source: string;
          }[][],
        });
      }

        setFaqData(parsedData);
       
      
  
      });

      
    } catch (error) {
      // Handle errors
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false); // Set isLoading to false after the request is completed (whether success or error)
      setIsResetting(false);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);

  const toggleCard = (index: number) => {
    if (expandedIndex === index) {
      setExpandedIndex(-1);
    } else {
      setExpandedIndex(index);
    }
  };


    useEffect(() => {
      // console.log('faq',anotherVariable)
      if (anotherVariable === 'new') {
        setAnotherVariable('old');
        fetchData();
      }
    }, [anotherVariable]);

    // const [expandedId, setExpandedId] = useState('');
  // const toggleExpanded = (id: string) => {
  //   setExpandedId(expandedId === id ? '' : id);
  // };

  return (
    <div>
      <div><div className="flex items-center justify-between w-full p-2 mb-3 bg-gray-900 font-bold shadow bg-gradient-to-r from-gray-200 via-gray-150 to-gray-200">
      <FAQHeading style={{color:"grey"}}>Here are the most recent questions asked along with their answers</FAQHeading>
      <button
        onClick={fetchData}
        className={
          "transition-all duration-300 text-blue-300 hover:text-pink-500 " +
          (isResetting && "animate-pulse")
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>
      </button></div>
</div>
<div style={{overflowY:'scroll',maxHeight:'750px',flex: '1'}}>
    <FAQContainer>
      

      {isLoading ? (
        <Loader></Loader>
      ) : (
        <div>
        {faqData.map((faq, index) => (
          <div key={index}>
            <FAQQuestion onClick={() => toggleCard(index)}>
              <div>{faq.question}</div>
              <div style={{ display: 'flex' }}>
              <Logo src={repetitionLogo} alt="Repetition Logo" />  <span>{faq.answer.length}</span>
              
              {expandedIndex === index ? (
                <DropupIcon size={20} />
              ) : (
                <DropdownIcon size={20} />
              )}
              </div>
            </FAQQuestion>
            {expandedIndex === index && 
  
            <div>

      {faq.answer.map((answer, answerIndex) => (
        <div>

        <FAQAnswer key={answerIndex}>
        
      <h5><u>Ans: </u> {answerIndex + 1}</h5>
   {answer.startsWith('Unfortunately,') ? (
  <p>{answer}</p>
) : (
  <>
    <p>{answer}</p>
    
    {/* <div><button onClick={() => toggleExpanded(answerIndex.toString())}>{expandedId === answerIndex.toString() ? 'Read Less' : 'Read More'}</button></div> */}
    <br />
    
    {faq.source.map((source_doc, srcIndex) => (
      <div id={answerIndex.toString()} style={{ display: 'all' === answerIndex.toString() ? 'block' : 'none' }}>{source_doc.map((source_docs, srcdIndex) => (
      <div>
{answerIndex === srcIndex ? (
        <>
        <h5><u>Source: </u> {srcdIndex + 1}</h5>
        <div key={srcIndex}>
        <hr />
          <p>{source_docs.page_content}</p>
          <p>From page: {source_docs.pdf_numpages - 1}</p>
        <p>Source: {source_docs.source}</p>
        </div>
        </>
      ) : null}
      </div>
      ))}</div>
    ))}
   
  </>
)}
  
              </FAQAnswer>
              </div>
            ))}
            </div>
            
            }
            
          </div>
        ))}
        </div>
      )}
      
      
    </FAQContainer>
    </div>
    </div>
  );
};

export default FAQs;
