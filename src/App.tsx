import "./App.scss";
import { Greetings } from './components/sections/greetings/greetings';
import { Skills } from './components/sections/skills/skills';
import { ContactMe } from './components/sections/contactMe/contactMe';
import { MyExperience } from "./components/sections/myExperience/myExperience";

function App() {

  return (
    <div className='app'>
      <Greetings />
      <Skills />
      <MyExperience />
      <ContactMe />
    </div>
  )
}

export default App