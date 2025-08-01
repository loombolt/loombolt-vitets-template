import { Outlet } from 'react-router-dom';

export default function Layout (){
  return (
    <>
      <header>
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-4">Loombolt Template</h1>
          <p className="text-muted-foreground">
            Get Started by Chatting with AI to build your app.
          </p>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};
