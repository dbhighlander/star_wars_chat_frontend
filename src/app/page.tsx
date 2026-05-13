import Chat from './chat/chat';
import Background from './page/Background';

export default async function Home() {

  
  return (
    <div className="w-full min-h-screen bg-black text-white">
      <Background />
      {/* Main content */}
      <main className="relative z-10 h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth">
        {/* Left main content */}
        <section  data-index="0" className="h-screen flex items-center justify-center snap-start">

          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold">
              AI Chatbot Personality Demo
            </h1>
            <h2 className="mt-4 text-lg md:text-2xl opacity-70">
              With Star Wars Characters
            </h2>
          </div>
        </section>

        <section  data-index="1" className="h-screen flex items-center justify-center snap-start">
          <div className="max-w-2xl text-center">
            <h2 className="text-3xl font-semibold mb-4">What is this?</h2>
            <p className="opacity-70">
              A frontend demo showing how system prompts change chatbot personality
              while the UI stays consistent.
            </p>
          </div>
        </section>

        <section  data-index="2" className="h-screen flex items-center justify-center snap-start">
          <div className="text-center">
            <h2 className="text-3xl font-semibold">Try the Chat</h2>
            <p className="opacity-60 mt-2">
              Use the assistant in the bottom-right corner
            </p>
          </div>
        </section>

        {/* <div className="w-[100%] md-w-2/3 overflow-auto box-border">
          <div className="p-4">
            <h1 className="text-xl font-bold">Star Wars Chat</h1>
            <div className='py-8'>
              <p>
                This page presents an AI Chatbot where you can chat to different Star Wars Characters.  It&apos;s a demo, so try starting a chat by clicking the chat icon in the bottom right.</p>
              <h2 className='texr-l font-bold mt-4 mb-2'>Tech Details</h2>
              <p>
                Cookies are used to keep the current chat going on a page refresh.  Chats are stored in a database held in the cloud. Here are the full technical details of the stack:
              </p>
              <ul className='list-disc p-6 pt-2'>
                <li>The site is structured with a <span className='italic'>NextJS front-end</span> that hooks to a <span className='italic'>go API backend.</span></li>
                <li>The AI engine is provided by <span className='italic'>Google Gemini.</span></li>
                <li>The characters can be toggled in the chat header and this changes the personality. This is done in the AI engine by adjusting prompts.</li>
                <li>The API is hosted entirely in the cloud on <span className='italic'>fly.io</span> with <span className='italic'>MySQL</span> provided by <span className='italic'>Aiven</span>.</li>
                <li>Tests are used to check the endpoints on the back-end and rendering of components on the front-end.</li>
                <li>Deployment is managed through <span className='italic'>GitHub actions</span>.</li>
              </ul>
              <h2 className='texr-l font-bold mt-4 mb-2'>Github Repositories</h2>
              <p>The full repositories are available online:</p>
              <ul className='list-disc p-6 pt-2'>
                <li>Front-end Github repository: <a className='text-blue-900 font-700' href='https://github.com/dbhighlander/star_wars_chat_frontend'>link</a></li>
                <li>Back-end Github repository: <a className='text-blue-900 font-700' href='https://github.com/dbhighlander/star_wars_chat_backend'>link</a></li>
              </ul>
            </div>
          </div>
        </div> */}

        <Chat />
      </main>

      {/* Footer */}
      {/* <footer className="flex gap-[24px] flex-wrap items-center justify-center p-2">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn"
          target="_blank"
          rel="noopener noreferrer"
        >
          Created by David Burgess
        </a>
      </footer> */}
    </div>
  );
}
