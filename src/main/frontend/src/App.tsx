import {Link} from "react-router-dom";
import { SignOutButton, SignInButton, SignedIn, SignedOut } from "@clerk/clerk-react"
import './App.css'

function App() {
  return (
      <>
          <div>
              <h1>This is the index page</h1>
              <div>
                  <ul>
                      <li><Link to="/sign-up">Sign Up</Link></li>
                      <li><Link to="/sign-in">Sign In</Link></li>
                      <li><Link to="/contact">Contact</Link></li>
                      <li><Link to="/dashboard">Dashboard</Link></li>
                  </ul>
              </div>
          </div>
          <div>
              <SignedOut>
                  <SignInButton/>
                  <p>This content is public. Only signed out users can see this.</p>
              </SignedOut>
              <SignedIn>
                  <SignOutButton afterSignOutUrl="/"/>
                  <p>This content is private. Only signed in users can see this.</p>
              </SignedIn>
          </div>
      </>
  )
}

export default App
