import styled from 'styled-components';
import { useState,useEffect } from "react";

interface MessageProps {
  text: string;
  time: string;
  sender: string;
  source: {
    page_content: string;
    metadata: {
      page: number;
      source: string;
    };
  }[];
}

interface sourceItem { page_content: string; pdf_numpages: number; source: string;}[];

const MessageComp: React.FC<MessageProps> = ({ text, time, sender,source }) => {
  const isFromSender = sender === 'me';
  const [sourceData, setSourceData] = useState<sourceItem[]>([]);
  useEffect(() => {
    const parsedData: sourceItem[] = source.map((item) => {
      const { page_content, metadata } = item;
      const { page, source } = metadata;
      return {
        page_content,
        pdf_numpages: page,
        source,
      };
    });

    setSourceData(parsedData);
  }, [source]);

  console.log('parsedData',sourceData)
  const MessageContainer = styled.div<{ isFromSender: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.isFromSender ? 'flex-end' : 'flex-start'};
  margin-bottom: 10px;
`;

const MessageText = styled.div<{ isFromSender: boolean }>`
  background-color: ${props => props.isFromSender ? '#DCF8C6' : '#F2F2F2'};
  color: ${props => props.isFromSender ? 'black' : 'inherit'};
  padding: 10px;
  border-radius: 10px;
  max-width: 60%;
`;

const MessageTime = styled.span<{ isFromSender: boolean }>`
  font-size: 12px;
  color: #999;
  align-self: ${props => props.isFromSender ? 'flex-end' : 'flex-start'};
`;

const [expandedId, setExpandedId] = useState('');

const toggleExpanded = (id: string) => {
  setExpandedId(expandedId === id ? '' : id);
};


// const replacedString = text.replace(
//   /https:\/\/direct.lc.chat\/8928829\//g,
//   '<a href="https://direct.lc.chat/8928829/" style="color:blue">https://direct.lc.chat/8928829/</a>'
// );
// const replacedString1 = replacedString.replace(
//   /info@safnow.org/g,
//   '<a href="info@safnow.org" style="color:blue">info@safnow.org</a>'
// );


if (text.startsWith('Unfortunately,')) {
  // Replace the link and email address in the string with actual links
  const replacedString = text
    .replace(
      /https:\/\/direct.lc.chat\/8928829\//g,
      '<a href="https://direct.lc.chat/8928829/" style="color: blue;">https://direct.lc.chat/8928829/</a>'
    )
    .replace(
      /info@safnow.org/g,
      '<a href="mailto:info@safnow.org" style="color: blue;">info@safnow.org</a>'
    );
    text=replacedString
}




// console.log("replacedString",replacedString)
// info@safnow.org
  return (
    <MessageContainer isFromSender={isFromSender}>
      {/* <MessageText isFromSender={isFromSender}><p>Unfortunately, I do not possess the answer to your specific question at this time. However, I am here to assist you in the best way possible. To address your query, I recommend contacting the SAF Live Chat team, available at <a href="" style={{color:"blue"}}>https://direct.lc.chat/8928829/</a>. They have the expertise to provide you with the information you are seeking. Additionally, you can also reach out to them via email at info@safnow.org. They will be better equipped to assist you promptly and accurately.</p> */}
      <MessageText isFromSender={isFromSender}>
        {/* <p>{text}</p> */}
      <p dangerouslySetInnerHTML={{ __html: text }} />

      {/* <div><button onClick={() => toggleExpanded('tst')}>{expandedId === 'tst'? 'Read Less' : 'Read More'}</button></div> */}

      {!isFromSender && (
        <div>
          <hr></hr>

          {text.startsWith('Unfortunately,') ? (
  <p></p>
) : (<div> <button style={{color:"blue"}}onClick={() => toggleExpanded('sources')}>{expandedId === 'sources' ? 'Read less' : 'Read More'}</button>
{sourceData.map((item, index) => (
      <div id="sources" key={index} style={{ display: expandedId === "sources" ? 'block' : 'none' }}>
        <p><u>Source {index+1}</u></p>
        <p>{item.page_content}</p>
        <p style={{margin:"6px"}}><span style={{borderRadius:"50px", backgroundColor:"#B7D8F0",color:"white",padding:"3px"}}>Page: {item.pdf_numpages}</span></p>
      
        <p style={{margin:"4px"}}><span style={{borderRadius:"30px", backgroundColor:"#FFBABA",color:"white",padding:"4px"}}>Source: {item.source}</span></p>
        <hr></hr>
      </div>
      
    ))}

</div>)}
        
        </div>
      )}
    
      </MessageText>
      <MessageTime isFromSender={isFromSender}>{time}</MessageTime>
    </MessageContainer>
  );
};

export default MessageComp;