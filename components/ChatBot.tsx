"use client";
import { useState, useEffect, useRef } from "react";
import { askQuestion } from "@/actions/chatBotAction";
import Image from "next/image";

type Message = {
  role: "user" | "assistant" | "system";
  content: string;
  createdAt: number;
};

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi there! How can I assist you?",
      createdAt: Date.now()
    },
  ]);
  const [value, setValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showChat, setShowChat] = useState<boolean>(false);
  const [newMessage, setNewMessage] = useState<number>(1);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);

  const handleSubmit = async () => {
    if (!value.trim()) return;

    setLoading(true);

    try {
      // Add the user's message to the state
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "user", content: value, createdAt: Date.now() },
      ]);
      setValue("");

      // Get the chatbot's response
      const result = await askQuestion(value, messages);

      const formattedResponse: Message = {
        role: "assistant",
        content: formatResponse(result),
        createdAt: Date.now()
      };

      // Add the chatbot's response to the state
      setMessages((prevMessages) => [...prevMessages, formattedResponse]);
    } catch (error) {
      console.error(error);

      // Add an error message to the state
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "assistant",
          content: "Something went wrong. Please try again later.",
          createdAt: Date.now()
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const formatResponse = (text: string) => {
    let formattedText = text.replace(/\n/g, "<br />");
    formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    formattedText = formattedText.replace(/\*(.*?)\*/g, "<em>$1</em>");
    return formattedText;
  };

  // Automatically scroll to the bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Disable scrolling when chat is open
  useEffect(() => {
    if (showChat) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [showChat]);

  return (
    <div className={`flex items-end z-30`}>
      {/** Show Hide Chat button */}
      <>
        <button onClick={() => {setShowChat(true); setNewMessage(0)}} className={`
          fixed bottom-10 right-10
          flex justify-center items-center
          w-[50px] h-[50px] rounded-full
          bg-[#519add] p-1
        `}>
          <Image
            alt="chat logo"
            src="/icons/chat.svg"
            width={0}
            height={0}
            className="w-full h-full"
          />
        </button>
        {/** New Message */}
        { newMessage !== 0 &&
          <p onClick={() => {setShowChat(true)}} className={`
            fixed bottom-[70px] right-[70px]
            flex justify-center items-center
            w-[18px] h-[18px] rounded-full
            bg-[#ff0202] text-[white]
          `}>{newMessage}</p>
        }
      </>

      {/** Full width chat Layout */}
      <div onClick={() => setShowChat(false)} className={`
        fixed ${showChat ? "right-0" : "-right-full"} bottom-0
        w-full max-w-full
        flex justify-end 
        transition-all duration-300
        min-h-[100dvh] z-20
      `}>
        {/** Chat Container */}
        <div onClick={(e) => e.stopPropagation()} className={`
          relative
          flex flex-col justify-end 
        bg-[white] border-l border-[#c7c7c7]
          w-[450px] max-w-full
        `}>

          {/** Chat header Container */}
          <div className={`
            absolute top-0 left-0 h-[70px] w-full flex justify-center items-center
            bg-[#2b2b53] text-[#f3f3f3]
          `}>
            <p onClick={() => setShowChat(false)} className={`absolute left-10 cursor-pointer`}>X</p>
            <p>Customer Support</p>
          </div>

          {/** Messeges container */}
          <div className="w-full px-5 flex flex-col items-center flex-grow overflow-y-auto pt-2 bg-[#dadaeb] mt-[70px]">
            { /** Loop throught the Messages */
            messages.map((message, index) => (
              <div 
                key={index}
                className={`
                  mb-1 rounded-md px-3 py-1
                  max-w-[80%] text-[#e2e2e2]
                  ${message.role === "assistant" 
                    ? "self-start bg-[#114163]" 
                    : "self-end bg-[#6e236e]"
                  }
                `}
              >
                <p dangerouslySetInnerHTML={{ __html: message.content }}/>
                <p className={`text-[10px]`}>
                  {new Date(message.createdAt).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                  })}
                </p>
              </div>
            ))}
            {/** Loading the bot message add typing */}
            {loading && <p className={`text-[#bbbbbb] pb-3 self-start`}>typing...</p>}
            {/* Invisible div to always scroll into view */}
            <div ref={messagesEndRef} />
          </div>

          {/** Input / button container */}
          <form 
          onSubmit={(e) => {e.preventDefault(); handleSubmit()}}
          className="flex w-full px-3 bg-[#20203a] border-t border-[#161744] py-4">
            <input
              type="text"
              value={value}
              onChange={onChange}
              placeholder="Enter question here"
              className="rounded-full px-3 py-2 flex-1 bg-[#404463] text-[white]"
            />
            <button
              className="text-[white] w-[40px] h-[40px] flex justify-center items-center ml-3"
              disabled={loading}
            >
              <Image
                alt="send logo"
                src="/icons/send.svg"
                width={0}
                height={0}
                className="w-full h-full"
              />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}