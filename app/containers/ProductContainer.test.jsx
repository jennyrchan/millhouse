import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';

import ProductContainer from './ProductContainer';

describe('Product container', () => {
  let productContainer;
  beforeEach('Create Product', () => {
    let sample = {
      productId: 1
    }
    productContainer = shallow(<ProductContainer routeParams={{productId: 1}} />);
  });

  it('should render div', () => {
    expect(productContainer.is('div')).to.be.equal(true);
  })
});
