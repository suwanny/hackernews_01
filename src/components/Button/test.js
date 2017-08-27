import Button from '.';
import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

describe('Button', () => {
  it('renders', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Button onClick={()=>{}}>Give Me More</Button>,
      div
    );
  });

  test('snapshots', () => {
    const component = renderer.create(
      <Button onClick={()=>{}}>Give Me More</Button>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
