import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import {Provider} from 'react-redux';
import store from '../store'

import Product from './Product';

describe('Product', () => {
  let product;
  let props = {
    id: 1,
    title: 'lala',
    summary: 'this is aaaamazing',
    price: 500,
    inventory: 1,
    calories: 2,
    sugar: 3,
    fiber: 4,
    protein: 5,
    category: 'healthy'
  }
  beforeEach('Create Product', () => {
    product = shallow(
      <Provider store = {store} >
        <Product/>
      </Provider>
      );
  });

  it('should render a div', () => {
    // console.log(product.get(0).type.WrappedComponent);
    expect(product.is('div')).to.be.equal(true);
  });

  it('should render the correct nodes', () => {
    expect(product.get(0).props.children[3].props.children[0]).to.contain('Price');
    expect(product.get(0).props.children[4].props.children[0]).to.contain('Inventory');
    expect(product.get(0).props.children[6].props.children[0]).to.contain('Calories');
    expect(product.get(0).props.children[7].props.children[0]).to.contain('Sugar');
    expect(product.get(0).props.children[8].props.children[0]).to.contain('Fiber');
    expect(product.get(0).props.children[9].props.children[0]).to.contain('Protein');
    expect(product.get(0).props.children[10].props.children[0]).to.contain('Average User Rating');
  });

  xit('should calculate inventory based on how much is left', () => {
    expect()
  })



});
