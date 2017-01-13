import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';

import ProductContainer from './ProductContainer';

describe('Product container', () => {
  let productContainer;
  beforeEach('Create Product', () => {
    productContainer = shallow(<ProductContainer routeParams={{productId: 1}} />);
  });

  it('should render a div', () => {
    expect(productContainer.is('div')).to.be.equal(true);
  });

  it('should render the correct nodes', () => {
    expect(productContainer.get(0).props.children[0].props.children[0]).to.contain('Category');
    expect(productContainer.get(0).props.children[4].props.children[0]).to.contain('Price');
    expect(productContainer.get(0).props.children[5].props.children[0]).to.contain('Inventory');
    expect(productContainer.get(0).props.children[6].props.children[0]).to.contain('Calories');
    expect(productContainer.get(0).props.children[7].props.children[0]).to.contain('Sugar');
    expect(productContainer.get(0).props.children[8].props.children[0]).to.contain('Fiber');
    expect(productContainer.get(0).props.children[9].props.children[0]).to.contain('Protein');
    expect(productContainer.get(0).props.children[10].props.children[0]).to.contain('Average User Rating');
  });



});
