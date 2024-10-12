import React, { useEffect, useRef, useState } from 'react';
import { MessageSquare, PlusCircle, Scale } from 'lucide-react';
import axios from 'axios';
import { Server } from '../Constant/config';
import Loader from "../Pages/Loader"

const Chatbot = () => {
  const questionTemplates = [
    { title: "Legal Inquiries", description: "Description and features of About  Gram Nyayalaya" , input:"Tell me some sailent features of Gram Nyayalaya" },
    { title: "Case Status", description: "Description of the number of cases pending in Gram Nyayalaya",input: "Tell me the number of cases pending in Gram Nyayalaya"  },
    { title: "Report a Crime", description: "How to Submit information about a crime", input: "How to Submit information about a crime" },
    { title: "Find Resources", description: "Description of Number Of Operational Gram Nyayalaya in States" , input: "Tell me about  Number Of Operational Gram Nyayalaya in all States" },
  ];

  const [messages, setmessages] = useState([])

  const [input, setinput] = useState('')
   const [isLoading, setisLoading] = useState(false)
const [error, seterror] = useState(null)

// Algorithm
// 1.Initialize a Reference using useRef hook
// 2.Now make a function which scrolls to the bottom
// 3.Now make a useffect which will work by taking you to the bottom as soon as some new messages are arrived
// 4.Now make a simple div and attach the refernec so that whenver new message is coming it goes to the bottom







// const BottomEndRef = useRef(null);


// const BottomScroll = () => {
//   // The current is basically used to setup the ref to the current element on which it will function
//   BottomEndRef.current?.scrollIntoView({behavior: "smooth"})
// }


// useEffect(() => {
//   BottomScroll();
// }, [messages]);


const HandleMessage = (e) => {
const newMessage = e.target.value;
setinput(newMessage)
}


const RefreshPage = () => {
  window.location.reload()
}


 const TemplateChange = (template) => {
  setinput(template.input)
 }


const HandleSumbit = async (e) => {
e.preventDefault();
setisLoading(true)
try {

  // Take The input message if and only it is sumbitted 
  const userMessage = {text: input , isUser:true}
  setmessages((prev) => [...prev , userMessage])

  const res = await axios.post(`${Server}/api/v1/Bot/WebAsk`,{
    question:`Please answer the Following Question ${input}`
})
setinput('')

const botResponse = {
text: res.data.data,
isUser: false
}

 setmessages((prev) => [...prev , botResponse])

} catch (error) {
  seterror(error)

  const botErrorResponse = {
    text: `Sorry I have a Rate limiting issue Therfore i will be able to process your request after 30 seconds ... please wait`,
    isUser:false
  }

  setmessages((prev) => [...prev , botErrorResponse])

}
finally{
  setisLoading(false)
}
}

  return (

    <div className="fixed inset-0 flex bg-black text-white overflow-hidden">


      {/* Sidebar */}
      <div className="w-64 bg-gray-900 p-4 overflow-y-auto">
        <button onClick={RefreshPage} className="flex items-center justify-center w-full py-2 px-4 mb-4 bg-blue-700 rounded-md hover:bg-blue-600 transition-colors">
          <PlusCircle className="mr-2" size={20}  />
        </button>
        <div className="border-t border-gray-700 pt-4">
          <h2 className="text-lg font-semibold mb-2">Chat History</h2>
          {/* Add chat history items here */}
          {messages.filter((mes) => mes.isUser).map((val , ind) => (
            <p key={ind}> {val.text} </p>
          ))}
        </div>
      </div>




      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-gray-900 p-4 flex justify-center items-center">
          <Scale size={32} className="text-yellow-500 mr-2" />
          <h1 className="text-3xl font-bold text-center">Dept of Justice Chatbot</h1>
        </header>

        {/* Chat area */}
        <div className="flex-grow overflow-y-auto p-4 space-y-1">
        {messages.map((val , index) => (
          <div key={index} className={`flex ${val.isUser ? 'justify-end' : 'justify-start'}`}>
          <div 
                className={`max-w-[70%] p-3 rounded-lg shadow-md ${
                  val.isUser 
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white' 
                    : 'bg-gradient-to-r from-gray-800 to-gray-900 text-gray-100'
                }`}
              >
                {val.text}
              </div>
          </div>
        ))}
        </div>

      {isLoading && (
        <div className='flex justify-center items-center mb-10'>
        <Loader size={5} />
        </div>
      )}


      {/* <div ref={BottomEndRef} /> */}


        {/* <div className="flex-1 overflow-y-auto p-4 flex flex-col items-center justify-center bg-gray-950">
          <h2 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-red-400">
          Welcome 
          </h2>
        </div> */}

        {/* Question templates */}

        {messages && 
        <div className="grid grid-cols-2 gap-4 p-4 bg-gray-900">
          {questionTemplates.map((template, index) => (
            <div key={index} className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer border border-gray-600">
            <button onClick={() => TemplateChange(template)}>
            <div >
              <h3 className="font-semibold mb-2 text-yellow-400">{template.title}</h3>
              <p className="text-sm text-gray-300">{template.description}</p>
            </div>
            </button>

            </div>

          ))}
        </div>
        }

        {/* Input area */}
        <form onSubmit={HandleSumbit}>
        <div className="p-4 bg-gray-900">
          <div className="flex items-center bg-gray-800 rounded-lg border border-gray-700">
            <input
              type="text"
              placeholder="Type your message here..."
              value={input}
              onChange={HandleMessage}
              className="flex-1 bg-transparent p-3 outline-none text-white"
            />
          <button type="submit" className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-3 rounded-r-lg hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Send
            </button>
          </div>
        </div>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;