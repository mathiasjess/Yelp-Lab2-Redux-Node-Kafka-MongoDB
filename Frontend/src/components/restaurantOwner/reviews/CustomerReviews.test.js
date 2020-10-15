import React from 'react'
import {shallow, mount} from 'enzyme';
import CustomerReviews from './CustomerReviews'


it('hould return Reviews',async() =>{
    const wrapper = shallow(<CustomerReviews/>)
    const reviews = wrapper.find('h2').text()

    expect(reviews).toBe('Reviews')
})