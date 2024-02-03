import { useState } from 'react'
import { SignOutButton, SignInButton, SignedIn, SignedOut } from "@clerk/clerk-react"
import './App.css'

function App() {
  return (
      <div>
          <SignedOut>
              <SignInButton />
              <p>This content is public. Only signed out users can see this.</p>
          </SignedOut>
          <SignedIn>
              <SignOutButton afterSignOutUrl="/" />
              <p>This content is private. Only signed in users can see this.</p>
          </SignedIn>
      </div>
  )
}

export default App
