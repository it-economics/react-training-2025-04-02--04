import { createContext, use, useState } from 'react';
import Hello from '../hello/hello';
import Input from '../input/input';

export function App() {
  const [name, setName] = useState('');

  return (
    <div>
      <NameContext value={{ name }}>
        <Hello name={name} />
        <Input onInputChange={(value) => setName(value)} />
        <Content />
      </NameContext>
    </div>
  );
}

export default App;

interface INameContext {
  name: string;
}

const NameContext = createContext<INameContext>({ name: 'Context not set!' });

const useName = () => use(NameContext).name;

const NestedContent = () => {
  // Show name here as well
  // useContext(NameContext)
  const { name } = use(NameContext);
  const name2 = useName();

  return (
    <div>
      <span>Nested - Name is {name}</span>
      <br />
      <span>From custom Hook - Name is {name2}</span>
    </div>
  );
};

const Content = () => {
  return (
    <div>
      <NestedContent />
    </div>
  );
};
