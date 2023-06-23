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

  return (
    <MessageContainer isFromSender={isFromSender}>
      <MessageText isFromSender={isFromSender}>{text}

      {/* <div><button onClick={() => toggleExpanded('tst')}>{expandedId === 'tst'? 'Read Less' : 'Read More'}</button></div> */}

      {!isFromSender && (
        <div>
          <hr></hr>
          {text.startsWith('Unfortunately,') ? (
  <p></p>
) : (<div> <button style={{color:"blue"}}onClick={() => toggleExpanded('sources')}>{expandedId === 'sources' ? 'Hide Sources' : 'View Sources'}</button>
{sourceData.map((item, index) => (
      <div id="sources" key={index} style={{ display: expandedId === "sources" ? 'block' : 'none' }}>
        <p><u>Source {index+1}</u></p>
        <p>{item.page_content}</p>
        <p>Page: {item.pdf_numpages}</p>
        <p>Source: {item.source}</p>
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