import Chat from './chat/chat';

export default async function Home() {
  return (
    <div className="font-sans min-h-screen flex flex-col bg-white">
      {/* Main content */}
      <main className="flex flex-1 flex-row w-full gap-8 ">
        {/* Left main content */}
        <div className="w-2/3  overflow-auto box-border">
          <div className="p-4">
            <h1 className="text-xl font-bold">Star Wars Chat</h1>
            <p>
              This page demonstrates how chats can be made to Star Wars
              Characters.
            </p>
            <p>
              The site is structured with a next.js front-end that hooks to a
              server written in go that queries the chatGPT completions API. The
              site is hosted entirely in the cloud.
            </p>
          </div>
        </div>

        <Chat />
      </main>

      {/* Footer */}
      <footer className="flex gap-[24px] flex-wrap items-center justify-center p-2">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn"
          target="_blank"
          rel="noopener noreferrer"
        >
          Created by David Burgess
        </a>
      </footer>
    </div>
  );
}
