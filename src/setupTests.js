import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import enableHooks from 'jest-react-hooks-shallow';

// This is the enzyme adapter:
configure({ adapter: new Adapter() });

// This is to be able to run "useEffect()" in shallow rendering:
enableHooks(jest);
