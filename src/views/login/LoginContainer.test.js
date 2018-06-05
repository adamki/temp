import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import renderer from 'react-test-renderer';
import Enzyme, {shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({adapter: new Adapter()});

import LoginContainer from './LoginContainer';

describe('Container: LoginContainer', () => {
  it('renders without crashing', () => {
    const container = renderer.create(<LoginContainer />);

    let tree = container.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders an address input', () => {
    expect(
      mount(<LoginContainer />).find({'data-test': 'login-addressee'}).length,
    ).toEqual(1);
  });

  it('should pass a value to the onChange function', () => {
    const container = renderer.create(<LoginContainer />);
    let tree = container.toJSON();
    const component = mount(<LoginContainer />);

    expect(component.state().value).toBe('');

    component.find({'data-test': 'login-addressee'}).simulate('change', {
      target: {
        value: 'Jane Doe',
      },
    });

    expect(component.state().value).toBe('Jane Doe');
  });
});
