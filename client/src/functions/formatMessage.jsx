import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark} from 'react-syntax-highlighter/dist/esm/styles/prism';

const formatMessage = (message) => {
    const parts = message.split(/(```(.*?)\n([\s\S]*?)```)/s);
    return parts.map((part, index) => {
      if (index % 4 === 0) {
        // Regular text outside code blocks
        const formattedText = part.replace(/`([^`]+)`/g, (_, content) => `<span style="color: #F9E076; ">${content}</span>`);
  
        return (
          <div
            key={index}
            dangerouslySetInnerHTML={{ __html: formattedText }}
          />
        );
      } else if (index % 4 === 2) {
        // Code block
        const language = parts[index];
        const codeContent = parts[index + 1];
  
        if (language && codeContent) {
          
          return (
            <SyntaxHighlighter
            key={index}
            language={language.trim()}
            style={atomDark}
            showLineNumbers={false}
            wrapLines={true}
            lineNumberStyle={{ minWidth: '2em', paddingRight: '1em' }}
            customStyle={{ maxWidth: '100%', overflowX: 'auto' }}  // Set maximum width and enable horizontal scrolling
            >
            {codeContent.trim()}
          </SyntaxHighlighter>
          );
        }
      }
      return null;
    });
  };


  export default formatMessage;