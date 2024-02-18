import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const formatMessage = (message) => {
    const parts = message.split(/(```(.*?)\n([\s\S]*?)```|\*\*(.*?)\*\*)/s);
    return parts.map((part, index) => {
        if (index % 5 === 0) {
            // Regular text outside code blocks and bold markers
            const formattedText = part.replace(/\*\*(.*?)\*\*/g, (_, content) => <span style={{ fontWeight: 'bold', color: '#F9E076' }}>{content}</span>);
            return (
                <span
                    key={index}
                    dangerouslySetInnerHTML={{ __html: formattedText }}
                />
            );
        } else if (index % 5 === 2) {
            // Code block
            
            let language = parts[index];
            if(!language)
            language = 'c';
            else if(language === 'c++')
            language = 'cpp';
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
        } else if (index % 5 === 4) {
            // Text between bold markers
            return (
                <span
                    key={index}
                    style={{ fontWeight: 'bold', color: '#F9E076' }}
                >
                    {part}
                </span>
            );
        }
        return null;
    });
};

export default formatMessage;