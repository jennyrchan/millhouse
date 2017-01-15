import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';

import Review from './Review';

describe ('Review', () => {

  let review;

  beforeEach('create Review', () => {
    review = shallow(<Review title='hi' body='everybody' rating={['ratingPictures']}/>)
  })

  it ('renders a div', () => {
    expect(review.is('div')).to.be.equal(true);
  })

  it ('renders the correct parts', () => {
    expect(review.get(0).props.children[0].type).to.contain('h1');
    expect(review.get(0).props.children[1].type).to.contain('h2');
    expect(review.get(0).props.children[2].type).to.contain([]);
  })



})

